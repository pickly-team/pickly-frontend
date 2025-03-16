import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { match } from 'ts-pattern';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: {
      rollupOptions: {
        output: {},
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        plugins: match(mode)
          .returnType<[string, Record<any, any>][]>()
          .with('production', () => [
            ['@swc/plugin-emotion', { autoLabel: 'always', sourceMap: false }],
          ])
          .otherwise(() => [
            ['@swc/plugin-emotion', { autoLabel: 'always', sourceMap: false }],
          ]),
      }),
    ],
    resolve: {
      alias: {
        '@/app': path.resolve(__dirname, './src/app'),
        '@/pages': path.resolve(__dirname, './src/pages'),
        '@/shared': path.resolve(__dirname, './src/shared'),
        '@/widgets': path.resolve(__dirname, './src/widgets'),
        '@/features': path.resolve(__dirname, './src/features'),
        '@/entities': path.resolve(__dirname, './src/entities'),
      },
    },
    define: {
      'process.env': env,
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_SERVER_URI': JSON.stringify(env.VITE_SERVER_URI),
      'process.env.VITE_ASSETS_URL': JSON.stringify(env.VITE_ASSETS_URL),
      'process.env.VITE_OG_URL': JSON.stringify(env.VITE_OG_URL),
    },
    server: {
      proxy: {
        '/og': {
          target: JSON.stringify(env.VITE_OG_URL),
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/og/, ''),
        },
      },
    },
  };
});
