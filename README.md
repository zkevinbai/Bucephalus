# Bucephalus

My personal website and portfolio

Built with React, Vite, and Tailwind CSS. Features portfolio projects, career timeline, education history, and blog functionality.

## Features

- **Portfolio Projects**: Showcase of personal projects with GitHub and live links
- **Career Timeline**: Detailed professional experience with company logos
- **Education**: Academic background and achievements
- **Technologies**: Visual display of technologies and frameworks I work with
- **Tab Navigation**: Easy switching between Career, Education, and Projects sections
- **Blog**: Personal blog with 3D cube rotation transition
- **Responsive Design**: Optimized for wide screens, tablets, and mobile devices
- **Design System**: Comprehensive design patterns documented in `kevin-design-system.md`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using Vite.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `docs` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

**Note:** You don't need to run this manually! The Husky pre-commit hook automatically runs `npm run build` before every commit, so your built files are always up-to-date.

### `npm run preview`

Preview the production build locally before deploying.

### `npm run deploy`

Deploys the app to production (GitHub Pages) using the `docs` folder.<br />

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing with BrowserRouter
- **CSS 3D Transforms** - 3D cube rotation effects

## Design System

This project follows a comprehensive design system documented in [`kevin-design-system.md`](./kevin-design-system.md). Key design patterns include:

- **Liquid Glass Morphism**: Semi-transparent backgrounds with backdrop blur
- **Scroll-Aware UI**: Buttons that adapt based on scroll position
- **Gradient Backgrounds**: Multi-color gradients for depth
- **3D Transforms**: Smooth transitions between views
- **Consistent Typography**: Raleway font family with defined hierarchy
- **Responsive Design**: Mobile-first approach with progressive enhancement

See the design system documentation for complete details on colors, spacing, components, and interaction patterns.

## Project Structure

```
src/
├── App.jsx                        # Main app with 3D rotation wrapper and routing
├── features/
│   ├── Portfolio/
│   │   ├── Grid.jsx              # Main grid layout container
│   │   ├── GridBox.jsx           # Glass effect card component
│   │   ├── Hero.jsx              # Introduction and bio
│   │   ├── Skills.jsx            # Technologies showcase
│   │   ├── CareerTimeline.jsx    # Professional experience
│   │   ├── Education.jsx         # Academic background
│   │   ├── Projects.jsx          # Project showcase
│   │   ├── TabNavigation.jsx     # Tab switching component
│   │   └── ...
│   └── Blog/
│       ├── AllBlogs.jsx          # Blog listing page
│       ├── SingleBlog.jsx        # Individual blog post page
│       ├── blogData.js           # Blog posts data and content
│       └── archive/              # Archived blog posts
└── assets/
    ├── companies/                 # Company logos
    ├── favicons/                  # Favicon assets
    └── projects/                  # Project images
```

## Logo Sources

When adding new logos to the project, please use the following sources:

- **Tech/Technology Logos**: Use [LobeHub Icons](https://lobehub.com/icons?q=) - A free collection of 1275+ vector icons covering major AI brands and models, supporting React / SVG / PNG / WebP formats.
  
- **Non-Tech/Company Logos**: Use [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) - A free media repository with millions of freely usable media files including company logos, organization emblems, and flags.

### Guidelines

- Prefer SVG format for logos when available (better scalability)
- Ensure logos are square or can be cropped to square format for consistency
- Verify licensing and attribution requirements before use
- Store all logos in `src/assets/companies/` directory

## Architecture

### Application Architecture

The application uses a feature-based architecture with shared components:

- **Routing**: React Router with `BrowserRouter` for client-side routing
  - `/` - Portfolio view
  - `/blog` - Blog listing
  - `/blog/:slug` - Individual blog post

- **3D Rotation System**: Portfolio and Blog views are wrapped in a 3D cube rotation container
  - Smooth 180-degree Y-axis rotation transition
  - Scroll-aware floating navigation buttons
  - Auto-scroll to top on view transition

- **Component System**: 
  - **Grid**: Main responsive grid container with gradient background
  - **GridBox**: Reusable glass effect card component used throughout
  - Feature components organized by domain (Portfolio, Blog)

- **Design System**: All styling follows consistent patterns documented in `kevin-design-system.md`
  - Liquid glass morphism effects
  - Scroll-aware UI elements
  - Consistent spacing, colors, and typography

### Deployment Architecture

This project is deployed to **GitHub Pages** using the following setup:

1. **Source**: The React application lives in the `master` branch
2. **Build**: Vite builds the app directly to the `docs/` folder with base path `/` (root)
3. **Custom Domain**: Served at `zkevinbai.com` (configured via `public/CNAME`)
4. **Hosting**: GitHub Pages serves static files from the `docs/` folder

### Build & Deployment Flow

```
Source Code (master branch)
    ↓
npm run build → Vite compiles directly to docs/
    ↓
Git commit includes docs/ folder (built locally)
    ↓
GitHub Pages automatically:
  - Builds and verifies on every push to master
  - Deploys from the committed docs/ folder
    ↓
Live at zkevinbai.com
```

### Key Configuration Details

- **Base Path**: `/` (root) - works with custom domain setup
- **Build Output**: Directly to `docs/` folder for GitHub Pages
- **Git Hooks**: Husky pre-commit hook automatically builds the app before every commit (no manual build needed)
- **Routing**: React Router with `BrowserRouter` and `public/404.html` for client-side routing on GitHub Pages
- **GitHub Pages Settings**: 
  - Source: `docs/` folder
  - Branch: `master`
  - Custom domain: `zkevinbai.com`

### Local Development vs Production

| Aspect | Local Dev (`npm run dev`) | Production (GitHub Pages) |
|--------|---------------------------|---------------------------|
| **Base Path** | `/` | `/` |
| **Server** | Vite dev server (localhost:5173) | GitHub Pages CDN |
| **Build** | Hot-reload, no build needed | Direct to `docs/` |
| **Assets** | Served from `/` | Served from `/` (custom domain) |

### Deployment Workflow

**Local Build (automatically via Husky pre-commit hook):**
1. ✅ **No manual build required!** Before each commit, Husky automatically runs `npm run build`
2. ✅ Builds directly to `docs/` folder
3. ✅ Automatically stages `docs/` folder for inclusion in your commit
4. ✅ Your commit includes both source code and built files

**GitHub Pages Deployment:**
1. ✅ On push to master, GitHub Pages automatically detects changes
2. ✅ Builds and verifies the site (3 status checks)
3. ✅ Deploys from the committed `docs/` folder to production

### Important Files

- **`vite.config.js`**: Configures base path as `/` for both dev and production
- **`public/CNAME`**: Sets custom domain `zkevinbai.com`
- **`public/404.html`**: Enables client-side routing on GitHub Pages
- **`.husky/pre-commit`**: Builds app before commits to catch errors early