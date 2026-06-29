import { useEffect, useMemo, useRef, useState } from 'react'
import { Field, CopyButton, Note } from '../toykit'
import { trackEvent } from '../../../utils/analytics'

/* Convert between world currencies at live European Central Bank reference
   rates, fetched from Frankfurter (keyless, CORS-friendly). USD is the base:

       usd    = amount / rate[from]
       result = usd * rate[to]

   The relationship between two currencies is best shown as their rate over
   time, so the chart plots the selected pair across the last six months from
   Frankfurter's time-series endpoint. No backend; graceful fallback on error. */

// Currencies Frankfurter publishes, with display names. We only show the ones
// present in a given response, so this can stay ahead of the API safely.
const CURRENCY_NAMES = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen',
  AUD: 'Australian Dollar', CAD: 'Canadian Dollar', CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan', HKD: 'Hong Kong Dollar', NZD: 'New Zealand Dollar',
  SEK: 'Swedish Krona', KRW: 'South Korean Won', SGD: 'Singapore Dollar',
  NOK: 'Norwegian Krone', MXN: 'Mexican Peso', INR: 'Indian Rupee',
  BRL: 'Brazilian Real', ZAR: 'South African Rand', TRY: 'Turkish Lira',
  DKK: 'Danish Krone', PLN: 'Polish Zloty', THB: 'Thai Baht',
  IDR: 'Indonesian Rupiah', HUF: 'Hungarian Forint', CZK: 'Czech Koruna',
  ILS: 'Israeli Shekel', PHP: 'Philippine Peso', MYR: 'Malaysian Ringgit',
  RON: 'Romanian Leu', BGN: 'Bulgarian Lev', ISK: 'Icelandic Krona',
}

// National symbols. Dollar/krone families get a country prefix so they read
// distinctly; the dropdown still carries the ISO code for full disambiguation.
const CURRENCY_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr',
  CNY: '¥', HKD: 'HK$', NZD: 'NZ$', SEK: 'kr', KRW: '₩', SGD: 'S$', NOK: 'kr',
  MXN: 'Mex$', INR: '₹', BRL: 'R$', ZAR: 'R', TRY: '₺', DKK: 'kr', PLN: 'zł',
  THB: '฿', IDR: 'Rp', HUF: 'Ft', CZK: 'Kč', ILS: '₪', PHP: '₱', MYR: 'RM',
  RON: 'lei', BGN: 'лв', ISK: 'kr',
}
const symOf = (code) => CURRENCY_SYMBOLS[code] || code

// One-tap shortcuts for the most-requested pairs.
const QUICK_PAIRS = [
  ['USD', 'EUR'], ['USD', 'CNY'], ['USD', 'JPY'],
  ['USD', 'GBP'], ['EUR', 'GBP'], ['USD', 'CAD'],
]

// At most two decimals, grouped, trailing zeros dropped.
function fmt(n) {
  if (n === 0) return '0'
  if (!isFinite(n)) return '—'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}

// A finer formatter for chart axis labels, where a rate like 0.88 needs more
// than two figures to be meaningful (0.8762). Up to four significant digits.
const fmtRate = (n) => new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(n)

const toInput = (n) => String(Number(n.toFixed(2)))

const isoDate = (d) => d.toISOString().slice(0, 10)
const monthLabel = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })

// Fetch live USD-based rates once, lazily, on first mount.
function useRates() {
  const [state, setState] = useState({ rates: null, date: '', loading: true, error: '' })
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    fetch('https://api.frankfurter.dev/v1/latest?base=USD')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => setState({ rates: { USD: 1, ...d.rates }, date: d.date, loading: false, error: '' }))
      .catch(() => {
        started.current = false // allow a retry on next mount
        setState({ rates: null, date: '', loading: false, error: 'Could not load live rates. Check your connection and reload.' })
      })
  }, [])

  return state
}

