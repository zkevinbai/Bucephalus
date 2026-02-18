import { useState, useMemo } from 'react'
import { generateYearRange, getZodiacForYear, ELEMENTS } from './zodiacUtils'
import { ANIMAL_DATA } from './zodiacData'

export default function YearTable({ onYearSelect }) {
  const [startYear, setStartYear] = useState(2000)
  const [endYear, setEndYear] = useState(2030)
  const [filterAnimal, setFilterAnimal] = useState('')
  const [filterElement, setFilterElement] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Generate year range data
  const yearData = useMemo(() => {
    return generateYearRange(startYear, endYear)
  }, [startYear, endYear])

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = yearData

    if (filterAnimal) {
      filtered = filtered.filter(item => item.animal === filterAnimal)
    }

    if (filterElement) {
      filtered = filtered.filter(item => item.element === filterElement)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(item => 
        item.year.toString().includes(term) ||
        item.animal.toLowerCase().includes(term) ||
        item.element.toLowerCase().includes(term) ||
        item.combination.toLowerCase().includes(term)
      )
    }

    return filtered
  }, [yearData, filterAnimal, filterElement, searchTerm])

  const handleYearClick = (year) => {
    onYearSelect(year)
  }

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-[950px]:p-4 max-[950px]:gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 bg-white/50 border border-gray-300/40 rounded-xl p-4 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Year Range */}
          <div className="flex flex-col gap-2">
            <label className="font-raleway text-sm font-medium text-gray-800">
              Start Year
            </label>
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value) || 1900)}
              min="1900"
              max="2100"
              className="px-3 py-2 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-raleway text-sm font-medium text-gray-800">
              End Year
            </label>
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value) || 2100)}
              min="1900"
              max="2100"
              className="px-3 py-2 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-raleway text-sm font-medium text-gray-800">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search years, animals, elements..."
              className="px-3 py-2 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-raleway text-sm font-medium text-gray-800">
              Filter by Animal
            </label>
            <select
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
              className="px-3 py-2 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
            >
              <option value="">All Animals</option>
              {Object.keys(ANIMAL_DATA).map(animal => (
                <option key={animal} value={animal}>
                  {ANIMAL_DATA[animal].emoji} {animal}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-raleway text-sm font-medium text-gray-800">
              Filter by Element
            </label>
            <select
              value={filterElement}
              onChange={(e) => setFilterElement(e.target.value)}
              className="px-3 py-2 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
            >
              <option value="">All Elements</option>
              {ELEMENTS.map(element => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm font-raleway font-light text-gray-600">
          Showing {filteredData.length} of {yearData.length} years
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/60 border-b border-gray-300/40">
                <th className="px-4 py-3 text-left font-raleway text-sm font-semibold text-gray-800 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                  Year
                </th>
                <th className="px-4 py-3 text-left font-raleway text-sm font-semibold text-gray-800 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                  Animal
                </th>
                <th className="px-4 py-3 text-left font-raleway text-sm font-semibold text-gray-800 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                  Element
                </th>
                <th className="px-4 py-3 text-left font-raleway text-sm font-semibold text-gray-800 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                  Combination
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center font-raleway text-sm text-gray-600">
                    No years found matching your filters
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const animalData = ANIMAL_DATA[item.animal]
                  return (
                    <tr
                      key={item.year}
                      onClick={() => handleYearClick(item.year)}
                      className="border-b border-gray-300/30 hover:bg-white/70 cursor-pointer transition-colors duration-200"
                    >
                      <td className="px-4 py-3 font-raleway text-sm font-medium text-gray-800 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                        {item.year}
                      </td>
                      <td className="px-4 py-3 font-raleway text-sm text-gray-700 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-lg max-[950px]:text-base">{animalData?.emoji || ''}</span>
                          <span>{item.animal}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-raleway text-sm text-gray-700 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                        {item.element}
                      </td>
                      <td className="px-4 py-3 font-raleway text-sm font-medium text-gray-800 max-[950px]:px-2 max-[950px]:py-2 max-[950px]:text-xs">
                        {item.combination}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile-friendly note */}
      <p className="text-xs font-raleway font-light text-gray-500 text-center max-[950px]:block hidden">
        Tap any row to view details
      </p>
    </div>
  )
}
