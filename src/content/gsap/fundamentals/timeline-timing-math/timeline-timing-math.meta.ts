/** Timeline 시간 계산 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const timelineTimingMathMeta = {
  title: 'children이 바뀌면 Timeline의 duration과 위치는 어떻게 계산되나요?',
  category: 'GSAP · Timeline Methods',
  summary:
    'Tween의 duration은 내가 정하는 값이지만 Timeline의 duration은 children이 정합니다. 그래서 같은 이름의 메서드라도 Timeline에서는 다르게 동작합니다 — 특히 duration()을 setter로 부르면 길이가 아니라 배속이 바뀝니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-timing-math/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Timeline.delay()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/delay()' },
    { label: 'Timeline.duration()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/duration()' },
    { label: 'Timeline.totalDuration()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/totalDuration()' },
    { label: 'Timeline.startTime()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/startTime()' },
    { label: 'Timeline.endTime()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/endTime()' },
    { label: 'Timeline.timeScale()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/timeScale()' },
    { label: 'Timeline.globalTime()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/globalTime()' },
  ],
} as const

/** 공식 source item 47개를 "길이는 어디서 오고, 그 길이를 어떻게 읽고 바꾸나"라는 흐름의 여덟 단계에 대응시킨다. */
export const timelineTimingMathSections = [
  { number: '01', id: 'children-clock', title: '길이를 정하는 건 children이다', sourceItems: 5 },
  { number: '02', id: 'getter-setter', title: '다섯 개가 전부 같은 모양이다', sourceItems: 11 },
  { number: '03', id: 'duration-total', title: 'duration과 totalDuration이 갈리는 곳', sourceItems: 8 },
  { number: '04', id: 'setter-scales', title: 'setter는 길이가 아니라 배속을 바꾼다', sourceItems: 4 },
  { number: '05', id: 'start-end', title: '부모 시간축 위의 시작점과 끝점', sourceItems: 10 },
  { number: '06', id: 'time-scale', title: 'timeScale은 길이가 아니라 속도를 바꾼다', sourceItems: 4 },
  { number: '07', id: 'global-time', title: '중첩을 다 풀어 전역 시계로', sourceItems: 5 },
  { number: '08', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineTimingMathCoverage = {
  officialSources: 7,
  officialSourceItems: 47,
  localSections: 8,
} as const
