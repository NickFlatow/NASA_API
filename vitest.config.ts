/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root:'.',
  base: './',
  test: {
    // Adjust this pattern to match the location of your test files
    include: ['server/src/routes/launches/__tests__/test.ts'],
    exclude: ['node_modules', 'dist', /* other folders to exclude */],
    setupFiles: ['./setup.ts'],
  },
});
