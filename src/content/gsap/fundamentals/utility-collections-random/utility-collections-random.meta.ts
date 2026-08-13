/** 후보 모음 utility 페이지의 출처·섹션·coverage 분모를 한곳에서 관리한다. */
export const utilityCollectionsRandomMeta = {
  title: '후보를 배열로 만들고 무작위로 고르기',
  category: 'GSAP · Utility Methods',
  summary:
    '여러 target 후보를 같은 배열 모양으로 맞춘 뒤, 하나를 뽑거나 순서를 섞을 수 있습니다. 세 utility는 animation을 만들지 않고 값·참조만 다룹니다.',
  sourcePath: 'src/content/gsap/fundamentals/utility-collections-random/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'random()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/random()' },
    { label: 'shuffle()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle()' },
    { label: 'toArray()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray()' },
  ],
} as const

/** 공식 item을 초보자가 후보·선택·순서 순으로 읽게 하는 학습 단계다. */
export const utilityCollectionsRandomSections = [
  { number: '01', id: 'collection-normalization', title: '후보의 모양을 배열 하나로 맞춘다', sourceItems: 13 },
  { number: '02', id: 'random-choice', title: '값 하나를 지금 뽑거나 나중에도 뽑는다', sourceItems: 21 },
  { number: '03', id: 'shuffle-mutation', title: '순서는 같은 배열 안에서 섞인다', sourceItems: 4 },
  { number: '04', id: 'tween-boundary', title: 'Tween에는 배열·문자열·함수를 어느 경계로 넘길까', sourceItems: 3 },
  { number: '05', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** 공식 source·item·섹션 수를 화면과 handoff에서 같은 분모로 쓴다. */
export const utilityCollectionsRandomCoverage = {
  officialSources: 3,
  officialSourceItems: 41,
  localSections: 5,
} as const
