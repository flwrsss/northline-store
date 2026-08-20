import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// GitHub Pages configuration
// Замените "USERNAME" на ваш GitHub username
// Например: если ваш username "john", то base будет '/northline-store/'
const GITHUB_USERNAME = 'flwrsss'; // <-- ЗАМЕНИТЕ ЭТО НА ВАШ USERNAME
const REPOSITORY_NAME = 'northline-store';
const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${REPOSITORY_NAME}/` : '/';

export default defineConfig({
  plugins: [react()],
  // Используем base для GitHub Pages
  // Для локальной разработки base = '/'
  // Для продакшена base = '/northline-store/'
  base: BASE_PATH,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Оптимизация для production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
  },
})