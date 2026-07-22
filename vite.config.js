import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@/..." punta a src/... per import stabili e non relativi
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
