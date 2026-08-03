/** CSSPlugin 공식 source와 52개 coverage를 여섯 학습 단계에 고정한다. */
export const cssAnimationMeta = {
  title: 'CSS 값과 transform 애니메이션',
  category: 'GSAP · Fundamentals',
  summary: 'CSSPlugin이 이름·단위·복합값·transform을 해석하는 규칙을 알면 브라우저가 읽을 수 있는 중간값과 정리 시점을 의도대로 만들 수 있습니다.',
  officialUrl: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/',
  sourcePath: 'src/content/gsap/fundamentals/css-animation/',
  reviewedAt: '2026-08-03',
} as const

/** 52개 source item을 로컬 학습 질문과 같은 anchor로 연결한다. */
export const cssAnimationSections = [
  { number: '01', id: 'plugin-boundary', title: 'CSSPlugin의 경계부터 잡기', sourceItems: 8 },
  { number: '02', id: 'css-values', title: 'CSS 값을 보간 가능한 형태로 쓰기', sourceItems: 9 },
  { number: '03', id: 'transform-model', title: 'transform alias와 고정 순서 읽기', sourceItems: 10 },
  { number: '04', id: 'three-d', title: '3D 깊이와 perspective 구분하기', sourceItems: 8 },
  { number: '05', id: 'origins', title: '회전축과 방향을 명시하기', sourceItems: 10 },
  { number: '06', id: 'lifecycle', title: '보이기와 inline style 정리하기', sourceItems: 7 },
] as const

/** source와 local evidence의 분모를 페이지에서 그대로 확인하게 한다. */
export const cssAnimationCoverage = {
  officialSources: 1,
  sourceItems: 52,
  quickReferenceRows: 20,
  localSections: 6,
} as const
