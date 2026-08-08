/** P45의 official identity와 네 canonical link를 header에 제공한다. */
export const scrollTriggerResponsiveMeta = {
  title: 'responsive 조건이 바뀌면 style과 scroll state를 어떻게 복원할까?',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    'condition cleanup, inline style snapshot, navigation scroll-memory boundary를 host scroll 없이 분리해 읽습니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-responsive/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'clearMatchMedia()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.clearMatchMedia()/',
    },
    {
      label: 'clearScrollMemory()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.clearScrollMemory()/',
    },
    {
      label: 'matchMedia()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.matchMedia()/',
    },
    {
      label: 'saveStyles()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.saveStyles()/',
    },
  ],
} as const
