import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../../../../src/**/*.mdx',
    '../../../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@shared': path.resolve(__dirname, '../../../shared'),
          '@app': path.resolve(__dirname, '../../../app'),
          '@pages': path.resolve(__dirname, '../../../pages'),
          '@types': path.resolve(__dirname, '../../../types'),
          '@modules': path.resolve(__dirname, '../../../modules'),
        },
      },
    })
  },
}

export default config
