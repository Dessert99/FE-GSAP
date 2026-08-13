/** InertiaPlugin의 source·섹션·coverage 계약을 고정한다. */
export const inertiaMeta = {
  title: '속도를 읽어 경계 안의 멈춤점을 예측하려면?',
  category: 'GSAP · UI · InertiaPlugin',
  summary:
    'InertiaPlugin은 현재 속도에서 자연스러운 감속을 계산하고, bounds와 end snap으로 멈춤점을 제한합니다.',
  sourcePath: 'src/content/gsap/ui/inertia/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'InertiaPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/',
    },
    {
      label: 'getVelocity()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.getVelocity()/',
    },
    {
      label: 'isTracking()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.isTracking()/',
    },
    {
      label: 'track()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.track()/',
    },
    {
      label: 'untrack()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.untrack()/',
    },
  ],
} as const

export const inertiaSections = [
  {
    number: '01',
    id: 'velocity-sample',
    title: '속도는 초당 변화량이다',
    sourceItems: 5,
  },
  {
    number: '02',
    id: 'tracking-lifecycle',
    title: '먼저 track하고 읽는다',
    sourceItems: 6,
  },
  {
    number: '03',
    id: 'destination-prediction',
    title: '감속이 자연스러운 도착점을 정한다',
    sourceItems: 5,
  },
  {
    number: '04',
    id: 'bounds-end',
    title: '범위와 notch로 도착점을 제한한다',
    sourceItems: 7,
  },
  {
    number: '05',
    id: 'cleanup-boundaries',
    title: '추적과 tween을 모두 정리한다',
    sourceItems: 4,
  },
] as const

export const inertiaCoverage = {
  officialSources: 5,
  officialSourceItems: 25,
  implementationItems: 2,
  runtimeProbeItems: 1,
  localSections: 5,
} as const
