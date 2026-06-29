import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Container from '../../../components/Container'
import YearTable from './YearTable'
import { isValidYear, findYearByCombination, getZodiacForYear } from './zodiacUtils'
import { ANIMAL_DATA, ELEMENT_DATA, getCombinedMeaning } from './zodiacData'
import { trackToyUse } from '../../../utils/analytics'
import { useSeo, softwareJsonLd } from '../../../utils/seo'

/* The whole Chinese Zodiac toy: year search, the detail view, and the
   animal / element / combined cards. The big browsable grid stays in
   YearTable; the data and lookups stay in zodiacData / zodiacUtils. */

const heading = 'font-serif text-lg font-semibold text-ink'
const body = 'text-[0.95rem] leading-relaxed text-ink-soft'
const chip = 'rounded-full bg-cream px-3 py-1 text-xs font-medium text-clay-deep'
const card = 'rounded-2xl border border-line bg-white/60 p-6 md:p-7'
const navBtn =
  'inline-flex items-center justify-center rounded-lg border border-line bg-white/60 px-4 py-2 text-sm font-semibold text-ink-soft transition-all hover:border-clay/60 hover:text-clay-deep'

function Bullets({ items }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[0.9rem] text-ink-soft">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// A labelled "heading + bulleted list" block, used across all three cards.
function BulletSection({ label, items }) {
  return (
    <div>
      <h3 className={heading}>{label}</h3>
      <div className="mt-2">
        <Bullets items={items} />
      </div>
    </div>
  )
}

function ChipRow({ label, items }) {
  return (
    <div>
      <h3 className={heading}>{label}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((t, i) => (
          <span key={i} className={chip}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function YearSearch({ onYearSelect }) {
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

function AnimalInfo({ animal, animalData }) {
  if (!animalData) return null
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{animalData.emoji}</span>
        <h2 className="font-serif text-2xl font-semibold tracking-[-0.01em] text-ink">{animal}</h2>
      </div>
      <div>
        <h3 className={heading}>Personality</h3>
        <p className={`mt-2 ${body}`}>{animalData.personality}</p>
      </div>
      <ChipRow label="Key traits" items={animalData.traits} />
      <BulletSection label="Strengths" items={animalData.strengths} />
      <BulletSection label="Challenges" items={animalData.weaknesses} />
    </div>
  )
}

function ElementInfo({ element, elementData }) {
  if (!elementData) return null
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{elementData.emoji}</span>
        <h2 className="font-serif text-2xl font-semibold tracking-[-0.01em] text-ink">{element}</h2>
      </div>
      <div>
        <h3 className={heading}>Overview</h3>
        <p className={`mt-2 ${body}`}>{elementData.description}</p>
      </div>
      <ChipRow label="Characteristics" items={elementData.characteristics} />
      <div>
        <h3 className={heading}>Personality influence</h3>
        <p className={`mt-2 ${body}`}>{elementData.personality}</p>
      </div>
      <BulletSection label="Strengths" items={elementData.strengths} />
      <BulletSection label="Challenges" items={elementData.challenges} />
    </div>
  )
}

function CombinedMeaning({ combination, combined }) {
  if (!combined) return null
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-serif text-2xl font-semibold tracking-[-0.01em] text-ink">
        {combination} — meaning
      </h2>
      <div>
        <h3 className={heading}>Overview</h3>
        <p className={`mt-2 ${body}`}>{combined.description}</p>
      </div>
      <div>
        <h3 className={heading}>Combined personality</h3>
        <p className={`mt-2 ${body}`}>{combined.personality}</p>
      </div>
      {combined.traits?.length > 0 && <ChipRow label="Key characteristics" items={combined.traits.slice(0, 8)} />}
      {combined.strengths?.length > 0 && <BulletSection label="Strengths" items={combined.strengths} />}
      {combined.challenges?.length > 0 && <BulletSection label="Challenges" items={combined.challenges} />}
    </div>
  )
}

function YearDetail({ year, onBack, onYearSelect }) {
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

export default function ChineseZodiac() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedYear, setSelectedYear] = useState(null)

  useSeo({
    title: 'Chinese Zodiac — Kevin Bai',
    description: 'Look up any year’s Chinese zodiac animal and element, and what they mean.',
    path: '/apps/zodiac',
    jsonLd: softwareJsonLd({
      name: 'Chinese Zodiac',
      description: 'Look up any year’s Chinese zodiac animal and element, and what they mean.',
      path: '/apps/zodiac',
    }),
  })

  // Read URL parameters on mount and when they change.
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

    // If animal and element are provided, find a matching year.
    if (animalParam && elementParam) {
      const matchingYear = findYearByCombination(animalParam, elementParam)
      if (matchingYear !== null) {
        setSelectedYear(matchingYear)
        // Normalize the URL to a plain year for a cleaner link.
        setSearchParams({ year: matchingYear.toString() }, { replace: true })
        return
      }
    }

    // If no valid params, clear selection.
    if (!yearParam && !animalParam && !elementParam) {
      setSelectedYear(null)
    }
  }, [searchParams, setSearchParams])

  const handleYearSelect = (year) => {
    trackToyUse('zodiac', 'year_select', { zodiac_year: year })
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
        to="/apps"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-deep"
      >
        <span aria-hidden>←</span> Apps
      </Link>

      {selectedYear ? (
        <YearDetail year={selectedYear} onBack={handleBackToTable} onYearSelect={handleYearSelect} />
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
