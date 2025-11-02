import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: /\.(jsx|tsx)$/,
  })],
  base: '/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
})
