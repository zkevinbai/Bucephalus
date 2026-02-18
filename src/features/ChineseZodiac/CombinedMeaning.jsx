export default function CombinedMeaning({ combination, combined }) {
  if (!combined) return null

  return (
    <div className="flex flex-col gap-4 p-6 max-[950px]:p-4 max-[950px]:gap-3">
      <h2 className="font-raleway text-2xl font-bold text-gray-800 m-0 max-[950px]:text-xl">
        {combination} Meaning
      </h2>

      <div className="flex flex-col gap-4">
        {/* Description */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Overview
          </h3>
          <p className="font-raleway text-base font-light text-gray-700 m-0 leading-relaxed max-[950px]:text-sm">
            {combined.description}
          </p>
        </div>

        {/* Personality */}
        <div>
          <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
            Combined Personality
          </h3>
          <p className="font-raleway text-base font-light text-gray-700 m-0 leading-relaxed max-[950px]:text-sm">
            {combined.personality}
          </p>
        </div>

        {/* Combined Traits */}
        {combined.traits && combined.traits.length > 0 && (
          <div>
            <h3 className="font-raleway text-lg font-semibold text-gray-800 m-0 mb-2 max-[950px]:text-base">
              Key Characteristics
            </h3>
            <div className="flex flex-wrap gap-2">
              {combined.traits.slice(0, 8).map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/60 border border-gray-300/40 rounded-md text-sm font-raleway font-light text-gray-700 max-[950px]:text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
