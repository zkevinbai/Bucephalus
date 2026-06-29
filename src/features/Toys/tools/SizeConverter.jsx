import { useState } from 'react'
import { SegmentedControl, Note } from '../toykit'
import { trackEvent } from '../../../utils/analytics'

/* Clothing and shoe size conversion. The full size chart is the centerpiece —
   columns are sizing systems, rows are equivalent sizes. Tap any row to pin it:
   a readout above states that size across every system, and the row highlights
   so you can trace it. No abstract "region" picker — you just read across the
   row, which is how size charts already work. */

const CHARTS = [
  {
    key: 'womens-shoes',
    name: "Women's Shoes",
    cols: [
      { key: 'US', label: 'US' },
      { key: 'UK', label: 'UK' },
      { key: 'EU', label: 'EU' },
      { key: 'CM', label: 'CM' },
    ],
    defaultIdx: 6,
    rows: [
      { US: '5', UK: '3', EU: '35', CM: '22' },
      { US: '5.5', UK: '3.5', EU: '35.5', CM: '22.5' },
      { US: '6', UK: '4', EU: '36', CM: '23' },
      { US: '6.5', UK: '4.5', EU: '37', CM: '23.5' },
      { US: '7', UK: '5', EU: '37.5', CM: '24' },
      { US: '7.5', UK: '5.5', EU: '38', CM: '24.5' },
      { US: '8', UK: '6', EU: '38.5', CM: '25' },
      { US: '8.5', UK: '6.5', EU: '39', CM: '25.5' },
      { US: '9', UK: '7', EU: '40', CM: '26' },
      { US: '9.5', UK: '7.5', EU: '40.5', CM: '26.5' },
      { US: '10', UK: '8', EU: '41', CM: '27' },
      { US: '10.5', UK: '8.5', EU: '42', CM: '27.5' },
      { US: '11', UK: '9', EU: '42.5', CM: '28' },
    ],
  },
  {
    key: 'mens-shoes',
    name: "Men's Shoes",
    cols: [
      { key: 'US', label: 'US' },
      { key: 'UK', label: 'UK' },
      { key: 'EU', label: 'EU' },
      { key: 'CM', label: 'CM' },
    ],
    defaultIdx: 6,
    rows: [
      { US: '6', UK: '5.5', EU: '39', CM: '24' },
      { US: '6.5', UK: '6', EU: '39.5', CM: '24.5' },
      { US: '7', UK: '6.5', EU: '40', CM: '25' },
      { US: '7.5', UK: '7', EU: '40.5', CM: '25.5' },
      { US: '8', UK: '7.5', EU: '41', CM: '26' },
      { US: '8.5', UK: '8', EU: '42', CM: '26.5' },
      { US: '9', UK: '8.5', EU: '42.5', CM: '27' },
      { US: '9.5', UK: '9', EU: '43', CM: '27.5' },
      { US: '10', UK: '9.5', EU: '44', CM: '28' },
      { US: '10.5', UK: '10', EU: '44.5', CM: '28.5' },
      { US: '11', UK: '10.5', EU: '45', CM: '29' },
      { US: '11.5', UK: '11', EU: '45.5', CM: '29.5' },
      { US: '12', UK: '11.5', EU: '46', CM: '30' },
      { US: '13', UK: '12.5', EU: '47', CM: '31' },
    ],
  },
  {
    key: 'womens-clothing',
    name: "Women's Clothing",
    // Numeric sizes are precise (US 6 ≠ US 8), so we keep the exact columns
    // rather than a coarse S/M/L letter that would repeat down the column. JP is
    // the Japanese numeric standard (≈ US + 3); Asian sizing runs smaller, so a
    // given body maps to a higher-numbered label.
    cols: [
      { key: 'US', label: 'US' },
      { key: 'UK', label: 'UK' },
      { key: 'EU', label: 'EU' },
      { key: 'JP', label: 'JP' },
    ],
    defaultIdx: 4,
    rows: [
      { US: '0', UK: '4', EU: '32', JP: '3' },
      { US: '2', UK: '6', EU: '34', JP: '5' },
      { US: '4', UK: '8', EU: '36', JP: '7' },
      { US: '6', UK: '10', EU: '38', JP: '9' },
      { US: '8', UK: '12', EU: '40', JP: '11' },
      { US: '10', UK: '14', EU: '42', JP: '13' },
      { US: '12', UK: '16', EU: '44', JP: '15' },
      { US: '14', UK: '18', EU: '46', JP: '17' },
      { US: '16', UK: '20', EU: '48', JP: '19' },
      { US: '18', UK: '22', EU: '50', JP: '21' },
    ],
  },
  {
    key: 'mens-clothing',
    name: "Men's Tops",
    // Letter sizes each span a chest range, so there's one row per letter — no
    // repeated values down a column. Asian tops run about one letter smaller, so
    // a Western M is an Asian L.
    cols: [
      { key: 'US', label: 'US / Intl' },
      { key: 'Asia', label: 'Asia' },
      { key: 'EU', label: 'EU' },
      { key: 'Chest', label: 'Chest (in)' },
    ],
    defaultIdx: 2,
    rows: [
      { US: 'XS', EU: '44', Chest: '32–34', Asia: 'S' },
      { US: 'S', EU: '46', Chest: '35–37', Asia: 'M' },
      { US: 'M', EU: '48', Chest: '38–40', Asia: 'L' },
      { US: 'L', EU: '50', Chest: '42–44', Asia: 'XL' },
      { US: 'XL', EU: '52', Chest: '46–48', Asia: 'XXL' },
      { US: 'XXL', EU: '54', Chest: '50–52', Asia: '3XL' },
    ],
  },
]

