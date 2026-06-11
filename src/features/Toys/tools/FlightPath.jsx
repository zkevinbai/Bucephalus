import { useEffect, useMemo, useRef, useState } from 'react'
import { Btn, Field, Note } from '../toykit'
import { trackToyUse } from '../../../utils/analytics'
import { WORLD_PATH, WORLD_W, WORLD_H } from '../data/worldMap'

// Curated airports/cities: label → IANA zone + geographic coordinates.
const CITIES = [
  { city: 'San Francisco', tz: 'America/Los_Angeles', lat: 37.62, lon: -122.38 },
  { city: 'Los Angeles', tz: 'America/Los_Angeles', lat: 33.94, lon: -118.41 },
  { city: 'Denver', tz: 'America/Denver', lat: 39.86, lon: -104.67 },
  { city: 'Chicago', tz: 'America/Chicago', lat: 41.98, lon: -87.9 },
  { city: 'New York', tz: 'America/New_York', lat: 40.64, lon: -73.78 },
  { city: 'Toronto', tz: 'America/Toronto', lat: 43.68, lon: -79.63 },
  { city: 'Mexico City', tz: 'America/Mexico_City', lat: 19.44, lon: -99.07 },
  { city: 'Bogotá', tz: 'America/Bogota', lat: 4.7, lon: -74.15 },
  { city: 'São Paulo', tz: 'America/Sao_Paulo', lat: -23.43, lon: -46.47 },
  { city: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires', lat: -34.82, lon: -58.54 },
  { city: 'London', tz: 'Europe/London', lat: 51.47, lon: -0.45 },
  { city: 'Lisbon', tz: 'Europe/Lisbon', lat: 38.77, lon: -9.13 },
  { city: 'Paris', tz: 'Europe/Paris', lat: 49.01, lon: 2.55 },
  { city: 'Berlin', tz: 'Europe/Berlin', lat: 52.36, lon: 13.5 },
  { city: 'Zurich', tz: 'Europe/Zurich', lat: 47.46, lon: 8.55 },
  { city: 'Athens', tz: 'Europe/Athens', lat: 37.94, lon: 23.95 },
  { city: 'Moscow', tz: 'Europe/Moscow', lat: 55.41, lon: 37.91 },
  { city: 'Dubai', tz: 'Asia/Dubai', lat: 25.25, lon: 55.36 },
  { city: 'Mumbai', tz: 'Asia/Kolkata', lat: 19.09, lon: 72.87 },
  { city: 'Bangkok', tz: 'Asia/Bangkok', lat: 13.69, lon: 100.75 },
  { city: 'Singapore', tz: 'Asia/Singapore', lat: 1.36, lon: 103.99 },
  { city: 'Beijing', tz: 'Asia/Shanghai', lat: 40.08, lon: 116.58 },
  { city: 'Hong Kong', tz: 'Asia/Hong_Kong', lat: 22.31, lon: 113.92 },
  { city: 'Taipei', tz: 'Asia/Taipei', lat: 25.08, lon: 121.23 },
  { city: 'Tokyo', tz: 'Asia/Tokyo', lat: 35.55, lon: 139.78 },
  { city: 'Seoul', tz: 'Asia/Seoul', lat: 37.46, lon: 126.44 },
  { city: 'Sydney', tz: 'Australia/Sydney', lat: -33.95, lon: 151.18 },
  { city: 'Auckland', tz: 'Pacific/Auckland', lat: -37.01, lon: 174.79 },
  { city: 'Honolulu', tz: 'Pacific/Honolulu', lat: 21.32, lon: -157.92 },
]

const PRESETS = [
  ['San Francisco', 'Tokyo'],
  ['New York', 'London'],
  ['London', 'Singapore'],
  ['Dubai', 'New York'],
  ['Los Angeles', 'Sydney'],
]

const RAD = Math.PI / 180
const find = (name) => CITIES.find((c) => c.city === name)

// --- Time-zone math (shared idiom with the Time Zone Picker) -----------------
// Milliseconds that local time in `tz` is ahead of UTC at `instant`.
function offsetMs(tz, instant) {
  const date = new Date(instant)
  const local = new Date(date.toLocaleString('en-US', { timeZone: tz }))
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  return local - utc
}

// A wall-clock time *in* a zone → the absolute UTC instant it refers to.
function zonedWallToInstant(tz, y, mo, d, h, mi) {
  const guess = Date.UTC(y, mo - 1, d, h, mi)
  return guess - offsetMs(tz, guess)
}

// "YYYY-MM-DDTHH:mm" for the current wall time in a zone (for the input default).
function nowInZone(tz) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
      .formatToParts(Date.now())
      .map((x) => [x.type, x.value])
  )
  return `${p.year}-${p.month}-${p.day}T${p.hour === '24' ? '00' : p.hour}:${p.minute}`
}

