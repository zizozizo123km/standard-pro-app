import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Standard alias for src directory mapping
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Standard frontend port
    // Optional: proxy setup if interacting with a separate backend API
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Useful for debugging production builds
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Optimization: separate large vendor dependencies
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})