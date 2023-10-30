import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import vercel from 'vite-plugin-vercel';

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
      vercel(),
    ],
    vercel: {},
    resolve: {
      //TODO: alias 패턴 변경
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_SERVER_URI': JSON.stringify(env.VITE_SERVER_URI),
      'process.env.VITE_ASSETS_URL': JSON.stringify(env.VITE_ASSETS_URL),
    },
  };
});
