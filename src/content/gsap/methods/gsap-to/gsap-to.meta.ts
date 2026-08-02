/** gsap.to() 공식 페이지의 출처·목차·완료 기준·후속 링크를 관리한다. */
/** gsap.to() 페이지의 공식 출처와 로컬 위치를 한곳에서 관리한다. */
export const gsapToPageMeta = {
  title: 'gsap.to()',
  category: 'GSAP · Methods',
  officialUrl: 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/',
  sourcePath: 'src/content/gsap/methods/gsap-to/',
  summary: '대상의 현재값을 읽고 vars에 적은 목표값까지 변화시키는 Tween을 만듭니다.',
  reviewedAt: '2026-08-01',
} as const

/** 공식 문서 개정 시 로컬 항목 누락을 숫자로 드러낸다. */
export const officialCoverageExpected = {
  sections: 11,
  specialProperties: 34,
} as const

/** 공식 목차와 로컬 학습 섹션의 이동 경로를 대응시킨다. */
export const officialPageSections = [
  { title: '개요 · 반환값', anchor: 'overview', localTitle: '현재값에서 목표값으로 · Tween 제어' },
  { title: 'Parameters', anchor: 'parameters', localTitle: 'targets와 vars' },
  { title: 'Special Properties', anchor: 'special-properties', localTitle: '34개 특수 속성 전체 참조' },
  { title: 'Plugins', anchor: 'plugins', localTitle: '플러그인이 vars를 확장하는 방식' },
  { title: 'Function-based values', anchor: 'value-modes', localTitle: '함수 기반 값' },
  { title: 'Random values', anchor: 'value-modes', localTitle: '랜덤 값' },
  { title: 'Relative values', anchor: 'value-modes', localTitle: '상대값' },
  { title: 'Staggers', anchor: 'staggers', localTitle: '여러 targets의 시작 순서' },
  { title: 'Sequencing', anchor: 'sequencing', localTitle: 'delay와 Timeline의 경계' },
  { title: 'Keyframes', anchor: 'keyframes', localTitle: '여러 상태를 한 Tween에 연결' },
  { title: 'Callbacks', anchor: 'callbacks', localTitle: 'Tween 생명주기 관찰' },
] as const

/** 현재 페이지에서 경계를 설명한 뒤 이어서 읽을 공식 문서를 모은다. */
export const officialLinks = {
  plugins: 'https://gsap.com/docs/v3/Plugins/',
  timeline: 'https://gsap.com/docs/v3/GSAP/Timeline/',
  keyframes: 'https://gsap.com/resources/keyframes/',
  callbacks: 'https://gsap.com/docs/v3/GSAP/Tween/eventCallback%28%29/',
  stagger: 'https://gsap.com/resources/getting-started/Staggers/',
  easing: 'https://gsap.com/docs/v3/Eases/',
} as const
