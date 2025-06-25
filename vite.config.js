import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
    },
    environment: 'jsdom', 
  },
  server: {
    port: 3000,
    strictPort: true,
    host: 'localhost',
    open: true
  },
})
