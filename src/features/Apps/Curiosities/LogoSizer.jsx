// A little interactive toy, reachable from /curiosities: drag to resize the inset
// inside the logo chips used in the career timeline and watch the marks resize.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../../components/Container'
import { useSeo } from '../../../utils/seo'
import AnthropicLogo from '../../../assets/companies/Anthropic-logo.svg'
import RipplingLogo from '../../../assets/companies/Rippling-logo.png'
import GlobalityLogo from '../../../assets/companies/Globality-logo.png'
import UNLogo from '../../../assets/companies/UN-logo.svg'
import PalantirLogo from '../../../assets/companies/palantir-logo.svg'

const logos = [
  { name: 'Anthropic', src: AnthropicLogo, bg: '#ffffff' },
  { name: 'Rippling', src: RipplingLogo, bg: '#fdb71c' },
  { name: 'Globality', src: GlobalityLogo, bg: '#1e335c' },
  { name: 'United Nations', src: UNLogo, bg: '#009edb' },
  { name: 'Palantir', src: PalantirLogo, bg: '#14110e' },
]

function Chip({ src, bg, pad, size }) {
  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-2xl border border-line shadow-sm"
      style={{ width: size, height: size, backgroundColor: bg, padding: (pad / 56) * size }}
    >
      <img src={src} alt="" className="h-full w-full object-contain" />
    </div>
  )
}

export default function LogoSizer() {
  const [pad, setPad] = useState(8)

  useSeo({
    title: 'Logo Sizer — Kevin Bai',
    description: 'An interactive toy for sizing the logo chips in the career timeline.',
    path: '/logo-sizer',
    robots: 'noindex, follow',
  })

  return (
    <Container size="reading" className="pt-28 pb-20 md:pt-36">
      <Link
        to="/curiosities"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
      >
        <span aria-hidden>←</span> Curiosities
      </Link>

      <header className="reveal mt-8">
        <p className="eyebrow">Logo sizer</p>
        <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink md:text-5xl">
          How big should a logo be?
        </h1>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
          A tiny tool I built to tune the logo chips in my career timeline. Drag the slider to set the
          inset inside each 56px chip — more inset, smaller mark.
        </p>
      </header>

      <div className="reveal mt-10 flex items-center gap-4">
        <label className="text-sm font-semibold text-ink">Inset</label>
        <input
          type="range"
          min="0"
          max="22"
          step="1"
          value={pad}
          onChange={(e) => setPad(+e.target.value)}
          className="flex-1"
        />
        <span className="w-14 text-right font-mono text-sm text-ink-soft">{pad}px</span>
      </div>

      <p className="mt-12 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Actual size</p>
      <div className="mt-4 flex flex-wrap items-start gap-7">
        {logos.map((l) => (
          <div key={l.name} className="flex flex-col items-center gap-2">
            <Chip src={l.src} bg={l.bg} pad={pad} size={56} />
            <span className="text-xs text-muted">{l.name}</span>
          </div>
        ))}
      </div>

      <p className="mt-12 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Zoomed 2.5×</p>
      <div className="mt-4 flex flex-wrap items-start gap-8">
        {logos.map((l) => (
          <div key={l.name} className="flex flex-col items-center gap-2">
            <Chip src={l.src} bg={l.bg} pad={pad} size={140} />
            <span className="text-xs text-muted">{l.name}</span>
          </div>
        ))}
      </div>
    </Container>
  )
}
