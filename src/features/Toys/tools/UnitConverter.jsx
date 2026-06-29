import { useEffect, useState } from 'react'
import { Field, CopyButton, Note } from '../toykit'
import { trackEvent } from '../../../utils/analytics'

/* A general unit converter. Each category defines units as a pair of functions
   that map a value to/from the category's base unit, so linear factors and
   non-linear scales (temperature, fuel economy) share one conversion path:

       base   = from.to(input)
       result = to.from(base)

   Currency lives in its own toy (CurrencyConverter) since it needs live rates. */

// A linearly-scaled unit: `factor` base units per 1 of this unit.
const lin = (factor) => ({ to: (v) => v * factor, from: (v) => v / factor })

const CATEGORIES = [
  {
    key: 'length',
    name: 'Length',
    icon: 'fas fa-ruler-horizontal',
    default: ['m', 'ft'],
    units: [
      { id: 'mm', label: 'Millimeter', ...lin(0.001) },
      { id: 'cm', label: 'Centimeter', ...lin(0.01) },
      { id: 'm', label: 'Meter', ...lin(1) },
      { id: 'km', label: 'Kilometer', ...lin(1000) },
      { id: 'in', label: 'Inch', ...lin(0.0254) },
      { id: 'ft', label: 'Foot', ...lin(0.3048) },
      { id: 'yd', label: 'Yard', ...lin(0.9144) },
      { id: 'mi', label: 'Mile', ...lin(1609.344) },
      { id: 'nmi', label: 'Nautical mile', ...lin(1852) },
    ],
  },
  {
    key: 'mass',
    name: 'Mass',
    icon: 'fas fa-weight-hanging',
    default: ['kg', 'lb'],
    units: [
      { id: 'mg', label: 'Milligram', ...lin(1e-6) },
      { id: 'g', label: 'Gram', ...lin(0.001) },
      { id: 'kg', label: 'Kilogram', ...lin(1) },
      { id: 't', label: 'Tonne (metric)', ...lin(1000) },
      { id: 'oz', label: 'Ounce', ...lin(0.0283495231) },
      { id: 'lb', label: 'Pound', ...lin(0.45359237) },
      { id: 'st', label: 'Stone', ...lin(6.35029318) },
    ],
  },
  {
    key: 'temperature',
    name: 'Temperature',
    icon: 'fas fa-temperature-high',
    default: ['c', 'f'],
    // base = degrees Celsius
    units: [
      { id: 'c', label: 'Celsius', to: (v) => v, from: (c) => c },
      { id: 'f', label: 'Fahrenheit', to: (v) => ((v - 32) * 5) / 9, from: (c) => (c * 9) / 5 + 32 },
      { id: 'k', label: 'Kelvin', to: (v) => v - 273.15, from: (c) => c + 273.15 },
    ],
  },
  {
    key: 'area',
    name: 'Area',
    icon: 'fas fa-vector-square',
    default: ['m2', 'ft2'],
    units: [
      { id: 'mm2', label: 'Square millimeter', ...lin(1e-6) },
      { id: 'cm2', label: 'Square centimeter', ...lin(1e-4) },
      { id: 'm2', label: 'Square meter', ...lin(1) },
      { id: 'km2', label: 'Square kilometer', ...lin(1e6) },
      { id: 'in2', label: 'Square inch', ...lin(0.00064516) },
      { id: 'ft2', label: 'Square foot', ...lin(0.09290304) },
      { id: 'yd2', label: 'Square yard', ...lin(0.83612736) },
      { id: 'acre', label: 'Acre', ...lin(4046.8564224) },
      { id: 'ha', label: 'Hectare', ...lin(10000) },
      { id: 'mi2', label: 'Square mile', ...lin(2589988.110336) },
    ],
  },
  {
    key: 'volume',
    name: 'Volume',
    icon: 'fas fa-flask',
    default: ['l', 'galUS'],
    units: [
      { id: 'ml', label: 'Milliliter', ...lin(0.001) },
      { id: 'l', label: 'Liter', ...lin(1) },
      { id: 'm3', label: 'Cubic meter', ...lin(1000) },
      { id: 'tspUS', label: 'Teaspoon (US)', ...lin(0.00492892159) },
      { id: 'tbspUS', label: 'Tablespoon (US)', ...lin(0.0147867648) },
      { id: 'flozUS', label: 'Fluid ounce (US)', ...lin(0.0295735296) },
      { id: 'cupUS', label: 'Cup (US)', ...lin(0.2365882365) },
      { id: 'ptUS', label: 'Pint (US)', ...lin(0.473176473) },
      { id: 'qtUS', label: 'Quart (US)', ...lin(0.946352946) },
      { id: 'galUS', label: 'Gallon (US)', ...lin(3.785411784) },
      { id: 'flozImp', label: 'Fluid ounce (Imp)', ...lin(0.0284130625) },
      { id: 'ptImp', label: 'Pint (Imp)', ...lin(0.56826125) },
      { id: 'galImp', label: 'Gallon (Imp)', ...lin(4.54609) },
    ],
  },
  {
    key: 'speed',
    name: 'Speed',
    icon: 'fas fa-tachometer-alt',
    default: ['kmh', 'mph'],
    units: [
      { id: 'ms', label: 'Meter / second', ...lin(1) },
      { id: 'kmh', label: 'Kilometer / hour', ...lin(0.277777778) },
      { id: 'mph', label: 'Mile / hour', ...lin(0.44704) },
      { id: 'kn', label: 'Knot', ...lin(0.514444444) },
      { id: 'fts', label: 'Foot / second', ...lin(0.3048) },
    ],
  },
  {
    key: 'time',
    name: 'Time',
    icon: 'fas fa-clock',
    default: ['hr', 'min'],
    units: [
      { id: 'ms', label: 'Millisecond', ...lin(0.001) },
      { id: 's', label: 'Second', ...lin(1) },
      { id: 'min', label: 'Minute', ...lin(60) },
      { id: 'hr', label: 'Hour', ...lin(3600) },
      { id: 'day', label: 'Day', ...lin(86400) },
      { id: 'wk', label: 'Week', ...lin(604800) },
      { id: 'mo', label: 'Month (avg)', ...lin(2629800) },
      { id: 'yr', label: 'Year', ...lin(31557600) },
    ],
  },
  {
    key: 'storage',
    name: 'Data storage',
    icon: 'fas fa-database',
    default: ['MB', 'MiB'],
    units: [
      { id: 'bit', label: 'Bit', ...lin(0.125) },
      { id: 'B', label: 'Byte', ...lin(1) },
      { id: 'KB', label: 'Kilobyte (1000)', ...lin(1e3) },
      { id: 'MB', label: 'Megabyte (1000)', ...lin(1e6) },
      { id: 'GB', label: 'Gigabyte (1000)', ...lin(1e9) },
      { id: 'TB', label: 'Terabyte (1000)', ...lin(1e12) },
      { id: 'PB', label: 'Petabyte (1000)', ...lin(1e15) },
      { id: 'KiB', label: 'Kibibyte (1024)', ...lin(1024) },
      { id: 'MiB', label: 'Mebibyte (1024)', ...lin(1048576) },
      { id: 'GiB', label: 'Gibibyte (1024)', ...lin(1073741824) },
      { id: 'TiB', label: 'Tebibyte (1024)', ...lin(1099511627776) },
    ],
  },
  {
    key: 'datarate',
    name: 'Data rate',
    icon: 'fas fa-network-wired',
    default: ['Mbps', 'MBps'],
    // base = bit / second
    units: [
      { id: 'bps', label: 'Bit / second', ...lin(1) },
      { id: 'Kbps', label: 'Kilobit / second', ...lin(1e3) },
      { id: 'Mbps', label: 'Megabit / second', ...lin(1e6) },
      { id: 'Gbps', label: 'Gigabit / second', ...lin(1e9) },
      { id: 'MBps', label: 'Megabyte / second', ...lin(8e6) },
    ],
  },
  {
    key: 'fuel',
    name: 'Fuel economy',
    icon: 'fas fa-gas-pump',
    default: ['mpgUS', 'l100'],
    // base = liters / 100 km. mpg and km/L invert through the base.
    units: [
      { id: 'l100', label: 'L / 100 km', to: (v) => v, from: (b) => b },
      { id: 'kml', label: 'Kilometer / liter', to: (v) => 100 / v, from: (b) => 100 / b },
      { id: 'mpgUS', label: 'Miles / gallon (US)', to: (v) => 235.214583 / v, from: (b) => 235.214583 / b },
      { id: 'mpgImp', label: 'Miles / gallon (Imp)', to: (v) => 282.480936 / v, from: (b) => 282.480936 / b },
    ],
  },
  {
    key: 'energy',
    name: 'Energy',
    icon: 'fas fa-bolt',
    default: ['kWh', 'kcal'],
    units: [
      { id: 'J', label: 'Joule', ...lin(1) },
      { id: 'kJ', label: 'Kilojoule', ...lin(1000) },
      { id: 'cal', label: 'Calorie', ...lin(4.184) },
      { id: 'kcal', label: 'Kilocalorie', ...lin(4184) },
      { id: 'Wh', label: 'Watt-hour', ...lin(3600) },
      { id: 'kWh', label: 'Kilowatt-hour', ...lin(3.6e6) },
      { id: 'BTU', label: 'British thermal unit', ...lin(1055.05585) },
    ],
  },
  {
    key: 'power',
    name: 'Power',
    icon: 'fas fa-plug',
    default: ['kW', 'hp'],
    units: [
      { id: 'W', label: 'Watt', ...lin(1) },
      { id: 'kW', label: 'Kilowatt', ...lin(1000) },
      { id: 'MW', label: 'Megawatt', ...lin(1e6) },
      { id: 'hp', label: 'Horsepower (mech)', ...lin(745.699872) },
    ],
  },
  {
    key: 'pressure',
    name: 'Pressure',
    icon: 'fas fa-compress-arrows-alt',
    default: ['bar', 'psi'],
    units: [
      { id: 'Pa', label: 'Pascal', ...lin(1) },
      { id: 'kPa', label: 'Kilopascal', ...lin(1000) },
      { id: 'bar', label: 'Bar', ...lin(100000) },
      { id: 'atm', label: 'Atmosphere', ...lin(101325) },
      { id: 'psi', label: 'Pound / inch²', ...lin(6894.75729) },
      { id: 'mmHg', label: 'Millimeter of mercury', ...lin(133.322387) },
      { id: 'torr', label: 'Torr', ...lin(133.322368) },
    ],
  },
  {
    key: 'frequency',
    name: 'Frequency',
    icon: 'fas fa-wave-square',
    default: ['MHz', 'GHz'],
    units: [
      { id: 'Hz', label: 'Hertz', ...lin(1) },
      { id: 'kHz', label: 'Kilohertz', ...lin(1e3) },
      { id: 'MHz', label: 'Megahertz', ...lin(1e6) },
      { id: 'GHz', label: 'Gigahertz', ...lin(1e9) },
    ],
  },
  {
    key: 'angle',
    name: 'Angle',
    icon: 'fas fa-drafting-compass',
    default: ['deg', 'rad'],
    units: [
      { id: 'deg', label: 'Degree', ...lin(1) },
      { id: 'rad', label: 'Radian', ...lin(57.2957795) },
      { id: 'grad', label: 'Gradian', ...lin(0.9) },
    ],
  },
  {
    key: 'force',
    name: 'Force',
    icon: 'fas fa-hand-rock',
    default: ['N', 'lbf'],
    units: [
      { id: 'N', label: 'Newton', ...lin(1) },
      { id: 'kN', label: 'Kilonewton', ...lin(1000) },
      { id: 'lbf', label: 'Pound-force', ...lin(4.4482216) },
      { id: 'dyn', label: 'Dyne', ...lin(1e-5) },
    ],
  },
]

