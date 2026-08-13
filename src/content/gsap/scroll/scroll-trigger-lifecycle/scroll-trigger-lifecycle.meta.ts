/** ScrollTrigger 수명 주기의 공식 문서 링크와 페이지 설명을 고정한다. */
export const scrollTriggerLifecycleMeta = {
  title: 'layout 변화에는 refresh, scroll 값에는 update를 고릅니다',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    '하나의 trigger에서 enable·disable·kill과 instance/global refresh, event ordering, sort, update의 범위를 비교합니다.',
  reviewedAt: '2026-08-13',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-lifecycle/',
  officialSources: [
    ['disable()', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/disable()/'],
    ['enable()', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/enable()/'],
    ['kill()', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/kill()/'],
    ['refresh()', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()/'],
    [
      'addEventListener()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.addEventListener()/',
    ],
    [
      'static refresh()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/',
    ],
    [
      'removeEventListener()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.removeEventListener()/',
    ],
    ['sort()', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.sort()/'],
    [
      'update()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.update()/',
    ],
  ].map(([label, href]) => ({ label, href })),
} as const
