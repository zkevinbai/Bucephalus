export default function ElementInfo({ element, elementData }) {
  if (!elementData) return null

  return (
    <div className="flex flex-col gap-4 p-6 max-[950px]:p-4 max-[950px]:gap-3">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl max-[950px]:text-3xl">{elementData.emoji}</span>
        <h2 className="font-raleway text-2xl font-bold text-gray-800 m-0 max-[950px]:text-xl">
          {element}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Description */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Overview
          </h3>
          <p className="font-raleway text-base font-light text-gray-700 m-0 leading-relaxed max-[950px]:text-sm">
            {elementData.description}
          </p>
        </div>

        {/* Characteristics */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Characteristics
          </h3>
          <div className="flex flex-wrap gap-2">
            {elementData.characteristics.map((char, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm font-raleway font-light text-gray-700 max-[950px]:text-xs"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Personality */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Personality Influence
          </h3>
          <p className="font-raleway text-base font-light text-gray-700 m-0 leading-relaxed max-[950px]:text-sm">
            {elementData.personality}
          </p>
        </div>

        {/* Strengths */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Strengths
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {elementData.strengths.map((strength, index) => (
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

        {/* Challenges */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Challenges
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {elementData.challenges.map((challenge, index) => (
              <li
                key={index}
                className="flex items-start gap-2 font-raleway text-sm font-light text-gray-700 max-[950px]:text-xs"
              >
                <span className="text-gray-400 mt-1">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
