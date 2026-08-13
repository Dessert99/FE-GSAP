/** P16의 공식 identity와 five-item coverage 분모를 표시한다. */
export const velocityTrackerLifecycleMeta = {
  title: 'VelocityTracker의 tracking set은 언제 만들고 지울까요?',
  category: 'GSAP · UI · InertiaPlugin',
  summary:
    '하나의 stable target에 x와 rotation을 추적하고, property를 더하거나 빼고, target 전체를 untrack하는 lifecycle을 다룹니다.',
  sourcePath: 'src/content/gsap/ui/velocity-tracker-lifecycle/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'VelocityTracker',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/',
    },
    {
      label: 'VelocityTracker.addProp()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.addProp()/',
    },
    {
      label: 'VelocityTracker.removeProp()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.removeProp()/',
    },
    {
      label: 'VelocityTracker.track()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.track/',
    },
    {
      label: 'VelocityTracker.untrack()',
      href: 'https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.untrack()/',
    },
  ],
} as const

/** 다섯 canonical을 ownership부터 cleanup까지 초보자 흐름으로 배열한다. */
export const velocityTrackerLifecycleSections = [
  { number: '01', title: 'tracker 생성', sourceItems: 1 },
  { number: '02', title: 'choose property set', sourceItems: 1 },
  { number: '03', title: 'add / remove', sourceItems: 2 },
  { number: '04', title: 'whole-target untrack', sourceItems: 1 },
  { number: '05', title: 'cleanup', sourceItems: 0 },
] as const

/** page-level coverage는 공식 canonical 다섯 개와 다섯 local row를 함께 센다. */
export const velocityTrackerLifecycleCoverage = {
  officialSources: 5,
  officialSourceItems: 5,
  sourceVerifiedItems: 5,
  localSections: 5,
} as const
