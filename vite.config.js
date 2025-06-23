import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/admin-login/index.jsx',
      ],
      refresh: true,
    }),
    react(),
  ],
});
