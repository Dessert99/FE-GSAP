/** ScrollTrigger registry의 공식 문서 링크와 페이지 설명을 고정한다. */
export const scrollTriggerRegistryMeta = {
  title: 'registry를 읽고, 이 페이지가 만든 trigger만 정리합니다',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    '세 개의 labelled local trigger를 refresh order로 탐색하고, 전역 killAll의 범위를 확인한 뒤 안전할 때만 재생성합니다.',
  reviewedAt: '2026-08-13',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-registry/',
  officialSources: [
    ['next()', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/next()/'],
    [
      'previous()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/previous()/',
    ],
    [
      'getAll()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.getAll()/',
    ],
    [
      'getById()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.getById()/',
    ],
    [
      'isScrolling()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isScrolling()/',
    ],
    [
      'isTouch',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isTouch/',
    ],
    [
      'killAll()',
      'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.killAll()/',
    ],
  ].map(([label, href]) => ({ label, href })),
} as const
