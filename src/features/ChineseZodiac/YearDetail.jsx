import { useMemo } from 'react'
import { getZodiacForYear } from './zodiacUtils'
import { ANIMAL_DATA, ELEMENT_DATA, getCombinedMeaning } from './zodiacData'
import AnimalInfo from './AnimalInfo'
import ElementInfo from './ElementInfo'
import CombinedMeaning from './CombinedMeaning'
import GridBox from '../Portfolio/GridBox'

export default function YearDetail({ year, onBack, onYearSelect }) {
  const zodiacData = useMemo(() => {
    const zodiac = getZodiacForYear(year)
    const animalData = ANIMAL_DATA[zodiac.animal]
    const elementData = ELEMENT_DATA[zodiac.element]
    const combined = getCombinedMeaning(zodiac.animal, zodiac.element)
    
    return {
      ...zodiac,
      animalData,
      elementData,
      combined
    }
  }, [year])

  const handlePreviousYear = () => {
    if (year > 1900) {
      onYearSelect(year - 1)
    }
  }

  const handleNextYear = () => {
    if (year < 2100) {
      onYearSelect(year + 1)
    }
  }

  return (
    <>
      {/* Header with Navigation */}
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1">
        <div className="flex flex-col gap-4 p-6 max-[950px]:p-4 max-[950px]:gap-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-raleway font-medium text-gray-800 hover:bg-white/80 hover:border-[rgba(239,68,68,0.6)] transition-all duration-300 max-[950px]:px-3 max-[950px]:py-1.5 max-[950px]:text-sm"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreviousYear}
                disabled={year <= 1900}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-raleway font-medium text-gray-800 hover:bg-white/80 hover:border-[rgba(239,68,68,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed max-[950px]:px-3 max-[950px]:py-1.5 max-[950px]:text-sm"
              >
                ← {year - 1}
              </button>
              <button
                onClick={handleNextYear}
                disabled={year >= 2100}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-raleway font-medium text-gray-800 hover:bg-white/80 hover:border-[rgba(239,68,68,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed max-[950px]:px-3 max-[950px]:py-1.5 max-[950px]:text-sm"
              >
                {year + 1} →
              </button>
            </div>
          </div>

          {/* Year Header */}
          <div className="text-center">
            <h1 className="font-raleway text-4xl font-bold text-gray-800 m-0 mb-3 tracking-[-0.01em] max-[950px]:text-3xl">
              Year {year}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-5xl max-[950px]:text-4xl">{zodiacData.animalData.emoji}</span>
              <span className="text-5xl max-[950px]:text-4xl">{zodiacData.elementData.emoji}</span>
            </div>
            <p className="font-raleway text-2xl font-semibold text-gray-800 m-0 max-[950px]:text-xl">
              {zodiacData.combination}
            </p>
          </div>
        </div>
      </GridBox>

      {/* Animal Information */}
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-1 !grid-cols-1">
        <AnimalInfo animal={zodiacData.animal} animalData={zodiacData.animalData} />
      </GridBox>

      {/* Element Information */}
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-1 !grid-cols-1">
        <ElementInfo element={zodiacData.element} elementData={zodiacData.elementData} />
      </GridBox>

      {/* Combined Meaning */}
      <GridBox shouldEmphasizeLeft={false} className="md:col-span-2 !grid-cols-1">
        <CombinedMeaning 
          combination={zodiacData.combination}
          combined={zodiacData.combined}
        />
      </GridBox>
    </>
  )
}
