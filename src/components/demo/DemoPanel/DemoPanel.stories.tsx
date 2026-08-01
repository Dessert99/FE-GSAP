import type { Meta, StoryObj } from '@storybook/react-vite'
import { DemoPanel } from './DemoPanel'

function DemoTarget() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 88,
        height: 88,
        borderRadius: 18,
        background: 'var(--color-accent)',
        color: 'var(--color-accent-ink)',
        fontWeight: 700,
      }}
    >
      target
    </div>
  )
}

const meta = {
  title: 'Components/Demo/DemoPanel',
  component: DemoPanel,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
    references: { control: false },
  },
  args: {
    title: '기본 이동',
    description: '현재 값에서 목표 값으로 이동하는 예제입니다.',
    children: <DemoTarget />,
  },
} satisfies Meta<typeof DemoPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithOfficialReferences: Story = {
  args: {
    references: [
      { label: 'gsap.to()', href: 'https://gsap.com/docs/v3/GSAP/gsap.to()/' },
      { label: 'Tween', href: 'https://gsap.com/docs/v3/GSAP/Tween/' },
    ],
  },
}
