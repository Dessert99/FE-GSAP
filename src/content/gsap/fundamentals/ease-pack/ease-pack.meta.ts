/** EasePack 세 ease 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const easePackMeta = {
  title: 'scale, roughness, slow middle 구간에는 어떤 특수 ease가 맞나요?',
  category: 'GSAP · Easing · EasePack',
  summary:
    'Core ease는 부드러운 전환을 만듭니다. 그런데 크기를 키울 때 속도가 이상해 보이거나, 일부러 거칠게 떨어야 하거나, 가운데를 등속으로 붙잡아 둬야 할 때가 있습니다. EasePack의 세 ease는 각각 그 셋 중 하나만 풉니다.',
  sourcePath: 'src/content/gsap/fundamentals/ease-pack/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'ExpoScaleEase', href: 'https://gsap.com/docs/v3/Eases/ExpoScaleEase' },
    { label: 'RoughEase', href: 'https://gsap.com/docs/v3/Eases/RoughEase' },
    { label: 'SlowMo', href: 'https://gsap.com/docs/v3/Eases/SlowMo' },
  ],
} as const

/** 공식 source item 37개를 "어떤 문제를 푸는가"로 나눈 여섯 학습 단계에 대응시킨다. */
export const easePackSections = [
  { number: '01', id: 'ease-choice', title: '세 ease는 서로 다른 문제를 푼다', sourceItems: 7 },
  { number: '02', id: 'easepack-setup', title: '셋 다 core에 들어 있지 않다', sourceItems: 4 },
  { number: '03', id: 'expo-scale', title: 'ExpoScaleEase · 커지는 동안 속도가 변해 보이는 문제', sourceItems: 6 },
  { number: '04', id: 'rough-ease', title: 'RoughEase · 일부러 거칠게 흔들어야 하는 문제', sourceItems: 9 },
  { number: '05', id: 'slow-mo', title: 'SlowMo · 가운데를 읽을 수 있게 붙잡아야 하는 문제', sourceItems: 10 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 1 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const easePackCoverage = {
  officialSources: 3,
  officialSourceItems: 37,
  localSections: 6,
} as const
