/** P08의 공식 출처·학습 순서·coverage 분모를 한곳에서 고정한다. */
export const draggableCollisionMomentumMeta = {
  title: '겹침을 판정하고, release 뒤 throw tween을 읽으려면?',
  category: 'GSAP · UI · Draggable',
  summary:
    'hitTest()는 두 사각형의 겹침을 Boolean으로 바꾸고, inertia release가 만든 tween은 isThrowing과 tween으로 읽습니다. 충돌 판정과 momentum 관찰은 서로 다른 순간의 질문입니다.',
  sourcePath: 'src/content/gsap/ui/draggable-collision-momentum/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'isThrowing', href: 'https://gsap.com/docs/v3/Plugins/Draggable/isThrowing/' },
    {
      label: 'Draggable.hitTest()',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.hitTest()/',
    },
    { label: 'tween', href: 'https://gsap.com/docs/v3/Plugins/Draggable/tween/' },
  ],
} as const

/** 충돌 계산에서 cleanup까지의 다섯 단계가 공식 item 전체를 나눈다. */
export const draggableCollisionMomentumSections = [
  {
    number: '01',
    id: 'overlap-geometry',
    title: '충돌은 먼저 두 사각형의 겹침입니다',
    sourceItems: 2,
  },
  {
    number: '02',
    id: 'threshold-forms',
    title: 'threshold는 pixel 또는 percentage입니다',
    sourceItems: 2,
  },
  {
    number: '03',
    id: 'throw-state',
    title: 'isThrowing은 inertia tween 상태입니다',
    sourceItems: 1,
  },
  {
    number: '04',
    id: 'tween-inspector',
    title: 'tween은 release마다 새로 읽습니다',
    sourceItems: 2,
  },
  {
    number: '05',
    id: 'cleanup-fallback',
    title: '관찰은 정리와 fallback을 포함합니다',
    sourceItems: 1,
  },
] as const

/** 공식 3 canonical과 source/probe 경계를 분리해 coverage를 계산한다. */
export const draggableCollisionMomentumCoverage = {
  officialSources: 3,
  officialSourceItems: 8,
  sourceVerifiedItems: 3,
  localSections: 5,
} as const
