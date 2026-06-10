# System Design

How zkevinbai.com (codename Bucephalus) works as a whole system, current as of the v2 redesign.

## Overview

A static single-page application: React 18 + Vite + Tailwind 3 + react-router-dom 6, no TypeScript, no backend. Client-side routing with a GitHub Pages SPA redirect shim. Deployed to GitHub Pages at the custom domain `zkevinbai.com`.

## Routes

Defined in `src/App.jsx`:

| Path | Component | Notes |
|------|-----------|-------|
| `/`, `/portfolio` | `Portfolio` | Single-scroll portfolio page |
| `/projects` | `ProjectsPage` | Standalone projects page |
| `/blog` | `AllBlogs` | Blog index |
| `/blog/:slug` | `SingleBlog` | One post |
| `/toys` | `Toys` | Browser-utility index |
| `/toys/zodiac` | `ChineseZodiac` | Zodiac lookup (a "toy") |
| `/toys/:slug` | `ToyPage` | One tool |
| `/themes` | `Themes` | Theme Studio — intentional easter egg, linked from the footer |
| `/zodiac` | redirect → `/toys/zodiac` | Backward compat |
| `*` | redirect → `/` | Catch-all |

`App.jsx` also mounts `RouteEffects`, which per navigation: sends a GA page view, scrolls to top (preserving `#anchor` jumps), and re-arms the scroll-reveal observer.

## Source layout

```
src/
├── main.jsx                 React root
├── App.jsx                  Router + RouteEffects
├── index.css                Reset, CSS-var tokens, .reveal, .eyebrow, .prose
├── components/              Shell: Header, Footer, Container
├── hooks/useScrollReveal.js IntersectionObserver for .reveal fade-ins
├── utils/analytics.js       Google Analytics helpers (gtag)
├── assets/                  Images: companies/, projects/, portrait
└── features/
    ├── Portfolio/           Hero, SectionNav, About, CareerTimeline,
    │                        Projects, Education, Skills, Section (wrapper)
    ├── Blog/                AllBlogs, SingleBlog, blogData.js
    ├── Toys/                Toys index, ToyPage, ToyLayout, toykit.jsx,
    │                        toysData.js, tools/ (one file per tool)
    ├── ChineseZodiac/       Zodiac feature, zodiacData.js, zodiacUtils.js
    └── Themes/              Theme Studio page, themePresets.js (dark mode vars)
```

## Data flow

Content is data-driven, no CMS:

- Blog posts live in `src/features/Blog/blogData.js` as HTML strings. Legacy posts carry old inline classes; `SingleBlog.jsx` strips every `class="…"` before rendering and `.prose` in `index.css` styles by tag. New posts can omit inline classes entirely.
- Toys are registered in `src/features/Toys/toysData.js` (slug, category, component). Adding a tool = new file in `tools/` + one entry there.
- Career/education/project content lives in arrays at the top of the respective Portfolio components.
- Zodiac tables live in `zodiacData.js` / `zodiacUtils.js`.

## Design system (v2, warm editorial)

- Tokens are CSS variables in `src/index.css`, mapped to Tailwind utilities in `tailwind.config.js`: paper `#fbf7f0` background, ink `#1b1714` text, clay/terracotta `#cc785c` accent, plus sparing sage/ocean/plum/gold.
- Fonts: Fraunces (serif — display and headings) + Inter (sans — body), loaded from Google Fonts in `index.html`. Use Tailwind tokens (`bg-paper`, `text-ink`, `text-clay-deep`, `font-serif`), never hardcoded hex.
- Dark mode ("Midnight Teal"): a `.dark` class on `<html>` swaps the CSS variables (values in `src/features/Themes/themePresets.js`). An inline script in `index.html` applies the saved/system theme before first paint.
- Motion: `.reveal` elements fade in via `useScrollReveal`; respects `prefers-reduced-motion`.
- Icons: Font Awesome **5.8.1** and Devicon, both via CDN `<link>`s in `index.html`. Use FA5 icon names, not FA6.

## Build & deploy

- `npm run dev` → Vite dev server at http://localhost:5173
- `npm run build` → static bundle in `dist/` (not committed)
- Deploy: pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages via `actions/deploy-pages`. PRs get a build check from `.github/workflows/test.yml`.
- `public/` is copied verbatim into the bundle: `CNAME` (custom domain), `favicon.ico`, `og-image.jpg`, and `404.html`. The `404.html` + the inline script in `index.html` implement the spa-github-pages redirect so deep links work on Pages.

## Analytics

Google Analytics (gtag, id in `index.html`). `src/utils/analytics.js` wraps it: page views (via `RouteEffects`), outbound clicks, blog/section/toy/theme events. All helpers no-op if gtag is absent.
