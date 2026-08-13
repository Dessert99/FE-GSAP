/** gsap.utils 관문 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const gsapUtilsMeta = {
  title: 'animation 밖의 값 계산을 왜 utility 함수로 분리하나요?',
  category: 'GSAP · gsap.utils',
  summary:
    'GSAP은 "몇 초 동안 어디로 움직일지"를 정하는 도구지만, 그 값을 만들어 내는 계산은 animation이 아닙니다. 공식 문서는 그 계산을 gsap.utils라는 자리에 함수 17개로 모아 두었습니다. 이 페이지는 그 17개가 왜 따로 있고, 어디서 찾고, 어떻게 고르는지만 다룹니다.',
  sourcePath: 'src/content/gsap/fundamentals/gsap-utils/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'gsap.utils', href: 'https://gsap.com/docs/v3/GSAP/gsap.utils' },
    { label: 'Utility Methods', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods' },
  ],
} as const

/** 공식 source item 47개를 "왜 따로 있나 → 어떻게 돌려주나 → 어디서 찾나 → 네 갈래" 순서에 대응시킨다. */
export const gsapUtilsSections = [
  { number: '01', id: 'why-utils', title: '왜 animation 밖에 계산 함수가 따로 있나', sourceItems: 7 },
  { number: '02', id: 'two-modes', title: '값을 바로 받기와 함수를 받아 두기', sourceItems: 4 },
  { number: '03', id: 'catalog-map', title: '17개 전체 목록과 찾는 법', sourceItems: 2 },
  { number: '04', id: 'range-family', title: '범위를 자르고 옮기고 섞는 5개', sourceItems: 10 },
  { number: '05', id: 'compose-family', title: '함수를 잇고 단위를 지키는 4개', sourceItems: 8 },
  { number: '06', id: 'collection-family', title: '대상을 모으고 고르는 4개', sourceItems: 8 },
  { number: '07', id: 'spread-family', title: '나눠 주고 범위 안으로 되돌리는 4개', sourceItems: 8 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const gsapUtilsCoverage = {
  officialSources: 2,
  officialSourceItems: 47,
  localSections: 7,
  /** 두 공식 hub가 각각 나열한 utility 개수 — 화면에서 "17개"라고 말하는 근거다. */
  utilityCount: 17,
} as const
