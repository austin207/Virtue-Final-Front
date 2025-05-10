
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true, // Using boolean true to allow all hosts
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  build: {
    // Production build optimizations
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Only remove console logs in production
        drop_debugger: mode === 'production',
        passes: 2 // More aggressive optimization
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@/components/ui/index.ts'],
          'chat-features': ['@/components/chat/index.ts']
        }
      }
    },
    // Enable source maps for production (helps with error tracking)
    sourcemap: true,
    // Add build manifest for better caching
    manifest: true,
    // Improve CSS extraction
    cssCodeSplit: true,
    // Better asset handling
    assetsInlineLimit: 4096, // 4kb
    // Use modern JS output
    target: 'es2018'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  // Add preview configuration for testing the production build
  preview: {
    port: 8080,
    host: true
  }
}));
