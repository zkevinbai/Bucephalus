/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'cursive'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      colors: {
        'primary-blue': 'rgb(48, 127, 246)',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { 'background-position': '0% center' },
          '50%': { 'background-position': '100% center' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(135deg, #ffffff 0%, #a0a0ff 50%, #ffffff 100%)',
      },
      backgroundSize: {
        'shimmer': '200% auto',
      },
    },
  },
  plugins: [],
}
