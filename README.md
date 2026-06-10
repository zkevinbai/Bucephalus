# Bucephalus

My personal website, portfolio, and blog — [zkevinbai.com](https://zkevinbai.com).

Built with React 18, Vite, and Tailwind CSS. Static SPA, no backend.

## What's here

- **Portfolio** (`/`) — single-scroll page: hero, about, career timeline, projects, education, skills
- **Writing** (`/blog`) — blog posts, data-driven from `blogData.js`
- **Toys** (`/toys`) — small browser utilities (formatters, converters, the Chinese Zodiac lookup)
- **Theme Studio** (`/themes`) — palette easter egg, plus light/dark mode

## Quick start

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Deploys to GitHub Pages via GitHub Actions on push to `master`.

For architecture, see [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md). For agent/contributor conventions, see [CLAUDE.md](./CLAUDE.md).
