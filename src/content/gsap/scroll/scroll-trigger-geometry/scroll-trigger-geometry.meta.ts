/** ScrollTrigger geometry 학습 페이지의 경로와 공식 문서 링크를 정의한다. */
export const scrollTriggerGeometryMeta = {
  title: 'scroll geometry를 숫자와 element 기준으로 읽으려면?',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    'local ruler에서 ScrollTrigger가 계산한 start/end와 state를 요청 시점에 고정하고, element 기준 값과 viewport utility를 구분해 읽습니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-geometry/',
  reviewedAt: '2026-08-13',
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
