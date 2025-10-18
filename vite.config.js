import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
    })
  ],
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Target modern browsers for smaller bundles
    target: 'es2015',
    // Enable CSS code splitting
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react', 'react-hot-toast', 'date-fns'],
          'github-vendor': ['octokit'],
          'utils-vendor': ['react-intersection-observer', 'react-parallax-tilt'],
        },
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enable minification with esbuild (faster than terser)
    minify: 'esbuild',
    // Source maps for production debugging (optional)
    sourcemap: false,
    // Increase performance by disabling CSS modules
    cssMinify: 'esbuild',
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'octokit',
      'date-fns',
      'react-hot-toast',
      'react-intersection-observer',
      'react-parallax-tilt',
    ],
    // Force pre-bundling
    force: false,
  },
  // Server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    // Enable HTTP/2 for faster loading
    https: false,
  },
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },
})
