import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Work', end: true },
    { to: '/blog', label: 'Writing' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-full max-w-page items-center justify-between px-6 md:px-8">
        <NavLink
          to="/"
          className="font-serif text-[1.35rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-clay"
        >
          Kevin Bai
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-clay' : 'text-ink-soft hover:text-clay'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px bg-clay transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
