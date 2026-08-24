import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    env: loadEnv('test', process.cwd(), ''),
    setupFiles: ['./tests/setup-test.ts'],
    include: ['./**/*.test*.{ts,tsx}'],
    exclude: ['node_modules', 'tests-e2e'],
    reporters: process.env.CI ? ['github-actions', 'default'] : ['default'],
    globals: true,
    passWithNoTests: true,
  },
})
