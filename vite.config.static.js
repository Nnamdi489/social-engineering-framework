import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Multi-file build for GitHub Pages / Netlify / Vercel.
// Produces dist/index.html + dist/assets/* with hashed filenames.
//
// IMPORTANT: `base` must match the GitHub Pages sub-path exactly.
// For https://Nnamdi489.github.io/social-engineering-framework/ it is:
//   '/social-engineering-framework/'
// If you later deploy to a root domain (custom domain, Vercel),
// change it to '/' or './'.
export default defineConfig({
  plugins: [vue()],
  base: '/social-engineering-framework/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: false
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})