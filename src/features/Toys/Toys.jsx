import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { toysByCategory } from './toysData'

export default function Toys() {
  const groups = toysByCategory()

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

      <div className="mt-12 flex flex-col">
        {groups.map(({ category, items }) => (
          <section
            key={category}
            className="reveal grid gap-4 border-t border-line py-8 last:border-b md:grid-cols-[170px_1fr] md:gap-8"
          >
            {/* Category rail */}
            <div className="flex items-baseline gap-2.5 md:block">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-clay">
                {category}
              </h2>
              <span className="font-serif text-sm italic text-muted md:mt-1 md:block">
                {items.length} {items.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>

            {/* Compact horizontal cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((toy) => (
                <Link
                  key={toy.slug}
                  to={`/toys/${toy.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-line bg-white/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay/60 hover:shadow-[0_8px_30px_-12px_rgba(27,23,20,0.18)]"
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream text-[0.95rem] ${toy.accent}`}
                  >
                    <i className={toy.icon} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <h3 className="font-serif text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-clay-deep">
                        {toy.name}
                      </h3>
                      <span
                        aria-hidden
                        className="text-sm text-clay-deep opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </span>
                    <p className="mt-1 text-[0.84rem] leading-relaxed text-muted">{toy.blurb}</p>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  )
}
