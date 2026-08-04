/** CustomBounce·CustomWiggle 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const customBounceWiggleMeta = {
  title: '물리감 있는 튕김과 흔들림',
  category: 'GSAP · Eases',
  summary:
    '튕기고 떨리는 움직임은 물리 계산이 아니라 ease 곡선 하나로 만듭니다. CustomBounce와 CustomWiggle은 작은 설정값을 받아 이름 붙은 곡선을 대신 그려 주고, Tween은 그 이름만 씁니다.',
  sourcePath: 'src/content/gsap/fundamentals/custom-bounce-wiggle/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'CustomBounce', href: 'https://gsap.com/docs/v3/Eases/CustomBounce' },
    { label: 'CustomWiggle', href: 'https://gsap.com/docs/v3/Eases/CustomWiggle' },
  ],
} as const

/** 공식 source item 41개를 "곡선을 만들고 이름으로 쓴다"는 흐름의 여덟 단계에 대응시킨다. */
export const customBounceWiggleSections = [
  { number: '01', id: 'ease-generator', title: '곡선을 대신 그려 주는 plugin', sourceItems: 7 },
  { number: '02', id: 'setup', title: 'CustomEase를 항상 같이 등록한다', sourceItems: 4 },
  { number: '03', id: 'bounce-design', title: '얼마나 튕기고 언제 멈출지 정한다', sourceItems: 6 },
  { number: '04', id: 'bounce-squash', title: '위치와 찌그러짐을 Tween 두 개로 맞춘다', sourceItems: 3 },
  { number: '05', id: 'curve-graph', title: '만든 곡선을 SVG로 꺼내 본다', sourceItems: 3 },
  { number: '06', id: 'wiggle-design', title: '몇 번 흔들지와 어떤 결로 흔들지', sourceItems: 8 },
  { number: '07', id: 'wiggle-advanced', title: 'amplitudeEase와 timingEase는 type을 덮어쓴다', sourceItems: 3 },
  { number: '08', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 7 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const customBounceWiggleCoverage = {
  officialSources: 2,
  officialSourceItems: 41,
  localSections: 8,
} as const
