import { forwardRef, useLayoutEffect, useRef, useState } from 'react'

/* Small shared building blocks so each toy stays on-brand and uncluttered.
   Everything uses the v2 paper/clay/serif tokens. */

export function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {label}
          </span>
          {hint && <span className="text-xs font-light text-muted">{hint}</span>}
        </span>
      )}
      {children}
    </label>
  )
}

const fieldBase =
  'w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 text-[0.95rem] text-ink placeholder-muted/60 transition-colors focus:border-clay focus:outline-none'

export function TextArea({ className = '', mono = true, rows = 8, ...props }) {
  return (
    <textarea
      rows={rows}
      spellCheck={false}
      className={`${fieldBase} resize-y leading-relaxed ${
        mono ? 'font-mono text-[0.875rem]' : ''
      } ${className}`}
      {...props}
    />
  )
}

export const TextInput = forwardRef(function TextInput(
  { className = '', mono = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`${fieldBase} ${mono ? 'font-mono text-[0.875rem]' : ''} ${className}`}
      {...props}
    />
  )
})

export function Btn({ variant = 'solid', className = '', ...props }) {
  const styles = {
    solid:
      'bg-clay text-white hover:bg-clay-deep border border-transparent',
    ghost:
      'bg-white/60 text-ink-soft border border-line hover:border-clay/60 hover:text-clay-deep',
  }
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export function CopyButton({ value, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <Btn variant="ghost" onClick={onCopy} disabled={!value} className={className}>
      <i className={copied ? 'fas fa-check' : 'far fa-copy'} aria-hidden />
      {copied ? 'Copied' : label}
    </Btn>
  )
}

/** A read-only output region styled to match the inputs. */
export function Output({ value, mono = true, className = '', empty = 'Output appears here.' }) {
  return (
    <pre
      className={`min-h-[3rem] w-full overflow-auto whitespace-pre-wrap break-words rounded-xl border border-line bg-cream/50 px-4 py-3 text-[0.875rem] leading-relaxed text-ink ${
        mono ? 'font-mono' : 'font-sans'
      } ${className}`}
    >
      {value || <span className="text-muted">{empty}</span>}
    </pre>
  )
}

/** A labelled stat tile (word counter et al). Tile in a grid on small screens;
    a compact label-left / value-right row when stacked in a desktop side rail. */
export function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-white/60 px-4 py-3 text-center lg:flex lg:flex-row-reverse lg:items-baseline lg:justify-between lg:gap-3 lg:py-2.5 lg:text-left">
      <div className="font-serif text-2xl font-semibold tabular-nums text-ink lg:text-xl">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted lg:mt-0">{label}</div>
    </div>
  )
}

/** Toggle pill group for small mode switches. */
export function SegmentedControl({ options, value, onChange, className = '' }) {
  return (
    <div className={`inline-flex flex-wrap gap-1 rounded-lg border border-line bg-white/60 p-1 ${className}`}>
      {options.map((opt) => {
        const v = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        const active = v === value
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-clay text-white' : 'text-ink-soft hover:text-clay-deep'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

/** Inline error / status note. */
export function Note({ tone = 'error', children }) {
  const tones = {
    error: 'text-clay-deep',
    ok: 'text-sage',
    muted: 'text-muted',
  }
  if (!children) return null
  return <p className={`text-sm font-medium ${tones[tone]}`}>{children}</p>
}

/* ── MoneyInput ──────────────────────────────────────────────────────────────
   A currency input that shows thousands separators as you type, keeps the caret
   where it belongs, and reports the parsed number. While focused it owns its
   text; when blurred it reflects the derived `value` prop. */

// A number → a plain numeric string (no commas), `dp` decimals, trailing zeros dropped.
const numToStr = (n, dp) => {
  if (!isFinite(n)) return ''
  if (dp === 0) return String(Math.round(n))
  return String(Number(n.toFixed(dp)))
}

// Keep only digits and a single decimal point, capped at `dp` decimals.
const cleanNumeric = (str, dp) => {
  let s = String(str).replace(/[^0-9.]/g, '')
  const dot = s.indexOf('.')
  if (dot === -1) return s
  if (dp === 0) return s.slice(0, dot)
  const intPart = s.slice(0, dot)
  const decPart = s.slice(dot + 1).replace(/\./g, '').slice(0, dp)
  return `${intPart}.${decPart}`
}

// Add thousands separators to a cleaned numeric string, preserving any decimals.
const withCommas = (s) => {
  if (s === '' || s === '.') return s
  const [intPart, ...rest] = s.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return s.includes('.') ? `${grouped}.${rest.join('')}` : grouped
}

const countDigits = (s, end) => {
  let n = 0
  for (let i = 0; i < end; i++) if (s[i] >= '0' && s[i] <= '9') n++
  return n
}

// Index in `s` just after the `count`-th digit (for caret restoration).
const indexAfterDigit = (s, count) => {
  if (count === 0) {
    let i = 0
    while (i < s.length && !(s[i] >= '0' && s[i] <= '9')) i++
    return i
  }
  let seen = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] >= '0' && s[i] <= '9' && ++seen === count) return i + 1
  }
  return s.length
}

export function MoneyInput({ value, dp = 0, onValueChange, className = '' }) {
  const ref = useRef(null)
  const caret = useRef(null)
  const [focused, setFocused] = useState(false)
  const [draft, setDraft] = useState('')

  useLayoutEffect(() => {
    if (caret.current != null && ref.current) {
      ref.current.setSelectionRange(caret.current, caret.current)
      caret.current = null
    }
  })

  const display = focused ? draft : withCommas(numToStr(value, dp))

  const handleChange = (e) => {
    const el = e.target
    const digitsBefore = countDigits(el.value, el.selectionStart ?? el.value.length)
    const cleaned = cleanNumeric(el.value, dp)
    const formatted = withCommas(cleaned)
    caret.current = indexAfterDigit(formatted, digitsBefore)
    setDraft(formatted)
    onValueChange(cleaned === '' || cleaned === '.' ? 0 : parseFloat(cleaned))
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">$</span>
      <TextInput
        ref={ref}
        inputMode="decimal"
        value={display}
        onChange={handleChange}
        onFocus={() => {
          setDraft(withCommas(numToStr(value, dp)))
          setFocused(true)
        }}
        onBlur={() => setFocused(false)}
        className={`!pl-7 tabular-nums ${className}`}
      />
    </div>
  )
}
