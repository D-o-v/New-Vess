import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'three/webgpu': path.resolve(__dirname, './src/stubs/three-webgpu.js'),
      'three/tsl':    path.resolve(__dirname, './src/stubs/three-tsl.js'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-globe': ['three', 'react-globe.gl'],
        },
      },
    },
    // Increase warning threshold for the globe chunk (it's intentionally large)
    chunkSizeWarningLimit: 2000,
  },
})
