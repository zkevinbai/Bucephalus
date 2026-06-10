/** @type {import('tailwindcss').Config} */

// Tokens resolve to CSS variables (RGB channels) so the `/opacity` modifier keeps
// working and the whole palette can flip between light (Clay) and dark (Midnight
// Teal) by swapping variables on the `.dark` class. See src/index.css.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Editorial serif for display + headings, Inter for everything else.
        'serif': ['Fraunces', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        // Kept so legacy class names don't break during the redesign.
        'raleway': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: token('--paper'),
        cream: token('--cream'),
        'cream-2': token('--cream-2'),
        ink: token('--ink'),
        'ink-soft': token('--ink-soft'),
        muted: token('--muted'),
        line: token('--line'),
        clay: token('--clay'),
        'clay-deep': token('--clay-deep'),
        sage: token('--sage'),
        ocean: token('--ocean'),
        plum: token('--plum'),
        gold: token('--gold'),
        // `card` is the raised-surface color. Mapping `white` to it means the many
        // existing `bg-white/60` cards theme automatically in dark mode.
        card: token('--card'),
        white: token('--card'),
      },
      maxWidth: {
        'reading': '720px',
        'page': '1080px',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.2,0.8,0.2,1) both',
        'fade-in': 'fade-in 0.6s ease both',
      },
    },
  },
  plugins: [],
}
