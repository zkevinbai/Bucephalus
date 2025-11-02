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

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Preview the production build locally before deploying.

### `npm run deploy`

Deploys the app to production (GitHub Pages) using the `dist` folder.<br />

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

## Deployment

This project is deployed to GitHub Pages with client-side routing support.

# Interesting things I am doing with this website
---

1. **Deployment Using GitHub Pages**
   - https://create-react-app.dev/docs/deployment/#step-2-install-gh-pages-and-add-deploy-to-scripts-in-packagejson

2. **Client-side Routing on GitHub Pages**
   - https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
   - https://github.com/rafgraph/spa-github-pages

3. **Vite Build Configuration**
   - Modern build tooling for fast development and optimized production builds