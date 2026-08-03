/** reusable effects 페이지의 공식 출처와 여섯 단계 학습 순서를 고정한다. */
export const reusableEffectsMeta = {
  category: 'Fundamentals · GSAP',
  title: '반복 animation을 effect recipe로 등록하기',
  summary: 'targets와 config만 바꿔 다시 쓸 animation recipe를 중앙 registry에 등록하고, direct call과 Timeline extension 중 sequence에 맞는 호출 방식을 고릅니다.',
  sourcePath: 'src/content/gsap/fundamentals/reusable-effects/',
  reviewedAt: '2026-08-03',
  officialSources: [
    { label: '공식 gsap.effects 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.effects' },
    { label: '공식 gsap.registerEffect() 문서', href: 'https://gsap.com/docs/v3/GSAP/gsap.registerEffect%28%29/' },
  ],
} as const

/** 공식 기술 item 21개를 초보자가 답해야 할 여섯 질문에 대응시킨다. */
export const reusableEffectsSections = [
  { number: '01', id: 'mental-model', title: 'effect는 완성 animation과 무엇이 다른가요?', sourceItems: 2 },
  { number: '02', id: 'register-contract', title: 'registerEffect에는 무엇을 등록하나요?', sourceItems: 5 },
  { number: '03', id: 'direct-call', title: 'registry에서 effect를 어떻게 호출하나요?', sourceItems: 4 },
  { number: '04', id: 'registered-example', title: 'default와 override를 직접 비교하기', sourceItems: 2 },
  { number: '05', id: 'timeline-extension', title: 'Timeline method로 확장하면 무엇이 달라지나요?', sourceItems: 7 },
  { number: '06', id: 'boundaries', title: '확장하지 않을 때와 registry 경계', sourceItems: 1 },
] as const

/** canonical source와 로컬 evidence의 분모를 페이지에서 표시한다. */
export const reusableEffectsCoverageSummary = { officialSources: 2, sourceItems: 21, localSections: 6 } as const
