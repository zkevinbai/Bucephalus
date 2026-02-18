import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Portfolio', end: true },
    { to: '/blog', label: 'Blog' },
    { to: '/zodiac', label: 'Zodiac' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-6 lg:px-8 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <nav className="flex items-center justify-between h-full">
        <NavLink 
          to="/" 
          className="font-raleway font-bold text-xl text-gray-900 hover:text-[#ef4444] transition-colors duration-200"
        >
          Kevin Bai
        </NavLink>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `font-raleway font-medium text-base px-4 py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-[#ef4444] border-b-2 border-[#ef4444]'
                    : 'text-gray-800 hover:text-[#ef4444]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200 z-50">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `font-raleway font-medium text-base px-6 py-3 transition-all duration-200 ${
                    isActive
                      ? 'text-[#ef4444] bg-red-50'
                      : 'text-gray-800 hover:text-[#ef4444] hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
