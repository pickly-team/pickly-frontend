import path from 'path';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import react, {type BabelOptions} from '@vitejs/plugin-react';

const extensions = ['.mjs', '.js', '.ts', '.jsx', '.tsx'];
const aliases = ['shared', 'ui'];

const babelOptions: BabelOptions = {
  plugins: [
    [
      '@emotion/babel-plugin',
      {
        autoLabel: 'always',
        cssPropOptimization: false,
      },
    ],
  ],
};

export default defineConfig({
  plugins: [
    svgr(),
    tsconfigPaths({
      root: process.cwd(),
    }),
    react({
      jsxImportSource: '@emotion/react',
      babel: babelOptions,
    }),
  ],
  resolve: {
    extensions,
    alias: aliases.map(find => ({
      find,
      replacement: path.resolve(process.cwd(), `src/${find}`),
    })),
  },
});
