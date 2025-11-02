# Bucephalus

My personal website and portfolio

Built with React, Vite, and Tailwind CSS. Features portfolio projects, career timeline, education history, and blog functionality.

## Features

- **Portfolio Projects**: Showcase of personal projects with GitHub and live links
- **Career Timeline**: Detailed professional experience with company logos
- **Education**: Academic background and achievements
- **Technologies**: Visual display of technologies and frameworks I work with
- **Tab Navigation**: Easy switching between Career, Education, and Projects sections
- **Responsive Design**: Optimized for wide screens, tablets, and mobile devices

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using Vite.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `docs` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Preview the production build locally before deploying.

### `npm run deploy`

Deploys the app to production (GitHub Pages) using the `docs` folder.<br />

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **React Markdown** - Blog content rendering

## Project Structure

```
src/
├── features/
│   ├── Portfolio/
│   │   ├── Hero.jsx              # Introduction and bio
│   │   ├── Skills.jsx            # Technologies showcase
│   │   ├── CareerTimeline.jsx    # Professional experience
│   │   ├── Education.jsx         # Academic background
│   │   ├── Projects.jsx          # Project showcase
│   │   ├── TabNavigation.jsx     # Tab switching component
│   │   └── ...
│   └── Blog/                      # Blog functionality
└── assets/
    ├── companies/                 # Company logos
    ├── favicons/                  # Favicon assets
    └── projects/                  # Project images
```

## Architecture

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
GitHub Actions workflow:
  - Builds on every push to master
  - Commits docs/ folder to git
  - Pushes to master branch
    ↓
GitHub Pages serves from docs/ folder
    ↓
Live at zkevinbai.com
```

### Key Configuration Details

- **Base Path**: `/` (root) - works with custom domain setup
- **Build Output**: Directly to `docs/` folder for GitHub Pages
- **Git Hooks**: Husky pre-commit hook builds the app to ensure it compiles before commits
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

The `.github/workflows/deploy.yml` workflow automatically:

1. ✅ Checks out the `master` branch
2. ✅ Sets up Node.js 20 with npm caching
3. ✅ Installs dependencies (`npm ci`)
4. ✅ Builds the application directly to `docs/` (`npm run build`)
5. ✅ Verifies the build output
6. ✅ Commits `docs/` folder to git
7. ✅ Pushes to master branch
8. ✅ GitHub Pages automatically serves from `docs/` folder (triggered on every push to master)

### Important Files

- **`vite.config.js`**: Configures base path as `/` for both dev and production
- **`public/CNAME`**: Sets custom domain `zkevinbai.com`
- **`public/404.html`**: Enables client-side routing on GitHub Pages
- **`.github/workflows/deploy.yml`**: Automated deployment workflow
- **`.husky/pre-commit`**: Builds app before commits to catch errors early

## TODO

- [ ] Add analytics/tracking to the site (e.g., Google Analytics, Plausible, etc.)