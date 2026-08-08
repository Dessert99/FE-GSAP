/** P36의 source identity와 문서 링크를 페이지 조립부에 제공한다. */
export const scrollSmootherCreateMeta = {
  title: 'ScrollSmoother를 root page에 한 번만 만드는 법',
  category: 'GSAP · Scroll · ScrollSmoother',
  summary:
    'native body scroll을 유지한 채 wrapper/content를 준비하고, root owner가 singleton을 만들고 정리하는 경계를 배웁니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-smoother-create/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'ScrollSmoother',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/',
    },
    {
      label: 'content()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/content()/',
    },
    {
      label: 'scrollTrigger',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTrigger/',
    },
    {
      label: 'create()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.create()/',
    },
    {
      label: 'get()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.get()/',
    },
    {
      label: 'vars',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/vars/',
    },
    {
      label: 'wrapper()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/wrapper()/',
    },
  ],
} as const
