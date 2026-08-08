/** sequence 전체 반복과 children 값 재계산 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const timelineRepeatsMeta = {
  title: 'sequence 전체를 반복·왕복하고 children 값을 다시 계산하려면?',
  category: 'GSAP · Timeline Methods',
  summary:
    'Timeline의 반복은 children 하나가 아니라 sequence 전체에 걸립니다. 되돌아올 때는 children이 뒤에서부터 거꾸로 재생되고, invalidate()는 자기 기억만이 아니라 품고 있는 children의 기억까지 함께 지웁니다. 이 두 가지가 같은 이름의 Tween 메서드와 갈리는 지점입니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-repeats/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'Timeline.invalidate()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/invalidate()' },
    { label: 'Timeline.iteration()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/iteration()' },
    { label: 'Timeline.repeat()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/repeat()' },
    { label: 'Timeline.repeatDelay()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/repeatDelay()' },
    { label: 'Timeline.yoyo()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/yoyo()' },
  ],
} as const

/** 공식 source item 42개를 "sequence 전체가 어떻게 반복되나"와 "children의 기억은 언제 지워지나"라는 두 질문의 일곱 단계에 대응시킨다. */
export const timelineRepeatsSections = [
  { number: '01', id: 'repeat-count', title: '반복은 children 하나가 아니라 sequence 전체에 걸린다', sourceItems: 6 },
  { number: '02', id: 'repeat-gap', title: 'sequence와 sequence 사이에 쉬는 시간을 넣는다', sourceItems: 4 },
  { number: '03', id: 'yoyo-direction', title: '되돌아올 때는 children이 거꾸로 재생된다', sourceItems: 5 },
  { number: '04', id: 'iteration-number', title: '지금 몇 회차인지 읽고 옮긴다', sourceItems: 4 },
  { number: '05', id: 'invalidate-children', title: '기억해 둔 시작값을 children까지 지운다', sourceItems: 8 },
  { number: '06', id: 'call-forms', title: '다섯 메서드의 호출 형식', sourceItems: 14 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 1 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineRepeatsCoverage = {
  officialSources: 5,
  officialSourceItems: 42,
  localSections: 7,
} as const
