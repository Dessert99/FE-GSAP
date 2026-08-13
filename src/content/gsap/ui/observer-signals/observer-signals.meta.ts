/** Observer signal 학습 페이지의 경로와 공식 문서 링크를 정의한다. */
export const observerSignalsMeta = {
  title: '입력이 얼마나, 얼마나 빠르게, 어디서 왔는지 읽으려면?',
  category: 'GSAP · UI · Observer',
  summary:
    'Observer signal은 시작 좌표·현재 좌표·delta·velocity·최근 event를 서로 다른 시간 기준으로 읽습니다.',
  sourcePath: 'src/content/gsap/ui/observer-signals/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'Observer.deltaX',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/deltaX/',
    },
    {
      label: 'Observer.deltaY',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/deltaY/',
    },
    {
      label: 'Observer.event',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/event/',
    },
    {
      label: 'Observer.startX',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/startX/',
    },
    {
      label: 'Observer.startY',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/startY/',
    },
    {
      label: 'Observer.isTouch',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/static.isTouch/',
    },
    {
      label: 'Observer.velocityX',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/velocityX/',
    },
    {
      label: 'Observer.velocityY',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/velocityY/',
    },
    {
      label: 'Observer.x',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/x/',
    },
    {
      label: 'Observer.y',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/y/',
    },
  ],
} as const
