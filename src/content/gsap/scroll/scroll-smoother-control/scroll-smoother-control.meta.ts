/** P38의 ScrollSmoother command canonical과 공식 링크를 고정한다. */
export const scrollSmootherControlMeta = {
  title: '실행 중인 ScrollSmoother를 어떻게 읽고 제어할까?',
  category: 'GSAP · Scroll · ScrollSmoother',
  summary:
    '위치·속도·입력을 읽거나 바꾸는 여섯 command를 한 상태 모델에서 구분하고, 종료 시에는 smoother가 만든 것을 되돌립니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-smoother-control/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'ScrollSmoother.getVelocity()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/getVelocity()/',
    },
    {
      label: 'ScrollSmoother.kill()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/kill()/',
    },
    {
      label: 'ScrollSmoother.offset()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/offset()/',
    },
    {
      label: 'ScrollSmoother.paused()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/paused()/',
    },
    {
      label: 'ScrollSmoother.scrollTo()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTo()/',
    },
    {
      label: 'ScrollSmoother.scrollTop()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTop()/',
    },
  ],
} as const
