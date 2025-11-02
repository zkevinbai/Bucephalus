import UCBerkeleyLogo from '../../assets/companies/UCBerkeley-logo.png'
import OxfordLogo from '../../assets/companies/Oxford-logo.png'
import AUDLogo from '../../assets/companies/AUD-logo.png'

const educationEntries = [
  {
    logo: UCBerkeleyLogo,
    institution: 'University of California, Berkeley',
    degree: 'Environmental Science, Economics, Public Policy',
    activities: [
      '<strong>David Knutson Scholar</strong> — awarded to the <strong>top student</strong> in the College of Natural Resources graduating class',
      '🌍 <strong>UC Berkeley Model United Nations</strong> — <strong>Director of Business Relations</strong>; coordinated a <strong>500-student international conference</strong> with participants from <strong>50 universities worldwide</strong>, managing a <strong>multi-hundred-thousand-dollar project</strong> hosted at the <strong>San Francisco Hilton</strong>',
      '🏛️ <strong>Bowles Hall Student Association</strong> — <strong>President</strong> of a <strong>200-student residential community</strong>; led Bowles during the <strong>Bowles Hall Phoenix Program</strong> and served as <strong>Student Member of the Board</strong>',
      '🎓 <strong>Student Representative to the Board of Regents of the University of California</strong> — represented the <strong>250,000 students</strong> across the UC system on issues such as affordability and campus safety',
      '👑 <strong>Miss Universe at Berkeley</strong> — <strong>Director of Marketing</strong>; coordinated UC Berkeley\'s <strong>first beauty pageant</strong>',
      '🎤 <strong>Peer Health Exchange / AAPI Scholarship Outreach</strong> — <strong>High School Speaker</strong>; traveled to schools to deliver educational and inspirational programs',
    ],
  },
  {
    logo: OxfordLogo,
    institution: 'University of Oxford',
    degree: 'Sustainable Development',
    activities: [
      '<strong>IARU Santander Scholar</strong> — fully funded by <strong>Santander Bank</strong> to study and research at Oxford, focusing on <strong>sustainable development</strong>, <strong>renewable energy</strong>, and <strong>urban innovation</strong>',
      '🏆 <strong>Oxford Debate Union</strong> — participated in <strong>three debates</strong> and <strong>won all</strong>',
    ],
  },
  {
    logo: AUDLogo,
    institution: 'American University in Dubai',
    degree: 'Middle Eastern History, Politics, Culture, Society, and Economics',
    activities: [
      '<strong>William Jefferson Clinton Presidential Scholar</strong> — one of <strong>seven Americans</strong> awarded this honor; fully funded to live, study, and work in the <strong>Middle East</strong> to gain a deep understanding of its <strong>history</strong>, <strong>politics</strong>, <strong>culture</strong>, <strong>society</strong>, and <strong>economics</strong>',
      '🇦🇪 <strong>Founder of the International Business Student Association</strong>',
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
                      dangerouslySetInnerHTML={{ __html: activity }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

