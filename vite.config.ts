import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lavinder/',  // <-- IMPORTANT: your repo name here
  assetsInclude: ['**/*.md'],  // Treat markdown files as assets, not JS modules
})
