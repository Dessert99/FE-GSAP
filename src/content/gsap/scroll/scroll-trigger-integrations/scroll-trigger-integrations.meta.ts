/** P46 normalizeScroll·observe·scrollerProxy canonical identity를 고정한다. */
export const scrollTriggerIntegrationsMeta = {
  title: 'native scroll을 보존하며 custom input을 연결하려면?',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    'normalizer, Observer, and scroller proxy are 서로 다른 ownership boundary이며 local target에서 안전한 mode만 실행합니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-integrations/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'normalizeScroll()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/',
    },
    {
      label: 'observe()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.observe()/',
    },
    {
      label: 'scrollerProxy()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()/',
    },
  ],
} as const
