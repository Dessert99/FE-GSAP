import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DemoPanel } from './DemoPanel'

describe('DemoPanel', () => {
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

    expect(onMount).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: '기본 이동 다시 재생' }))
    expect(onMount).toHaveBeenCalledTimes(2)
  })
})
