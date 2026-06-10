import Section from './Section'
import RipplingLogo from '../../assets/companies/Rippling-logo.png'
import UNLogo from '../../assets/companies/UN-logo.svg'
import PalantirLogo from '../../assets/companies/palantir-logo.svg'
import GlobalityLogo from '../../assets/companies/Globality-logo.png'
import UNHCRLogo from '../../assets/companies/UNHCR-logo.svg'
import KevinLogo from '../../assets/companies/KevinBai-logo.png'

const careerEntries = [
  {
    logo: RipplingLogo,
    dark: false,
    title: 'Founding Forward Deployed Engineer',
    company: 'Rippling',
    dateRange: '2025 — Present',
    location: 'San Francisco Bay Area',
    bullets: [
      'Founding <strong>Forward Deployed Engineer</strong> at Rippling, <strong>first hire</strong>. Here to help build the <strong>FDE function</strong> — a Forward Deployed Engineer is part consultant, part product manager, and part software engineer: a <strong>founder-shaped engineer</strong>',
      "Solve <strong>enterprise problems</strong> for Rippling's <strong>largest and most strategic customers</strong>. If there's a SKU we don't have, we invent it. Our north star is the success of our customers on Rippling",
      'Created the <strong>Slack channel and GitHub repo</strong>, authored the <strong>first FDE SOPs</strong>, completed the <strong>first FDE project</strong>, and wrote the <strong>first 250K lines of FDE code</strong>',
    ],
  },
  {
    logo: UNLogo,
    dark: false,
    title: 'United Nations Youth Representative',
    company: 'Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO)',
    dateRange: '2017 — Present',
    location: 'Vienna, Austria',
    bullets: [
      {
        text: '<strong>🇺🇳 United Nations Keynote Speaker</strong>',
        subBullets: [
          '<strong>UN Science and Technology Conference</strong> — Vienna, Austria',
          '<strong>UN Youth Conference</strong> — Moscow, Russian Federation',
        ],
      },
      {
        text: '<strong>📰 Youth Newsroom Reporter:</strong> Organized and conducted interviews for UN News with senior executives of the CTBTO',
        subBullets: [
          '<strong>Wolfgang Hoffmann</strong> — Negotiator of the CTBT Treaty',
          '<strong>Dr. Lassina Zerbo</strong> — Executive Secretary of the CTBTO',
        ],
      },
      {
        text: 'Currently working with the <strong>CTBT team</strong> to advocate for full enforcement of the <strong>Comprehensive Nuclear-Test-Ban Treaty (CTBT)</strong>',
        subBullets: [],
      },
    ],
  },
  {
    logo: KevinLogo,
    dark: false,
    title: 'Public Speaker',
    company: 'Independent',
    dateRange: '2014 — Present',
    location: 'Various locations',
    bullets: [
      {
        text: '<strong>🎤 Keynote and panel speaker</strong> at <strong>enterprise and United Nations events</strong>',
        subBullets: [],
      },
      {
        text: 'Selected speaking engagements:',
        chips: true,
        subBullets: [
          'Y Combinator · SF · 2025',
          'Rocketlane · SF · 2025',
          'Palantir · Denver · 2022',
          'Palantir · London · 2022',
          'United Nations · Remote · 2021',
          'Palantir · NYC · 2021',
          'General Assembly · 2020',
          'Atlassian · Las Vegas · 2019',
          'United Nations · Moscow · 2018',
          'United Nations · Vienna · 2017',
          'FOCUS · SF · 2016',
          'FOCUS · Mexico City · 2016',
          'UC Board of Regents · Oakland · 2014',
        ],
      },
    ],
  },
  {
    logo: PalantirLogo,
    dark: true,
    title: 'Forward Deployed Software Engineer',
    company: 'Palantir Technologies',
    dateRange: 'May 2021 — Apr 2025',
    location: 'LA · NYC · Chicago · London · Denver · DC · Bogotá',
    bullets: [
      {
        text: 'Solved <strong>open-ended problems</strong> at the <strong>most important institutions in the world</strong>. Owned every stage from <strong>discovery to delivery</strong> — translating business needs into product capabilities and leading teams to build <strong>full-stack software</strong> that creates <strong>measurable value</strong>',
        subBullets: [],
      },
      {
        text: '<strong>🎩 Hats I wore</strong>',
        chips: true,
        subBullets: ['FDE', 'Full Stack Engineer', 'Product Manager', 'Data Scientist', 'Business Development', 'Consultant', 'Strategist', 'Customer Success'],
      },
      {
        text: '<strong>⚡️ Technologies</strong>',
        chips: true,
        subBullets: ['TypeScript', 'React', 'Python', 'Spark', 'PySpark', 'SQL', 'Azure', 'AWS', 'Foundry', 'Data Pipelines', 'AIP'],
      },
      {
        text: '<strong>Selected work</strong>',
        subBullets: [
          '<strong>🍺 Led a multi-million-dollar project</strong> to digitize the innovation workflow of a <strong>Fortune 500 CPG company</strong>. Built <strong>five applications in six months</strong>, drove adoption from <strong>0 to 800 users in two months</strong>, and achieved savings <strong>more than 10× the initial expectations</strong>',
          '<strong>✈️ Led a multi-million-dollar project</strong> to improve operational efficiency and safety for a <strong>Fortune 500 airline</strong>. Digitized safety analysis, automated damage and injury reporting, and improved a major engineering division by <strong>10 hours per engineer per week</strong>',
          '<strong>♻️ Led development</strong> of the first auth-agnostic, stack-agnostic user-information module, and the company\'s <strong>first internal pipeline</strong> connecting internal and demo environments',
        ],
      },
    ],
  },
  {
    logo: GlobalityLogo,
    dark: false,
    title: 'Full Stack Software Engineer',
    company: 'Globality, Inc.',
    dateRange: '2019 — 2021',
    location: 'San Francisco Bay Area',
    bullets: [
      {
        text: '<strong>🦄 Globality became a unicorn while I was there.</strong> Joined shortly after the garage stage and stayed through Series E, helping raise over <strong>$350M in two years</strong> for a trailblazing <strong>AI enterprise SaaS platform</strong> — before ChatGPT existed',
        subBullets: [],
      },
      {
        text: 'Built with <strong>JavaScript</strong>, <strong>React</strong>, <strong>GraphQL</strong>, <strong>Node</strong>, and <strong>Python</strong> to create the <strong>first AI-powered procurement ecosystem</strong>, helping enterprises save up to <strong>40% on eight-figure projects</strong>',
        subBullets: [],
      },
      {
        text: '<strong>Highlights</strong>',
        subBullets: [
          '<strong>🥇 First place</strong> — 2020 Globality Hackathon',
          'Led <strong>product engineering</strong> for multiple key features, from technical design through production',
          'Improved platform accessibility from <strong>52 to 95 / 100</strong>, achieving <strong>WCAG AA compliance</strong>',
          'Introduced <strong>Amplitude analytics</strong> across the platform using the delegation pattern',
        ],
      },
    ],
  },
  {
    logo: UNHCRLogo,
    dark: false,
    title: 'Private Sector Partnerships',
    company: 'UNHCR, the UN Refugee Agency',
    dateRange: '2017',
    location: 'Dubai, United Arab Emirates',
    bullets: [
      {
        text: '<strong>🇺🇳 Worked in support of refugees</strong> during the peak of the <strong>2017 Syrian Civil War and Refugee Crisis</strong>, building partnerships with leading corporations and nonprofits on behalf of the <strong>United Nations</strong>',
        subBullets: [
          'Partnered with <strong>IKEA</strong> on a <strong>modular refugee shelter</strong> — mass-manufacturable, assembled without power tools, easily repaired',
          'Partnered with <strong>Facebook</strong> on the <strong>first VR fundraising campaign</strong> for refugees',
          'Partnered with <strong>Microsoft</strong> to enable <strong>digital cash-aid distribution</strong> for displaced populations',
        ],
      },
      {
        text: 'Developed the <strong>Qatar outreach strategy</strong> for UNHCR Private Sector Partnerships, authored <strong>executive briefings</strong> for the High Commissioner, and co-wrote the <strong>UNHCR MENA newsletter</strong>',
        subBullets: [],
      },
    ],
  },
]