// Fetch the daily rate of `to` per 1 `from` over the last six months, cached per
// pair so flipping back and forth doesn't refetch.
function useSeries(from, to) {
  const [state, setState] = useState({ points: null, loading: true, error: '' })
  const cache = useRef({})

  useEffect(() => {
    if (!from || !to || from === to) {
      setState({ points: [], loading: false, error: '' })
      return
    }
    const key = `${from}-${to}`
    if (cache.current[key]) {
      setState({ points: cache.current[key], loading: false, error: '' })
      return
    }
    const end = new Date()
    const start = new Date()
    start.setMonth(start.getMonth() - 6)
    const url = `https://api.frankfurter.dev/v1/${isoDate(start)}..${isoDate(end)}?base=${from}&symbols=${to}`

    let cancelled = false
    setState({ points: null, loading: true, error: '' })
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        const points = Object.entries(d.rates)
          .map(([date, obj]) => ({ date, value: obj[to] }))
          .filter((p) => isFinite(p.value))
          .sort((a, b) => (a.date < b.date ? -1 : 1))
        cache.current[key] = points
        if (!cancelled) setState({ points, loading: false, error: '' })
      })
      .catch(() => {
        if (!cancelled) setState({ points: null, loading: false, error: 'history unavailable' })
      })
    return () => {
      cancelled = true
    }
  }, [from, to])

  return state
}

/* SVG line chart of the pair's rate over time, with a soft area fill, labelled
   endpoints, and the period's percentage change. Mirrors the Inflation toy. */
