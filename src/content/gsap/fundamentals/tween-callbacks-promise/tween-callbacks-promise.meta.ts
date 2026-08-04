/** 이미 만들어진 Tween의 콜백 교체와 완료 대기 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const tweenCallbacksPromiseMeta = {
  title: '만든 뒤 콜백을 바꾸거나 완료를 기다리려면?',
  category: 'GSAP · Tween Methods',
  summary:
    'Tween을 만들 때 적어 둔 콜백이 항상 정답은 아닙니다. 만들어진 뒤에 콜백을 읽고 바꾸고 지우는 방법이 eventCallback()이고, 완료 시점을 Promise로 기다리는 방법이 then()입니다.',
  sourcePath: 'src/content/gsap/fundamentals/tween-callbacks-promise/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'Tween.eventCallback()', href: 'https://gsap.com/docs/v3/GSAP/Tween/eventCallback()' },
    { label: 'Tween.then()', href: 'https://gsap.com/docs/v3/GSAP/Tween/then()' },
  ],
} as const

/** 공식 source item 16개를 "만든 뒤에 손대기"와 "완료 기다리기"라는 두 상황의 다섯 단계에 대응시킨다. */
export const tweenCallbacksPromiseSections = [
  { number: '01', id: 'after-creation', title: '이미 만들어진 Tween에 손대야 할 때', sourceItems: 3 },
  { number: '02', id: 'event-callback-form', title: '읽기·바꾸기·지우기가 한 메서드에 있다', sourceItems: 4 },
  { number: '03', id: 'event-callback-args', title: '인자 세 개가 정하는 것', sourceItems: 4 },
  { number: '04', id: 'then-promise', title: '완료를 Promise로 기다린다', sourceItems: 5 },
  { number: '05', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const tweenCallbacksPromiseCoverage = {
  officialSources: 2,
  officialSourceItems: 16,
  localSections: 5,
} as const
