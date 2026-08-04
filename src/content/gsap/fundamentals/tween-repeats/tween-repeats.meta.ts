/** 반복 회차와 값 재계산 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const tweenRepeatsMeta = {
  title: '반복 회차와 값 재계산은 언제 일어나나요?',
  category: 'GSAP · Tween Methods',
  summary:
    'Tween은 처음 재생할 때 시작값과 끝값을 한 번 기억해 둡니다. 그래서 몇 번을 반복하든 같은 구간을 다시 지나갑니다. 반복 횟수·틈·방향을 정하는 것이 repeat·repeatDelay·yoyo이고, 기억해 둔 값을 지워 다시 읽게 하는 것이 invalidate입니다.',
  sourcePath: 'src/content/gsap/fundamentals/tween-repeats/',
  reviewedAt: '2026-08-04',
  officialSources: [
    { label: 'Tween.invalidate()', href: 'https://gsap.com/docs/v3/GSAP/Tween/invalidate()' },
    { label: 'Tween.iteration()', href: 'https://gsap.com/docs/v3/GSAP/Tween/iteration()' },
    { label: 'Tween.repeat()', href: 'https://gsap.com/docs/v3/GSAP/Tween/repeat()' },
    { label: 'Tween.repeatDelay()', href: 'https://gsap.com/docs/v3/GSAP/Tween/repeatDelay()' },
    { label: 'Tween.yoyo()', href: 'https://gsap.com/docs/v3/GSAP/Tween/yoyo()' },
  ],
} as const

/** 공식 source item 38개를 "반복은 어떻게 세나"와 "기억한 값은 언제 지워지나"라는 두 질문의 일곱 단계에 대응시킨다. */
export const tweenRepeatsSections = [
  { number: '01', id: 'repeat-count', title: '반복은 "추가로 몇 번"으로 센다', sourceItems: 6 },
  { number: '02', id: 'repeat-gap', title: '회차 사이에 쉬는 시간을 넣는다', sourceItems: 3 },
  { number: '03', id: 'yoyo-direction', title: '되돌아오며 반복한다', sourceItems: 5 },
  { number: '04', id: 'iteration-number', title: '지금 몇 회차인지 읽고 옮긴다', sourceItems: 4 },
  { number: '05', id: 'invalidate-recompute', title: '기억해 둔 시작값을 지운다', sourceItems: 7 },
  { number: '06', id: 'call-forms', title: '다섯 메서드의 호출 형식', sourceItems: 13 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const tweenRepeatsCoverage = {
  officialSources: 5,
  officialSourceItems: 38,
  localSections: 7,
} as const
