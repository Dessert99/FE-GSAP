/** CSS가 아닌 값 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const nonCssTargetValuesMeta = {
  title: 'CSS가 아닌 값',
  category: 'GSAP · Internal Plugins',
  summary:
    'GSAP은 CSS property만 움직이는 게 아닙니다. element의 attribute도, 숫자 배열의 각 칸도 같은 Tween으로 보간합니다. 달라지는 건 값을 어디에 적느냐입니다.',
  sourcePath: 'src/content/gsap/fundamentals/non-css-target-values/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Attributes', href: 'https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes' },
    { label: 'EndArray', href: 'https://gsap.com/docs/v3/GSAP/CorePlugins/EndArray' },
  ],
} as const

/** 공식 source item 15개를 "값을 어느 자리에 적나"라는 선택 흐름의 다섯 단계에 대응시킨다. */
export const nonCssTargetValuesSections = [
  { number: '01', id: 'value-channel', title: '값이 갈 곳을 먼저 고른다', sourceItems: 4 },
  { number: '02', id: 'attr-syntax', title: 'attribute는 attr 객체 안에 적는다', sourceItems: 4 },
  { number: '03', id: 'attr-css-split', title: '같은 이름 x가 두 곳에서 다르게 동작한다', sourceItems: 3 },
  { number: '04', id: 'end-array', title: '숫자 배열을 배열로 보간한다', sourceItems: 4 },
  { number: '05', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const nonCssTargetValuesCoverage = {
  officialSources: 2,
  officialSourceItems: 15,
  localSections: 5,
} as const
