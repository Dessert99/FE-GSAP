/** 조건별 animation 생성·정리 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const responsiveMotionMeta = {
  title: 'breakpoint와 reduced-motion 조건별 animation을 어떻게 만들고 정리하나요?',
  category: 'GSAP · Media Conditions',
  summary:
    '화면 폭이나 사용자의 모션 설정에 따라 다른 animation을 만들면, 조건이 바뀐 순간 이전 animation을 누가 치우느냐가 문제가 됩니다. gsap.matchMedia()는 그 정리까지 자기 일로 가져가고, gsap.matchMediaRefresh()는 조건이 그대로일 때도 그 정리와 재실행을 강제합니다.',
  sourcePath: 'src/content/gsap/fundamentals/responsive-motion/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'gsap.matchMedia()', href: 'https://gsap.com/docs/v3/GSAP/gsap.matchMedia()' },
    { label: 'gsap.matchMediaRefresh()', href: 'https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh()' },
  ],
} as const

/** 공식 source item 33개를 "조건을 걸고 → 조건이 바뀌고 → 정리된다"는 한 흐름의 일곱 단계에 대응시킨다. */
export const responsiveMotionSections = [
  { number: '01', id: 'auto-revert', title: '조건이 바뀌면 이전 animation은 누가 치우나', sourceItems: 4 },
  { number: '02', id: 'add-parameters', title: 'mm.add()에 넘기는 세 가지', sourceItems: 9 },
  { number: '03', id: 'conditions-object', title: '조건을 객체로 묶고 boolean으로 읽는다', sourceItems: 5 },
  { number: '04', id: 'cleanup-order', title: '자동 정리와 내가 쓰는 정리는 층이 다르다', sourceItems: 5 },
  { number: '05', id: 'scope-selector', title: '선택자가 닿는 범위를 좁힌다', sourceItems: 3 },
  { number: '06', id: 'reduced-motion-refresh', title: '모션을 줄여 달라는 요청에 답한다', sourceItems: 6 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 1 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const responsiveMotionCoverage = {
  officialSources: 2,
  officialSourceItems: 33,
  localSections: 7,
} as const
