import asyncio
from playwright.async_api import async_playwright
import json
import os
import hashlib
import aiohttp
from urllib.parse import urlparse, unquote

INPUT_FILE = "portfolio_analysis/crawled_data.json"
ASSETS_DIR = "portfolio_analysis/assets"
MAX_CONCURRENT_DOWNLOADS = 5

os.makedirs(ASSETS_DIR, exist_ok=True)

async def download_image(session, url, existing_files):
    try:
        # Clean URL for filename generation
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename or '.' not in filename:
            # Fallback for weird urls
            ext = ".jpg"
            name = hashlib.md5(url.encode()).hexdigest()
            filename = f"{name}{ext}"
        else:
            # maintain extension, but prevent overwrites if different content
            name, ext = os.path.splitext(filename)
            # Shorten if too long
            if len(name) > 50:
                name = name[:50]

            # Simple dedup check based on filename -
            # if we wanted to be perfect we'd check content or hash url,
            # but here we just want to avoid re-downloading the exact same path.
            # However, different URLs might map to same filename.
            # So we prepend a short hash of the full URL to ensure uniqueness.
            url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
            filename = f"{name}_{url_hash}{ext}"

        filepath = os.path.join(ASSETS_DIR, filename)

        if os.path.exists(filepath):
            return # Skip if exists

        async with session.get(url) as response:
            if response.status == 200:
                content = await response.read()
                with open(filepath, 'wb') as f:
                    f.write(content)
                print(f"Downloaded: {filename}")
            else:
                print(f"Failed to download {url}: Status {response.status}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

async def extract_images_from_page(page, url):
    print(f"Scanning {url}...")
    try:
        await page.goto(url, wait_until="networkidle", timeout=60000)

        # Extract img src, srcset, and background-images
        images = await page.evaluate("""() => {
            const images = new Set();

            // IMG tags
            document.querySelectorAll('img').forEach(img => {
                if (img.src) images.add(img.src);
                if (img.dataset.src) images.add(img.dataset.src); // Squarespace lazy load
            });

            // Background images
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.backgroundImage && style.backgroundImage !== 'none') {
                    const match = style.backgroundImage.match(/url\\(['"]?(.*?)['"]?\\)/);
                    if (match && match[1]) {
                        images.add(match[1]);
                    }
                }
            });

            return Array.from(images);
        }""")
        return images
    except Exception as e:
        print(f"Error scanning page {url}: {e}")
        return []

async def main():
    with open(INPUT_FILE, 'r') as f:
        data = json.load(f)

    unique_urls = set()
    for page_data in data:
        unique_urls.add(page_data['url'])

    all_image_urls = set()

    # 1. Harvest URLs from the "links" field in JSON (often contains the high-res gallery links)
    for page_data in data:
        for link in page_data.get('links', []):
            lower_link = link.lower()
            if any(lower_link.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']):
                all_image_urls.add(link)

    print(f"Found {len(all_image_urls)} potential image links in existing data.")

    # 2. Visit pages to get embedded images (logos, layout images)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        for url in unique_urls:
            page_images = await extract_images_from_page(page, url)
            for img_url in page_images:
                # Squarespace sometimes gives relative URLs or ones without protocol
                if img_url.startswith('//'):
                    img_url = 'https:' + img_url

                # Filter out obvious junk
                if img_url.startswith('http'):
                    all_image_urls.add(img_url)

        await browser.close()

    print(f"Total unique images to download: {len(all_image_urls)}")

    # 3. Download
    async with aiohttp.ClientSession() as session:
        tasks = []
        semaphore = asyncio.Semaphore(MAX_CONCURRENT_DOWNLOADS)

        async def sem_download(url):
            async with semaphore:
                await download_image(session, url, set())

        for img_url in all_image_urls:
            tasks.append(sem_download(img_url))

        await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())