function Bullet({ text }) {
  return (
    <div className="flex gap-2.5 [&_strong]:font-semibold [&_strong]:text-ink">
      <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-clay/70" />
      <span
        className="text-[0.97rem] leading-relaxed text-ink-soft"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

function ChipRow({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-line bg-cream px-3 py-1 text-[0.8rem] font-medium text-ink-soft"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function Entry({ entry }) {
  return (
    <article className="reveal relative md:pl-24">
      {/* node / logo */}
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-line shadow-sm md:absolute md:left-0 md:top-0 md:mb-0 ${
          entry.dark ? 'bg-[#14110e] p-3' : 'bg-white p-2.5'
        }`}
      >
        <img src={entry.logo} alt={`${entry.company} logo`} className="h-full w-full object-contain" />
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 transition-shadow duration-300 hover:shadow-[0_14px_40px_-24px_rgba(27,23,20,0.4)] md:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-serif text-xl font-semibold tracking-[-0.01em] text-ink md:text-[1.4rem]">
            {entry.title}
          </h3>
          <span className="text-sm font-medium text-clay-deep">{entry.dateRange}</span>
        </div>
        <p className="mt-1 text-[0.95rem] font-medium text-ink-soft">{entry.company}</p>
        <p className="mt-0.5 text-sm text-muted">{entry.location}</p>

        <div className="mt-5 flex flex-col gap-4">
          {entry.bullets.map((bullet, i) => {
            if (typeof bullet === 'string') return <Bullet key={i} text={bullet} />
            return (
              <div key={i} className="flex flex-col gap-2.5">
                <Bullet text={bullet.text} />
                {bullet.subBullets?.length > 0 &&
                  (bullet.chips ? (
                    <div className="md:pl-4">
                      <ChipRow items={bullet.subBullets} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 pl-4 md:pl-6">
                      {bullet.subBullets.map((sub, j) => (
                        <div
                          key={j}
                          className="flex gap-2.5 [&_strong]:font-semibold [&_strong]:text-ink"
                        >
                          <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-muted" />
                          <span
                            className="text-[0.92rem] leading-relaxed text-muted"
                            dangerouslySetInnerHTML={{ __html: sub }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}

export default function CareerTimeline() {
  return (
    <Section
      id="career"
      eyebrow="Career"
      title="From the United Nations to the enterprise frontier."
      intro="A decade spanning diplomacy, startups, and the world's most important institutions — always in the seat where business problems meet software."
    >
      <div className="relative">
        <span className="absolute left-[27px] top-3 hidden w-px bg-line md:block" style={{ height: 'calc(100% - 24px)' }} />
        <div className="flex flex-col gap-10">
          {careerEntries.map((entry, i) => (
            <Entry key={i} entry={entry} />
          ))}
        </div>
      </div>
    </Section>
  )
}
