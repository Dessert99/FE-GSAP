import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OfficialDocsLink } from './OfficialDocsLink'

describe('OfficialDocsLink', () => {
  it('opens the labeled official document in a safe new tab', () => {
    render(
      <OfficialDocsLink
        label="상대값"
        href="https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values"
      />,
    )

    const link = screen.getByRole('link', { name: '상대값 공식 문서 새 탭에서 열기' })

    expect(link).toHaveAttribute(
      'href',
      'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values',
    )
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
