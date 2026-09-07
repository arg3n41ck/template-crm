import { AvatarProfile } from '.'
import type { Meta, StoryObj } from '@storybook/react-vite'

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
    size: 55,
  },
}
