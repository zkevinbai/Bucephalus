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

      <div className="mt-14 flex flex-col gap-12">
        {groups.map(({ category, items }) => (
          <section key={category} className="reveal">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {category}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((toy) => (
                <Link
                  key={toy.slug}
                  to={`/toys/${toy.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-white/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay/60 hover:shadow-[0_8px_30px_-12px_rgba(27,23,20,0.18)]"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-lg ${toy.accent}`}
                  >
                    <i className={toy.icon} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-serif text-[1.3rem] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-clay-deep">
                    {toy.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {toy.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-deep">
                    Open
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
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
