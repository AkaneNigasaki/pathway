import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Les 103 icônes de concepts restent des fichiers séparés (mises en cache),
    // sinon elles seraient inlinées en data-URI et feraient gonfler le bundle JS.
    assetsInlineLimit: (filePath) =>
      filePath.includes("concept-icons") ? false : undefined,
  },
})
