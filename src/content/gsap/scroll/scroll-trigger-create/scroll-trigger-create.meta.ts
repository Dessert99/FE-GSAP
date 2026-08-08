/** P40의 source identity와 모든 canonical official link를 page header에 제공한다. */
export const scrollTriggerCreateMeta = {
  title: 'ScrollTrigger는 scroll 전에 무엇을 측정하고 만들까?',
  category: 'GSAP · Scroll · ScrollTrigger',
  summary:
    '하나의 local scroller에서 create config, measured instance, markers와 vars를 같은 descriptor로 읽습니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-trigger-create/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'ScrollTrigger',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/',
    },
    {
      label: 'ScrollTrigger.config()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config()/',
    },
    {
      label: 'ScrollTrigger.create()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.create()/',
    },
    {
      label: 'ScrollTrigger.defaults()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.defaults()/',
    },
    {
      label: 'ScrollTrigger.vars',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/vars/',
    },
  ],
} as const
