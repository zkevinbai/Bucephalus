import { useState, useMemo } from 'react'
import { generateYearRange, getZodiacForYear, ELEMENTS } from './zodiacUtils'
import { ANIMAL_DATA, ELEMENT_DATA } from './zodiacData'

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
    <div className="flex flex-col gap-4 p-6 w-full max-[950px]:p-4 max-[950px]:gap-3">
      {/* Compact Filters - Horizontal Scrollable */}
      <div className="bg-white/50 border border-gray-300/40 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          {/* Year Range - Compact */}
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="font-raleway text-xs font-medium text-gray-700">
                Year Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={startYear}
                  onChange={(e) => setStartYear(parseInt(e.target.value) || 1900)}
                  min="1900"
                  max="2100"
                  className="w-24 px-2 py-1.5 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
                />
                <span className="self-center text-gray-500">-</span>
                <input
                  type="number"
                  value={endYear}
                  onChange={(e) => setEndYear(parseInt(e.target.value) || 2100)}
                  min="1900"
                  max="2100"
                  className="w-24 px-2 py-1.5 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
                />
              </div>
            </div>
            {/* Results Count */}
            <div className="text-xs font-raleway font-light text-gray-600 whitespace-nowrap">
              {filteredData.length} of {yearData.length} years
            </div>
          </div>

          {/* Search and Filters - Horizontal Scrollable on Mobile */}
          <div className="overflow-x-auto -mx-2 px-2">
            <div className="flex gap-3 min-w-max md:min-w-0 md:grid md:grid-cols-3">
              <div className="flex flex-col gap-1 min-w-[200px] md:min-w-0">
                <label className="font-raleway text-xs font-medium text-gray-700">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search years, animals..."
                  className="px-3 py-1.5 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-[180px] md:min-w-0">
                <label className="font-raleway text-xs font-medium text-gray-700">
                  Animal
                </label>
                <select
                  value={filterAnimal}
                  onChange={(e) => setFilterAnimal(e.target.value)}
                  className="px-3 py-1.5 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
                >
                  <option value="">All Animals</option>
                  {Object.keys(ANIMAL_DATA).map(animal => (
                    <option key={animal} value={animal}>
                      {ANIMAL_DATA[animal].emoji} {animal}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 min-w-[180px] md:min-w-0">
                <label className="font-raleway text-xs font-medium text-gray-700">
                  Element
                </label>
                <select
                  value={filterElement}
                  onChange={(e) => setFilterElement(e.target.value)}
                  className="px-3 py-1.5 bg-white/60 border border-gray-300/50 rounded-lg font-raleway text-sm text-gray-800 focus:outline-none focus:border-[rgba(48,127,246,0.6)] transition-all duration-300"
                >
                  <option value="">All Elements</option>
                  {ELEMENTS.map(element => (
                    <option key={element} value={element}>
                      {ELEMENT_DATA[element]?.emoji || ''} {element}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table - Scrollable */}
      <div className="bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm overflow-hidden flex flex-col" style={{ maxHeight: '60vh' }}>
        <div className="overflow-x-auto overflow-y-auto flex-1">
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
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-8 text-center font-raleway text-sm text-gray-600">
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
                        <div className="flex items-center gap-2">
                          <span className="text-lg max-[950px]:text-base">{ELEMENT_DATA[item.element]?.emoji || ''}</span>
                          <span>{item.element}</span>
                        </div>
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
