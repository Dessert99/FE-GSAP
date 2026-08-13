/** DrawSVG 페이지의 source·섹션·coverage 계약을 고정한다. */
export const drawSvgMeta = {
  title: 'SVG stroke의 어느 구간을 보이게 할까요?',
  category: 'GSAP · SVG · DrawSVG',
  summary:
    'stroke 전체 길이 위의 시작·끝 위치를 drawSVG 값으로 정하고, 실제 길이와 현재 visible interval을 함께 읽습니다.',
  sourcePath: 'src/content/gsap/svg/draw-svg/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'DrawSVG',
      href: 'https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/',
    },
    {
      label: 'DrawSVGPlugin.getLength()',
      href: 'https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/static.getLength()/',
    },
    {
      label: 'DrawSVGPlugin.getPosition()',
      href: 'https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/static.getPosition()/',
    },
  ],
} as const

/** 세 canonical을 dash mental model부터 geometry boundary까지 재배치한다. */
export const drawSvgSections = [
  {
    number: '01',
    id: 'stroke-dash-mental-model',
    title: 'drawSVG는 stroke의 보이는 구간을 말한다',
    sourceItems: 4,
  },
  {
    number: '02',
    id: 'value-grammar',
    title: '한 값·range·길이·live를 읽는다',
    sourceItems: 8,
  },
  {
    number: '03',
    id: 'reveal-lab',
    title: '같은 range descriptor로 stroke를 reveal한다',
    sourceItems: 4,
  },
  {
    number: '04',
    id: 'length-position',
    title: 'getLength()와 getPosition()으로 숫자를 읽는다',
    sourceItems: 7,
  },
  {
    number: '05',
    id: 'rendered-geometry-boundaries',
    title: 'rendered geometry와 browser caveat을 확인한다',
    sourceItems: 5,
  },
] as const

/** 화면과 handoff가 같은 분모를 쓰도록 source·probe·섹션 수를 선언한다. */
export const drawSvgCoverage = {
  officialSources: 3,
  officialSourceItems: 28,
  implementationItems: 3,
  runtimeProbeItems: 0,
  localSections: 5,
} as const