function parseLocal(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value || '')
  if (!m) return null
  return { y: +m[1], mo: +m[2], d: +m[3], h: +m[4], mi: +m[5] }
}

function partsIn(tz, instant) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour12: false,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(instant)
      .map((x) => [x.type, x.value])
  )
  return {
    hour: Number(p.hour) % 24,
    minute: p.minute,
    weekday: p.weekday,
    month: p.month,
    day: Number(p.day),
    year: Number(p.year),
  }
}

const clock = (p) => `${p.hour % 12 === 0 ? 12 : p.hour % 12}:${p.minute} ${p.hour < 12 ? 'AM' : 'PM'}`

// Whole-calendar-day difference between two {year,month-index,day} via UTC noon.
function dayDelta(arr, dep) {
  const a = Date.UTC(arr.year, 0, arr.dayOfYear)
  const b = Date.UTC(dep.year, 0, dep.dayOfYear)
  return Math.round((a - b) / 86400000)
}
const dayOfYear = (p, monthIdx) => {
  const d = new Date(Date.UTC(p.year, monthIdx, p.day))
  return Math.floor((d - Date.UTC(p.year, 0, 0)) / 86400000)
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// --- Geometry ---------------------------------------------------------------
function haversineKm(a, b) {
  const dφ = (b.lat - a.lat) * RAD
  const dλ = (b.lon - a.lon) * RAD
  const s =
    Math.sin(dφ / 2) ** 2 +
    Math.cos(a.lat * RAD) * Math.cos(b.lat * RAD) * Math.sin(dλ / 2) ** 2
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(s)))
}

// Great-circle samples between two points (slerp on the unit sphere).
function greatCircle(a, b, n = 96) {
  const φ1 = a.lat * RAD,
    λ1 = a.lon * RAD,
    φ2 = b.lat * RAD,
    λ2 = b.lon * RAD
  const d =
    2 *
    Math.asin(
      Math.min(
        1,
        Math.sqrt(
          Math.sin((φ2 - φ1) / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2
        )
      )
    )
  if (d < 1e-6) return [a, b]
  const pts = []
  for (let i = 0; i <= n; i++) {
    const f = i / n
    const A = Math.sin((1 - f) * d) / Math.sin(d)
    const B = Math.sin(f * d) / Math.sin(d)
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2)
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2)
    const z = A * Math.sin(φ1) + B * Math.sin(φ2)
    pts.push({
      lat: Math.atan2(z, Math.hypot(x, y)) / RAD,
      lon: Math.atan2(y, x) / RAD,
    })
  }
  return pts
}

// --- Sun position (for day/night shading & "lands in daylight?") ------------
function solarDeclination(instant) {
  const date = new Date(instant)
  const doy = Math.floor((instant - Date.UTC(date.getUTCFullYear(), 0, 0)) / 86400000)
  return -23.44 * Math.cos((360 / 365) * (doy + 10) * RAD)
}
function subsolarLon(instant) {
  const date = new Date(instant)
  const utcH = date.getUTCHours() + date.getUTCMinutes() / 60
  return (12 - utcH) * 15
}
function isDaylight(lat, lon, instant) {
  const dec = solarDeclination(instant) * RAD
  const H = (lon - subsolarLon(instant)) * RAD
  return Math.sin(lat * RAD) * Math.sin(dec) + Math.cos(lat * RAD) * Math.cos(dec) * Math.cos(H) > 0
}

