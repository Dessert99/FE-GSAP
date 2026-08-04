/** 한 UI 영역의 GSAP 작업을 함께 되돌리는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const gsapContextMeta = {
  title: '한 UI 영역의 GSAP 작업을 어떻게 함께 되돌리나요?',
  category: 'GSAP · Context & Utils',
  summary:
    '한 화면에서 Tween을 다섯 개 만들었다면 화면을 떠날 때 다섯 개를 모두 치워야 합니다. gsap.context()는 그 다섯 개를 대신 기록해 두었다가 한 번에 되돌려 주고, 덤으로 선택자가 그 영역 밖으로 새어 나가지 않게 막아 줍니다.',
  sourcePath: 'src/content/gsap/fundamentals/gsap-context/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'gsap.context()', href: 'https://gsap.com/docs/v3/GSAP/gsap.context()' },
    { label: 'gsap.utils.selector()', href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/selector()' },
  ],
} as const

/** 공식 source item 33개를 "모아서 되돌리기 → 범위 가두기 → 나중에 생기는 것 → 되돌림의 수명"이라는 여섯 단계에 대응시킨다. */
export const gsapContextSections = [
  { number: '01', id: 'collect-and-revert', title: '흩어진 애니메이션을 하나로 묶는다', sourceItems: 4 },
  { number: '02', id: 'scoped-selector', title: '선택자를 한 영역 안에 가둔다', sourceItems: 5 },
  { number: '03', id: 'selector-utility', title: '범위만 필요할 때 쓰는 선택자 함수', sourceItems: 13 },
  { number: '04', id: 'add-and-ignore', title: '함수가 끝난 뒤 생기는 애니메이션', sourceItems: 6 },
  { number: '05', id: 'revert-lifetime', title: '되돌림은 언제 끝나고 무엇을 남기나', sourceItems: 4 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 1 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const gsapContextCoverage = {
  officialSources: 2,
  officialSourceItems: 33,
  localSections: 6,
} as const
