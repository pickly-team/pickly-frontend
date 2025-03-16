import pkg from './package.json';
import base from './vite.config.base';
import path from 'path';
import {mergeConfig} from 'vite';

export default mergeConfig(base, {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: pkg.name,
      formats: ['es'],
      fileName: (format: 'es') =>
        ['index', format === 'es' ? '' : format, 'js']
          .filter(Boolean)
          .join('.'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@emotion/styled', '@emotion/react'],
    },
  },
});