const py = (lat) => ((90 - lat) / 180) * WORLD_H
// View crops the empty polar oceans a little.
const VIEW = { y: 20, h: 425 }

export default function FlightPath() {
  const [from, setFrom] = useState('San Francisco')
  const [to, setTo] = useState('Tokyo')
  const [depValue, setDepValue] = useState(() => nowInZone(find('San Francisco').tz))
  const [durMin, setDurMin] = useState(0)
  const userEditedDur = useRef(false)
  const arcId = useRef('fp-arc')

  const a = find(from)
  const b = find(to)
  const same = from === to

  // Auto-estimate flight time when the route changes (≈800 km/h cruise + taxi),
  // unless the traveller has typed their own duration.
  useEffect(() => {
    if (same || userEditedDur.current) return
    const km = haversineKm(a, b)
    const est = Math.round((km / 800) * 60 + 35)
    setDurMin(Math.round(est / 5) * 5)
  }, [from, to]) // eslint-disable-line react-hooks/exhaustive-deps

  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  const model = useMemo(() => {
    const dep = parseLocal(depValue)
    if (same || !dep) return null

    const depInstant = zonedWallToInstant(a.tz, dep.y, dep.mo, dep.d, dep.h, dep.mi)
    const arrInstant = depInstant + durMin * 60000

    const depParts = partsIn(a.tz, depInstant)
    const arrParts = partsIn(b.tz, arrInstant)
    const delta = dayDelta(
      { year: arrParts.year, dayOfYear: dayOfYear(arrParts, MONTHS.indexOf(arrParts.month)) },
      { year: depParts.year, dayOfYear: dayOfYear(depParts, MONTHS.indexOf(depParts.month)) }
    )

    const tzShift = Math.round((offsetMs(b.tz, arrInstant) - offsetMs(a.tz, depInstant)) / 3600000)
    const km = haversineKm(a, b)
    const landsDaylight = isDaylight(b.lat, b.lon, arrInstant)

    // Center the projection on the route midpoint so the arc never crosses the
    // map seam; continents are drawn as three wrapped copies under a clip.
    const pts = greatCircle(a, b)
    const centerLon = pts[Math.floor(pts.length / 2)].lon
    const shift = (-centerLon / 360) * WORLD_W
    const wrap = (lon) => (((lon - centerLon + 180) % 360) + 360) % 360 // 0..360 across view
    const px = (lon) => (wrap(lon) / 360) * WORLD_W

    const screen = pts.map((p) => ({ x: px(p.lon), y: py(p.lat) }))
    const arcD = screen.map((s, i) => `${i ? 'L' : 'M'}${s.x.toFixed(1)} ${s.y.toFixed(1)}`).join('')

    // Night region: terminator latitude per longitude across the visible span.
    const dec = solarDeclination(arrInstant)
    const decSafe = (Math.abs(dec) < 4 ? 4 : Math.abs(dec)) * Math.sign(dec || 1) * RAD
    const sub = subsolarLon(arrInstant)
    let night = 'M0 0'
    const steps = 120
    for (let i = 0; i <= steps; i++) {
      const lon = centerLon - 180 + (360 * i) / steps
      const H = (lon - sub) * RAD
      const termLat = Math.atan(-Math.cos(H) / Math.tan(decSafe)) / RAD
      const x = (i / steps) * WORLD_W
      night += `${i ? 'L' : 'M'}${x.toFixed(1)} ${py(termLat).toFixed(1)}`
    }
    // Close toward the pole that is in darkness.
    night += dec >= 0 ? `L${WORLD_W} ${WORLD_H}L0 ${WORLD_H}Z` : `L${WORLD_W} 0L0 0Z`

    const subVisible = Math.abs(((sub - centerLon + 180) % 360) - 180) <= 178
    const sun = { x: px(sub), y: py(dec), show: subVisible }

    // Plane orientation at the midpoint (used when motion is reduced).
    const mid = Math.floor(screen.length / 2)
    const heading =
      Math.atan2(screen[mid + 2].y - screen[mid - 2].y, screen[mid + 2].x - screen[mid - 2].x) /
      RAD

    return {
      depParts,
      arrParts,
      delta,
      tzShift,
      km: Math.round(km),
      landsDaylight,
      shift,
      arcD,
      night,
      sun,
      start: screen[0],
      end: screen[screen.length - 1],
      mid: screen[mid],
      heading,
    }
  }, [from, to, depValue, durMin, same, a, b])

  const onPreset = ([f, t]) => {
    userEditedDur.current = false
    setFrom(f)
    setTo(t)
    setDepValue(nowInZone(find(f).tz))
    trackToyUse('flight-path', 'preset', { route: `${f}-${t}` })
  }
  const swap = () => {
    userEditedDur.current = false
    setFrom(to)
    setTo(from)
  }

  const hrs = Math.floor(durMin / 60)
  const mins = durMin % 60
  const setDur = (h, m) => {
    userEditedDur.current = true
    setDurMin(Math.max(0, h) * 60 + Math.max(0, Math.min(59, m)))
  }

  const PLANE = 'M22 0 L-13 -10 L-4 0 L-13 10 Z'

  return (
    <div className="flex flex-col gap-5">
      {/* Route + timing controls */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-end gap-2">
          <Field label="From" className="flex-1">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-xl border border-line bg-white/70 px-3 py-2.5 text-[0.95rem] text-ink"
            >
              {CITIES.map((c) => (
                <option key={c.city}>{c.city}</option>
              ))}
            </select>
          </Field>
          <button
            onClick={swap}
            aria-label="Swap origin and destination"
            title="Swap"
            className="mb-0.5 shrink-0 rounded-xl border border-line bg-white/70 px-3 py-2.5 text-ink-soft transition-colors hover:border-clay/60 hover:text-clay-deep"
          >
            <i className="fas fa-exchange-alt" aria-hidden />
          </button>
          <Field label="To" className="flex-1">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-xl border border-line bg-white/70 px-3 py-2.5 text-[0.95rem] text-ink"
            >
              {CITIES.map((c) => (
                <option key={c.city}>{c.city}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex items-end gap-3">
          <Field label="Departure" hint={`local in ${from}`} className="flex-1">
            <input
              type="datetime-local"
              value={depValue}
              onChange={(e) => setDepValue(e.target.value)}
              className="w-full rounded-xl border border-line bg-white/70 px-3 py-2.5 text-[0.95rem] text-ink"
            />
          </Field>
          <Field label="Flight time" hint={userEditedDur.current ? '' : 'est.'}>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                value={hrs}
                onChange={(e) => setDur(+e.target.value, mins)}
                className="w-16 rounded-xl border border-line bg-white/70 px-3 py-2.5 text-center text-[0.95rem] tabular-nums text-ink"
              />
              <span className="text-sm text-muted">h</span>
              <input
                type="number"
                min="0"
                max="59"
                value={mins}
                onChange={(e) => setDur(hrs, +e.target.value)}
                className="w-16 rounded-xl border border-line bg-white/70 px-3 py-2.5 text-center text-[0.95rem] tabular-nums text-ink"
              />
              <span className="text-sm text-muted">m</span>
            </div>
          </Field>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Try</span>
        {PRESETS.map(([f, t]) => (
          <button
            key={`${f}-${t}`}
            onClick={() => onPreset([f, t])}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              from === f && to === t
                ? 'border-clay bg-clay text-white'
                : 'border-line bg-white/60 text-ink-soft hover:border-clay/60 hover:text-clay-deep'
            }`}
          >
            {f} → {t}
          </button>
        ))}
      </div>

      {same && <Note tone="error">Pick two different cities to chart a route.</Note>}

      {model && (
        <>
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-line bg-ocean/5">
            <svg
              viewBox={`0 ${VIEW.y} ${WORLD_W} ${VIEW.h}`}
              className="block w-full"
              role="img"
              aria-label={`Flight path from ${from} to ${to}`}
            >
              <defs>
                <clipPath id="fp-clip">
                  <rect x="0" y={VIEW.y} width={WORLD_W} height={VIEW.h} />
                </clipPath>
              </defs>

              <g clipPath="url(#fp-clip)">
                {/* Continents, wrapped so the centered route never hits a seam */}
                {[-WORLD_W, 0, WORLD_W].map((dx) => (
                  <path
                    key={dx}
                    d={WORLD_PATH}
                    transform={`translate(${model.shift + dx} 0)`}
                    className="fill-sage/25 stroke-sage/40"
                    strokeWidth="0.6"
                  />
                ))}

                {/* Night side at arrival time */}
                <path d={model.night} fill="#0f1736" opacity="0.34" />
                {model.sun.show && (
                  <>
                    <circle cx={model.sun.x} cy={model.sun.y} r="14" className="fill-gold/25" />
                    <circle cx={model.sun.x} cy={model.sun.y} r="6" className="fill-gold" />
                  </>
                )}

                {/* Flight arc */}
                <path
                  id={arcId.current}
                  d={model.arcD}
                  fill="none"
                  className="stroke-clay/30"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d={model.arcD}
                  fill="none"
                  className="stroke-clay-deep"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="2 7"
                />

                {/* Endpoints */}
                {[
                  { p: model.start, label: from, time: clock(model.depParts) },
                  { p: model.end, label: to, time: clock(model.arrParts) },
                ].map(({ p, label, time }, i) => {
                  const anchor = p.x < 70 ? 'start' : p.x > WORLD_W - 70 ? 'end' : 'middle'
                  const ox = anchor === 'start' ? 8 : anchor === 'end' ? -8 : 0
                  return (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="7" className="fill-clay-deep/20" />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        className="fill-clay-deep stroke-paper"
                        strokeWidth="1.5"
                      />
                      <text
                        x={p.x + ox}
                        y={p.y - 12}
                        textAnchor={anchor}
                        className="fill-ink font-sans"
                        style={{ fontSize: '15px', fontWeight: 600 }}
                      >
                        {label}
                      </text>
                      <text
                        x={p.x + ox}
                        y={p.y + 22}
                        textAnchor={anchor}
                        className="fill-ink-soft font-sans"
                        style={{ fontSize: '13px' }}
                      >
                        {time}
                      </text>
                    </g>
                  )
                })}

                {/* Plane */}
                {reduceMotion ? (
                  <path
                    d={PLANE}
                    className="fill-clay-deep"
                    transform={`translate(${model.mid.x} ${model.mid.y}) rotate(${model.heading})`}
                  />
                ) : (
                  <path d={PLANE} className="fill-clay-deep">
                    <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href={`#${arcId.current}`} xlinkHref={`#${arcId.current}`} />
                    </animateMotion>
                  </path>
                )}
              </g>
            </svg>
          </div>

          {/* Arrival readout */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white/60 px-5 py-4 sm:col-span-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Arrive in {to}
                </span>
                {model.delta !== 0 && (
                  <span className="rounded-full bg-clay/15 px-2.5 py-0.5 text-xs font-semibold text-clay-deep">
                    {model.delta > 0 ? '+' : '−'}
                    {Math.abs(model.delta)} day{Math.abs(model.delta) > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="mt-1 font-serif text-4xl font-semibold tabular-nums text-ink">
                {clock(model.arrParts)}
              </div>
              <div className="mt-1 text-sm text-muted">
                {model.arrParts.weekday}, {model.arrParts.month} {model.arrParts.day} ·{' '}
                <i
                  className={`fas ${model.landsDaylight ? 'fa-sun text-gold' : 'fa-moon text-ocean'}`}
                  aria-hidden
                />{' '}
                lands {model.landsDaylight ? 'in daylight' : 'after dark'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
              <Mini label="Flight" value={`${hrs}h ${mins ? `${mins}m` : ''}`.trim()} />
              <Mini
                label="Clock shift"
                value={`${model.tzShift >= 0 ? '+' : '−'}${Math.abs(model.tzShift)}h`}
              />
              <Mini label="Distance" value={`${model.km.toLocaleString()} km`} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Mini({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-white/60 px-3 py-2.5 text-center sm:flex sm:flex-row-reverse sm:items-baseline sm:justify-between sm:gap-3 sm:text-left">
      <div className="font-serif text-lg font-semibold tabular-nums text-ink">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted sm:mt-0">
        {label}
      </div>
    </div>
  )
}
