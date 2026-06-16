import Section from './Section'
import UCBerkeleyLogo from '../../assets/companies/UCBerkeley-logo.png'
import OxfordLogo from '../../assets/companies/Oxford-logo.png'
import AUDLogo from '../../assets/companies/AUD-logo.png'

const educationEntries = [
  {
    logo: UCBerkeleyLogo,
    institution: 'University of California, Berkeley',
    degree: 'Environmental Science, Economics & Public Policy',
    activities: [
      '<strong>David Knutson Scholar</strong> — awarded to the <strong>top student</strong> in the College of Natural Resources graduating class',
      '🌍 <strong>UC Berkeley Model United Nations</strong> — Director of Business Relations; coordinated a <strong>500-student international conference</strong> with participants from 50 universities worldwide',
      '🏛️ <strong>Bowles Hall Student Association</strong> — President of a 200-student residential community; led the Bowles Hall Phoenix Program as Student Member of the Board',
      '🎓 <strong>Student Representative to the UC Board of Regents</strong> — represented the <strong>250,000 students</strong> across the UC system',
      '👑 <strong>Miss Universe at Berkeley</strong> — Director of Marketing for UC Berkeley\'s first beauty pageant',
    ],
  },
  {
    logo: OxfordLogo,
    institution: 'University of Oxford',
    degree: 'Sustainable Development, Renewable Energy, Urban Innovation',
    activities: [
      '<strong>IARU Santander Scholar</strong> — fully funded by Santander Bank to study and research at Oxford',
      '🏆 <strong>Oxford Debate Union</strong> — participated in three debates and <strong>won all three</strong>',
    ],
  },
  {
    logo: AUDLogo,
    institution: 'American University in Dubai',
    degree: 'Middle Eastern History, Politics, Culture & Economics',
    activities: [
      '<strong>William Jefferson Clinton Presidential Scholar</strong> — one of <strong>seven Americans</strong> awarded this honor; fully funded to live, study, and work in the Middle East',
      '🇦🇪 <strong>Founder</strong> of the International Business Student Association',
    ],
  },
]

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Three universities, three continents.">
      <div className="flex flex-col gap-6">
        {educationEntries.map((entry) => (
          <article
            key={entry.institution}
            className="reveal flex flex-col gap-5 rounded-2xl border border-line bg-white/60 p-6 transition-shadow duration-300 hover:shadow-[0_14px_40px_-24px_rgba(27,23,20,0.4)] md:flex-row md:gap-7 md:p-7"
          >
            <div className="flex items-center gap-4 md:w-56 md:shrink-0 md:flex-col md:items-start md:gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-white p-2.5">
                <img src={entry.logo} alt={entry.institution} className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold leading-snug text-ink">
                  {entry.institution}
                </h3>
                <p className="mt-1 text-sm font-medium text-clay-deep">{entry.degree}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5">
              {entry.activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex gap-2.5 [&_strong]:font-semibold [&_strong]:text-ink"
                >
                  <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-clay/70" />
                  <span
                    className="text-[0.95rem] leading-relaxed text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: activity }}
                  />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
