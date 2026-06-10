# CLAUDE.md

Personal site (zkevinbai.com): React 18 + Vite + Tailwind 3 + react-router-dom 6. Plain JSX, no TypeScript, no backend, no tests. Full architecture, routes, and data flow: see [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md).

## Commands

- `npm run dev` — dev server at http://localhost:5173 (always run from this repo's root)
- `npm run build` — production build → `dist/` (never commit it)
- Deploy is automatic: push to `master` → `.github/workflows/deploy.yml` → GitHub Pages

## Design system (v2 "warm editorial" — this is final)

- Use Tailwind tokens, never raw hex: `bg-paper`, `text-ink`, `text-muted`, `text-clay-deep`, `border-line`, `font-serif` (Fraunces, headings) / `font-sans` (Inter, body). Tokens are CSS vars in `src/index.css` + `tailwind.config.js`.
- Secondary accents (sage/ocean/plum/gold) sparingly. Vibe: quiet, confident, lots of air.
- Dark mode works by swapping CSS vars under `.dark` — values in `src/features/Themes/themePresets.js`. Any new color must be a var that has a dark value, not a literal.
- Animations: add `.reveal` for the standard fade-in; it respects `prefers-reduced-motion`.

## Gotchas

- **Font Awesome is v5.8.1** (CDN). Use FA5 names: `fas fa-external-link-alt`, not FA6's `fa-arrow-up-right-from-square`.
- **Don't edit `blogData.js` legacy posts' inline classes** — `SingleBlog.jsx` strips all `class="…"` attributes and `.prose` styles by tag. New posts can omit classes entirely.
- **`.prose` spacing is specificity-sensitive**: block rhythm comes from `.prose > * + *`. Never add a `.prose p { margin: 0 }`-style rule — it collapses paragraph spacing (this bug happened once already).
- **Palantir's logo is light**: it's special-cased with `darken: true` / `filter: brightness(0)` in Hero/CareerTimeline. Don't remove or it vanishes on the paper background.
- **`font-raleway` maps to Inter** in `tailwind.config.js` — kept only because legacy blog HTML strings reference it. Don't use it in new code.
- `.reveal` fade-in (0.7s) makes automated screenshots catch mid-transition. Force-settle first: `document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'))`.

## Conventions

- Content is data-driven: edit the arrays/data files (`blogData.js`, `toysData.js`, arrays at the top of Portfolio components), not markup, to change content.
- New toy = component in `src/features/Toys/tools/` + entry in `toysData.js`. Use `toykit.jsx` helpers for consistent UI.
- `/themes` (Theme Studio) is an intentional easter egg — keep it.
- Analytics: wrap user-facing interactions with the helpers in `src/utils/analytics.js`; they no-op without gtag.

## Blog voice (when drafting posts)

Direct and declarative — open with a strong statement, no wind-up. Short paragraphs (2–4 sentences), one idea each. Concrete examples from real companies over abstractions; historical analogies welcome. Active voice, contractions, strong verbs; no corporate speak ("leverage", "synergy"), no hedging ("might", "could potentially"). Target a 5–8 minute read. Categories: Technology, FDE, Philosophy, Experience.
