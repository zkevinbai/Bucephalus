const heading = 'font-serif text-lg font-semibold text-ink'
const body = 'text-[0.95rem] leading-relaxed text-ink-soft'
const chip =
  'rounded-full bg-cream px-3 py-1 text-xs font-medium text-clay-deep'

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

export default function AnimalInfo({ animal, animalData }) {
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

      <div>
        <h3 className={heading}>Key traits</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {animalData.traits.map((trait, i) => (
            <span key={i} className={chip}>
              {trait}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className={heading}>Strengths</h3>
        <div className="mt-2">
          <Bullets items={animalData.strengths} />
        </div>
      </div>

      <div>
        <h3 className={heading}>Challenges</h3>
        <div className="mt-2">
          <Bullets items={animalData.weaknesses} />
        </div>
      </div>
    </div>
  )
}
