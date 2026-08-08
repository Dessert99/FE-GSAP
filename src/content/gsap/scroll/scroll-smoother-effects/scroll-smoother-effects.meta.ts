/** P37의 ScrollSmoother effects·progress·smooth canonical identity를 고정한다. */
export const scrollSmootherEffectsMeta = {
  title: 'native scroll은 두고, 보이는 위치만 부드럽게 바꾸려면?',
  category: 'GSAP · Scroll · ScrollSmoother',
  summary:
    'ScrollSmoother는 native page scroll을 기준으로 progress를 읽고, smooth와 effects로 content가 따라오는 보이는 위치를 조절합니다.',
  sourcePath: 'src/content/gsap/scroll/scroll-smoother-effects/',
  reviewedAt: '2026-08-09',
  officialSources: [
    {
      label: 'ScrollSmoother.effects()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/effects()/',
    },
    {
      label: 'ScrollSmoother.progress',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/progress/',
    },
    {
      label: 'ScrollSmoother.smooth()',
      href: 'https://gsap.com/docs/v3/Plugins/ScrollSmoother/smooth()/',
    },
  ],
} as const
