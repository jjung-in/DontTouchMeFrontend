import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@_api', replacement: '/src/api' },
      { find: '@_assets', replacement: '/src/assets' },
      { find: '@_components', replacement: '/src/components' },
      { find: '@_hooks', replacement: '/src/hooks' },
      { find: '@_pages', replacement: '/src/pages' },
      { find: '@_routes', replacement: '/src/routes' },
      { find: '@_store', replacement: '/src/store' },
      { find: '@_styles', replacement: '/src/styles' },
      { find: '@_types', replacement: '/src/types' },
      { find: '@_utils', replacement: '/src/utils' },
      { find: '@', replacement: '/src' },
    ],
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://13.209.40.51:8080/',
        changeOrigin: true,
        rewrite: (path) => path,
        secure: false,
        ws: true,
      },
    },
  },
});
