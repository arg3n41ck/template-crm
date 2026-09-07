import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../../../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { disableTelemetry: true },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve(import.meta.dirname, '../../../'),
          '@shared': path.resolve(import.meta.dirname, '../../'),
          '@app': path.resolve(import.meta.dirname, '../../../app'),
          '@pages': path.resolve(import.meta.dirname, '../../../pages'),
          '@modules': path.resolve(import.meta.dirname, '../../../modules'),
        },
      },
    }),
}

export default config
