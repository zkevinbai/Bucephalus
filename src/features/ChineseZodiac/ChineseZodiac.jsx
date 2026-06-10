import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Container from '../../components/Container'
import YearSearch from './YearSearch'
import YearTable from './YearTable'
import YearDetail from './YearDetail'
import { isValidYear, findYearByCombination } from './zodiacUtils'

export default function ChineseZodiac() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedYear, setSelectedYear] = useState(null)

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
    setSearchParams({ year: year.toString() }, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToTable = () => {
    setSelectedYear(null)
    setSearchParams({}, { replace: true })
  }

  return (
    <Container size="page" className="pt-28 pb-8 md:pt-36">
      <Link
        to="/toys"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
      >
        <span aria-hidden>←</span> Toys
      </Link>

      {selectedYear ? (
        <YearDetail
          year={selectedYear}
          onBack={handleBackToTable}
          onYearSelect={handleYearSelect}
        />
      ) : (
        <>
          <header className="mt-8 max-w-reading">
            <p className="eyebrow">Fun</p>
            <h1 className="mt-3 font-serif text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink md:text-5xl">
              Chinese Zodiac
            </h1>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-muted">
              Explore the 12 zodiac animals and 5 elements to discover any year&rsquo;s sign and
              what it means. Search a year, or browse the table below.
            </p>
          </header>

          <div className="mt-8 max-w-reading">
            <YearSearch onYearSelect={handleYearSelect} />
          </div>

          <div className="mt-8">
            <YearTable onYearSelect={handleYearSelect} />
          </div>
        </>
      )}
    </Container>
  )
}
