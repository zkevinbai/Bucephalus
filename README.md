# Bucephalus

My personal website, portfolio, and blog.

Built with React, Vite, and Tailwind CSS.

## Features

- **Portfolio**: Showcase of personal projects with GitHub and live links
- **Career Timeline**: Detailed professional experience with company logos
- **Education**: Academic background and achievements
- **Technologies**: Visual display of technologies and frameworks I work with
- **Tab Navigation**: Easy switching between Career, Education, and Projects sections
- **Blog**: Personal blog with markdown-style posts
- **Chinese Zodiac**: Interactive Chinese zodiac lookup and information
- **Responsive Design**: Optimized for wide screens, tablets, and mobile devices

## How It Works

This is a single-page React application that uses client-side routing:

- **Routes**:
  - `/` - Portfolio (home page)
  - `/portfolio` - Portfolio (same as home)
  - `/blog` - Blog listing
  - `/blog/:slug` - Individual blog post
  - `/zodiac` - Chinese Zodiac app
  - All other routes redirect to `/`

- **Navigation**: Fixed header with navigation links and breadcrumbs below
- **Deployment**: Built to `docs/` folder and deployed to GitHub Pages at `zkevinbai.com`
- **Auto-build**: Husky pre-commit hook automatically builds before each commit

## Quick Start

```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

For detailed system architecture, see [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md).
