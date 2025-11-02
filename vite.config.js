import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: /\.(jsx|tsx)$/,
  })],
  // Use root base path since GitHub Pages serves from docs/ folder with custom domain
  base: '/',
  build: {
    outDir: 'docs',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
})
