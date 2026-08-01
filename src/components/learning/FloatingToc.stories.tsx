import type { Meta, StoryObj } from '@storybook/react-vite'
import { tracks } from '../../app/routes'
import { FloatingToc } from './FloatingToc'

const meta = {
  title: 'Components/Learning/FloatingToc',
  component: FloatingToc,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    track: { control: false },
    onNavigate: { control: false },
  },
  args: {
    track: tracks[0],
    activeLessonSlug: 'gsap-to',
    onNavigate: () => undefined,
  },
} satisfies Meta<typeof FloatingToc>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '목차 열기' }))
  },
}
