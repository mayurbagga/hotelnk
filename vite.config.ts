import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'framer-motion',
      '@emailjs/browser',
      'qrcode.react',
      'canvas-confetti',
      'react-day-picker',
      'date-fns',
      'react-scroll',
    ],
    force: true,
  },
  server: {
    force: true,
  },
});
