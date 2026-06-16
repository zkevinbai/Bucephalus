import Container from '../../components/Container'
import { trackOutboundClick } from '../../utils/analytics'
import Portrait from '../../assets/kevin-portrait.webp'
import AnthropicLogo from '../../assets/companies/Anthropic-logo.svg'
import RipplingLogo from '../../assets/companies/Rippling-logo.png'
import PalantirLogo from '../../assets/companies/palantir-logo.svg'
import UNLogo from '../../assets/companies/UN-logo.svg'
import BerkeleyLogo from '../../assets/companies/UCBerkeley-logo.png'
import OxfordLogo from '../../assets/companies/Oxford-logo.png'

const ctas = [
  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/zkevinbai/', primary: true },
  { icon: 'fas fa-paper-plane', label: 'Email', href: 'mailto:hello@zkevinbai.com' },
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/zkevinbai' },
]

const credentials = [
  { logo: AnthropicLogo, name: 'Anthropic' },
  { logo: RipplingLogo, name: 'Rippling' },
  { logo: PalantirLogo, name: 'Palantir', darken: true },
  { logo: UNLogo, name: 'United Nations' },
  { logo: BerkeleyLogo, name: 'UC Berkeley' },
  { logo: OxfordLogo, name: 'Oxford' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
      {/* warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 18% 0%, rgb(var(--clay) / 0.10), transparent 70%), radial-gradient(50% 45% at 92% 8%, rgb(var(--gold) / 0.10), transparent 70%)',
        }}
      />
      <Container>
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="max-w-3xl">
          <p className="eyebrow reveal">Member of Technical Staff · Anthropic</p>

          <h1 className="reveal mt-5 font-serif text-[2.9rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl md:text-7xl">
            Hello, I'm Kevin.
          </h1>

          <p className="reveal mt-6 text-[1.2rem] leading-relaxed text-ink-soft md:text-[1.32rem]" style={{ transitionDelay: '60ms' }}>
            I know three things well —{' '}
            <span className="font-medium text-clay-deep">Forward Deployed Engineering</span>,{' '}
            <span className="font-medium text-clay-deep">Applied AI</span>, and{' '}
            <span className="font-medium text-clay-deep">International Relations</span>. My goal is to
            bridge the gap between what artificial intelligence can do and what the world actually needs.
          </p>

          <p className="reveal mt-4 font-serif text-[1.3rem] italic text-muted md:text-[1.5rem]" style={{ transitionDelay: '120ms' }}>
            Technology is the means, not the goal.
          </p>

          <div className="reveal mt-9 flex flex-wrap gap-3" style={{ transitionDelay: '180ms' }}>
            {ctas.map(({ icon, label, href, primary }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick(href, label)}
                className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  primary
                    ? 'bg-clay text-white shadow-sm hover:bg-clay-deep hover:shadow-md'
                    : 'border border-line bg-paper text-ink-soft hover:border-clay hover:text-clay-deep'
                }`}
              >
                <i className={`${icon} text-base`} />
                {label}
              </a>
            ))}
          </div>
          </div>

          {/* Portrait */}
          <div
            className="reveal order-first mx-auto lg:order-none"
            style={{ transitionDelay: '120ms' }}
          >
            <img
              src={Portrait}
              alt="Kevin Bai"
              className="h-52 w-52 rounded-full border-4 border-paper object-cover shadow-xl ring-1 ring-line sm:h-60 sm:w-60 lg:h-[17rem] lg:w-[17rem]"
            />
          </div>
        </div>

        {/* Credentials strip */}
        <div className="reveal mt-16 border-t border-line pt-8" style={{ transitionDelay: '240ms' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Built, advised &amp; studied at
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6">
            {credentials.map(({ logo, name, darken }) => (
              <img
                key={name}
                src={logo}
                alt={name}
                title={name}
                className={`h-7 w-auto max-w-[130px] object-contain transition-all duration-300 hover:opacity-90 md:h-8 ${
                  darken
                    ? 'opacity-45 [filter:brightness(0)] hover:opacity-100 dark:opacity-80 dark:[filter:invert(1)]'
                    : 'opacity-55 grayscale hover:grayscale-0 dark:opacity-70 dark:[filter:grayscale(1)_invert(1)]'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
