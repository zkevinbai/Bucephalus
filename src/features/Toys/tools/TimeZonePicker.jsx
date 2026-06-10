import { useMemo, useRef, useState } from 'react'
import { Btn } from '../toykit'
import { trackToyUse } from '../../../utils/analytics'

// Curated city list (label → IANA zone). Anchor is whichever sits on top.
const CITIES = [
  { city: 'San Francisco', tz: 'America/Los_Angeles' },
  { city: 'Denver', tz: 'America/Denver' },
  { city: 'Chicago', tz: 'America/Chicago' },
  { city: 'New York', tz: 'America/New_York' },
  { city: 'Bogotá', tz: 'America/Bogota' },
  { city: 'Mexico City', tz: 'America/Mexico_City' },
  { city: 'São Paulo', tz: 'America/Sao_Paulo' },
  { city: 'London', tz: 'Europe/London' },
  { city: 'Lisbon', tz: 'Europe/Lisbon' },
  { city: 'Paris', tz: 'Europe/Paris' },
  { city: 'Berlin', tz: 'Europe/Berlin' },
  { city: 'Zurich', tz: 'Europe/Zurich' },
  { city: 'Warsaw', tz: 'Europe/Warsaw' },
  { city: 'Athens', tz: 'Europe/Athens' },
  { city: 'Moscow', tz: 'Europe/Moscow' },
  { city: 'Dubai', tz: 'Asia/Dubai' },
  { city: 'Mumbai', tz: 'Asia/Kolkata' },
  { city: 'Bangkok', tz: 'Asia/Bangkok' },
  { city: 'Beijing', tz: 'Asia/Shanghai' },
  { city: 'Taipei', tz: 'Asia/Taipei' },
  { city: 'Singapore', tz: 'Asia/Singapore' },
  { city: 'Tokyo', tz: 'Asia/Tokyo' },
  { city: 'Seoul', tz: 'Asia/Seoul' },
  { city: 'Sydney', tz: 'Australia/Sydney' },
  { city: 'Auckland', tz: 'Pacific/Auckland' },
  { city: 'Honolulu', tz: 'Pacific/Honolulu' },
]

const DAY = 86400000
const HOUR = 3600000

// Milliseconds that local time in `tz` is ahead of UTC at `instant` (Date or ms).
function offsetMs(tz, instant) {
  const date = new Date(instant)
  const local = new Date(date.toLocaleString('en-US', { timeZone: tz }))
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  return local - utc
}

// Parts (hour 0-23, weekday, day-of-month, month) for an instant in a zone.
function partsIn(tz, instant) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour12: false,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const p = Object.fromEntries(f.formatToParts(instant).map((x) => [x.type, x.value]))
  return { hour: Number(p.hour) % 24, minute: p.minute, weekday: p.weekday, month: p.month, day: p.day }
}

function offsetLabel(tz, instant) {
  const mins = Math.round(offsetMs(tz, instant) / 60000)
  const sign = mins >= 0 ? '+' : '−'
  const h = Math.floor(Math.abs(mins) / 60)
  const m = Math.abs(mins) % 60
  return `GMT${sign}${h}${m ? ':' + String(m).padStart(2, '0') : ''}`
}

