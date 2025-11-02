import RipplingLogo from '../../assets/companies/Rippling-logo.png'
import UNLogo from '../../assets/companies/UN-logo.svg'
import PalantirLogo from '../../assets/companies/palantir-logo.svg'
import GlobalityLogo from '../../assets/companies/Globality-logo.png'
import UNHCRLogo from '../../assets/companies/UNHCR-logo.svg'

const careerEntries = [
  {
    logo: RipplingLogo,
    title: 'Founding Forward Deployed Engineer',
    company: 'Rippling',
    dateRange: '2025 - Present',
    location: 'San Francisco Bay Area',
    description: 'Founding <strong>Forward Deployed Engineer</strong> at Rippling, <strong>first hire</strong>. Here to help build the <strong>FDE function</strong> at Rippling — a Forward Deployed Engineer is part consultant, part product manager, and part software engineer: a <strong>founder-shaped engineer</strong>. We solve <strong>enterprise problems</strong> for Rippling\'s <strong>largest and most strategic customers</strong>. If there\'s a SKU we don\'t have, we invent it. Our north star is the success of our customers on Rippling. Created the <strong>Slack channel and GitHub repo</strong>, authored the <strong>first FDE SOPs</strong>, completed the <strong>first FDE project</strong>, wrote the <strong>first 250K lines of FDE code</strong>, achieved and maintained a <strong>100% CSAT score</strong> across customer engagements, and collaborating with product and engineering on <strong>FDE tools</strong> to build incredible applications for customers.',
  },
  {
    logo: UNLogo,
    title: 'United Nations Youth Representative',
    company: 'Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO)',
    dateRange: '2017 - Present',
    location: 'Vienna, Austria',
    description: '<strong>United Nations Keynote Speaker</strong> at <strong>UN Science and Technology Conference</strong> in Vienna, Austria and <strong>UN Youth Conference</strong> in Moscow, Russian Federation. <strong>Youth Newsroom Reporter</strong> - organized and conducted interviews for UN News with senior executives of the CTBTO, including <strong>Wolfgang Hoffmann</strong> (Negotiator of the CTBT Treaty) and <strong>Dr. Lassina Zerbo</strong> (Executive Secretary of the CTBTO). Currently working with the <strong>CTBT team</strong> to advocate for the full enforcement of the <strong>Comprehensive Nuclear-Test-Ban Treaty (CTBT)</strong>.',
  },
  {
    logo: '/favicon.ico',
    title: 'Public Speaker',
    company: 'Kevin Bai',
    dateRange: '2014 - Present',
    location: 'Various Locations',
    description: '<strong>Keynote and Panel Speaker</strong> at <strong>Enterprise and United Nations Events</strong>. Spoke at <strong>Rocketlane</strong> (San Francisco, 2025), <strong>Palantir</strong> (Denver 2022, London 2022, NYC 2021), <strong>United Nations</strong> (Remote 2021, Moscow 2018, Vienna 2017), <strong>General Assembly</strong> (Remote 2020), <strong>Atlassian</strong> (Las Vegas 2019), <strong>FOCUS</strong> (San Francisco 2016, Mexico City 2016), <strong>VAW</strong> (Manila 2016), <strong>REACH</strong> (Los Angeles 2015), and <strong>University of California Board of Regents</strong> (Oakland 2014).',
  },
  {
    logo: PalantirLogo,
    title: 'Forward Deployed Software Engineer',
    company: 'Palantir Technologies',
    dateRange: '2021 - 2025',
    location: 'Los Angeles, New York City, Chicago, London, Denver, Washington DC, Bogota',
    description: 'I solve <strong>open-ended problems</strong> at the <strong>most important institutions in the world</strong>. I own every stage from <strong>discovery to delivery</strong>—translating business needs into product capabilities and leading teams to build <strong>full-stack software</strong> that creates <strong>measurable value</strong>. Led a <strong>$X million project</strong> to digitize the innovation workflow of a <strong>Fortune 500 CPG company</strong>. Built <strong>five applications in six months</strong>, drove adoption from <strong>0 to 800 users in two months</strong>, and achieved <strong>$XX million in year-over-year savings</strong> for the client. Led a <strong>$X million project</strong> to improve operational efficiency and safety for a <strong>Fortune 500 airline</strong>, improving efficiency of a major engineering division by <strong>10 hours per engineer per week</strong>.',
  },
  {
    logo: GlobalityLogo,
    title: 'Full Stack Software Engineer',
    company: 'Globality, Inc.',
    dateRange: '2019 - 2021',
    location: 'San Francisco Bay Area',
    description: 'Wore multiple hats and worked with an incredible team to build the future of <strong>professional-services procurement</strong> for <strong>Fortune 500 companies</strong>. Joined shortly after the <strong>garage stage</strong> and stayed through <strong>Series E</strong>, we raised over <strong>$350 million over two years</strong> for a trailblazing <strong>AI Enterprise SaaS platform</strong>. Built with <strong>JavaScript</strong>, <strong>React</strong>, <strong>GraphQL</strong>, <strong>Node</strong>, and <strong>Python</strong> to create the <strong>first AI-powered procurement ecosystem</strong>. <strong>First Place</strong> — 2020 Globality Hackathon. Led <strong>product engineering</strong> for multiple key features. Improved platform accessibility from <strong>52/100 to 95/100</strong>, achieving <strong>WCAG AA compliance</strong>.',
  },
  {
    logo: UNHCRLogo,
    title: 'Private Sector Partnerships',
    company: 'UNHCR, the UN Refugee Agency',
    dateRange: '2017',
    location: 'Dubai, United Arab Emirates',
    description: 'Worked in support of refugees during the peak of the <strong>2017 Syrian Civil War and Refugee Crisis</strong>. Built partnerships with <strong>leading corporations and nonprofits</strong> on behalf of the <strong>United Nations</strong>. Partnered with <strong>IKEA</strong> to design and produce a <strong>modular refugee shelter</strong>. Partnered with <strong>Facebook</strong> to launch the <strong>first Virtual Reality fundraising campaign</strong> for refugees. Partnered with <strong>Microsoft</strong> to enable <strong>digital cash-aid distribution</strong> for displaced populations. Developed the <strong>Qatar outreach strategy</strong> for UNHCR Private Sector Partnerships.',
  },
]

export default function CareerTimeline() {
  return (
    <div className="flex flex-col gap-6 w-full">
          {careerEntries.map((entry, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm hover:bg-white/70 hover:shadow-md transition-all duration-300 max-[950px]:flex-col max-[950px]:items-center"
            >
              <div className={`shrink-0 w-16 h-16 max-[950px]:w-12 max-[950px]:h-12 rounded-lg ${entry.company === 'Palantir Technologies' ? 'bg-black p-2' : ''}`}>
                <img
                  src={entry.logo}
                  alt={`${entry.company} logo`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 font-raleway m-0 max-[950px]:text-lg">
                    {entry.title}
                  </h3>
                  <h4 className="text-lg font-medium text-gray-700 font-raleway m-0 max-[950px]:text-base">
                    {entry.company}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-sm text-gray-600 font-raleway">
                      {entry.dateRange}
                    </span>
                    <span className="text-sm text-gray-600 font-raleway">
                      {entry.location}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-light text-gray-700 font-raleway m-0 leading-relaxed max-[950px]:text-xs" dangerouslySetInnerHTML={{ __html: entry.description }} />
              </div>
            </div>
          ))}
    </div>
  )
}

