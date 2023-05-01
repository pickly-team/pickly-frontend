import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    esbuild: {
      target: 'ESNext',
    },
    build: {
      target: 'ESNext',
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    resolve: {
      //TODO: alias 패턴 변경
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/v1': {
          target:
            mode === 'production' ? env.VITE_SERVER_URI : env.VITE_SERVER_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/v1/, ''),
          secure: false,
          ws: true,
        },
      },
    },
    define: {
      'process.env': env,
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_SERVER_URI': JSON.stringify(env.VITE_SERVER_URI),
    },
  };
});
