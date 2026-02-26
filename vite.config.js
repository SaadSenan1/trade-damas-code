import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // مهم للنشر على أي سيرفر
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext'
  },
  server: {
    port: 5173
  }
})
