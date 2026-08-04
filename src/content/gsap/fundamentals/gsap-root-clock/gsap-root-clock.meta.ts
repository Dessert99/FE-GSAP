/** root clock 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const gsapRootClockMeta = {
  title: 'GSAP의 모든 animation은 누가 매 frame 진행시키나요?',
  category: 'GSAP · Core',
  summary:
    '지금까지는 Tween을 만들면 저절로 움직였습니다. 그 뒤에는 두 가지가 숨어 있습니다. 모든 animation을 자식으로 거느린 시간의 구조(globalTimeline)와, 매 frame 그 구조를 앞으로 밀어 주는 동력(ticker)입니다.',
  sourcePath: 'src/content/gsap/fundamentals/gsap-root-clock/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'gsap.globalTimeline', href: 'https://gsap.com/docs/v3/GSAP/gsap.globalTimeline' },
    { label: 'gsap.ticker', href: 'https://gsap.com/docs/v3/GSAP/gsap.ticker' },
    { label: 'gsap.exportRoot()', href: 'https://gsap.com/docs/v3/GSAP/gsap.exportRoot()' },
    { label: 'gsap.updateRoot()', href: 'https://gsap.com/docs/v3/GSAP/gsap.updateRoot()' },
  ],
} as const

/** 공식 source item 50개를 "누가 움직이나 → 구조 → 동력 → 밀렸을 때 → 떼어내기 → 직접 주기"의 일곱 단계에 대응시킨다. */
export const gsapRootClockSections = [
  { number: '01', id: 'who-drives', title: '아무도 재생 버튼을 누르지 않았는데 움직였다', sourceItems: 4 },
  { number: '02', id: 'global-timeline', title: '시간의 구조 — 모든 animation의 부모', sourceItems: 9 },
  { number: '03', id: 'ticker', title: '시간의 동력 — 매 frame 오는 신호', sourceItems: 13 },
  { number: '04', id: 'lag-smoothing', title: 'frame이 밀렸을 때 시간을 어떻게 다루나', sourceItems: 13 },
  { number: '05', id: 'export-root', title: '지금까지 만든 것만 따로 묶는다', sourceItems: 7 },
  { number: '06', id: 'update-root', title: '시간을 밖에서 직접 준다', sourceItems: 4 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const gsapRootClockCoverage = {
  officialSources: 4,
  officialSourceItems: 50,
  localSections: 7,
} as const
