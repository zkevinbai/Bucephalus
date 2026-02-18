import { useState } from 'react'

export default function TabNavigation({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  return (
    <div className="flex flex-col gap-6 w-full h-full min-h-0">
      <div className="flex gap-2 justify-center flex-wrap border-b-2 border-[#ef4444] pb-3 flex-shrink-0 bg-gradient-to-r from-red-50 via-white to-red-50 px-4 py-2 rounded-t-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-raleway font-semibold text-base transition-all duration-300 rounded-t-lg border-b-3 ${
              activeTab === tab.id
                ? 'border-[#ef4444] text-[#ef4444] bg-white shadow-md'
                : 'border-transparent text-gray-600 hover:text-[#ef4444] hover:bg-red-50'
            } max-[950px]:px-4 max-[950px]:py-2 max-[950px]:text-sm`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full flex-1 min-h-0 overflow-y-auto">
        {children(activeTab)}
      </div>
    </div>
  )
}

