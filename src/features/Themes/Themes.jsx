import Container from '../../components/Container'
import { themes } from './themePresets'
import { useSeo } from '../../utils/seo'

const serif = "'Fraunces', Georgia, serif"

/** A small swatch chip with its hex underneath. */
function Swatch({ color, label, border }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="h-7 w-7 rounded-md"
        style={{ background: color, border: `1px solid ${border}` }}
      />
      <span className="font-mono text-[0.6rem] text-muted">{label}</span>
    </div>
  )
}

/** A self-contained mini-homepage rendered entirely from a theme's tokens. */
function ThemePostcard({ t }) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ background: t.paper, color: t.ink, border: `1px solid ${t.line}` }}
    >
      {/* top bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid ${t.line}` }}
      >
        <span style={{ fontFamily: serif, fontWeight: 600, fontSize: '0.95rem' }}>Kevin Bai</span>
        <div className="flex gap-3 text-[0.72rem]" style={{ color: t.muted }}>
          <span>Work</span>
          <span>Writing</span>
          <span style={{ color: t.accent, fontWeight: 600 }}>Toys</span>
        </div>
      </div>

      {/* hero */}
      <div className="px-5 pb-5 pt-6">
        <p
          style={{
            color: t.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontSize: '0.6rem',
            fontWeight: 700,
          }}
        >
          Founding Forward Deployed Engineer · Rippling
        </p>
        <h3
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: '1.7rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginTop: '0.6rem',
          }}
        >
          Hello, I’m Kevin.
        </h3>
        <p
          style={{ color: t.muted, fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.6rem' }}
        >
          I know three things: Forward Deployed Engineering, solving enterprise problems, and
          international relations.
        </p>

        <div className="mt-4 flex gap-2">
          <span
            className="rounded-lg px-3 py-1.5 text-[0.72rem] font-semibold"
            style={{ background: t.accent, color: t.onAccent }}
          >
            LinkedIn
          </span>
          <span
            className="rounded-lg px-3 py-1.5 text-[0.72rem] font-semibold"
            style={{ border: `1px solid ${t.line}`, color: t.inkSoft }}
          >
            GitHub
          </span>
        </div>
      </div>

      {/* a content card */}
      <div className="px-5 pb-5">
        <div
          className="rounded-lg p-4"
          style={{ background: t.cream, border: `1px solid ${t.line}` }}
        >
          <span
            className="rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide"
            style={{ background: t.cream2, color: t.accentDeep }}
          >
            Essay
          </span>
          <h4
            style={{
              fontFamily: serif,
              fontWeight: 600,
              fontSize: '1.05rem',
              marginTop: '0.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            The Flat Title
          </h4>
          <p style={{ color: t.inkSoft, fontSize: '0.78rem', lineHeight: 1.55, marginTop: '0.35rem' }}>
            Why “Member of Technical Staff” works — flat titles, real ownership.
          </p>
          <span
            className="mt-2 inline-block text-[0.74rem] font-semibold"
            style={{ color: t.accentDeep }}
          >
            Read →
          </span>
        </div>
      </div>
    </div>
  )
}

function ThemeCard({ t }) {
  const swatches = [
    { color: t.paper, label: t.paper },
    { color: t.ink, label: t.ink },
    { color: t.accent, label: t.accent },
    { color: t.accentDeep, label: t.accentDeep },
    { color: t.secondary, label: t.secondary },
  ]
  return (
    <section className="reveal flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-[1.35rem] font-semibold tracking-[-0.01em] text-ink">
            {t.name}
          </h2>
          {t.dark && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-paper">
              Dark
            </span>
          )}
        </div>
        <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{t.vibe}</p>
      </div>

      <ThemePostcard t={t} />

      <div className="flex flex-wrap gap-3">
        {swatches.map((s, i) => (
          <Swatch key={i} color={s.color} label={s.label} border={t.line} />
        ))}
      </div>
    </section>
  )
}

export default function Themes() {
  useSeo({
    title: 'Theme Studio — Kevin Bai',
    description: 'Preview the color palettes behind zkevinbai.com.',
    path: '/themes',
    robots: 'noindex, follow',
  })

  return (
    <Container size="page" className="pt-32 pb-8 md:pt-40">
      <header className="reveal max-w-reading">
        <p className="eyebrow">Theme studio</p>
        <h1 className="mt-4 font-serif text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink md:text-6xl">
          Pick a palette.
        </h1>
        <p className="mt-5 text-[1.1rem] leading-relaxed text-muted">
          You found the theme studio — the palettes I auditioned for this site, each rendered as a
          live mini-homepage. Clay won the day, and Midnight Teal became dark mode. Try the moon in
          the header.
        </p>
      </header>

      <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {themes.map((t) => (
          <ThemeCard key={t.id} t={t} />
        ))}
      </div>
    </Container>
  )
}
