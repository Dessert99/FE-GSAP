/** P28의 Observer lifecycle canonical identity를 고정한다. */
export const observerLifecycleMeta = {
  title: 'Observer를 멈추고 다시 만들려면?',
  category: 'GSAP · UI · Observer',
  summary:
    'disable은 listener를 떼고 enable은 disabled instance를 다시 붙이며 kill은 permanent disposal입니다.',
  sourcePath: 'src/content/gsap/ui/observer-lifecycle/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'disable()',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/disable()/',
    },
    {
      label: 'enable()',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/enable()/',
    },
    {
      label: 'isEnabled',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/isEnabled/',
    },
    {
      label: 'kill()',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/kill()/',
    },
  ],
} as const
export const observerLifecycleSections = [
  {
    id: 'lifecycle-lab',
    number: '01',
    title: 'one owned instance lifecycle',
    sourceItems: 4,
  },
] as const
