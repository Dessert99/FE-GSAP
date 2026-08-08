/** P36이 소유한 ScrollSmoother canonical 일곱 개를 항목 단위로 고정한다. */
export const scrollSmootherCreateCatalog = [
  {
    id: 'SMOOTHER-01',
    officialItem: 'ScrollSmoother',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/',
    summary: 'native vertical scroll과 wrapper/content setup, 등록 순서',
  },
  {
    id: 'SMOOTHER-02',
    officialItem: 'content()',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/content()/',
    summary: 'content element getter/setter',
  },
  {
    id: 'SMOOTHER-03',
    officialItem: 'scrollTrigger',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTrigger/',
    summary: 'smoother가 내부에서 만든 main ScrollTrigger',
  },
  {
    id: 'SMOOTHER-04',
    officialItem: 'ScrollSmoother.create()',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.create()/',
    summary: 'root page singleton을 만들고 반환',
  },
  {
    id: 'SMOOTHER-05',
    officialItem: 'ScrollSmoother.get()',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.get()/',
    summary: '이미 만들어진 singleton 참조 읽기',
  },
  {
    id: 'SMOOTHER-06',
    officialItem: 'vars',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/vars/',
    summary: '초기 create configuration object',
  },
  {
    id: 'SMOOTHER-07',
    officialItem: 'wrapper()',
    href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/wrapper()/',
    summary: 'viewport wrapper getter/setter',
  },
] as const
