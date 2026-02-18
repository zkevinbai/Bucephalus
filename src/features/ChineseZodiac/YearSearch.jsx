import { useState } from 'react'
import { isValidYear } from './zodiacUtils'

export default function YearSearch({ onYearSelect }) {
  const [yearInput, setYearInput] = useState('')
  const [error, setError] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setError(null)

    const year = parseInt(yearInput, 10)
    
    if (!yearInput || isNaN(year)) {
      setError('Please enter a valid year')
      return
    }

    if (!isValidYear(year)) {
      setError('Please enter a valid year')
      return
    }

    // Navigate directly to detail view
    onYearSelect(year)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-2">
      <div className="flex gap-3 max-[950px]:flex-col">
        <input
          id="year-input"
          type="number"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          placeholder="Search any year (e.g., 1990, 2000, 2024, 1800, 2200)"
          className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg font-raleway text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[rgba(239,68,68,0.6)] focus:bg-white/80 transition-all duration-300 max-[950px]:w-full"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-white border border-gray-200 rounded-lg font-raleway font-medium text-sm text-gray-800 hover:bg-white/90 hover:border-[rgba(239,68,68,0.6)] hover:shadow-md transition-all duration-300 max-[950px]:w-full"
        >
          Search
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600 font-raleway font-light">
          {error}
        </p>
      )}
    </form>
  )
}
