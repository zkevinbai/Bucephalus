import Section from './Section'
import CursorLogo from '../../assets/companies/Cursor-logo.png'
import ChatGPTLogo from '../../assets/companies/ChatGPT-logo.svg'
import ClaudeLogo from '../../assets/companies/Claude-logo.svg'
import VercelLogo from '../../assets/companies/Vercel-logo.png'
import GeminiLogo from '../../assets/companies/Gemini-logo.svg'
import AWSLogo from '../../assets/companies/AWS-logo.svg'
import PythonLogo from '../../assets/companies/Python-logo.svg'

const competencies = [
  'Forward Deployed Engineering',
  'Enterprise AI Deployment',
  '0→1 Team Building',
  'Player-Coach Leadership',
  'Technical Architecture Review',
  'Pre-Sales Scoping & SOWs',
  'Cross-Functional Stakeholder Management',
  'LLM / MCP / Agent Tooling',
  'Hiring & Developing Engineers',
  'Engagement Playbook Design',
  'Executive Presence',
  'International Expansion',
  'Intercultural Leadership',
]

const languages = [
  { flag: '🇨🇳', name: 'Chinese' },
  { flag: '🇺🇸', name: 'English' },
  { flag: '🇲🇽', name: 'Spanish' },
  { flag: '🇫🇷', name: 'French' },
  { flag: '🇦🇪', name: 'Arabic' },
  { flag: '🇷🇺', name: 'Russian' },
]

// Each item is either a devicon class or an imported logo.
const groups = [
  {
    label: 'Programming languages',
    items: [
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Python', logo: PythonLogo },
      { name: 'Ruby', icon: 'devicon-ruby-plain colored' },
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    ],
  },
  {
    label: 'Frameworks & Data',
    items: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
    ],
  },
  {
    label: 'AI and platforms',
    items: [
      { name: 'Claude', logo: ClaudeLogo, fill: true },
      { name: 'ChatGPT', logo: ChatGPTLogo, fill: true },
      { name: 'Gemini', logo: GeminiLogo, fill: true },
      { name: 'Cursor', logo: CursorLogo },
      { name: 'Vercel', logo: VercelLogo },
      { name: 'AWS', logo: AWSLogo },
    ],
  },
]

function SkillPill({ item }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white/60 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay/60 hover:bg-white">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center text-2xl">
        {item.icon ? (
          <i className={item.icon} />
        ) : (
          <img
            src={item.logo}
            alt=""
            className={`object-contain ${item.fill ? 'h-[120%] w-[120%]' : 'h-full w-full'}`}
          />
        )}
      </div>
      <span className="text-sm font-medium text-ink-soft">{item.name}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="More than a tech stack."
    >
      <div className="flex flex-col gap-10">
        {/* Core competencies */}
        <div className="reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Core competencies
          </p>
          <div className="flex flex-wrap gap-2">
            {competencies.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-cream px-3.5 py-1.5 text-[0.85rem] font-medium text-ink-soft"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Spoken languages */}
        <div className="reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Spoken languages — the six official languages of the United Nations
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {languages.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-3 rounded-xl border border-line bg-white/60 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay/60 hover:bg-white"
              >
                <span className="text-2xl" aria-hidden>
                  {l.flag}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{l.name}</span>
                  {l.detail && <span className="mt-0.5 block text-xs text-muted">{l.detail}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {groups.map((group) => (
          <div key={group.label} className="reveal">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {group.label}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {group.items.map((item) => (
                <SkillPill key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