// Display a result with at most two decimals, grouped, trailing zeros dropped:
// 0.9999999999999999 → "1", 3.2808399 → "3.28", 1234567.8 → "1,234,567.8".
function fmt(n) {
  if (n === 0) return '0'
  if (!isFinite(n)) return '—'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}

// Same rounding, but as a plain (comma-free) string for putting back in the input.
const toInput = (n) => String(Number(n.toFixed(2)))

export default function UnitConverter() {
  const [catKey, setCatKey] = useState('length')
  const cat = CATEGORIES.find((c) => c.key === catKey)
  const units = cat.units

  const [fromId, setFromId] = useState(cat.default[0])
  const [toId, setToId] = useState(cat.default[1])
  const [amount, setAmount] = useState('1')

  // Keep the selected units valid for the active category.
  useEffect(() => {
    const has = (id) => units.some((u) => u.id === id)
    if (!has(fromId)) setFromId(cat.default[0])
    if (!has(toId)) setToId(cat.default[1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catKey])

  const fromU = units.find((u) => u.id === fromId)
  const toU = units.find((u) => u.id === toId)

  const value = parseFloat(amount)
  const valid = isFinite(value)
  const result = valid && fromU && toU ? toU.from(fromU.to(value)) : null
  const resultStr = result == null ? '' : fmt(result)

  // A one-line "what one unit is worth" rate.
  const unitRate = fromU && toU ? toU.from(fromU.to(1)) : null

  const pickCategory = (key) => {
    const next = CATEGORIES.find((c) => c.key === key)
    setCatKey(key)
    setFromId(next.default[0])
    setToId(next.default[1])
    trackEvent('toy_convert_category', { category: key })
  }

  const swap = () => {
    setFromId(toId)
    setToId(fromId)
    if (result != null && isFinite(result)) setAmount(toInput(result))
    trackEvent('toy_convert_swap', { category: catKey })
  }

  const selectCls =
    'w-full appearance-none rounded-xl border border-line bg-white/70 px-4 py-2.5 text-[0.95rem] text-ink transition-colors focus:border-clay focus:outline-none cursor-pointer'

  const UnitSelect = ({ value, onChange, label }) => (
    <div className="relative">
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {units.map((u) => (
          <option key={u.id} value={u.id}>
            {u.label}
          </option>
        ))}
      </select>
      <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden />
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Category picker */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => {
          const active = c.key === catKey
          return (
            <button
              key={c.key}
              onClick={() => pickCategory(c.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? 'border-clay bg-clay text-white'
                  : 'border-line bg-white/60 text-ink-soft hover:border-clay/60 hover:text-clay-deep'
              }`}
            >
              <i className={`${c.icon} text-xs`} aria-hidden />
              {c.name}
            </button>
          )
        })}
      </div>

      {fromU && toU && (
        <>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            {/* From */}
            <div className="flex flex-col gap-2">
              <Field label="From">
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  spellCheck={false}
                  className="w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 font-serif text-2xl tabular-nums text-ink transition-colors focus:border-clay focus:outline-none"
                />
              </Field>
              <UnitSelect value={fromId} onChange={setFromId} label="Convert from" />
            </div>

            {/* Swap */}
            <div className="flex justify-center sm:pb-1">
              <button
                onClick={swap}
                aria-label="Swap units"
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
                  <span className="flex-1 truncate font-serif text-2xl tabular-nums text-ink">
                    {valid ? resultStr : <span className="text-muted">—</span>}
                  </span>
                  <CopyButton value={valid ? resultStr : ''} label="" className="!px-2 !py-1" />
                </div>
              </Field>
              <UnitSelect value={toId} onChange={setToId} label="Convert to" />
            </div>
          </div>

          {!valid && amount.trim() !== '' && <Note tone="error">Enter a number.</Note>}

          {valid && unitRate != null && (
            <p className="text-sm text-muted">
              1 {fromU.label} = <span className="font-medium text-ink">{fmt(unitRate)}</span> {toU.label}
            </p>
          )}
        </>
      )}
    </div>
  )
}
