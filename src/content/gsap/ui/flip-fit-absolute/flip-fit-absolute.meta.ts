/** Flip fit/absolute 페이지의 source·섹션·coverage 계약을 고정한다. */
export const flipFitAbsoluteMeta = {
  title: '두 layout box의 좌표를 어떻게 맞추고 flow에서 뺄까요?',
  category: 'GSAP · UI · Flip',
  summary:
    'Flip.fit()으로 source box를 destination의 viewport area에 맞추고, Flip.makeAbsolute()이 flow를 어떻게 바꾸는지 확인합니다.',
  sourcePath: 'src/content/gsap/ui/flip-fit-absolute/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'Flip.fit()',
      href: 'https://gsap.com/docs/v3/Plugins/Flip/static.fit()/',
    },
    {
      label: 'Flip.makeAbsolute()',
      href: 'https://gsap.com/docs/v3/Plugins/Flip/static.makeAbsolute()/',
    },
  ],
} as const
export const flipFitAbsoluteSections = [
  {
    number: '01',
    id: 'coordinate-ownership',
    title: 'box가 누구의 coordinate에 놓이는지 본다',
    sourceItems: 2,
  },
  {
    number: '02',
    id: 'fit-modes',
    title: 'fit()은 calculate·apply·animate로 갈린다',
    sourceItems: 8,
  },
  {
    number: '03',
    id: 'absolute-flow',
    title: 'makeAbsolute()은 flow에서 box를 뺀다',
    sourceItems: 4,
  },
  {
    number: '04',
    id: 'containing-block',
    title: 'absolute positioning의 containing block을 확인한다',
    sourceItems: 2,
  },
  {
    number: '05',
    id: 'restoration',
    title: 'inline style과 flow를 복원한다',
    sourceItems: 0,
  },
] as const
export const flipFitAbsoluteCoverage = {
  officialSources: 2,
  officialSourceItems: 16,
  implementationItems: 2,
  runtimeProbeItems: 0,
  localSections: 5,
} as const
