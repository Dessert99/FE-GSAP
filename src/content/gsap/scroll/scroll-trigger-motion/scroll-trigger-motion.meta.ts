/** P42의 네 ScrollTrigger motion canonical과 로컬 identity를 고정한다. */
export const scrollTriggerMotionMeta = {
  title: 'scroll-driven motion은 어느 한 방식만 고릅니다',
  category: 'GSAP · Scroll · ScrollTrigger',
  reviewedAt: '2026-08-09',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-motion/',
  officialSources: [
    {
      label: 'ScrollTrigger.getTween()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/getTween()/',
    },
    {
      label: 'ScrollTrigger.getVelocity()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity()/',
    },
    {
      label: 'ScrollTrigger.batch()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.batch()/',
    },
    {
      label: 'ScrollTrigger.snapDirectional()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.snapDirectional()/',
    },
  ],
} as const
