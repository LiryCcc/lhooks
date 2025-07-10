import { resolve } from 'node:path';
import { defineConfig } from 'tsdown';
import pkg from './package.json';

const __dirname = import.meta.dirname;
const { require, import: esm, browser } = pkg.exports['.'];
const external = ['react', 'react-dom'];

const tsdownConfig = defineConfig([
  {
    // cjs entry
    entry: 'src/index.ts',
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, '.')
    },
    format: 'cjs',
    platform: 'node',
    clean: true,
    outDir: 'dist',
    outputOptions: {
      file: require
    },
    external
  },
  {
    // esm entry
    entry: 'src/index.ts',
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, '.')
    },
    format: 'esm',
    platform: 'browser',
    clean: true,
    outDir: 'dist',
    outputOptions: {
      file: esm
    },
    external
  },
  {
    entry: 'src/index.ts',
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, '.')
    },
    format: 'umd',
    platform: 'neutral',
    clean: true,
    outDir: 'dist',
    outputOptions: {
      name: 'LHooks',
      file: browser
    },
    external
  },
  {
    entry: 'src/index.ts',
    dts: true,
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, '.')
    }
  }
]);

export default tsdownConfig;
