import RipplingLogo from '../../assets/companies/Rippling-logo.png'
import UNLogo from '../../assets/companies/UN-logo.svg'
import PalantirLogo from '../../assets/companies/Palantir-logo.png'
import GlobalityLogo from '../../assets/companies/Globality-logo.png'
import UNHCRLogo from '../../assets/companies/UNHCR-logo.svg'

const careerEntries = [
  {
    logo: RipplingLogo,
    title: 'Founding Forward Deployed Engineer',
    company: 'Rippling',
    dateRange: '2025 - Present',
    location: 'San Francisco Bay Area',
    description: 'Founding Forward Deployed Engineer at Rippling, first hire. Here to help build the FDE function at Rippling — a Forward Deployed Engineer is part consultant, part product manager, and part software engineer: a founder-shaped engineer. We solve enterprise problems for Rippling\'s largest and most strategic customers. If there\'s a SKU we don\'t have, we invent it. Our north star is the success of our customers on Rippling. Created the Slack channel and GitHub repo, authored the first FDE SOPs, completed the first FDE project, wrote the first 250K lines of FDE code, achieved and maintained a 100% CSAT score across customer engagements, and collaborating with product and engineering on FDE tools to build incredible applications for customers.',
  },
  {
    logo: UNLogo,
    title: 'United Nations Youth Representative',
    company: 'Comprehensive Nuclear-Test-Ban Treaty Organization (CTBTO)',
    dateRange: '2017 - Present',
    location: 'Vienna, Austria',
    description: 'United Nations Keynote Speaker at UN Science and Technology Conference in Vienna, Austria and UN Youth Conference in Moscow, Russian Federation. Youth Newsroom Reporter - organized and conducted interviews for UN News with senior executives of the CTBTO, including Wolfgang Hoffmann (Negotiator of the CTBT Treaty) and Dr. Lassina Zerbo (Executive Secretary of the CTBTO). Currently working with the CTBT team to advocate for the full enforcement of the Comprehensive Nuclear-Test-Ban Treaty (CTBT).',
  },
  {
    logo: '/favicon.ico',
    title: 'Public Speaker',
    company: 'Kevin Bai',
    dateRange: '2014 - Present',
    location: 'Various Locations',
    description: 'Keynote and Panel Speaker at Enterprise and United Nations Events. Spoke at Rocketlane (San Francisco, 2025), Palantir (Denver 2022, London 2022, NYC 2021), United Nations (Remote 2021, Moscow 2018, Vienna 2017), General Assembly (Remote 2020), Atlassian (Las Vegas 2019), FOCUS (San Francisco 2016, Mexico City 2016), VAW (Manila 2016), REACH (Los Angeles 2015), and University of California Board of Regents (Oakland 2014).',
  },
  {
    logo: PalantirLogo,
    title: 'Forward Deployed Software Engineer',
    company: 'Palantir Technologies',
    dateRange: '2021 - 2025',
    location: 'Los Angeles, New York City, Chicago, London, Denver, Washington DC, Bogota',
    description: 'I solve open-ended problems at the most important institutions in the world. I own every stage from discovery to delivery—translating business needs into product capabilities and leading teams to build full-stack software that creates measurable value. Led a $X million project to digitize the innovation workflow of a Fortune 500 CPG company. Built five applications in six months, drove adoption from 0 to 800 users in two months, and achieved $XX million in year-over-year savings for the client. Led a $X million project to improve operational efficiency and safety for a Fortune 500 airline, improving efficiency of a major engineering division by 10 hours per engineer per week.',
  },
  {
    logo: GlobalityLogo,
    title: 'Full Stack Software Engineer',
    company: 'Globality, Inc.',
    dateRange: '2019 - 2021',
    location: 'San Francisco Bay Area',
    description: 'Wore multiple hats and worked with an incredible team to build the future of professional-services procurement for Fortune 500 companies. Joined shortly after the garage stage and stayed through Series E, we raised over $350 million over two years for a trailblazing AI Enterprise SaaS platform. Built with JavaScript, React, GraphQL, Node, and Python to create the first AI-powered procurement ecosystem. First Place — 2020 Globality Hackathon. Led product engineering for multiple key features. Improved platform accessibility from 52/100 to 95/100, achieving WCAG AA compliance.',
  },
  {
    logo: UNHCRLogo,
    title: 'Private Sector Partnerships',
    company: 'UNHCR, the UN Refugee Agency',
    dateRange: '2017',
    location: 'Dubai, United Arab Emirates',
    description: 'Worked in support of refugees during the peak of the 2017 Syrian Civil War and Refugee Crisis. Built partnerships with leading corporations and nonprofits on behalf of the United Nations. Partnered with IKEA to design and produce a modular refugee shelter. Partnered with Facebook to launch the first Virtual Reality fundraising campaign for refugees. Partnered with Microsoft to enable digital cash-aid distribution for displaced populations. Developed the Qatar outreach strategy for UNHCR Private Sector Partnerships.',
  },
]

export default function CareerTimeline() {
  return (
    <div className="flex flex-col gap-6 w-full">
          {careerEntries.map((entry, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 bg-white/50 border border-gray-300/40 rounded-xl backdrop-blur-sm hover:bg-white/70 hover:shadow-md transition-all duration-300 max-[800px]:flex-col max-[800px]:items-center"
            >
              <div className="shrink-0 w-16 h-16 max-[800px]:w-12 max-[800px]:h-12">
                <img
                  src={entry.logo}
                  alt={`${entry.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 font-raleway m-0 max-[800px]:text-lg">
                    {entry.title}
                  </h3>
                  <h4 className="text-lg font-medium text-gray-700 font-raleway m-0 max-[800px]:text-base">
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
                <p className="text-sm font-light text-gray-700 font-raleway m-0 leading-relaxed max-[800px]:text-xs">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
    </div>
  )
}

