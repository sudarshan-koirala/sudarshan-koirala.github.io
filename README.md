# sudarshan-koirala.github.io

Personal website & blog built with [Astro](https://astro.build). Auto-deploys to GitHub Pages on every push to `main`.

## Quick Start

```bash
npm install
npm run dev        # Local dev server at localhost:4321
npm run build      # Build for production
npm run preview    # Preview production build
```

## Writing a New Blog Post

Create a markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short description for SEO and previews."
date: 2026-07-03
tags: ["ai", "databricks", "tutorial"]
youtube: "dQw4w9WgXcQ"   # Optional: YouTube video ID to embed
draft: false
---

Your content here. Standard markdown with code blocks, images, etc.
```

Push to `main` - GitHub Actions builds and deploys automatically.

## Adding Your Photo

1. Put your photo as `public/photo.jpg`
2. Uncomment the `<img>` line in `src/pages/index.astro`

## Customizing

- **Site URL**: Update `site` in `astro.config.mjs`
- **SEO defaults**: Edit the `Base.astro` layout
- **YouTube playlists**: Edit `src/pages/videos.astro` with your playlist IDs
- **Styles**: All CSS is in `src/styles/global.css`
- **About page**: Update `src/pages/about.astro` with your latest info

## Deploying

1. Create a repo named `sudarshan-koirala.github.io` on GitHub
2. Push this project to `main`
3. Go to repo **Settings - Pages - Source - GitHub Actions**
4. The workflow runs automatically on every push

## Project Structure

```
src/
├── content/blog/     # Markdown blog posts
├── layouts/          # Base HTML layout with SEO
├── pages/            # Routes: index, blog, videos, about
├── styles/           # Global CSS
public/               # Static assets (favicon, images, robots.txt)
.github/workflows/    # GitHub Actions deploy config
```
