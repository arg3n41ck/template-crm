import type { Meta, StoryObj } from '@storybook/react-vite'

import { AppearanceAnimation } from './AppearanceAnimation'

const meta = {
  title: '/shared/ui/appearance-animation/AppearanceAnimation',
  component: AppearanceAnimation,
  tags: ['autodocs'],
  argTypes: {
    animationVariant: {
      control: 'select',
      options: ['bottom', 'appearance', 'slide'],
    },
  },
} satisfies Meta<typeof AppearanceAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Bottom: Story = {
  args: {
    animationVariant: 'bottom',
    children: 'Animated content',
  },
}
