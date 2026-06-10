import Section from './Section'
import { trackOutboundClick } from '../../utils/analytics'

const cities = [
  'San Francisco',
  'New York',
  'Los Angeles',
  'Chicago',
  'London',
  'Bogotá',
  'Dubai',
  'Bangkok',
  'Taipei',
  'Mexico City',
]

const moreLinks = [
  { label: 'Twitter', href: 'https://twitter.com/zkevinbai' },
  {
    label: 'UC Berkeley feature',
    href: 'https://web.archive.org/web/20240622002720/https://nature.berkeley.edu/news/2018/01/student-spotlight-kevin-bai',
  },
]

function Para({ children }) {
  return <p className="text-[1.075rem] leading-[1.8] text-ink-soft">{children}</p>
}

const B = ({ children }) => <strong className="font-semibold text-ink">{children}</strong>

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="I speak customer, executive, and engineer.">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="reveal flex flex-col gap-6">
          <Para>
            I'm the <B>founding Forward Deployed Engineer</B> at <B>Rippling</B> — the first hire,
            helping build the FDE function and solve enterprise problems for our largest and most
            strategic customers. I'm also an <B>avid public speaker</B> across the <B>FDE space</B>.
          </Para>
          <Para>
            I'm a <B>William Jefferson Clinton Presidential Scholar</B> who has studied at{' '}
            <B>UC Berkeley</B>, <B>Oxford University</B>, and the <B>American University in Dubai</B>.
          </Para>
          <Para>
            My background spans <B>diplomacy</B>, <B>sales</B>, <B>business development</B>,{' '}
            <B>product management</B>, <B>customer success</B>, and <B>software engineering</B> —
            and forward deployed engineering brings them all together. I build full-stack
            applications with <B>JavaScript</B>, <B>TypeScript</B>, <B>React</B>, and <B>Python</B>.
            I love new opportunities and I learn quickly.
          </Para>
          <Para>
            I've lived and worked across <B>North America</B>, <B>Europe</B>, <B>the Middle East</B>,{' '}
            <B>East Asia</B>, <B>Southeast Asia</B>, and <B>South America</B>, and speak the{' '}
            <B>six official languages of the United Nations</B>.
          </Para>

          <div className="flex flex-wrap gap-2 pt-1">
            {moreLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick(href, label)}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-clay hover:text-clay-deep"
              >
                {label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '80ms' }}>
          <div className="rounded-2xl border border-line bg-white/60 p-7 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
              I've worked in
            </p>
            <p className="mt-3 font-serif text-lg leading-[1.9] text-ink">
              {cities.map((city, i) => (
                <span key={city} className="whitespace-nowrap">
                  {city}
                  {i < cities.length - 1 && <span className="mx-2 text-muted" aria-hidden>·</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
