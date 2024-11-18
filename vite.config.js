import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '~/components', replacement: '/src/components'},
      { find: '~/routers', replacement: '/src/routers'},
      { find: '~/routes', replacement: '/src/routes'}
    ],
  },
})
