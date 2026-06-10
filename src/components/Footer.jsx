import { Link } from 'react-router-dom'
import Container from './Container'
import { trackOutboundClick } from '../utils/analytics'

const socials = [
  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/zkevinbai/' },
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/zkevinbai' },
  { icon: 'fab fa-twitter', label: 'Twitter', href: 'https://twitter.com/zkevinbai' },
  { icon: 'fas fa-paper-plane', label: 'Email', href: 'mailto:hello@zkevinbai.com' },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream/50">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-serif text-xl font-semibold text-ink">Kevin Bai</div>
          <p className="mt-1 text-sm text-muted">
            Technology is the means, not the goal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {socials.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick(href, label)}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-clay hover:bg-clay hover:text-white"
            >
              <i className={icon} />
            </a>
          ))}
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Kevin Bai. Built in San Francisco.</span>
        <Link to="/toys/zodiac" className="transition-colors hover:text-clay">
          年 What's your Chinese zodiac?
        </Link>
      </Container>
    </footer>
  )
}
