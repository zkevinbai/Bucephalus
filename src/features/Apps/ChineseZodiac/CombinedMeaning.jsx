const heading = 'font-serif text-lg font-semibold text-ink'
const body = 'text-[0.95rem] leading-relaxed text-ink-soft'
const chip = 'rounded-full bg-cream px-3 py-1 text-xs font-medium text-clay-deep'

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

export default function CombinedMeaning({ combination, combined }) {
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

      {combined.traits?.length > 0 && (
        <div>
          <h3 className={heading}>Key characteristics</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {combined.traits.slice(0, 8).map((trait, i) => (
              <span key={i} className={chip}>
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {combined.strengths?.length > 0 && (
        <div>
          <h3 className={heading}>Strengths</h3>
          <div className="mt-2">
            <Bullets items={combined.strengths} />
          </div>
        </div>
      )}

      {combined.challenges?.length > 0 && (
        <div>
          <h3 className={heading}>Challenges</h3>
          <div className="mt-2">
            <Bullets items={combined.challenges} />
          </div>
        </div>
      )}
    </div>
  )
}
