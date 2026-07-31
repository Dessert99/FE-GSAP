import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GsapToPage } from './GsapToPage'

describe('GsapToPage', () => {
  it('separates API value forms from situation examples', () => {
    render(<GsapToPage />)

    expect(screen.getByRole('heading', { name: '공식 API 항목' })).toBeVisible()
    expect(screen.getByRole('heading', { name: '상황별 예제' })).toBeVisible()

    for (const title of ['기본 이동', '여러 속성', '상대값', '함수 기반 값', '여러 타깃', '카드 상태 피드백']) {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    }
  })
})