export default function SizeConverter() {
  const [catKey, setCatKey] = useState('womens-shoes')
  const cat = CHARTS.find((c) => c.key === catKey)
  const [rowIdx, setRowIdx] = useState(cat.defaultIdx)

  const pickCat = (key) => {
    const next = CHARTS.find((c) => c.key === key)
    setCatKey(key)
    setRowIdx(next.defaultIdx)
    trackEvent('toy_size_category', { category: key })
  }

  const row = cat.rows[rowIdx]

  return (
    <div className="flex flex-col gap-5">
      {/* What are you sizing */}
      <SegmentedControl
        options={CHARTS.map((c) => ({ value: c.key, label: c.name }))}
        value={catKey}
        onChange={pickCat}
      />

      {/* Selected size, stated across every system */}
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 rounded-xl border border-line bg-cream/50 px-5 py-4">
        {cat.cols.map((c) => (
          <span key={c.key} className="flex items-baseline gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">{c.label}</span>
            <span className="font-serif text-2xl tabular-nums text-ink">{row[c.key]}</span>
          </span>
        ))}
      </div>

      <p className="text-sm text-muted">Tap any row to convert from that system.</p>

      {/* Full chart */}
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-cream/40">
              {cat.cols.map((c) => (
                <th key={c.key} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cat.rows.map((r, i) => {
              const on = i === rowIdx
              return (
                <tr
                  key={i}
                  onClick={() => setRowIdx(i)}
                  className={`cursor-pointer border-b border-line/50 transition-colors last:border-0 ${
                    on ? 'bg-clay/10' : 'hover:bg-cream/40'
                  }`}
                >
                  {cat.cols.map((c, j) => (
                    <td
                      key={c.key}
                      className={`px-4 py-2.5 tabular-nums ${
                        on ? (j === 0 ? 'font-semibold text-clay-deep' : 'font-medium text-ink') : 'text-ink-soft'
                      }`}
                    >
                      {r[c.key]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Note tone="muted">Sizes vary by brand — treat these as a starting point, not a guarantee.</Note>
    </div>
  )
}
