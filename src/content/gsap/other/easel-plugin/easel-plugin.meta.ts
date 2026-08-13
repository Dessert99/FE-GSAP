/** P10 EaselPlugin page identity와 coverage 분모를 제공한다. */
export const easelPluginMeta = {
  title: 'EaselPlugin은 DOM이 아닌 CreateJS object를 어떻게 tween할까요?',
  category: 'GSAP · Other · EaselPlugin',
  summary:
    'EaselJS display object의 일반 값과 filter 전용 easel vars를 나누고, GSAP update 뒤 Stage draw가 필요한 canvas 경계를 살펴봅니다.',
  sourcePath: 'src/content/gsap/other/easel-plugin/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'EaselPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/EaselPlugin/',
    },
  ],
} as const
export const easelPluginCoverage = {
  officialSources: 1,
  officialSourceItems: 9,
  runtimeProbeItems: 0,
  localSections: 5,
} as const
