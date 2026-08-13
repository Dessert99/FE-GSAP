/** page 37의 source identity·학습 순서·coverage 분모를 한곳에서 고정한다. */
export const utilityPipelinesUnitsMeta = {
  title: '계산 함수들을 연결하고 CSS 단위를 안전하게 유지하려면?',
  category: 'GSAP · Utility Methods',
  summary:
    'raw 숫자를 CSS에 바로 붙이면 계산 순서와 단위가 쉽게 뒤섞입니다. pipe로 함수의 입출력을 왼쪽에서 오른쪽으로 연결하고, getUnit과 unitize로 숫자 계산의 경계에서 단위를 분리했다가 되붙이며, checkPrefix로 현재 브라우저가 알아듣는 property 이름을 확인합니다.',
  sourcePath: 'src/content/gsap/fundamentals/utility-pipelines-units/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { id: 'check-prefix', label: 'gsap.utils.checkPrefix()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix()' },
    { id: 'get-unit', label: 'gsap.utils.getUnit()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit()' },
    { id: 'pipe', label: 'gsap.utils.pipe()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe()' },
    { id: 'unitize', label: 'gsap.utils.unitize()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize()' },
  ],
} as const

/** 공식 39개를 pipeline → unit → browser property → 경계 순서로 재배열한다. */
export const utilityPipelinesUnitsSections = [
  { number: '01', id: 'pipeline', title: '출력과 입력이 맞아야 이어진다', sourceItems: 13 },
  { number: '02', id: 'units', title: '계산할 때 떼고 CSS로 보낼 때 붙인다', sourceItems: 20 },
  { number: '03', id: 'prefix', title: '브라우저가 아는 property 이름을 확인한다', sourceItems: 6 },
  { number: '04', id: 'boundaries', title: '원문 오류와 실행 경계를 구분한다', sourceItems: 0, preservedItems: 2 },
] as const

/** source와 item 수를 화면·handoff·정적 검증이 함께 읽는 분모로 쓴다. */
export const utilityPipelinesUnitsCoverage = {
  officialSources: 4,
  officialSourceItems: 39,
  localSections: 4,
} as const
