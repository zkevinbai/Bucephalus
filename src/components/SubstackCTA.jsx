// FDE Pod (Substack) call-to-action pieces, shared across surfaces.
// FA 5.8.1 has no Substack icon, so the glyph is inlined as an SVG.
// Each surface passes a distinct analytics label so we can compare conversion.
import Container from './Container'
import { trackOutboundClick } from '../utils/analytics'

export const FDE_POD_URL = 'https://fdepod.com'

export function SubstackMark({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

// #4 — end of a blog post, above the prev/next nav. The warmest moment.
export function SubstackPostCTA() {
  return (
    <div className="relative mt-16 overflow-hidden rounded-2xl border border-clay/30 bg-clay/[0.06] p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(50% 60% at 12% 0%, rgb(var(--clay) / 0.10), transparent 70%)' }}
      />
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay text-white shadow-sm">
        <SubstackMark className="h-5 w-5" />
      </span>
      <h2 className="mt-5 font-serif text-2xl font-semibold leading-snug text-ink">
        If you want to hear my thoughts —
      </h2>
      <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
        I write and talk through forward deployed engineering, enterprise software, and geopolitics
        on <span className="font-medium text-clay-deep">FDE Pod</span>. New pieces land there first.
      </p>
      <a
        href={FDE_POD_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(FDE_POD_URL, 'FDE Pod (post)')}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-clay-deep hover:shadow-md"
      >
        Subscribe on Substack <span aria-hidden>↗</span>
      </a>
    </div>
  )
}

// #3 — blog index, between the header and the post list.
export function SubstackBlogBand() {
  return (
    <div className="reveal mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-cream/60 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay text-white">
          <SubstackMark className="h-[1.05rem] w-[1.05rem]" />
        </span>
        <div>
          <p className="font-serif text-lg font-semibold text-ink">New essays and episodes go out on FDE Pod.</p>
          <p className="mt-0.5 text-sm text-muted">My Substack and podcast, exploring Forward Deployed Engineering, AI, enterprise software, startups — and the builders turning technology into real-world outcomes.</p>
        </div>
      </div>
      <a
        href={FDE_POD_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(FDE_POD_URL, 'FDE Pod (blog index)')}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-clay-deep hover:shadow-md sm:self-auto"
      >
        Subscribe <span aria-hidden>↗</span>
      </a>
    </div>
  )
}

// #6 — home page closing band, after Skills and before the footer.
export function SubstackHomeBand() {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <div className="reveal rounded-2xl border border-line bg-cream/50 px-8 py-12 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clay text-white shadow-sm">
            <SubstackMark className="h-[1.35rem] w-[1.35rem]" />
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl font-semibold leading-tight text-ink">
            Here's where I think out loud.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            FDE Pod is my Substack and podcast. It explores Forward Deployed Engineering, AI,
            enterprise software, startups — and the builders turning technology into real-world
            outcomes.
          </p>
          <a
            href={FDE_POD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick(FDE_POD_URL, 'FDE Pod (home)')}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-clay-deep hover:shadow-md"
          >
            Subscribe on Substack <span aria-hidden>↗</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
