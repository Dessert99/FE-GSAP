/** P17의 다섯 VelocityTracker read canonical과 학습 분모를 고정한다. */
export const velocityTrackerReadMeta = {
  title: 'tracking 중인 값에서 올바른 velocity를 읽으려면?',
  category: 'GSAP · UI · VelocityTracker',
  summary:
    'VelocityTracker는 stable target에서 tracker를 찾고, property membership을 확인한 뒤 현재 velocity를 읽습니다. 값은 sample 사이의 변화와 시간에 따라 달라집니다.',
  sourcePath: 'src/content/gsap/ui/velocity-tracker-read/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'VelocityTracker.get()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.get()/',
    },
    {
      label: 'VelocityTracker.getByTarget()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.getByTarget()/',
    },
    {
      label: 'VelocityTracker.isTracking()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.isTracking()/',
    },
    {
      label: 'VelocityTracker.isTrackingProp()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.isTrackingProp()/',
    },
    {
      label: 'VelocityTracker.target',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.target/',
    },
  ],
} as const

/** 다섯 read API를 lookup, membership, value, timing과 missing boundary로 배치한다. */
export const velocityTrackerReadSections = [
  {
    id: 'established-tracker',
    number: '01',
    title: '먼저 이미 tracking 중인 target을 둡니다',
    sourceItems: 1,
  },
  {
    id: 'lookup-membership',
    number: '02',
    title: 'target과 property를 각각 확인합니다',
    sourceItems: 2,
  },
  {
    id: 'read-snapshot',
    number: '03',
    title: '선택한 property의 현재 velocity를 snapshot으로 읽습니다',
    sourceItems: 1,
  },
  {
    id: 'sampling-missing',
    number: '04',
    title: 'sample timing과 missing target을 구분합니다',
    sourceItems: 1,
  },
] as const

/** P17은 5 canonical을 소유하며 installed 3.15 boundary는 각 row evidence에 결합한다. */
export const velocityTrackerReadCoverage = {
  officialSources: 5,
  officialSourceItems: 5,
  sourceVerifiedItems: 0,
  localSections: 4,
} as const
