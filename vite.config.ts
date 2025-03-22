import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    base: '/', // This is important for GitHub Pages
    server: {
      host: "::",
      port: 8080,
      // Reduce dev server overhead
      hmr: {
        overlay: false, // Disable error overlay for better performance
      },
    },
    plugins: [
      react({
        // Remove React features for production
        jsxImportSource: isProd ? undefined : '@emotion/react',
        devTarget: 'es2022',
        // Enable tree-shaking in production
        plugins: isProd ? [] : undefined,
      }),
      mode === 'development' && componentTagger(),
      // Gzip compression for all assets
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // compress files >1kb
        deleteOriginFile: false,
      }),
      // Add brotli compression (better than gzip)
      viteCompression({
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
      // Minify CSS and JS
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
          pure_funcs: isProd ? ['console.log', 'console.info', 'console.debug'] : [],
        },
      },
      // Generate modern JavaScript only
      target: 'es2020',
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Put React in a single chunk
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            
            // Group routing related modules
            if (id.includes('node_modules/react-router') ||
                id.includes('node_modules/history')) {
              return 'vendor-router';
            }
            
            // Group UI components
            if (id.includes('node_modules/@radix-ui') ||
                id.includes('node_modules/lucide-react')) {
              return 'vendor-ui';
            }
            
            // Group utility libraries
            if (id.includes('node_modules/')) {
              return 'vendor-other';
            }
          },
          // Improved file naming for better caching
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
        // Advanced tree-shaking
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
    },
    // Enable CSS code splitting and optimization
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
      devSourcemap: !isProd,
      preprocessorOptions: {
        // Any preprocessor options would go here
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
        // Keep console logs during development
        drop: isProd ? ['console', 'debugger'] : [],
        pure: isProd ? ['console.log', 'debugger'] : [],
      },
    },
    // Reduce build size with tree-shaking
    esbuild: {
      pure: isProd ? ['console.log', 'debugger'] : [],
      treeShaking: true,
      target: 'es2020',
      legalComments: 'none',
    },
  };
});
