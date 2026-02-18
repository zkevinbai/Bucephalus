import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Grid from '../Portfolio/Grid'
import GridBox from '../Portfolio/GridBox'
import YearSearch from './YearSearch'
import YearTable from './YearTable'
import YearDetail from './YearDetail'
import { isValidYear, findYearByCombination } from './zodiacUtils'

export default function ChineseZodiac() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedYear, setSelectedYear] = useState(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Read URL parameters on mount and when they change
  useEffect(() => {
    const yearParam = searchParams.get('year')
    const animalParam = searchParams.get('animal')
    const elementParam = searchParams.get('element')

    // Priority: year > animal+element
    if (yearParam) {
      const year = parseInt(yearParam, 10)
      if (isValidYear(year)) {
        setSelectedYear(year)
        return
      }
    }

    // If animal and element are provided, find a matching year
    if (animalParam && elementParam) {
      const matchingYear = findYearByCombination(animalParam, elementParam)
      
      if (matchingYear !== null) {
        setSelectedYear(matchingYear)
        // Update URL to use year instead of animal+element for cleaner URL
        setSearchParams({ year: matchingYear.toString() }, { replace: true })
        return
      }
    }

    // If no valid params, clear selection
    if (!yearParam && !animalParam && !elementParam) {
      setSelectedYear(null)
    }
  }, [searchParams, setSearchParams])

  const handleYearSelect = (year) => {
    setSelectedYear(year)
    // Update URL with year parameter
    setSearchParams({ year: year.toString() }, { replace: true })
  }

  const handleBackToTable = () => {
    setSelectedYear(null)
    // Clear URL parameters when going back
    setSearchParams({}, { replace: true })
  }

  if (selectedYear) {
    return (
      <Grid>
        <YearDetail 
          year={selectedYear} 
          onBack={handleBackToTable}
          onYearSelect={handleYearSelect}
        />
      </Grid>
    )
  }

  return (
    <Grid>
      {/* Hero Section with Search */}
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1 justify-items-center">
        <div className="flex flex-col gap-4 p-6 w-full max-[950px]:p-4">
          <h1 className="font-raleway text-[2.25rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#ef4444_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
            Chinese Zodiac
          </h1>
          <p className="font-raleway text-base font-light text-gray-800 m-0 leading-[1.7] tracking-[0.01em] text-center">
            Explore the <strong>12 Chinese zodiac animals</strong> and <strong>5 elements</strong> to discover your year's sign and meaning.
          </p>
          {/* Search Form - Outside main content box */}
          <div className="mt-4">
            <YearSearch onYearSelect={handleYearSelect} />
          </div>
        </div>
      </GridBox>

      {/* Year Table - Default and only view */}
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1">
        <YearTable onYearSelect={handleYearSelect} />
      </GridBox>
    </Grid>
  )
}
