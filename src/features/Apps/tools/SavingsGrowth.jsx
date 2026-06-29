import { useState } from 'react'
import { Field, MoneyInput, Stat } from '../toykit'
import { trackEvent } from '../../../utils/analytics'

/* Compound-interest projection. Monthly compounding with end-of-month
   contributions:

       balance(m) = P(1+r)^m + PMT · ((1+r)^m − 1) / r       (r = annual/12)

   The chart plots the balance year by year against what you actually put in,
   so the widening gap between the two lines is the interest doing the work. */

const money = (n) => (n < 0 ? '−' : '') + '$' + Math.round(Math.abs(n)).toLocaleString('en-US')

const moneyShort = (n) => {
  const a = Math.abs(n)
  if (a >= 1e6) return '$' + (n / 1e6).toFixed(a >= 1e7 ? 0 : 1) + 'M'
  if (a >= 1e3) return '$' + Math.round(n / 1e3) + 'k'
  return '$' + Math.round(n)
}

function GrowthChart({ series }) {
  const W = 640
  const H = 210
  const padX = 16
  const padTop = 30
  const padBottom = 26

  const maxV = Math.max(...series.map((p) => p.total)) || 1
  const yrs = series.length - 1

  const x = (yr) => padX + (yr / (yrs || 1)) * (W - 2 * padX)
  const y = (v) => padTop + (1 - v / maxV) * (H - padTop - padBottom)

  const path = (key) => series.map((p, i) => `${i ? 'L' : 'M'}${x(p.year).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ')
  const totalLine = path('total')
  const totalArea = `${totalLine} L${x(yrs).toFixed(1)},${H - padBottom} L${x(0).toFixed(1)},${H - padBottom} Z`
  const contribLine = path('contrib')

  const end = series[yrs]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Projected balance over time">
      <defs>
        <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={totalArea} fill="url(#growthFill)" />
      <path d={contribLine} fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
      <path d={totalLine} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      <circle cx={x(yrs)} cy={y(end.total)} r="4" fill="var(--gold)" />
      <text x={W - padX} y={y(end.total) - 12} textAnchor="end" className="fill-ink" style={{ fontSize: 14, fontWeight: 600 }}>
        {moneyShort(end.total)}
      </text>

      <text x={padX} y={H - 8} textAnchor="start" className="fill-muted" style={{ fontSize: 12 }}>
        now
      </text>
      <text x={W - padX} y={H - 8} textAnchor="end" className="fill-muted" style={{ fontSize: 12 }}>
        {yrs} yr
      </text>
    </svg>
  )
}

export default function SavingsGrowth() {
  const [start, setStart] = useState(5000)
  const [monthly, setMonthly] = useState(300)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(20)

  const r = rate / 100 / 12
  const balanceAt = (m) => (r === 0 ? start + monthly * m : start * Math.pow(1 + r, m) + monthly * ((Math.pow(1 + r, m) - 1) / r))

  const series = Array.from({ length: years + 1 }, (_, yr) => ({
    year: yr,
    total: balanceAt(yr * 12),
    contrib: start + monthly * yr * 12,
  }))

  const finalBal = series[years].total
  const totalContrib = start + monthly * years * 12
  const interest = finalBal - totalContrib

  const sliderBox = 'rounded-xl border border-line bg-white/70 px-4 py-3.5'
  const slider = 'w-full cursor-pointer accent-clay'

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Starting amount">
          <MoneyInput value={start} dp={0} onValueChange={setStart} />
        </Field>
        <Field label="Monthly contribution">
          <MoneyInput value={monthly} dp={0} onValueChange={setMonthly} />
        </Field>
        <Field label="Annual return" hint={`${rate}%`}>
          <div className={sliderBox}>
            <input
              type="range"
              min={0}
              max={12}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              onMouseUp={() => trackEvent('toy_savings_rate', { rate })}
              className={slider}
              aria-label="Annual return percent"
            />
          </div>
        </Field>
        <Field label="Years" hint={`${years} yr`}>
          <div className={sliderBox}>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className={slider}
              aria-label="Number of years"
            />
          </div>
        </Field>
      </div>

      {/* Projected balance */}
      <div className="rounded-xl border border-line bg-cream/50 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Projected balance in {years} {years === 1 ? 'year' : 'years'}
        </div>
        <div className="mt-1 font-serif text-3xl font-semibold tabular-nums text-ink">{money(finalBal)}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="You put in" value={money(totalContrib)} />
        <Stat label="Interest earned" value={money(interest)} />
      </div>

      {/* Growth chart */}
      <div className="flex flex-col gap-2 rounded-xl border border-line bg-white/40 p-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 rounded-full" style={{ background: 'var(--gold)' }} /> Balance
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0 w-5 border-t-2 border-dashed border-muted" /> Contributions
          </span>
        </div>
        <GrowthChart series={series} />
      </div>
    </div>
  )
}
