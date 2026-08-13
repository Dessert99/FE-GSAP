/** 매 render마다 값을 가공하는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const modifiersSnapWrapMeta = {
  title: '계산된 값을 매 render마다 손보기',
  category: 'GSAP · Internal Plugins',
  summary:
    'GSAP이 매 프레임 계산한 값을 그대로 쓰지 않고 중간에서 가로채 고칠 수 있습니다. 눈금에 맞추거나, 끝에 닿으면 처음으로 돌리거나, 왕복시키는 일이 여기서 일어납니다.',
  sourcePath: 'src/content/gsap/fundamentals/modifiers-snap-wrap/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Modifiers', href: 'https://gsap.com/docs/v3/GSAP/CorePlugins/Modifiers' },
    { label: 'Snap', href: 'https://gsap.com/docs/v3/GSAP/CorePlugins/Snap' },
    { label: 'utils.snap()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/snap()' },
    { label: 'utils.wrap()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()' },
    { label: 'utils.wrapYoyo()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo()' },
  ],
} as const

/** 공식 source item 31개를 "가로채기 → 눈금 → 순환 → 왕복"의 여섯 단계에 대응시킨다. */
export const modifiersSnapWrapSections = [
  { number: '01', id: 'intercept', title: '값을 쓰기 직전에 가로채기', sourceItems: 6 },
  { number: '02', id: 'modifier-caveats', title: 'modifier가 통하지 않는 자리', sourceItems: 4 },
  { number: '03', id: 'snap-plugin', title: 'snap vars — 눈금에 맞추는 지름길', sourceItems: 6 },
  { number: '04', id: 'snap-utility', title: 'utils.snap()의 여섯 가지 호출 형태', sourceItems: 8 },
  { number: '05', id: 'wrap-family', title: '끝에 닿으면 처음으로, 또는 되돌아서', sourceItems: 7 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const modifiersSnapWrapCoverage = {
  officialSources: 5,
  officialSourceItems: 31,
  localSections: 6,
} as const
