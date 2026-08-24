import type { Meta, StoryObj } from '@storybook/react'

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
  },
  // render: (args) => (
  //   <AppearanceAnimation {...args}>
  //     <div style={{ width: '300px', height: '300px', background: 'red' }}>
  //       Привет
  //     </div>
  //   </AppearanceAnimation>
  // ),
}

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// }

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// }

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// }
