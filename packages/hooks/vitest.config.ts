import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const __dirname = import.meta.dirname;

const vitestConfig = defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname)
    }
  },
  test: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname)
    },
    include: ['src/**/*.test.ts'],
    exclude: ['*.config.js', '*.config.ts'],
    coverage: {
      provider: 'v8'
    },
    environment: 'happy-dom',
    hookTimeout: 60000,
    testTimeout: 120000
  }
});

export default vitestConfig;
