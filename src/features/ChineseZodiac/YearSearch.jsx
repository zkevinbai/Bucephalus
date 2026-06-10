import { useState } from 'react'
import { isValidYear } from './zodiacUtils'

export default function YearSearch({ onYearSelect }) {
  const [yearInput, setYearInput] = useState('')
  const [error, setError] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setError(null)

    const year = parseInt(yearInput, 10)

    if (!yearInput || isNaN(year) || !isValidYear(year)) {
      setError('Please enter a valid year')
      return
    }

    onYearSelect(year)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-2">
      <div className="flex gap-3 max-[600px]:flex-col">
        <input
          id="year-input"
          type="number"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          placeholder="Search any year (e.g. 1990, 2024, 1800)"
          className="flex-1 rounded-xl border border-line bg-white/70 px-4 py-2.5 text-[0.95rem] text-ink placeholder-muted/60 transition-colors focus:border-clay focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-clay px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-deep max-[600px]:w-full"
        >
          Search
        </button>
      </div>
      {error && <p className="text-sm font-medium text-clay-deep">{error}</p>}
    </form>
  )
}