function TrendChart({ points, from, to }) {
  const W = 640
  const H = 210
  const padX = 14
  const padTop = 30
  const padBottom = 26

  const vs = points.map((p) => p.value)
  const minV = Math.min(...vs)
  const maxV = Math.max(...vs)
  const span = maxV - minV || maxV || 1
  const n = points.length

  const x = (i) => padX + (i / (n - 1 || 1)) * (W - 2 * padX)
  const y = (v) => padTop + (1 - (v - minV) / span) * (H - padTop - padBottom)

  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ')
  const area = `${line} L${x(n - 1).toFixed(1)},${H - padBottom} L${x(0).toFixed(1)},${H - padBottom} Z`

  const first = points[0]
  const last = points[n - 1]
  const pct = first.value ? (last.value / first.value - 1) * 100 : 0
  const up = pct >= 0

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${from} to ${to} rate, past six months`}>
      <defs>
        <linearGradient id="fxFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#fxFill)" />
      <path d={line} fill="none" stroke="var(--clay-deep)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {[first, last].map((p, i) => (
        <g key={p.date}>
          <circle cx={x(i === 0 ? 0 : n - 1)} cy={y(p.value)} r="4" fill="var(--clay-deep)" />
          <text
            x={Math.min(Math.max(x(i === 0 ? 0 : n - 1), 30), W - 30)}
            y={y(p.value) - 12}
            textAnchor="middle"
            className="fill-ink"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {fmtRate(p.value)}
          </text>
          <text
            x={i === 0 ? padX : W - padX}
            y={H - 8}
            textAnchor={i === 0 ? 'start' : 'end'}
            className="fill-muted"
            style={{ fontSize: 12 }}
          >
            {monthLabel(p.date)}
          </text>
        </g>
      ))}

      <text x={W / 2} y={H - 8} textAnchor="middle" className={up ? 'fill-sage' : 'fill-clay-deep'} style={{ fontSize: 12, fontWeight: 600 }}>
        {up ? '▲' : '▼'} {fmt(Math.abs(pct))}% over 6 months
      </text>
    </svg>
  )
}

export default function CurrencyConverter() {
  const { rates, date, loading, error } = useRates()

  const codes = useMemo(() => {
    if (!rates) return []
    return Object.keys(rates).filter((c) => CURRENCY_NAMES[c]).sort()
  }, [rates])

  const [fromId, setFromId] = useState('USD')
  const [toId, setToId] = useState('EUR')
  const [amount, setAmount] = useState('100')

  // Once rates load, make sure both selections actually exist.
  useEffect(() => {
    if (!codes.length) return
    if (!codes.includes(fromId)) setFromId(codes.includes('USD') ? 'USD' : codes[0])
    if (!codes.includes(toId)) setToId(codes.includes('EUR') ? 'EUR' : codes[1] || codes[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codes.length])

  const ready = !!rates && codes.includes(fromId) && codes.includes(toId)
  const series = useSeries(ready ? fromId : null, ready ? toId : null)

  const convert = (v) => (v / rates[fromId]) * rates[toId]

  const value = parseFloat(amount)
  const valid = isFinite(value)
  const result = ready && valid ? convert(value) : null
  const resultStr = result == null ? '' : fmt(result)
  const unitRate = ready ? convert(1) : null

  const setPair = (a, b) => {
    setFromId(a)
    setToId(b)
    trackEvent('toy_currency_pair', { from: a, to: b })
  }

  const swap = () => {
    setFromId(toId)
    setToId(fromId)
    if (result != null && isFinite(result)) setAmount(toInput(result))
    trackEvent('toy_currency_swap', { from: fromId, to: toId })
  }

  const selectCls =
    'w-full appearance-none rounded-xl border border-line bg-white/70 px-4 py-2.5 text-[0.95rem] text-ink transition-colors focus:border-clay focus:outline-none cursor-pointer'

  const CurSelect = ({ value, onChange, label }) => (
    <div className="relative">
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {codes.map((c) => (
          <option key={c} value={c}>
            {c} {symOf(c)} · {CURRENCY_NAMES[c]}
          </option>
        ))}
      </select>
      <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden />
    </div>
  )

  if (loading) return <Note tone="muted">Loading live exchange rates…</Note>
  if (error) return <Note tone="error">{error}</Note>

  const hasSeries = series.points && series.points.length > 1 && fromId !== toId

  return (
    <div className="flex flex-col gap-6">
      {/* Quick pairs */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_PAIRS.filter(([a, b]) => codes.includes(a) && codes.includes(b)).map(([a, b]) => {
          const active = a === fromId && b === toId
          return (
            <button
              key={`${a}${b}`}
              onClick={() => setPair(a, b)}
              className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium tabular-nums transition-colors ${
                active
                  ? 'border-clay bg-clay text-white'
                  : 'border-line bg-white/60 text-ink-soft hover:border-clay/60 hover:text-clay-deep'
              }`}
            >
              {a} <i className="fas fa-arrow-right text-[0.65rem] opacity-70" aria-hidden /> {b}
            </button>
          )
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        {/* From */}
        <div className="flex flex-col gap-2">
          <Field label="From">
            <div className="flex items-center gap-1.5 rounded-xl border border-line bg-white/70 px-4 py-2.5 transition-colors focus-within:border-clay">
              <span className="font-serif text-2xl text-muted">{symOf(fromId)}</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                spellCheck={false}
                className="w-full min-w-0 border-0 bg-transparent p-0 font-serif text-2xl tabular-nums text-ink placeholder-muted/60 focus:outline-none focus:ring-0"
              />
            </div>
          </Field>
          <CurSelect value={fromId} onChange={setFromId} label="Convert from" />
        </div>

        {/* Swap */}
        <div className="flex justify-center sm:pb-1">
          <button
            onClick={swap}
            aria-label="Swap currencies"
            title="Swap"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70 text-ink-soft transition-colors hover:border-clay hover:text-clay-deep"
          >
            <i className="fas fa-exchange-alt" aria-hidden />
          </button>
        </div>

        {/* To */}
        <div className="flex flex-col gap-2">
          <Field label="To">
            <div className="flex items-center gap-2 rounded-xl border border-line bg-cream/50 px-4 py-2.5">
              <span className="flex flex-1 items-baseline gap-1 truncate font-serif text-2xl tabular-nums">
                {valid ? (
                  <>
                    <span className="text-muted">{symOf(toId)}</span>
                    <span className="text-ink">{resultStr}</span>
                  </>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </span>
              <CopyButton value={valid ? resultStr : ''} label="" className="!px-2 !py-1" />
            </div>
          </Field>
          <CurSelect value={toId} onChange={setToId} label="Convert to" />
        </div>
      </div>

      {!valid && amount.trim() !== '' && <Note tone="error">Enter a number.</Note>}

      {valid && unitRate != null && (
        <p className="text-sm text-muted">
          1 {fromId} = <span className="font-medium text-ink">{fmt(unitRate)}</span> {toId}
        </p>
      )}

      {/* Pair rate over time */}
      {fromId !== toId && (
        <div className="flex flex-col gap-2 rounded-xl border border-line bg-white/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {fromId} → {toId} · past 6 months
          </p>
          {hasSeries ? (
            <TrendChart points={series.points} from={fromId} to={toId} />
          ) : (
            <div className="flex h-[160px] items-center justify-center">
              <Note tone="muted">{series.error ? 'History unavailable for this pair.' : 'Loading 6-month trend…'}</Note>
            </div>
          )}
        </div>
      )}

      {date && (
        <p className="text-xs text-muted">
          Rates from the European Central Bank via{' '}
          <a href="https://frankfurter.dev" target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-2 hover:text-clay-deep">
            Frankfurter
          </a>
          , updated {date}. For reference only.
        </p>
      )}
    </div>
  )
}
