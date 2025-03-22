
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '/', // This is important for GitHub Pages
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react({
        // Remove React features for production
        jsxImportSource: mode === 'production' ? undefined : '@emotion/react',
        devTarget: 'es2022',
        // Enable tree-shaking in production
        plugins: mode === 'production' ? [] : undefined,
      }),
      mode === 'development' && componentTagger(),
      // Add gzip compression for production builds
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240, // only compress files > 10kb
        deleteOriginFile: false,
      }),
      // Add brotli compression
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
      }),
      // Analyze bundle size in production
      mode === 'production' && visualizer({
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
      // Minify CSS and JS
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
      },
      // Generate modern JavaScript only
      target: 'es2020',
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: [
              '@radix-ui/react-toast',
              '@radix-ui/react-tooltip',
              'lucide-react'
            ],
          },
          // Code-splitting optimization
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({name}) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
        // Tree-shake dependencies
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
    },
    // Enable CSS code splitting
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
      devSourcemap: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@radix-ui/react-accordion'],
    },
    // Reduce build size with tree-shaking
    esbuild: {
      pure: ['console.log', 'debugger'],
      treeShaking: true,
    },
  };
});
