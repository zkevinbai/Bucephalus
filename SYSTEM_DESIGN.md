# System Design

This document describes how the Bucephalus website works as a whole system. For detailed design patterns and styling guidelines, see [KEVIN_DESIGN_SYSTEM.md](./KEVIN_DESIGN_SYSTEM.md).

## Overview

Bucephalus is a static single-page application (SPA) built with React, deployed to GitHub Pages. It serves as a personal portfolio, blog, and interactive tools showcase.

## Architecture

### Application Structure

```
┌─────────────────────────────────────┐
│         Browser (Client)             │
│  ┌───────────────────────────────┐   │
│  │    React Application (SPA)    │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │  React Router           │   │   │
│  │  │  - / (Portfolio)        │   │   │
│  │  │  - /blog                 │   │   │
│  │  │  - /blog/:slug           │   │   │
│  │  │  - /zodiac               │   │   │
│  │  └─────────────────────────┘   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │  Components             │   │   │
│  │  │  - Header               │   │   │
│  │  │  - Breadcrumbs         │   │   │
│  │  └─────────────────────────┘   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │  Features               │   │   │
│  │  │  - Portfolio            │   │   │
│  │  │  - Blog                 │   │   │
│  │  │  - ChineseZodiac        │   │   │
│  │  └─────────────────────────┘   │   │
│  └───────────────────────────────┘   │
└─────────────────────────────────────┘
         ↓ HTTP Request
┌─────────────────────────────────────┐
│      GitHub Pages (CDN)              │
│  ┌───────────────────────────────┐   │
│  │    Static Files (docs/)        │   │
│  │  - index.html                  │   │
│  │  - assets/                     │   │
│  │  - 404.html (SPA routing)      │   │
│  └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages
- **Domain**: Custom domain (zkevinbai.com)

## Routing System

### Route Configuration

The application uses React Router's `BrowserRouter` for client-side routing:

```javascript
/                    → Portfolio (default)
/portfolio           → Portfolio (alias)
/blog                → Blog listing
/blog/:slug          → Individual blog post
/zodiac              → Chinese Zodiac app
*                    → Redirect to / (catch-all)
```

### Client-Side Routing on GitHub Pages

Since GitHub Pages serves static files, client-side routing requires special handling:

1. **404.html**: When a user visits `/blog` directly (or refreshes), GitHub Pages serves `404.html`
2. **URL Rewriting**: `404.html` rewrites the URL to `/?/blog` format
3. **History Restoration**: `index.html` script converts it back to `/blog`
4. **React Router**: Handles the route and renders the correct component

This ensures all routes work correctly even on direct navigation or page refresh.

## Component Architecture

### Feature-Based Organization

```
src/
├── components/          # Shared UI components
│   ├── Header.jsx      # Fixed navigation header
│   └── Breadcrumbs.jsx # Navigation breadcrumbs
│
├── features/           # Feature modules
│   ├── Portfolio/     # Portfolio feature
│   ├── Blog/          # Blog feature
│   └── ChineseZodiac/  # Zodiac feature
│
└── assets/             # Static assets
    ├── companies/      # Company logos
    ├── projects/       # Project images
    └── ...
```

### Shared Components

- **Header**: Fixed navigation bar with links to Portfolio, Blog, and Zodiac
- **Breadcrumbs**: Shows current location (hidden on home page)
- **Grid**: Responsive grid layout container
- **GridBox**: Reusable card component with consistent styling

### Feature Components

Each feature is self-contained with its own components and data:

- **Portfolio**: Hero, Skills, CareerTimeline, Education, Projects, TabNavigation
- **Blog**: AllBlogs, SingleBlog, blogData
- **ChineseZodiac**: YearSearch, YearTable, YearDetail, zodiacData, zodiacUtils

## Data Management

### Static Data

All data is stored in JavaScript files (no backend):

- **Blog Posts**: `src/features/Blog/blogData.js` - Array of blog post objects
- **Zodiac Data**: `src/features/ChineseZodiac/zodiacData.js` - Zodiac animal/element data
- **Portfolio Data**: Embedded in component files (CareerTimeline, Education, Projects)

### Image Preloading

Images are preloaded on-demand when components mount:

```javascript
// Example: Projects component preloads project images
useEffect(() => {
  projectImages.forEach((imageSrc) => {
    const img = new Image()
    img.src = imageSrc
  })
}, [])
```

This ensures images are cached before display, improving perceived performance.

## Build & Deployment

### Build Process

1. **Source**: React source code in `src/`
2. **Build**: Vite compiles to `docs/` folder
3. **Output**: Static HTML, CSS, JS files in `docs/`

### Deployment Flow

```
Developer commits code
    ↓
Husky pre-commit hook runs
    ↓
npm run build (Vite builds to docs/)
    ↓
git add -f docs/ (force add build output)
    ↓
Commit includes source + built files
    ↓
Push to GitHub
    ↓
GitHub Pages serves from docs/ folder
    ↓
Live at zkevinbai.com
```

### Key Configuration

- **Base Path**: `/` (root) - Works with custom domain
- **Build Output**: `docs/` folder (configured in `vite.config.js`)
- **Git Hook**: `.husky/pre-commit` automatically builds before commits
- **Custom Domain**: `public/CNAME` sets `zkevinbai.com`
- **SPA Routing**: `public/404.html` handles client-side routing

## Styling System

The application uses Tailwind CSS with a comprehensive design system. See [KEVIN_DESIGN_SYSTEM.md](./KEVIN_DESIGN_SYSTEM.md) for:

- Color palette and usage
- Typography system
- Component patterns
- Responsive design
- Hover effects and animations

## Performance Optimizations

1. **Image Preloading**: On-demand preloading when components mount
2. **Code Splitting**: React Router automatically code-splits routes
3. **Static Assets**: All assets bundled and optimized by Vite
4. **CDN Delivery**: GitHub Pages serves files via CDN
5. **No Backend**: Pure static site, no server requests needed

## Development Workflow

1. **Local Development**: `npm run dev` - Vite dev server with hot reload
2. **Build**: `npm run build` - Creates production build in `docs/`
3. **Preview**: `npm run preview` - Preview production build locally
4. **Commit**: Husky automatically builds before commit
5. **Deploy**: Push to GitHub, GitHub Pages auto-deploys from `docs/`

## Key Files

- **`src/App.jsx`**: Main app component with routing
- **`src/main.jsx`**: React entry point
- **`index.html`**: HTML template
- **`vite.config.js`**: Build configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`public/404.html`**: SPA routing handler for GitHub Pages
- **`public/CNAME`**: Custom domain configuration
- **`.husky/pre-commit`**: Auto-build git hook

## Design System

For detailed design patterns, colors, typography, and component guidelines, see [KEVIN_DESIGN_SYSTEM.md](./KEVIN_DESIGN_SYSTEM.md).
