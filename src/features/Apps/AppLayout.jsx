import { Link } from 'react-router-dom'
import Container from '../../components/Container'

/** Shared chrome for an individual toy: back link, serif title, blurb, body.
    Apps get the full page width on desktop unless they opt out with `narrow`. */
export default function AppLayout({ toy, children }) {
  return (
    <Container size={toy.narrow ? 'reading' : 'page'} className="pt-28 pb-8 md:pt-36">
      <Link
        to="/apps"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
      >
        <span aria-hidden>←</span> Apps
      </Link>

      <header className="mt-8 border-b border-line pb-8">
        <p className="eyebrow">{toy.category}</p>
        <h1 className="mt-3 font-serif text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.7rem]">
          {toy.name}
        </h1>
        <p className="mt-3 max-w-reading text-[1.05rem] leading-relaxed text-muted">{toy.blurb}</p>
      </header>

      <div className="mt-10">{children}</div>
    </Container>
  )
}
