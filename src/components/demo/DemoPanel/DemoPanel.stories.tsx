/** DemoPanel의 기본 상태와 공식 참조가 있는 상태를 독립적으로 확인한다. */
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

/** DemoPanel 스토리를 데모 컴포넌트 분류에 등록한다. */
export default meta
type Story = StoryObj<typeof meta>

/** 참조 링크 없이 데모의 기본 골격만 확인한다. */
export const Default: Story = {}

/** 여러 공식 자료가 함께 배치될 때의 레이아웃을 확인한다. */
export const WithOfficialReferences: Story = {
  args: {
    references: [
      { label: 'gsap.to()', href: 'https://gsap.com/docs/v3/GSAP/gsap.to()/' },
      { label: 'Tween', href: 'https://gsap.com/docs/v3/GSAP/Tween/' },
    ],
  },
}
