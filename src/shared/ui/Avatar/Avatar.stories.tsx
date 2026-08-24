import { AvatarProfile } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: '/shared/ui/avatar',
  component: AvatarProfile,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
    },
    src: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AvatarProfile>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarProfileExample: Story = {
  args: {
    subtitle: 'subtitle',
    title: 'title',
    src: 'https://i.pravatar.cc/300',
    size: 55,
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
