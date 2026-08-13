/** CustomBounce·CustomWiggle 학습 페이지의 출처와 학습 순서를 한곳에서 관리한다. */
export const customBounceWiggleMeta = {
  title: '물리감 있는 튕김과 흔들림',
  category: 'GSAP · Eases',
  summary:
    '튕기고 떨리는 움직임은 물리 계산이 아니라 ease 곡선 하나로 만듭니다. CustomBounce와 CustomWiggle은 작은 설정값을 받아 이름 붙은 곡선을 대신 그려 주고, Tween은 그 이름만 씁니다.',
  sourcePath: 'src/content/gsap/fundamentals/custom-bounce-wiggle/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'CustomBounce', href: 'https://gsap.com/docs/v3/Eases/CustomBounce/' },
    { label: 'CustomWiggle', href: 'https://gsap.com/docs/v3/Eases/CustomWiggle/' },
  ],
} as const

/** 두 plugin을 "곡선을 만들고 이름으로 쓴다"는 흐름의 여덟 단계로 안내한다. */
export const customBounceWiggleSections = [
  { number: '01', id: 'ease-generator', title: '곡선을 대신 그려 주는 plugin' },
  { number: '02', id: 'setup', title: 'CustomEase를 항상 같이 등록한다' },
  { number: '03', id: 'bounce-design', title: '얼마나 튕기고 언제 멈출지 정한다' },
  { number: '04', id: 'bounce-squash', title: '위치와 찌그러짐을 Tween 두 개로 맞춘다' },
  { number: '05', id: 'curve-graph', title: '만든 곡선을 SVG로 꺼내 본다' },
  { number: '06', id: 'wiggle-design', title: '몇 번 흔들지와 어떤 결로 흔들지' },
  { number: '07', id: 'wiggle-advanced', title: 'amplitudeEase와 timingEase는 type을 덮어쓴다' },
  { number: '08', id: 'boundaries', title: '여기서 다루지 않는 것' },
] as const
