import { useEffect, useRef, useState } from 'react'
import { trackSectionView } from '../../utils/analytics'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

/** Sticky in-page nav with scrollspy highlighting the section in view. */
export default function SectionNav() {
  const [active, setActive] = useState('about')
  const seen = useRef(new Set())

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id)
            // Report each section once per page load so GA can see how far
            // visitors actually get on the single-route homepage.
            if (!seen.current.has(id)) {
              seen.current.add(id)
              trackSectionView(id)
            }
          }
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      )
      io.observe(el)
      return io
    })
    return () => observers.forEach((io) => io && io.disconnect())
  }, [])

  return (
    <div className="sticky top-16 z-40 -mt-px border-y border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-page items-center gap-1 overflow-x-auto px-4 py-2.5 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active === id
                ? 'bg-clay text-white'
                : 'text-ink-soft hover:bg-cream-2'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
