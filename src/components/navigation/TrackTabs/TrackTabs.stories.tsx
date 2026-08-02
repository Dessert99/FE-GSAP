/** TrackTabs에서 각 트랙이 선택된 세 가지 상태를 비교한다. */
import type { MouseEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { tracks } from '../../../app/routes'
import { TrackTabs } from './TrackTabs'

function preventNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

const meta = {
  title: 'Components/Navigation/TrackTabs',
  component: TrackTabs,
  argTypes: {
    tracks: { control: false },
    onNavigate: { control: false },
  },
  args: {
    tracks,
    activeTrackId: 'fundamentals',
    onNavigate: preventNavigation,
  },
} satisfies Meta<typeof TrackTabs>

/** TrackTabs 스토리를 탐색 컴포넌트 분류에 등록한다. */
export default meta
type Story = StoryObj<typeof meta>

/** 기본 학습 트랙이 선택된 상태를 보여준다. */
export const Fundamentals: Story = {}

/** 조합 패턴 트랙이 선택된 상태를 보여준다. */
export const Patterns: Story = {
  args: {
    activeTrackId: 'patterns',
  },
}

/** 실무 쇼케이스 트랙이 선택된 상태를 보여준다. */
export const Showcases: Story = {
  args: {
    activeTrackId: 'showcases',
  },
}
