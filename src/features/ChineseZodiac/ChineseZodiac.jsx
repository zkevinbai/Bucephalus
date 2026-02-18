import { useState } from 'react'
import { useEffect } from 'react'
import Grid from '../Portfolio/Grid'
import GridBox from '../Portfolio/GridBox'
import YearSearch from './YearSearch'
import YearTable from './YearTable'
import YearDetail from './YearDetail'

export default function ChineseZodiac() {
  const [selectedYear, setSelectedYear] = useState(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleYearSelect = (year) => {
    setSelectedYear(year)
  }

  const handleBackToTable = () => {
    setSelectedYear(null)
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
          <h1 className="font-raleway text-[2.25rem] font-bold text-transparent bg-[linear-gradient(135deg,#1a1a3a_0%,#307ff6_50%,#1a1a3a_100%)] bg-[length:200%_auto] bg-clip-text [-webkit-background-clip:text] animate-shimmer m-0 leading-tight tracking-[-0.02em] text-center">
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
