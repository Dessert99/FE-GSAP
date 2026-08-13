/** reusable effects 페이지의 공식 출처와 여섯 단계 학습 순서를 고정한다. */
export const reusableEffectsMeta = {
  category: 'Fundamentals · GSAP',
  title: '반복 animation을 effect로 등록하기',
  summary: 'targets와 config만 바꿔 다시 쓸 animation 함수를 gsap.effects에 등록하고, 직접 호출과 Timeline 확장 중 sequence에 맞는 방식을 고릅니다.',
  sourcePath: 'src/content/gsap/fundamentals/reusable-effects/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: '공식 gsap.effects 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.effects' },
    { label: '공식 gsap.registerEffect() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.registerEffect%28%29/' },
  ],
} as const

/** 공식 17개·설치본 구현 4개 item을 초보자가 답해야 할 여섯 질문에 대응시킨다. */
export const reusableEffectsSections = [
  { number: '01', id: 'mental-model', title: 'effect는 완성 animation과 무엇이 다른가요?', sourceItems: 2 },
  { number: '02', id: 'register-contract', title: 'registerEffect에는 무엇을 등록하나요?', sourceItems: 5 },
  { number: '03', id: 'direct-call', title: 'gsap.effects에서 어떻게 호출하나요?', sourceItems: 4 },
  { number: '04', id: 'registered-example', title: 'default와 override를 직접 비교하기', sourceItems: 2 },
  { number: '05', id: 'timeline-extension', title: 'Timeline method로 확장하면 무엇이 달라지나요?', sourceItems: 7 },
  { number: '06', id: 'boundaries', title: '확장하지 않을 때와 이름 충돌 피하기', sourceItems: 1 },
] as const

/** 공식 source와 설치본 구현 evidence의 분모를 handoff에서 대조한다. */
export const reusableEffectsCoverageSummary = { officialSources: 2, officialSourceItems: 17, implementationItems: 4, sourceItems: 21, localSections: 6 } as const
