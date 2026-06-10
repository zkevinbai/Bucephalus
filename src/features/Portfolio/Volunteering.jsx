import Section from './Section'

const entries = [
  {
    role: 'Founder',
    org: 'Algobatics — Software Engineering Tutoring',
    years: '2020 — Present',
    icon: 'fas fa-chalkboard-teacher',
    blurb:
      'Tutored 50+ software engineering students from underrepresented backgrounds; built curriculum and videos that make CS approachable for non-technical audiences.',
  },
  {
    role: 'Student Advocate to the UC Board of Regents',
    org: 'University of California Student Association',
    years: '2014 — 2015',
    icon: 'fas fa-landmark',
    blurb:
      'Selected as the sole student representative of 234,464 UC students; advocated on tuition, diversity, and fossil fuel divestment.',
  },
  {
    role: 'US Delegate',
    org: 'US-Mexico Forum for Cooperation',
    years: '2016',
    icon: 'fas fa-handshake',
    blurb:
      'One of 15 Americans selected for high-level discussions with Mexican senators, secretaries, ambassadors, and the leaders of TELMEX, Google Mexico, and Amazon Mexico.',
  },
  {
    role: 'Inaugural President',
    org: 'Bowles Hall Student Association',
    years: '2015 — 2016',
    icon: 'fas fa-university',
    blurb:
      'Led the student side of the Phoenix Program, a $45M initiative to revive the residential college at UC Berkeley.',
  },
  {
    role: 'Director of Business Development',
    org: 'UC Berkeley Model United Nations',
    years: '2015 — 2016',
    icon: 'fas fa-globe-americas',
    blurb:
      'Coordinated a 12-person team for the largest international relations conference on the West Coast (700 attendees); negotiated airline partnerships that cut attendance costs 20%.',
  },
  {
    role: 'Philippines Site Leader',
    org: 'Volunteers Around the World',
    years: '2014 — 2015',
    icon: 'fas fa-clinic-medical',
    blurb:
      'Coordinated a team of 16 establishing 7 mobile clinics across Pampanga, diagnosing and treating 250–300 patients per day.',
  },
]

export default function Volunteering() {
  return (
    <Section
      id="volunteering"
      eyebrow="Giving back"
      title="Leadership beyond the job."
      intro="Service has run alongside the career the whole way — tutoring engineers, representing students, and showing up where it counts."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {entries.map((e) => (
          <article
            key={e.org}
            className="reveal rounded-2xl border border-line bg-white/60 p-6 transition-shadow duration-300 hover:shadow-[0_14px_40px_-24px_rgba(27,23,20,0.4)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream text-base text-clay">
                <i className={e.icon} aria-hidden />
              </span>
              <span className="text-sm font-medium text-clay-deep">{e.years}</span>
            </div>
            <h3 className="mt-4 font-serif text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
              {e.role}
            </h3>
            <p className="mt-1 text-[0.92rem] font-medium text-ink-soft">{e.org}</p>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{e.blurb}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
