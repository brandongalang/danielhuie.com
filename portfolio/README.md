# Daniel Huie Portfolio - New Design

A modern, conversion-focused portfolio page with case studies designed to drive business results.

## Overview

This portfolio is structured around **case studies** rather than simple image galleries. Each case study follows a proven format:
- **The Brief**: What the client needed
- **The Approach**: How you solved it
- **The Results**: Measurable outcomes with data
- **Testimonial**: Social proof from the client

## File Structure

```
portfolio/
├── index.html    # Main portfolio page
├── styles.css    # All styling
├── script.js     # Interactive features
└── README.md     # This file
```

## Customization Guide

### 1. Replace Placeholder Content

Throughout the page, you'll find placeholder text marked with `[brackets]`. Replace these with real information:

**Testimonials & Quotes:**
- `[Client Name]` - Replace with actual client names
- `[Company]` - Replace with company names

**Results Data:**
The case study results are **example metrics** based on typical industry outcomes. Replace these with your actual data when available:

```html
<div class="result-item">
    <span class="result-number">3x</span>
    <span class="result-label">LinkedIn engagement vs. previous events</span>
</div>
```

### 2. Update Case Study Content

Each case study in `index.html` follows this structure:

```html
<article class="case-study" data-category="tech">
    <!-- Images -->
    <div class="case-study-images">...</div>

    <!-- Content -->
    <div class="case-study-content">
        <div class="case-study-meta">
            <span class="case-study-tag">Tech & AI</span>
            <span class="case-study-client">Client Name</span>
        </div>
        <h3 class="case-study-title">Project Title</h3>

        <div class="case-study-section">
            <h4>The Brief</h4>
            <p>What the client needed...</p>
        </div>

        <div class="case-study-section">
            <h4>The Approach</h4>
            <p>How you solved it...</p>
        </div>

        <div class="case-study-results">
            <h4>The Results</h4>
            <!-- Metrics here -->
        </div>

        <blockquote class="case-study-testimonial">
            <p>"Quote from client..."</p>
            <cite>— Name, Company</cite>
        </blockquote>
    </div>
</article>
```

### 3. Update Images

Current images reference the `portfolio_analysis/assets/` directory. For production:

1. Host images on your CDN (Squarespace, Cloudinary, etc.)
2. Update image paths in `index.html`
3. Ensure images are optimized for web (compress, proper sizing)

**Recommended image sizes:**
- Hero images: 1200x800px
- Case study hero: 800x400px
- Case study secondary: 400x180px
- Gallery items: 600x600px (square)

### 4. Categories & Filters

The case studies use a `data-category` attribute for filtering:

- `tech` - Tech & AI projects
- `finance` - Finance projects
- `fitness` - Fitness & Wellness projects

To add a new category:
1. Add a new filter button in the filters section
2. Set the matching `data-category` on case studies

```html
<!-- Add filter button -->
<button class="filter-btn" data-filter="newcategory">New Category</button>

<!-- Set category on case study -->
<article class="case-study" data-category="newcategory">
```

### 5. Contact Information

Update these throughout the page:
- Email: `hello@danielhuie.com`
- Instagram: `https://www.instagram.com/daniel.huie`
- LinkedIn: `https://www.linkedin.com/in/danielhuie`

### 6. Fonts

The design uses Adobe Fonts (Typekit):
- **Headings**: `futura-pt`
- **Body**: `proxima-nova`

Update your Typekit kit ID in the `<head>`:
```html
<link rel="stylesheet" href="https://use.typekit.net/your-kit-id.css">
```

If not using Adobe Fonts, Inter is the fallback and works well.

## Case Studies Included

1. **GenAI Collective x Hebbia** (Tech & AI)
   - AI community summit photography
   - Focus: Thought leadership content for sponsors

2. **Singapore Global Network @ NYSE** (Finance)
   - Global Leaders Series at New York Stock Exchange
   - Focus: Premium venue, executive presence

3. **Vuori NYC Activation** (Fitness & Wellness)
   - Brand activation and community event
   - Focus: Product-forward content for e-commerce

4. **Mush x Brooklyn Half Marathon** (Fitness & Wellness)
   - Race day brand activation
   - Focus: High-energy action shots, product integration

5. **Supermomos** (Tech & AI)
   - Curated professional networking events
   - Focus: Exclusive, inviting atmosphere

## Adding New Case Studies

1. Copy an existing `<article class="case-study">` block
2. Update the `data-category` attribute
3. Replace all content (images, text, results, testimonial)
4. Consider adding `case-study-reverse` class for visual variety

## Technical Notes

### CSS Variables

All colors, spacing, and fonts are defined in CSS variables at the top of `styles.css`. Modify these to adjust the entire design:

```css
:root {
    --color-bg: #FCFCFC;
    --color-heading: #222222;
    --color-text: #575757;
    /* ... */
}
```

### JavaScript Features

- Mobile navigation toggle
- Case study category filtering
- Scroll reveal animations
- Smooth anchor scrolling

### Browser Support

Designed for modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API

## Deployment

This is a static HTML/CSS/JS page. Deploy options:

1. **Replace Squarespace pages** - Copy sections into Squarespace code blocks
2. **Host on Netlify/Vercel** - Drag and drop the `portfolio/` folder
3. **Custom domain** - Host as a subdomain (e.g., portfolio.danielhuie.com)

## Next Steps

1. Review all placeholder content and replace with real information
2. Gather actual metrics/results from past clients
3. Request testimonials from key clients
4. Update images to production-ready hosted versions
5. Test on mobile devices
6. Deploy and iterate based on feedback
