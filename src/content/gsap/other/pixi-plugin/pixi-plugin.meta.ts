/** P30의 PixiPlugin canonical identity와 학습 목차를 고정한다. */
export const pixiPluginMeta = {
  title: 'PixiPlugin은 PixiJS의 하위 속성을 어떻게 tween할까?',
  category: 'GSAP · Other · PixiPlugin',
  summary:
    'PixiPlugin은 PixiJS display object의 transform·색·filter를 GSAP vars로 연결하지만 renderer를 대신하지는 않습니다.',
  sourcePath: 'src/content/gsap/other/pixi-plugin/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'PixiPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/PixiPlugin/',
    },
    {
      label: 'PixiPlugin.registerPIXI()',
      href: 'https://gsap.com/docs/v3/Plugins/PixiPlugin/static.registerPIXI()/',
    },
  ],
} as const

/** 정적 integration page의 학습 섹션과 source item 수를 제공한다. */
export const pixiPluginSections = [
  { id: 'pixi-setup', number: '01', title: 'namespace 등록', sourceItems: 1 },
  {
    id: 'pixi-properties',
    number: '02',
    title: 'Pixi vars의 변환과 filter',
    sourceItems: 1,
  },
  {
    id: 'renderer-boundary',
    number: '03',
    title: 'renderer와 cleanup 경계',
    sourceItems: 1,
  },
] as const
