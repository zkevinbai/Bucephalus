import { useState } from 'react'

export default function TabNavigation({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  return (
    <div className="flex flex-col gap-6 w-full h-full min-h-0">
      <div className="flex gap-2 justify-center flex-wrap border-b border-gray-300/40 pb-2 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-raleway font-medium text-base transition-all duration-200 rounded-t-lg border-b-2 ${
              activeTab === tab.id
                ? 'border-[rgba(48,127,246,0.8)] text-gray-900 bg-white/60'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-white/30'
            } max-[800px]:px-4 max-[800px]:py-2 max-[800px]:text-sm`}
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

