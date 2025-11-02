import UCBerkeleyLogo from '../../assets/companies/UCBerkeley-logo.png'
import OxfordLogo from '../../assets/companies/Oxford-logo.png'
import AUDLogo from '../../assets/companies/AUD-logo.png'

const educationEntries = [
  {
    logo: UCBerkeleyLogo,
    institution: 'University of California, Berkeley',
    degree: 'Environmental Science, Economics, Public Policy',
    activities: [
      'David Knutson Scholar — awarded to the top student in the College of Natural Resources graduating class',
      'UC Berkeley Model United Nations — Director of Business Relations; coordinated a 500-student international conference with participants from 50 universities worldwide, managing a multi-hundred-thousand-dollar project hosted at the San Francisco Hilton',
      'Bowles Hall Student Association — President of a 200-student residential community; led Bowles during the Bowles Hall Phoenix Program and served as Student Member of the Board',
      'Student Representative to the Board of Regents of the University of California — represented the 250,000 students across the UC system on issues such as affordability and campus safety',
      'Miss Universe at Berkeley — Director of Marketing; coordinated UC Berkeley\'s first beauty pageant',
      'Peer Health Exchange / AAPI Scholarship Outreach — High School Speaker; traveled to schools to deliver educational and inspirational programs',
    ],
  },
  {
    logo: OxfordLogo,
    institution: 'University of Oxford',
    degree: 'Sustainable Development',
    activities: [
      'IARU Santander Scholar — fully funded by Santander Bank to study and research at Oxford, focusing on sustainable development, renewable energy, and urban innovation',
      'Oxford Debate Union — participated in three debates and won all',
    ],
  },
  {
    logo: AUDLogo,
    institution: 'American University in Dubai',
    degree: 'Middle Eastern History, Politics, Culture, Society, and Economics',
    activities: [
      'William Jefferson Clinton Presidential Scholar — one of seven Americans awarded this honor; fully funded to live, study, and work in the Middle East to gain a deep understanding of its history, politics, culture, society, and economics',
      'Founder of the International Business Student Association',
    ],
  },
]

export default function Education() {
  return (
    <div className="flex flex-col gap-6 w-full">
          {educationEntries.map((entry, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm hover:bg-white/70 hover:shadow-md transition-all duration-300 max-[800px]:flex-col max-[800px]:items-center"
            >
              <div className="shrink-0 w-16 h-16 max-[800px]:w-12 max-[800px]:h-12">
                <img
                  src={entry.logo}
                  alt={`${entry.institution} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 font-raleway m-0 max-[800px]:text-lg">
                    {entry.institution}
                  </h3>
                  <h4 className="text-lg font-medium text-gray-700 font-raleway m-0 max-[800px]:text-base">
                    {entry.degree}
                  </h4>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {entry.activities.map((activity, actIndex) => (
                    <p
                      key={actIndex}
                      className="text-sm font-light text-gray-700 font-raleway m-0 leading-relaxed max-[800px]:text-xs"
                    >
                      {activity}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

