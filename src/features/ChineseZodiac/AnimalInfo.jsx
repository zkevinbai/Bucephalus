export default function AnimalInfo({ animal, animalData }) {
  if (!animalData) return null

  return (
    <div className="flex flex-col gap-4 p-6 max-[950px]:p-4 max-[950px]:gap-3">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl max-[950px]:text-3xl">{animalData.emoji}</span>
        <h2 className="font-raleway text-2xl font-bold text-gray-800 m-0 max-[950px]:text-xl">
          {animal}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Personality */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Personality
          </h3>
          <p className="font-raleway text-base font-light text-gray-700 m-0 leading-relaxed max-[950px]:text-sm">
            {animalData.personality}
          </p>
        </div>

        {/* Traits */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Key Traits
          </h3>
          <div className="flex flex-wrap gap-2">
            {animalData.traits.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/60 border border-gray-300/40 rounded-md text-sm font-raleway font-light text-gray-700 max-[950px]:text-xs"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Strengths
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {animalData.strengths.map((strength, index) => (
              <li
                key={index}
                className="flex items-start gap-2 font-raleway text-sm font-light text-gray-700 max-[950px]:text-xs"
              >
                <span className="text-gray-400 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Challenges
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {animalData.weaknesses.map((weakness, index) => (
              <li
                key={index}
                className="flex items-start gap-2 font-raleway text-sm font-light text-gray-700 max-[950px]:text-xs"
              >
                <span className="text-gray-400 mt-1">•</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
