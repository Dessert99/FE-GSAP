/** FloatingToc의 닫힌 상태와 실제 사용자 클릭 후 열린 상태를 확인한다. */
import type { Meta, StoryObj } from '@storybook/react-vite'
import { tracks } from '../../../app/routes'
import { FloatingToc } from './FloatingToc'

const meta = {
  title: 'Components/Navigation/FloatingToc',
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

/** FloatingToc 스토리를 탐색 컴포넌트 분류에 등록한다. */
export default meta
type Story = StoryObj<typeof meta>

/** 기본 진입 시 목차가 닫힌 상태를 보여준다. */
export const Closed: Story = {}

/** 사용자 클릭으로 목차를 연 뒤의 항목 배치를 보여준다. */
export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '목차 열기' }))
  },
}
