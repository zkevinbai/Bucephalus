import { useRef, useState } from 'react'
import { Field, TextInput, MoneyInput, SegmentedControl, Stat, Note } from '../toykit'
import { STATES, STATE_CODES, computeTakeHome } from '../data/taxData'
import { trackToyUse } from '../../../utils/analytics'

/* Two linked tools that share one number — your annual gross.
   Top: convert that gross across pay periods (edit any field, the rest follow).
   Bottom: estimate take-home for a state + filing status (2025 rules). */

// Pay periods. `per(h, w)` = how many of this period fit in a year, given
// hours/week (h) and weeks/year (w) — only the hourly/daily rows use them.
const PERIODS = [
  { key: 'annual', label: 'Annual', per: () => 1, dp: 0 },
  { key: 'monthly', label: 'Monthly', per: () => 12, dp: 0 },
  { key: 'semimonthly', label: 'Semi-monthly', per: () => 24, dp: 0 },
  { key: 'biweekly', label: 'Bi-weekly', per: () => 26, dp: 0 },
  { key: 'weekly', label: 'Weekly', per: () => 52, dp: 0 },
  { key: 'daily', label: 'Daily', per: (_h, w) => 5 * w, dp: 2 },
  { key: 'hourly', label: 'Hourly', per: (h, w) => h * w, dp: 2 },
]

const usd = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function CompCalculator() {
  const [annual, setAnnual] = useState(120000)
  const [hours, setHours] = useState(40) // hours / week
  const [weeks, setWeeks] = useState(52) // paid weeks / year

  const [status, setStatus] = useState('single') // 'single' | 'married'
  const [stateCode, setStateCode] = useState('CA')

  // Fire one activation event the first time someone actually edits their pay —
  // continuous keystrokes would flood analytics, so we guard with a ref.
  const engaged = useRef(false)
  const markEngaged = () => {
    if (!engaged.current) {
      engaged.current = true
      trackToyUse('comp', 'edit_pay')
    }
  }

  const num = (s) => {
    const n = parseFloat(String(s).replace(/[$,\s]/g, ''))
    return isFinite(n) ? n : 0
  }

  const take = computeTakeHome(annual, status, stateCode)
  const stateName = STATES[stateCode].name
  const hasStateTax = STATES[stateCode].type !== 'none'

  // Stacked-bar segments: take-home + each tax, as % of gross.
  const segments = [
    { label: 'Take-home', value: take.net, color: 'var(--sage)' },
    { label: 'Federal', value: take.federal, color: 'var(--clay)' },
    { label: 'Social Security', value: take.socialSecurity, color: 'var(--clay-deep)' },
    { label: 'Medicare', value: take.medicare, color: 'var(--gold)' },
    { label: `${stateName} tax`, value: take.state, color: 'var(--ocean)' },
  ].filter((s) => s.value > 0.5)

  const breakdown = [
    { label: 'Federal income tax', value: take.federal },
    { label: 'Social Security', value: take.socialSecurity },
    { label: 'Medicare', value: take.medicare },
    { label: `${stateName} income tax`, value: take.state },
  ]

  return (
    <div className="flex flex-col gap-12">
      {/* ── Pay-period converter ─────────────────────────────────────────── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-xl font-semibold text-ink">Pay period</h2>
          <p className="text-sm text-muted">
            Edit any amount — the rest convert instantly. Hourly and daily use your
            hours and weeks below.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PERIODS.map((p) => {
            const periods = p.per(hours, weeks)
            const derived = periods > 0 ? annual / periods : 0
            return (
              <Field key={p.key} label={p.label}>
                <MoneyInput
                  value={derived}
                  dp={p.dp}
                  onValueChange={(v) => {
                    setAnnual(v * periods)
                    markEngaged()
                  }}
                />
              </Field>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-4">
          <Field label="Hours / week" className="w-32">
            <TextInput
              inputMode="numeric"
              value={hours}
              onChange={(e) => setHours(num(e.target.value))}
              className="tabular-nums"
            />
          </Field>
          <Field label="Weeks / year" hint="paid" className="w-32">
            <TextInput
              inputMode="numeric"
              value={weeks}
              onChange={(e) => setWeeks(num(e.target.value))}
              className="tabular-nums"
            />
          </Field>
        </div>
      </section>

      {/* ── Take-home estimator ──────────────────────────────────────────── */}
      <section className="flex flex-col gap-6 border-t border-line pt-10">
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Estimated take-home
          </h2>
          <p className="text-sm text-muted">
            What lands in your pocket after federal tax, FICA, and state tax on{' '}
            <span className="font-medium text-ink">{usd(annual)}</span> a year.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <Field label="State">
            <select
              value={stateCode}
              onChange={(e) => {
                setStateCode(e.target.value)
                trackToyUse('comp', 'change_state', { state: e.target.value })
              }}
              className="w-56 rounded-xl border border-line bg-white/70 px-4 py-2.5 text-[0.95rem] text-ink transition-colors focus:border-clay focus:outline-none"
            >
              {STATE_CODES.map((c) => (
                <option key={c} value={c}>
                  {STATES[c].name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Filing status">
            <SegmentedControl
              value={status}
              onChange={(v) => {
                setStatus(v)
                trackToyUse('comp', 'change_status', { status: v })
              }}
              options={[
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married (joint)' },
              ]}
            />
          </Field>
        </div>

        {!hasStateTax && (
          <Note tone="ok">{stateName} has no state income tax on wages.</Note>
        )}

        {/* Headline net figures across periods */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Net / year" value={usd(take.net)} />
          <Stat label="Net / month" value={usd(take.net / 12)} />
          <Stat label="Net / paycheck (bi-weekly)" value={usd(take.net / 26)} />
          <Stat label="Effective tax rate" value={`${take.effectiveRate.toFixed(1)}%`} />
        </div>

        {/* Stacked bar: where the gross goes */}
        <div className="flex flex-col gap-3">
          <div className="flex h-10 w-full overflow-hidden rounded-xl border border-line">
            {segments.map((s) => (
              <div
                key={s.label}
                style={{ width: `${(s.value / annual) * 100}%`, background: s.color }}
                title={`${s.label}: ${usd(s.value)}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {segments.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-ink-soft">{s.label}</span>
                <span className="font-medium text-muted">
                  {((s.value / annual) * 100).toFixed(1)}%
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Line-item breakdown */}
        <div className="flex flex-col divide-y divide-line rounded-xl border border-line bg-white/50">
          <Row label="Gross pay" value={usd(annual)} strong />
          {breakdown.map((b) => (
            <Row key={b.label} label={b.label} value={`– ${usd(b.value)}`} muted />
          ))}
          <Row label="Total tax" value={`– ${usd(take.totalTax)}`} />
          <Row label="Take-home pay" value={usd(take.net)} strong accent />
        </div>

        <p className="text-xs leading-relaxed text-muted">
          Estimate only, 2025 rules. Uses standard deductions and the employee
          share of FICA. Doesn’t model 401(k)/HSA contributions, local or city
          taxes (NYC, etc.), credits, or itemized deductions. For graduated states,
          married brackets are approximated by doubling the single thresholds.
        </p>
      </section>
    </div>
  )
}

function Row({ label, value, strong, muted, accent }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5">
      <span className={`text-sm ${strong ? 'font-semibold text-ink' : muted ? 'text-muted' : 'text-ink-soft'}`}>
        {label}
      </span>
      <span
        className={`tabular-nums ${
          accent ? 'font-serif text-lg font-semibold text-clay-deep' : strong ? 'font-semibold text-ink' : 'text-ink-soft'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
