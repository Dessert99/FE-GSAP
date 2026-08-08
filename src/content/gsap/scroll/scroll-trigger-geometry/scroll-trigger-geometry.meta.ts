/** P41의 fourteen ScrollTrigger geometry canonical과 local identity를 고정한다. */
export const scrollTriggerGeometryMeta = {
  title: 'scroll geometry를 숫자와 element ownership으로 읽으려면?',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    'local ruler에서 ScrollTrigger가 계산한 start/end, state, owner element와 viewport utility를 sparse snapshot으로 읽습니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-geometry/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'ScrollTrigger properties',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    },
    {
      label: 'ScrollTrigger utilities',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.positionInViewport/',
    },
  ],
} as const
