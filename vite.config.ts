import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
  root: './',
  build: {
    outDir: '../dist/client',     // Указываем, чтобы Vite создал dist/client относительно корня проекта
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',  // Точный путь к `index.html` внутри папки client
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'socket.io-client', '@react-three/drei', '@react-three/fiber'],
  },
});