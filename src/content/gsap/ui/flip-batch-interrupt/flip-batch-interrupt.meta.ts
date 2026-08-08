/** P13 route identity와 item/section coverage 분모를 제공한다. */
export const flipBatchInterruptMeta = {
  title: 'Flip batch는 새 layout과 이전 flip 충돌을 어떻게 막을까요?',
  category: 'GSAP · UI · Flip',
  reviewedAt: '2026-08-08',
  sourcePath: 'src/content/gsap/ui/flip-batch-interrupt/',
  officialSources: [
    {
      label: 'Flip.batch()',
      href: 'https://gsap.com/docs/v3/Plugins/Flip/static.batch()/',
    },
    {
      label: 'Flip.isFlipping()',
      href: 'https://gsap.com/docs/v3/Plugins/Flip/static.isFlipping()/',
    },
    {
      label: 'Flip.killFlipsOf()',
      href: 'https://gsap.com/docs/v3/Plugins/Flip/static.killFlipsOf()/',
    },
  ],
} as const
export const flipBatchInterruptCoverage = {
  officialSources: 3,
  officialSourceItems: 6,
  implementationItems: 1,
  runtimeProbeItems: 0,
  localSections: 5,
} as const
