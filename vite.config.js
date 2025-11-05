import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
      // Use automatic JSX runtime for smaller bundles
      jsxRuntime: 'automatic',
    })
  ],
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('lucide-react') || id.includes('react-hot-toast') || id.includes('date-fns')) {
              return 'ui-vendor';
            }
            if (id.includes('octokit') || id.includes('@octokit')) {
              return 'github-vendor';
            }
            if (id.includes('react-intersection-observer') || id.includes('react-parallax-tilt') || id.includes('react-type-animation')) {
              return 'utils-vendor';
            }
            // Split other vendor chunks
            return 'vendor';
          }
        },
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
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
    // Improve tree-shaking
    modulePreload: {
      polyfill: true,
    },
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
