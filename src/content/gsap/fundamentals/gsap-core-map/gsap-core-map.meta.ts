/** GSAP Core 지도 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const gsapCoreMapMeta = {
  title: 'GSAP Core 지도',
  category: 'GSAP · Fundamentals',
  summary: 'gsap은 Core 기능으로 들어가는 객체, Tween은 대상의 속성값을 시간에 따라 바꾸는 animation, Timeline은 여러 animation을 시간에 배치하는 컨테이너입니다. plugin은 Core에 특수 능력을 더합니다.',
  sourcePath: 'src/content/gsap/fundamentals/gsap-core-map/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'GSAP Docs Home', href: 'https://gsap.com/docs/v3/' },
    { label: 'GSAP object', href: 'https://gsap.com/docs/v3/GSAP/' },
    { label: 'gsap.version', href: 'https://gsap.com/docs/v3/GSAP/gsap.version/' },
  ],
} as const

/** 공식 source item 34개를 여섯 개의 초보자 학습 단계에 대응시킨다. */
export const gsapCoreMapSections = [
  { number: '01', id: 'access-point', title: '하나의 입구에서 시작하기', sourceItems: 5 },
  { number: '02', id: 'animation-model', title: 'Tween과 Timeline 역할 나누기', sourceItems: 13 },
  { number: '03', id: 'core-boundary', title: 'Core와 plugin 경계 세우기', sourceItems: 3 },
  { number: '04', id: 'api-map', title: '목적에서 API 찾기', sourceItems: 11 },
  { number: '05', id: 'version-check', title: '로드된 버전 확인하기', sourceItems: 2 },
  { number: '06', id: 'next-steps', title: '다음 학습 순서 고르기', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const gsapCoreMapCoverage = {
  officialSources: 3,
  sourceItems: 34,
  localSections: 6,
} as const
