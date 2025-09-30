import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
          charts: ['recharts', 'd3'],
          three: ['three', 'ogl', 'postprocessing']
        }
      }
    },
    // Ensure proper asset handling for Azure
    assetsDir: 'assets',
    emptyOutDir: true
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new', '.vercel.app', '.netlify.app', '.azurestaticapps.net'],
    // Enable CORS for development
    cors: true
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
    cors: true
  },
  // Ensure proper base path for Azure Static Web Apps
  base: mode === 'production' ? '/' : '/',
  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
}));