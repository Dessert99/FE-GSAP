/** responsive restoration API의 입력과 scope boundary를 compact table로 제공한다. */
export const scrollTriggerResponsiveProperties = [
  [
    'ScrollTrigger.matchMedia(vars)',
    'Object',
    'deprecated since 3.11.0+',
    'legacy media-query setup; gsap.matchMedia()로 이동',
  ],
  [
    'ScrollTrigger.clearMatchMedia(query?)',
    'String | undefined',
    'undefined clears all',
    '등록만 해제하며 associated trigger/animation을 kill하지 않음',
  ],
  [
    'ScrollTrigger.saveStyles(targets)',
    'String | Element | Array',
    'none',
    'internal revert용 현재 inline CSS snapshot',
  ],
  [
    'ScrollTrigger.clearScrollMemory(scrollRestoration?)',
    '"auto" | "manual" | undefined',
    'loaded-time history value',
    'recorded position을 지우며 browser history policy와 별개',
  ],
] as const
