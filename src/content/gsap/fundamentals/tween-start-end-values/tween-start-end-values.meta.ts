/** Tween 생성 method 페이지의 출처·학습 순서·coverage 분모를 관리한다. */
export const tweenStartEndValuesMeta = {
  title: 'Tween의 시작값과 끝값',
  category: 'GSAP · Fundamentals',
  summary: '현재 상태를 읽을지, 시작값과 끝값을 직접 적을지에 따라 to, from, fromTo, set 중 맞는 생성 method를 고릅니다.',
  sourcePath: 'src/content/gsap/fundamentals/tween-start-end-values/',
  reviewedAt: '2026-08-03',
  officialSources: [
    { label: '공식 gsap.from() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.from%28%29/' },
    { label: '공식 gsap.fromTo() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.fromTo%28%29/' },
    { label: '공식 gsap.set() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.set%28%29/' },
  ],
} as const

/** 21개 공식 기술 item을 일곱 개의 초보자 질문에 대응시킨다. */
export const tweenStartEndValuesSections = [
  { number: '01', id: 'state-ownership', title: '누가 시작값과 끝값을 정하나요?', sourceItems: 4 },
  { number: '02', id: 'method-comparison', title: '같은 대상을 네 방식으로 실행하기', sourceItems: 7 },
  { number: '03', id: 'from-and-from-to', title: 'from과 fromTo의 인자 읽기', sourceItems: 3 },
  { number: '04', id: 'set', title: '시간 없이 상태만 바꾸기', sourceItems: 1 },
  { number: '05', id: 'immediate-render', title: '생성 시점과 시작 시점 나누기', sourceItems: 3 },
  { number: '06', id: 'shared-vars', title: '공통 vars는 한곳에서 이어 읽기', sourceItems: 3 },
  { number: '07', id: 'choose', title: '현재 상태 의존 여부로 선택하기', sourceItems: 0 },
] as const

/** source 대조와 로컬 mapping의 분모를 페이지에 표시한다. */
export const tweenStartEndValuesCoverage = {
  officialSources: 3,
  sourceItems: 21,
  localSections: 7,
} as const
