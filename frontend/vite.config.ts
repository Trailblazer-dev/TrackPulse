import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Ensure compatibility with Vercel
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: []
    },
    assetsInlineLimit: 0, // Prevent inlining assets as base64
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Resolve public assets correctly
  publicDir: 'public',
  base: '/'
});
