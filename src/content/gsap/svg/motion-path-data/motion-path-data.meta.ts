/** P22의 여섯 MotionPath raw-data canonical과 page source identity를 고정한다. */
export const motionPathDataMeta = {
  title: '서로 다른 path 입력을 RawPath 하나로 어떻게 모을까요?',
  category: 'GSAP · SVG · MotionPathPlugin',
  summary:
    'MotionPathPlugin utility는 point·array·SVG shape·d string·RawPath를 cubic numeric segment와 SVG path data 사이에서 변환합니다.',
  sourcePath: 'src/content/gsap/svg/motion-path-data/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'pointsToSegment()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/methods/static-pointsToSegment/',
    },
    {
      label: 'arrayToRawPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.arrayToRawPath()/',
    },
    {
      label: 'convertToPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.convertToPath()/',
    },
    {
      label: 'getRawPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getRawPath()/',
    },
    {
      label: 'rawPathToString()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.rawPathToString()/',
    },
    {
      label: 'stringToRawPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.stringToRawPath()/',
    },
  ],
} as const

/** 여섯 utility를 input·DOM·RawPath·round-trip 순서로 배열한다. */
export const motionPathDataSections = [
  {
    id: 'input-shapes',
    number: '01',
    title: 'point와 array 입력',
    sourceItems: 2,
  },
  {
    id: 'svg-boundary',
    number: '02',
    title: 'SVG DOM conversion',
    sourceItems: 1,
  },
  {
    id: 'raw-pipeline',
    number: '03',
    title: 'RawPath와 d string 왕복',
    sourceItems: 3,
  },
] as const
