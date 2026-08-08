/** P14의 공식 canonical과 GSDevTools 학습 분모를 고정한다. */
export const gsdevtoolsMeta = {
  title: 'animation의 시간을 멈추고, 느리게 보고, 구간만 확인하려면?',
  category: 'GSAP · Other · GSDevTools',
  summary:
    'GSDevTools는 개발 중 GSAP animation의 playhead를 직접 조작하는 browser UI이며, 특정 timeline을 연결하면 전역 animation 병합 없이 한 장면을 검사할 수 있습니다.',
  sourcePath: 'src/content/gsap/other/gsdevtools/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'GSDevTools', href: 'https://gsap.com/docs/v3/Plugins/GSDevTools/' },
    {
      label: 'GSDevTools.create()',
      href: 'https://gsap.com/docs/v3/Plugins/GSDevTools/static.create()/',
    },
  ],
} as const

/** 공식 item을 debugging부터 disposal까지 네 질문에 배치한다. */
export const gsdevtoolsSections = [
  {
    id: 'debugging-problem',
    number: '01',
    title: '시간을 직접 만져야 하는 debugging 문제',
    sourceItems: 4,
  },
  {
    id: 'create-instance',
    number: '02',
    title: '특정 labelled timeline을 inspector에 연결합니다',
    sourceItems: 5,
  },
  {
    id: 'config-controls',
    number: '03',
    title: 'config로 처음 열리는 inspector를 정합니다',
    sourceItems: 5,
  },
  {
    id: 'production-boundary',
    number: '04',
    title: '개발 전용 UI를 dispose하고 production에서 뺍니다',
    sourceItems: 4,
  },
] as const

/** 2 canonical, 18 official item, 2 installed-source boundary의 coverage 분모다. */
export const gsdevtoolsCoverage = {
  officialSources: 2,
  officialSourceItems: 18,
  sourceVerifiedItems: 2,
  localSections: 4,
} as const
