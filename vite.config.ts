
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    ssr: true, // Enable SSR build
    manifest: true, // Generate manifest for better caching
  },
  plugins: [
    react(), // Removed fastRefresh option as it's not needed
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['react-helmet'], // Ensure react-helmet works with SSR
  },
}));
