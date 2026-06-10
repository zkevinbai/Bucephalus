import { useEffect } from 'react'

/**
 * Adds the `in` class to every `.reveal` element as it scrolls into view.
 * Re-scans on each `key` change (e.g. route change) so freshly mounted
 * sections animate too. Respects prefers-reduced-motion via CSS.
 */
export function useScrollReveal(key) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'))
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
