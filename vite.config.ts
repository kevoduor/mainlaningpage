
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    base: '/', // Ensures assets load correctly for GitHub Pages
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: true, // Enable error overlay for better debugging
      },
    },
    plugins: [
      // Fix the React SWC plugin configuration by removing the emotion plugin that's not installed
      react({
        // Remove the emotion plugin since it's not installed
        plugins: [],
      }),
      mode === 'development' && componentTagger(),
      // Add vendor chunk splitting
      splitVendorChunkPlugin(),
      // Gzip compression for all assets
      isProd && viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // compress files >1kb
        deleteOriginFile: false,
      }),
      // Add brotli compression (better than gzip)
      isProd && viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),
      // Analyze bundle size in production
      isProd && visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'stats.html',
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      copyPublicDir: true,
      // Enable minification for production builds
      cssMinify: isProd,
      minify: isProd ? 'esbuild' : false,
      // Generate compatible JavaScript
      target: 'es2018',
      // Use chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            ui: [
              '@radix-ui/react-accordion',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-toast',
            ],
            utils: ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority'],
            // Keep third-party dependencies in separate chunks
            vendor: [
              '@tanstack/react-query',
              'recharts',
              'zod',
              'lucide-react',
            ],
          },
          // Simplified naming for better debugging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({name}) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            if (/\.(woff2?|ttf|otf|eot)$/.test(name ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      // Add source maps only for development
      sourcemap: !isProd,
    },
    // Enable source maps for development
    css: {
      devSourcemap: !isProd,
    },
    // Split large routes for better performance
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@vercel/analytics'],
      esbuildOptions: {
        target: 'es2018',
      },
    },
    // Basic logging of build process
    logLevel: 'info',
  };
});
