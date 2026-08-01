import { lazy } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { TrackDefinition } from '../../../app/routes'
import { FloatingToc } from './FloatingToc'

const Page = lazy(async () => ({ default: () => null }))
const track: TrackDefinition = {
  id: 'fundamentals',
  label: '기본',
  description: '기본 문법',
  lessons: [
    { slug: 'gsap-to', title: 'gsap.to()', group: '트윈 기초', Page },
    { slug: 'gsap-from', title: 'gsap.from()', group: '트윈 기초', Page },
  ],
}

describe('FloatingToc', () => {
  it('opens and closes with the circular trigger', async () => {
    const user = userEvent.setup()
    render(<FloatingToc track={track} activeLessonSlug="gsap-to" onNavigate={vi.fn()} />)

    const trigger = screen.getByRole('button', { name: '목차 열기' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: '기본 목차' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: '목차 닫기' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('navigates and collapses after selecting a lesson', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<FloatingToc track={track} activeLessonSlug="gsap-to" onNavigate={onNavigate} />)

    await user.click(screen.getByRole('button', { name: '목차 열기' }))
    await user.click(screen.getByRole('button', { name: 'gsap.from()' }))

    expect(onNavigate).toHaveBeenCalledWith('/fundamentals/gsap-from')
    expect(screen.getByRole('button', { name: '목차 열기' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes from Escape and outside click', async () => {
    const user = userEvent.setup()
    render(<FloatingToc track={track} activeLessonSlug="gsap-to" onNavigate={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: '목차 열기' }))
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: '목차 열기' })).toHaveAttribute('aria-expanded', 'false')

    await user.click(screen.getByRole('button', { name: '목차 열기' }))
    await user.click(document.body)
    expect(screen.getByRole('button', { name: '목차 열기' })).toHaveAttribute('aria-expanded', 'false')
  })
})
