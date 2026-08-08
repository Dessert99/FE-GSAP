/** distribute() 학습 페이지의 출처·섹션·coverage 분모를 한곳에서 관리한다. */
export const utilityDistributeMeta = {
  title: '위치에 따라 값 배분하기',
  category: 'GSAP · Utility Methods',
  summary: 'distribute()는 애니메이션이 아니라 index와 grid 거리를 숫자로 바꾸는 함수 제작기입니다. 한 줄 배열에서 규칙을 읽고, 같은 설정을 2차원 heatmap으로 펼쳐 봅니다.',
  sourcePath: 'src/content/gsap/fundamentals/utility-distribute/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'gsap.utils.distribute()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute()' },
  ],
} as const

/** 공식 item·오류 32개를 반환 함수에서 소유권 경계까지 다섯 단계로 묶는다. */
export const utilityDistributeSections = [
  { number: '01', id: 'returned-function', title: '설정은 index를 값으로 바꾸는 함수를 만든다', sourceItems: 6 },
  { number: '02', id: 'amount-each', title: 'amount와 each는 서로 다른 간격 질문이다', sourceItems: 9 },
  { number: '03', id: 'grid-geometry', title: '한 줄을 grid 거리로 펼친다', sourceItems: 9 },
  { number: '04', id: 'config-catalog', title: 'config 일곱 칸을 빠짐없이 읽는다', sourceItems: 2 },
  { number: '05', id: 'boundaries', title: 'tween과 stagger에는 함수만 건넨다', sourceItems: 6 },
] as const

/** source 대조와 local mapping 수를 화면에서 검산할 고정 분모다. */
export const utilityDistributeCoverage = {
  officialSources: 1,
  officialSourceItems: 32,
  probeItems: 5,
  localSections: 5,
} as const
