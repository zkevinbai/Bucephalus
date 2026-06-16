import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { trackEasterEgg } from '../../utils/analytics'

// A quiet hub for the off-the-main-path corners of the site, reached from the
// footer easter egg. Each card routes onward to its own page.
const corners = [
  {
    to: '/projects',
    event: 'projects',
    emoji: '🛠',
    title: 'The early work',
    blurb: 'Side projects, named after libraries, emperors, and ideas I like.',
  },
  {
    to: '/themes',
    event: 'themes',
    emoji: '🎨',
    title: 'Pick a palette',
    blurb: 'Theme Studio — recolor the whole site and make it your own.',
  },
  {
    to: '/logo-sizer',
    event: 'logo-sizer',
    emoji: '📐',
    title: 'Logo sizer',
    blurb: 'Drag to resize the logo chips from my career timeline.',
  },
]

export default function Curiosities() {
  return (
    <Container size="reading" className="pt-28 pb-16 md:pt-36">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
      >
        <span aria-hidden>←</span> Home
      </Link>

      <header className="reveal mt-8">
        <p className="eyebrow">Curiosities</p>
        <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink md:text-5xl">
          Odds, ends, and experiments.
        </h1>
        <p className="mt-5 text-[1.1rem] leading-relaxed text-muted">
          A few hidden corners of the site — older projects I built for the fun of it, and a studio
          for repainting the whole thing.
        </p>
      </header>

      <div className="reveal mt-12 grid gap-4 sm:grid-cols-2">
        {corners.map(({ to, event, emoji, title, blurb }) => (
          <Link
            key={to}
            to={to}
            onClick={() => trackEasterEgg(event)}
            className="group rounded-2xl border border-line bg-white/60 p-7 transition-colors hover:border-clay/60"
          >
            <span className="text-2xl" aria-hidden>{emoji}</span>
            <h2 className="mt-4 font-serif text-xl font-semibold text-ink group-hover:text-clay-deep">
              {title}
            </h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-soft">{blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-deep">
              Open
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Container>
  )
}
