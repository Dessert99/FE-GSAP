/** condition simulator·style snapshot·navigation timeline이 함께 읽는 복원 값을 고정한다. */
export type ResponsiveRestorationDescriptor = {
  legacyQuery: string
  coreQuery: string
  reducedMotionQuery: string
  savedStyleLabel: string
  activeStyleLabel: string
  navigationSteps: readonly string[]
}

/** 실제 host scroll을 바꾸지 않는 responsive restoration 학습 descriptor다. */
export const responsiveRestorationDescriptor: ResponsiveRestorationDescriptor =
  {
    legacyQuery: '(min-width: 960px)',
    coreQuery: '(min-width: 960px)',
    reducedMotionQuery: '(prefers-reduced-motion: reduce)',
    savedStyleLabel: 'inline style snapshot: 없음',
    activeStyleLabel: 'condition style: outline + background',
    navigationSteps: [
      'route 전환 전에 page owner가 cleanup 범위를 결정',
      'ScrollTrigger.clearScrollMemory()는 필요할 때만 app owner가 호출',
      '새 route와 condition을 만든 뒤 refresh timing을 결정',
      'browser history restoration은 ScrollTrigger와 별도 정책',
    ],
  }
