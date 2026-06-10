import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: /\.(jsx|tsx)$/,
  })],
  // Root base path: GitHub Pages serves at the custom domain root
  base: '/',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
})
