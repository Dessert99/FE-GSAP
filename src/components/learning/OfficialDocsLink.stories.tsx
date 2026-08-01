import type { Meta, StoryObj } from '@storybook/react-vite'
import { OfficialDocsLink } from './OfficialDocsLink'

const meta = {
  title: 'Components/Learning/OfficialDocsLink',
  component: OfficialDocsLink,
  args: {
    label: 'gsap.to()',
    href: 'https://gsap.com/docs/v3/GSAP/gsap.to()/',
  },
} satisfies Meta<typeof OfficialDocsLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongLabel: Story = {
  args: {
    label: '상대값과 랜덤 값 표현',
  },
}
