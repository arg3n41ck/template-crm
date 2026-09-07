import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@shared': `${import.meta.dirname}/src/shared`,
      '@app': `${import.meta.dirname}/src/app`,
      '@modules': `${import.meta.dirname}/src/modules`,
      '@': `${import.meta.dirname}/src`,
    },
  },
  test: {
    environment: 'happy-dom',
    env: loadEnv('test', process.cwd(), ''),
    setupFiles: ['./tests/setup-test.ts'],
    include: ['./**/*.test*.{ts,tsx}'],
    exclude: ['node_modules', 'tests-e2e'],
    reporters: process.env.CI ? ['github-actions', 'default'] : ['default'],
    globals: true,
    passWithNoTests: false,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/routeTree.gen.ts',
        'src/shared/services/api/generated/**',
      ],
    },
  },
})
