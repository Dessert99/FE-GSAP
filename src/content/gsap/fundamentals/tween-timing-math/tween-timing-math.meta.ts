/** Tween 시간 계산 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const tweenTimingMathMeta = {
  title: 'delay, duration, totalDuration, start/end/global time은 어떻게 계산되나요?',
  category: 'GSAP · Tween Methods',
  summary:
    'Tween 하나는 자기만의 시계를 갖고, 그 시계는 부모 timeline의 시계 위에 얹혀 있습니다. 일곱 개의 메서드는 서로 다른 기능이 아니라 같은 시간축을 서로 다른 자리에서 읽는 눈금입니다.',
  sourcePath: 'src/content/gsap/fundamentals/tween-timing-math/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Tween.delay()', href: 'https://gsap.com/docs/v3/GSAP/Tween/delay()' },
    { label: 'Tween.duration()', href: 'https://gsap.com/docs/v3/GSAP/Tween/duration()' },
    { label: 'Tween.totalDuration()', href: 'https://gsap.com/docs/v3/GSAP/Tween/totalDuration()' },
    { label: 'Tween.startTime()', href: 'https://gsap.com/docs/v3/GSAP/Tween/startTime()' },
    { label: 'Tween.endTime()', href: 'https://gsap.com/docs/v3/GSAP/Tween/endTime()' },
    { label: 'Tween.timeScale()', href: 'https://gsap.com/docs/v3/GSAP/Tween/timeScale()' },
    { label: 'Tween.globalTime()', href: 'https://gsap.com/docs/v3/GSAP/Tween/globalTime()' },
  ],
} as const

/** 공식 source item 41개를 "하나의 시간축을 어디서부터 읽어 나가나"라는 흐름의 일곱 단계에 대응시킨다. */
export const tweenTimingMathSections = [
  { number: '01', id: 'time-axis', title: '시간축 하나로 전부 보기', sourceItems: 5 },
  { number: '02', id: 'getter-setter', title: '다섯 getter/setter의 공통 규칙', sourceItems: 10 },
  { number: '03', id: 'duration-total', title: 'duration과 totalDuration이 갈리는 곳', sourceItems: 8 },
  { number: '04', id: 'start-end', title: '부모 시간축 위의 시작점과 끝점', sourceItems: 9 },
  { number: '05', id: 'time-scale', title: 'timeScale은 길이가 아니라 속도를 바꾼다', sourceItems: 4 },
  { number: '06', id: 'global-time', title: '중첩을 반영한 전역 시각', sourceItems: 5 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const tweenTimingMathCoverage = {
  officialSources: 7,
  officialSourceItems: 41,
  localSections: 7,
} as const
