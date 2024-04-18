import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
const config = defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));

  return {
    plugins: [
      vue(),
      visualizer({ open: false }),
      viteCompression({
        disable: ![''].includes(mode), // sit, uat, prod
        filter: /\.(js|mjs|json|html|css)$/i,
        algorithm: 'gzip',
        threshold: 1025,
        deleteOriginFile: false
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      sourcemap: [''].includes(mode), // dev, sit, uat
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name].[hash].js',
          entryFileNames: 'js/[name].[hash].js'
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/main.scss";`
        },
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      host: 'localhost', // 0.0.0.0
      port: 3001,
      proxy: {
        '/api': {
          target: '',
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
          cookiePathRewrite: {
            '': '/'
          }
        }
      }
    }
  };
});

export default config;
