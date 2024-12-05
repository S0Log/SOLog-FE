import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '~/components', replacement: '/src/components' },
      { find: '~/routers', replacement: '/src/routers' },
      { find: '~/routes', replacement: '/src/routes' },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // changeOrigin: true,
        // headers: {
        //   'Cache-Control': 'no-store', // 캐시 저장 금지
        // },
      },
      '/daumreq': {
        target: 'https://m.search.daum.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/daumreq/, ''),
      },
    },
  },
  assetsInclude: ['**/*.ttf'],
});
