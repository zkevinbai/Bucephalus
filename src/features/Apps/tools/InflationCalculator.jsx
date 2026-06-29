import { useMemo, useRef, useState } from 'react'
import { Field, MoneyInput, Stat, Note } from '../toykit'
import { trackToyUse } from '../../../utils/analytics'
import {
  CPI,
  MIN_YEAR,
  MAX_YEAR,
  PRELIMINARY_YEAR,
  convert,
  totalInflation,
  annualizedRate,
} from '../data/cpiData'

const money = (n) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: Math.abs(n) < 10000 ? 2 : 0,
  })

const pct = (frac) => {
  const v = frac * 100
  const opts = Math.abs(v) >= 1000 ? { maximumFractionDigits: 0 } : { maximumFractionDigits: 1 }
  return v.toLocaleString('en-US', opts) + '%'
}

const QUICK_YEARS = [1950, 1970, 1980, 1990, 2000, 2010, 2020]

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100)
  const [fromYear, setFromYear] = useState(1990)
  const [toYear, setToYear] = useState(MAX_YEAR)

  // One activation event the first time someone moves a slider or edits the
  // amount — guarded so continuous dragging doesn't flood analytics.
  const engaged = useRef(false)
  const markEngaged = () => {
    if (!engaged.current) {
      engaged.current = true
      trackToyUse('inflation', 'adjust')
    }
  }

  const swapYears = () => {
    setFromYear(toYear)
    setToYear(fromYear)
    trackToyUse('inflation', 'swap')
  }

  const result = convert(amount, fromYear, toYear)
  const change = totalInflation(fromYear, toYear)
  const annual = annualizedRate(fromYear, toYear)
  const rose = change >= 0
  // What a single "from-year" dollar is worth in to-year dollars.
  const dollarNow = convert(1, fromYear, toYear)

  // Equivalent value of `amount` across every year in the range, for the chart.
  const lo = Math.min(fromYear, toYear)
  const hi = Math.max(fromYear, toYear)
  const series = useMemo(() => {
    const pts = []
    for (let y = lo; y <= hi; y++) pts.push({ y, v: convert(amount, fromYear, y) })
    return pts
  }, [amount, fromYear, lo, hi])

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start lg:gap-12">
      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <Field label="Amount">
          <MoneyInput
            value={amount}
            dp={2}
            onValueChange={(v) => {
              setAmount(v)
              markEngaged()
            }}
          />
        </Field>

        <YearSlider
          label="From year"
          value={fromYear}
          onChange={(y) => {
            setFromYear(y)
            markEngaged()
          }}
        />
        <div className="-my-2 flex justify-center">
          <button
            onClick={swapYears}
            title="Swap years"
            aria-label="Swap from and to years"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/60 text-muted transition-colors hover:border-gold/60 hover:text-ink"
          >
            <i className="fas fa-exchange-alt rotate-90" aria-hidden />
          </button>
        </div>
        <YearSlider
          label="To year"
          value={toYear}
          onChange={(y) => {
            setToYear(y)
            markEngaged()
          }}
          hint={toYear === PRELIMINARY_YEAR ? 'preliminary' : ''}
        />

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Jump “from” to
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_YEARS.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setFromYear(y)
                  trackToyUse('inflation', 'quick_year', { year: y })
                }}
                className={`rounded-md border px-2.5 py-1 text-sm font-medium tabular-nums transition-colors ${
                  fromYear === y
                    ? 'border-transparent bg-gold text-white'
                    : 'border-line bg-white/60 text-ink-soft hover:border-gold/60 hover:text-ink'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-7">
        <div className="rounded-2xl border border-line bg-cream/40 px-6 py-7">
          <p className="text-[1.05rem] leading-relaxed text-muted">
            <span className="font-semibold text-ink">{money(amount)}</span> in{' '}
            <span className="font-semibold text-ink tabular-nums">{fromYear}</span> has the same
            buying power as
          </p>
          <p className="mt-2 font-serif text-[2.6rem] font-semibold leading-none tracking-[-0.02em] text-clay-deep">
            {money(result)}
          </p>
          <p className="mt-2 text-[1.05rem] text-muted">
            in <span className="font-semibold text-ink tabular-nums">{toYear}</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label={rose ? 'Prices rose' : 'Prices fell'} value={pct(Math.abs(change))} />
          <Stat label="Per year, avg." value={pct(annual)} />
          <Stat label={`$1 in ${fromYear} is now`} value={money(dollarNow)} />
        </div>

        {fromYear !== toYear && <ValueChart series={series} money={money} />}

        <Note tone="muted">
          Based on CPI-U annual averages (BLS), the standard U.S. inflation gauge.
          {toYear === PRELIMINARY_YEAR
            ? ` ${PRELIMINARY_YEAR} is a preliminary average and may be revised.`
            : ''}{' '}
          A broad market basket — your own basket (rent, tuition, electronics) can differ a lot.
        </Note>
      </div>
    </div>
  )
}

function YearSlider({ label, value, onChange, hint = '' }) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-3">
        <span className="w-14 shrink-0 font-serif text-xl font-semibold tabular-nums text-ink">
          {value}
        </span>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full cursor-pointer accent-gold"
          aria-label={label}
        />
      </div>
    </Field>
  )
}

/* A small SVG line chart of the equivalent value over time, with a soft area
   fill and labelled endpoints. Pure presentation — no axes clutter. */
function ValueChart({ series, money }) {
  const W = 640
  const H = 200
  const padX = 12
  const padTop = 28
  const padBottom = 24

  const xs = series.map((p) => p.y)
  const vs = series.map((p) => p.v)
  const minX = xs[0]
  const maxX = xs[xs.length - 1]
  const minV = Math.min(...vs)
  const maxV = Math.max(...vs)
  const spanV = maxV - minV || 1

  const x = (year) => padX + ((year - minX) / (maxX - minX || 1)) * (W - 2 * padX)
  const y = (val) => padTop + (1 - (val - minV) / spanV) * (H - padTop - padBottom)

  const line = series.map((p, i) => `${i ? 'L' : 'M'}${x(p.y).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(maxX).toFixed(1)},${H - padBottom} L${x(minX).toFixed(1)},${H - padBottom} Z`

  const start = series[0]
  const end = series[series.length - 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Equivalent value over time">
      <defs>
        <linearGradient id="inflationFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#inflationFill)" />
      <path d={line} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {[start, end].map((p, i) => (
        <g key={p.y}>
          <circle cx={x(p.y)} cy={y(p.v)} r="4" fill="var(--clay-deep)" />
          <text
            x={Math.min(Math.max(x(p.y), 34), W - 34)}
            y={y(p.v) - 12}
            textAnchor="middle"
            className="fill-ink"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {money(p.v)}
          </text>
          <text
            x={Math.min(Math.max(x(p.y), 16), W - 16)}
            y={H - 7}
            textAnchor={i === 0 ? 'start' : 'end'}
            className="fill-muted"
            style={{ fontSize: 12 }}
          >
            {p.y}
          </text>
        </g>
      ))}
    </svg>
  )
}
