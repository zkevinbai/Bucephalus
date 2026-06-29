import { useMemo, useState } from 'react'
import { generateYearRange, ELEMENTS } from './zodiacUtils'
import { ANIMAL_DATA, ELEMENT_DATA } from './zodiacData'

const inputCls =
  'rounded-lg border border-line bg-white/70 px-3 py-1.5 text-sm text-ink placeholder-muted/60 transition-colors focus:border-clay focus:outline-none'
const labelCls = 'text-xs font-semibold uppercase tracking-wide text-muted'

export default function YearTable({ onYearSelect }) {
  const [startYear, setStartYear] = useState(1984)
  const [endYear, setEndYear] = useState(2026)
  const [filterAnimal, setFilterAnimal] = useState('')
  const [filterElement, setFilterElement] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const yearData = useMemo(() => generateYearRange(startYear, endYear), [startYear, endYear])

  const filteredData = useMemo(() => {
    let filtered = yearData
    if (filterAnimal) filtered = filtered.filter((item) => item.animal === filterAnimal)
    if (filterElement) filtered = filtered.filter((item) => item.element === filterElement)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.year.toString().includes(term) ||
          item.animal.toLowerCase().includes(term) ||
          item.element.toLowerCase().includes(term) ||
          item.combination.toLowerCase().includes(term)
      )
    }
    return filtered
  }, [yearData, filterAnimal, filterElement, searchTerm])

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="rounded-2xl border border-line bg-white/60 p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className={labelCls}>Year range</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={startYear}
                  onChange={(e) => {
                    const v = parseInt(e.target.value)
                    if (!isNaN(v)) setStartYear(v)
                  }}
                  className={`w-24 ${inputCls}`}
                />
                <span className="text-muted">–</span>
                <input
                  type="number"
                  value={endYear}
                  onChange={(e) => {
                    const v = parseInt(e.target.value)
                    if (!isNaN(v)) setEndYear(v)
                  }}
                  className={`w-24 ${inputCls}`}
                />
              </div>
            </div>
            <span className="text-xs text-muted">
              {filteredData.length} of {yearData.length} years
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className={labelCls}>Search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Years, animals…"
                className={inputCls}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelCls}>Animal</span>
              <select
                value={filterAnimal}
                onChange={(e) => setFilterAnimal(e.target.value)}
                className={inputCls}
              >
                <option value="">All animals</option>
                {Object.keys(ANIMAL_DATA).map((animal) => (
                  <option key={animal} value={animal}>
                    {ANIMAL_DATA[animal].emoji} {animal}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelCls}>Element</span>
              <select
                value={filterElement}
                onChange={(e) => setFilterElement(e.target.value)}
                className={inputCls}
              >
                <option value="">All elements</option>
                {ELEMENTS.map((element) => (
                  <option key={element} value={element}>
                    {ELEMENT_DATA[element]?.emoji || ''} {element}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white/60">
        <div className="max-h-[60vh] overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-cream">
              <tr className="border-b border-line text-left">
                <th className="px-4 py-3 text-sm font-semibold text-ink">Year</th>
                <th className="px-4 py-3 text-sm font-semibold text-ink">Animal</th>
                <th className="px-4 py-3 text-sm font-semibold text-ink">Element</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-10 text-center text-sm text-muted">
                    No years found matching your filters
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const animalData = ANIMAL_DATA[item.animal]
                  return (
                    <tr
                      key={item.year}
                      onClick={() => onYearSelect(item.year)}
                      className="cursor-pointer border-b border-line/60 transition-colors last:border-b-0 hover:bg-cream/60"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-ink">{item.year}</td>
                      <td className="px-4 py-3 text-sm text-ink-soft">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{animalData?.emoji || ''}</span>
                          {item.animal}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink-soft">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{ELEMENT_DATA[item.element]?.emoji || ''}</span>
                          {item.element}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-muted sm:hidden">Tap any row to view details</p>
    </div>
  )
}