const hourLabel = (h) => (h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`)

// Day / shoulder / night band → cell style.
function band(h) {
  if (h >= 9 && h <= 17) return 'bg-white text-ink' // working hours
  if ((h >= 6 && h <= 8) || (h >= 18 && h <= 20)) return 'bg-cream text-ink-soft' // shoulder
  return 'bg-cream-2 text-muted' // night
}

export default function TimeZonePicker() {
  const [selected, setSelected] = useState(['San Francisco', 'New York', 'London', 'Beijing'])
  const [dayOffset, setDayOffset] = useState(0)
  const [selCol, setSelCol] = useState(null) // selected hour column (0-23), null = follow "now"
  const now = Date.now()

  const rows = selected.map((name) => CITIES.find((c) => c.city === name)).filter(Boolean)
  const anchor = rows[0]

  // Start of the anchor city's chosen day, as an absolute instant.
  const dayStart = useMemo(() => {
    if (!anchor) return now
    const ref = now + dayOffset * DAY
    const [m, d, y] = new Intl.DateTimeFormat('en-US', {
      timeZone: anchor.tz,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
      .format(ref)
      .split('/')
      .map(Number)
    const guess = Date.UTC(y, m - 1, d, 0, 0, 0)
    return guess - offsetMs(anchor.tz, new Date(guess))
  }, [anchor, dayOffset, now])

  const columns = useMemo(
    () => Array.from({ length: 24 }, (_, i) => dayStart + i * HOUR),
    [dayStart]
  )

  // Column containing "now" (only meaningful on today).
  const nowCol = dayOffset === 0 ? Math.floor((now - dayStart) / HOUR) : -1
  const activeCol = selCol ?? (nowCol >= 0 && nowCol < 24 ? nowCol : 0)
  const activeInstant = columns[activeCol]

  const addCity = (city) => {
    if (city && !selected.includes(city)) {
      trackToyUse('timezones', 'add_city', { tz_city: city })
      setSelected([...selected, city])
    }
  }
  const removeCity = (city) => {
    trackToyUse('timezones', 'remove_city', { tz_city: city })
    setSelected(selected.filter((c) => c !== city))
  }

  // --- Drag-to-reorder (pointer events: works for mouse and touch) ---------
  // The drag source lives in a ref so move events never see stale state;
  // the state copy only drives the row styling.
  const [dragCity, setDragCity] = useState(null)
  const dragRef = useRef(null)
  const didReorder = useRef(false)

  const moveCity = (city, targetCity) => {
    if (city === targetCity) return
    didReorder.current = true
    setSelected((sel) => {
      const from = sel.indexOf(city)
      const to = sel.indexOf(targetCity)
      if (from < 0 || to < 0) return sel
      const next = [...sel]
      next.splice(from, 1)
      next.splice(to, 0, city)
      return next
    })
  }

  const onDragStart = (city) => (e) => {
    e.preventDefault()
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* capture unsupported — drag still works via move events */
    }
    didReorder.current = false
    dragRef.current = city
    setDragCity(city)
  }
  const onDragMove = () => (e) => {
    const src = dragRef.current
    if (!src) return
    // Vertical reorder: find the row whose vertical span contains the pointer.
    // Geometry-based (not elementFromPoint) so it works regardless of where
    // the pointer sits horizontally.
    const rowsEls = [...document.querySelectorAll('tr[data-city]')]
    const target = rowsEls.find((r) => {
      const { top, bottom } = r.getBoundingClientRect()
      return e.clientY >= top && e.clientY <= bottom
    })
    if (target && target.dataset.city !== src) moveCity(src, target.dataset.city)
  }
  const onDragEnd = () => {
    if (dragRef.current && didReorder.current) {
      trackToyUse('timezones', 'reorder_city', { tz_city: dragRef.current })
    }
    dragRef.current = null
    setDragCity(null)
  }

  const available = CITIES.filter((c) => !selected.includes(c.city))

  if (!anchor) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="text-muted">No cities selected.</p>
        <select
          onChange={(e) => addCity(e.target.value)}
          value=""
          className="rounded-lg border border-line bg-white/70 px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Add a city…
          </option>
          {CITIES.map((c) => (
            <option key={c.city} value={c.city}>
              {c.city}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Day controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-1 rounded-lg border border-line bg-white/60 p-1">
          <button
            onClick={() => setDayOffset((d) => d - 1)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-soft hover:text-clay-deep"
            aria-label="Previous day"
          >
            ‹
          </button>
          <span className="min-w-[7rem] text-center text-sm font-medium text-ink">
            {new Intl.DateTimeFormat('en-US', {
              timeZone: anchor.tz,
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            }).format(dayStart + HOUR * 12)}
          </span>
          <button
            onClick={() => setDayOffset((d) => d + 1)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-soft hover:text-clay-deep"
            aria-label="Next day"
          >
            ›
          </button>
        </div>
        <Btn
          variant="ghost"
          onClick={() => {
            setDayOffset(0)
            setSelCol(null)
          }}
        >
          Now
        </Btn>
        <span className="text-xs text-muted">
          Top city ({anchor.city}) sets the day · click any hour to compare
        </span>
      </div>

      {/* Readout for the selected instant */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((c) => {
          const p = partsIn(c.tz, activeInstant)
          return (
            <div key={c.city} className="rounded-xl border border-line bg-white/60 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {c.city}
              </div>
              <div className="mt-1 font-serif text-2xl font-semibold tabular-nums text-ink">
                {p.hour % 12 === 0 ? 12 : p.hour % 12}:{p.minute}
                <span className="ml-1 text-base text-muted">{p.hour < 12 ? 'AM' : 'PM'}</span>
              </div>
              <div className="mt-0.5 text-xs text-muted">
                {p.weekday}, {p.month} {p.day} · {offsetLabel(c.tz, activeInstant)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Hour grid */}
      <div className="overflow-x-auto rounded-2xl border border-line bg-white/40">
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.city}
                data-city={c.city}
                className={`border-b border-line/60 transition-opacity last:border-b-0 ${
                  dragCity === c.city ? 'opacity-50' : ''
                }`}
              >
                <td className="sticky left-0 z-10 w-40 bg-paper/95 px-2 py-2 backdrop-blur">
                  <div className="flex items-center justify-between gap-1.5">
                    <button
                      onPointerDown={onDragStart(c.city)}
                      onPointerMove={onDragMove(c.city)}
                      onPointerUp={onDragEnd}
                      onPointerCancel={onDragEnd}
                      aria-label={`Reorder ${c.city} (drag)`}
                      title="Drag to reorder — top city sets the day"
                      style={{ touchAction: 'none' }}
                      className={`shrink-0 px-1 py-2 text-muted/50 transition-colors hover:text-clay ${
                        dragCity === c.city ? 'cursor-grabbing text-clay' : 'cursor-grab'
                      }`}
                    >
                      <i className="fas fa-grip-vertical text-xs" aria-hidden />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-ink">{c.city}</div>
                      <div className="text-[0.7rem] text-muted">
                        {offsetLabel(c.tz, activeInstant)}
                      </div>
                    </div>
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeCity(c.city)}
                        aria-label={`Remove ${c.city}`}
                        className="shrink-0 text-muted/60 transition-colors hover:text-clay-deep"
                      >
                        <i className="fas fa-times" />
                      </button>
                    )}
                  </div>
                </td>
                {columns.map((inst, i) => {
                  const p = partsIn(c.tz, inst)
                  const isSel = i === activeCol
                  const isNow = i === nowCol
                  const isMidnight = p.hour === 0
                  return (
                    <td
                      key={i}
                      onClick={() => setSelCol(i)}
                      className={`cursor-pointer border-l text-center text-xs tabular-nums transition-colors ${band(
                        p.hour
                      )} ${isMidnight ? 'border-line' : 'border-line/30'} ${
                        isSel ? 'outline outline-2 -outline-offset-2 outline-clay' : ''
                      } ${isNow ? 'font-bold' : ''}`}
                      style={{ minWidth: '2.1rem', padding: '0.4rem 0' }}
                      title={`${c.city} ${p.weekday} ${p.month} ${p.day}`}
                    >
                      {isMidnight ? (
                        <span className="text-[0.62rem] font-semibold text-clay-deep">
                          {p.month} {p.day}
                        </span>
                      ) : (
                        hourLabel(p.hour)
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend + add city */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-line bg-white" /> Working
          hours
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-line bg-cream" /> Morning /
          evening
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-line bg-cream-2" /> Night
        </span>
        {available.length > 0 && (
          <select
            onChange={(e) => {
              addCity(e.target.value)
              e.target.value = ''
            }}
            value=""
            className="ml-auto rounded-lg border border-line bg-white/70 px-3 py-1.5 text-sm text-ink"
          >
            <option value="" disabled>
              + Add a city…
            </option>
            {available.map((c) => (
              <option key={c.city} value={c.city}>
                {c.city}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
