import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { toys } from './toysData'

export default function Toys() {
  return (
    <Container size="page" className="pt-32 pb-8 md:pt-40">
      <header className="reveal max-w-reading">
        <p className="eyebrow">Toys</p>
        <h1 className="mt-4 font-serif text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink md:text-6xl">
          Small things I built for fun.
        </h1>
        <p className="mt-5 text-[1.1rem] leading-relaxed text-muted">
          A workshop shelf of little browser tools and curiosities. Everything runs entirely on
          your device — nothing you type ever leaves the page.
        </p>
      </header>

      <div className="reveal mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {toys.map((toy) => (
          <Link
            key={toy.slug}
            to={`/toys/${toy.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-white/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay/60 hover:shadow-[0_8px_30px_-12px_rgba(27,23,20,0.18)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-base ${toy.accent}`}
              >
                <i className={toy.icon} aria-hidden />
              </span>
              <span className="rounded-full bg-cream px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-muted">
                {toy.category}
              </span>
            </div>
            <h3 className="mt-3.5 font-serif text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-clay-deep">
              {toy.name}
            </h3>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{toy.blurb}</p>
          </Link>
        ))}
      </div>
    </Container>
  )
}
