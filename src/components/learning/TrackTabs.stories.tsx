import type { MouseEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { tracks } from '../../app/routes'
import { TrackTabs } from './TrackTabs'

function preventNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

const meta = {
  title: 'Components/Learning/TrackTabs',
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

export default meta
type Story = StoryObj<typeof meta>

export const Fundamentals: Story = {}

export const Patterns: Story = {
  args: {
    activeTrackId: 'patterns',
  },
}

export const Showcases: Story = {
  args: {
    activeTrackId: 'showcases',
  },
}
