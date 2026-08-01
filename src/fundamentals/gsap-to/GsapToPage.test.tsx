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

  it('connects the method and every example to its relevant official document', () => {
    render(<GsapToPage />)

    const expectedReferences = [
      ['gsap.to()', 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/'],
      ['x · CSS', 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/'],
      ['CSS 속성', 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/'],
      ['상대값', 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values'],
      ['함수 기반 값', 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#function-based-values'],
      ['stagger', 'https://gsap.com/resources/getting-started/Staggers/'],
      ['React · useGSAP()', 'https://gsap.com/resources/React/'],
    ] as const

    for (const [label, href] of expectedReferences) {
      expect(screen.getByRole('link', { name: `${label} 공식 문서 새 탭에서 열기` })).toHaveAttribute(
        'href',
        href,
      )
    }
  })
})
