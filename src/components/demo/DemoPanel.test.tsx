import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DemoPanel } from './DemoPanel'

describe('DemoPanel', () => {
  it('renders every official reference supplied by the lesson', () => {
    render(
      <DemoPanel
        title="상대값"
        description="현재 값에서 상대적인 거리만큼 이동합니다."
        references={[
          { label: '상대값', href: 'https://gsap.com/docs/relative-values' },
          { label: 'Tween', href: 'https://gsap.com/docs/tween' },
        ]}
      >
        <div>움직이는 대상</div>
      </DemoPanel>,
    )

    expect(screen.getByRole('link', { name: '상대값 공식 문서 새 탭에서 열기' })).toHaveAttribute(
      'href',
      'https://gsap.com/docs/relative-values',
    )
    expect(screen.getByRole('link', { name: 'Tween 공식 문서 새 탭에서 열기' })).toHaveAttribute(
      'href',
      'https://gsap.com/docs/tween',
    )
  })

  it('remounts only the demo when replay is requested', async () => {
    const user = userEvent.setup()
    const onMount = vi.fn()

    function Demo() {
      useEffect(() => onMount(), [])

      return <div>움직이는 대상</div>
    }

    render(
      <DemoPanel title="기본 이동" description="현재 값에서 목표 값으로 이동합니다.">
        <Demo />
      </DemoPanel>,
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(onMount).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: '기본 이동 다시 재생' }))
    expect(onMount).toHaveBeenCalledTimes(2)
  })
})
