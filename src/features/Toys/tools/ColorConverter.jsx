import { useState } from 'react'
import { Field, TextInput, CopyButton, Note } from '../toykit'

function parseHex(hex) {
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
}

const toHex = ({ r, g, b }) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

function rgbToHsl({ r, g, b }) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// Mix a color toward white (amount>0) or black (amount<0) by |amount| fraction.
function mix({ r, g, b }, amount) {
  const t = amount < 0 ? 0 : 255
  const f = Math.abs(amount)
  return { r: r + (t - r) * f, g: g + (t - g) * f, b: b + (t - b) * f }
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#cc785c') // clay
  const rgb = parseHex(hex)
  const valid = !!rgb
  const hsl = valid ? rgbToHsl(rgb) : null

  const rgbStr = valid ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : ''
  const hslStr = valid ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : ''
  const normHex = valid ? toHex(rgb) : ''

  const steps = [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6]
  const scale = valid ? steps.map((s) => (s === 0 ? normHex : toHex(mix(rgb, s)))) : []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="color"
          value={valid ? normHex : '#000000'}
          onChange={(e) => setHex(e.target.value)}
          aria-label="Color picker"
          className="h-16 w-16 cursor-pointer rounded-xl border border-line bg-white/70 p-1"
        />
        <Field label="Hex" className="flex-1 min-w-[180px]">
          <TextInput
            mono
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#cc785c"
            spellCheck={false}
          />
        </Field>
      </div>

      <Note tone="error">{!valid && hex.trim() ? 'Not a valid hex color.' : ''}</Note>

      {valid && (
        <>
          <div
            className="flex h-24 items-end rounded-xl border border-line p-3"
            style={{ background: normHex }}
          >
            <span
              className="rounded-md bg-white/80 px-2 py-0.5 font-mono text-xs text-ink"
            >
              {normHex}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { label: 'HEX', value: normHex },
              { label: 'RGB', value: rgbStr },
              { label: 'HSL', value: hslStr },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white/60 px-4 py-2.5"
              >
                <span className="w-12 text-xs font-semibold uppercase tracking-wide text-muted">
                  {label}
                </span>
                <span className="flex-1 font-mono text-[0.9rem] text-ink">{value}</span>
                <CopyButton value={value} label="" className="!px-2 !py-1" />
              </div>
            ))}
          </div>

          <Field label="Tints & shades" hint="click to set">
            <div className="flex gap-1.5">
              {scale.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setHex(c)}
                  title={c}
                  style={{ background: c }}
                  className={`h-12 flex-1 rounded-lg border transition-transform hover:scale-105 ${
                    c === normHex ? 'border-ink' : 'border-line'
                  }`}
                />
              ))}
            </div>
          </Field>
        </>
      )}
    </div>
  )
}
