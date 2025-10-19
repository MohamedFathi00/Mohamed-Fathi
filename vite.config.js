import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  build: {
    // Generate source maps for better debugging
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Optimize chunk size
    chunkSizeWarningLimit: 800,
    
    // Minify output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production'
      }
    },
    
    // Optimize output
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-icons'],
          'ui-components': [
            'swiper',
            'aos',
            'react-icons/fa',
            'react-icons/ri'
          ]
        }
      }
    }
  },
  
  // Optimize server
  server: {
    hmr: true,
    port: 5173,
    open: true
  }
})
