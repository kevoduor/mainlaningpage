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
    base: '/', // Ensures assets load correctly for GitHub Pages
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
        // Disable tree-shaking in production
        plugins: [],
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
      // Disable minification for CSS and JS
      cssMinify: false,
      minify: false,
      // Generate modern JavaScript only
      target: 'es2020',
      // Disable manual chunk splitting for simpler outputs
      rollupOptions: {
        output: {
          // Simplified naming for better debugging
          chunkFileNames: 'assets/js/[name].js',
          entryFileNames: 'assets/js/[name].js',
          assetFileNames: ({name}) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name][extname]';
            }
            if (/\.(woff2?|ttf|otf|eot)$/.test(name ?? '')) {
              return 'assets/fonts/[name][extname]';
            }
            return 'assets/[name][extname]';
          },
        },
        // Disable treeshaking completely
        treeshake: false,
      },
    },
    // Disable CSS code splitting and optimization
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
      devSourcemap: true,
    },
    // Simplify dependency optimization
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: [],
      esbuildOptions: {
        target: 'es2020',
        // Keep console logs
        drop: [],
        pure: [],
      },
    },
    // Disable esbuild optimization completely
    esbuild: {
      pure: [],
      treeShaking: false,
      target: 'es2020',
      legalComments: 'inline',
    },
  };
});
