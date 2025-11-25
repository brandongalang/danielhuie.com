# danielhuie.com

## About This Project

This is a demo project testing Claude Opus 4.5's ability to handle open-ended, design-centric tasks.

The workflow:
1. Google's Jules agent extracted all media assets from danielhuie.com
2. Claude Code in the cloud with Claude Opus 4.5 analyzed the extracted assets and created a revised, modernized portfolio page
3. The result is a conversion-focused portfolio showcasing Daniel Huie's photography work across corporate events, tech/AI, fitness, and lifestyle categories

## Project Structure

- `portfolio/` - The modernized portfolio website (HTML, CSS, JavaScript)
- `portfolio_analysis/` - Analysis and extracted assets from the original site
  - `assets/` - All images extracted from danielhuie.com
  - `crawled_data.json` - Structured data from the crawl
  - `ASSET_GUIDE.md` - Index of all assets by category
- `extract_assets.py` - Script to download all images from the live site
