import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [vue(), viteSingleFile()],
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
  base: './',
  build: {
    target: 'es2015',
    assetsInlineLimit: Infinity,  // Inline all images/fonts
    cssCodeSplit: false,          // Bundle all CSS into one file
    rollupOptions: {
      output: {
        splitChunks: false 
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
