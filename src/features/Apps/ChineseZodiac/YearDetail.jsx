import { useMemo } from 'react'
import { getZodiacForYear } from './zodiacUtils'
import { ANIMAL_DATA, ELEMENT_DATA, getCombinedMeaning } from './zodiacData'
import AnimalInfo from './AnimalInfo'
import ElementInfo from './ElementInfo'
import CombinedMeaning from './CombinedMeaning'

const navBtn =
  'inline-flex items-center justify-center rounded-lg border border-line bg-white/60 px-4 py-2 text-sm font-semibold text-ink-soft transition-all hover:border-clay/60 hover:text-clay-deep'

const card = 'rounded-2xl border border-line bg-white/60 p-6 md:p-7'

export default function YearDetail({ year, onBack, onYearSelect }) {
  const zodiacData = useMemo(() => {
    const zodiac = getZodiacForYear(year)
    return {
      ...zodiac,
      animalData: ANIMAL_DATA[zodiac.animal],
      elementData: ELEMENT_DATA[zodiac.element],
      combined: getCombinedMeaning(zodiac.animal, zodiac.element),
    }
  }, [year])

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className={navBtn}>
          ← All years
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => onYearSelect(year - 1)} className={navBtn}>
            ← {year - 1}
          </button>
          <button onClick={() => onYearSelect(year + 1)} className={navBtn}>
            {year + 1} →
          </button>
        </div>
      </div>

      {/* Year header */}
      <div className={`${card} text-center`}>
        <p className="eyebrow">Year {year}</p>
        <div className="mt-3 flex items-center justify-center gap-4 text-5xl md:text-6xl">
          <span>{zodiacData.animalData.emoji}</span>
          <span>{zodiacData.elementData.emoji}</span>
        </div>
        <h1 className="mt-4 font-serif text-[2.2rem] font-semibold tracking-[-0.02em] text-ink md:text-4xl">
          {zodiacData.combination}
        </h1>
      </div>

      {/* Animal + Element */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}>
          <AnimalInfo animal={zodiacData.animal} animalData={zodiacData.animalData} />
        </div>
        <div className={card}>
          <ElementInfo element={zodiacData.element} elementData={zodiacData.elementData} />
        </div>
      </div>

      {/* Combined meaning */}
      <div className={card}>
        <CombinedMeaning combination={zodiacData.combination} combined={zodiacData.combined} />
      </div>
    </div>
  )
}
