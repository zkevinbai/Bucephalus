/** @type {import('tailwindcss').Config} */
export default {
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
        // Warm "paper" palette — the claude-sandbox aesthetic.
        paper: '#fbf7f0',
        cream: '#f7f1e7',
        'cream-2': '#efe6d6',
        ink: '#1b1714',
        'ink-soft': '#2a2420',
        muted: '#8a7f72',
        line: '#e6ddd0',
        clay: '#cc785c',
        'clay-deep': '#b4593d',
        sage: '#6a8d73',
        ocean: '#3f7cac',
        plum: '#b07bac',
        gold: '#c69749',
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
