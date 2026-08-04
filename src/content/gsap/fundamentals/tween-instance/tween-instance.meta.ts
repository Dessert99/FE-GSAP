/** 만들어진 Tween instance 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const tweenInstanceMeta = {
  title: '만들어진 Tween에는 무엇이 남나요?',
  category: 'GSAP · Tween Instance',
  summary:
    'gsap.to()를 부르면 화면만 움직이는 게 아니라 객체 하나가 돌아옵니다. 그 객체는 무엇을 기억하고, 무엇을 물어보면 답해 주며, 언제까지 살아 있을까요?',
  sourcePath: 'src/content/gsap/fundamentals/tween-instance/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'Tween', href: 'https://gsap.com/docs/v3/GSAP/Tween' },
    { label: 'Tween.data', href: 'https://gsap.com/docs/v3/GSAP/Tween/data' },
    { label: 'Tween.scrollTrigger', href: 'https://gsap.com/docs/v3/GSAP/Tween/scrollTrigger' },
    { label: 'Tween.targets()', href: 'https://gsap.com/docs/v3/GSAP/Tween/targets()' },
  ],
} as const

/** 공식 source item 39개를 "만들면 무엇이 남는가"를 따라가는 일곱 단계에 대응시킨다. */
export const tweenInstanceSections = [
  { number: '01', id: 'tween-identity', title: 'Tween은 관계 하나를 담은 객체다', sourceItems: 5 },
  { number: '02', id: 'instance-lifecycle', title: '변수에 담지 않으면 어떻게 되나', sourceItems: 2 },
  { number: '03', id: 'instance-surface', title: '남는 것은 속성 4개와 메서드 30개', sourceItems: 6 },
  { number: '04', id: 'targets-method', title: 'targets()가 돌려주는 배열', sourceItems: 4 },
  { number: '05', id: 'data-and-id', title: '내가 직접 붙이는 표시 · data와 id', sourceItems: 5 },
  { number: '06', id: 'scroll-trigger', title: '있을 때만 생기는 속성 하나', sourceItems: 5 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 12 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const tweenInstanceCoverage = {
  officialSources: 4,
  officialSourceItems: 39,
  localSections: 7,
} as const
