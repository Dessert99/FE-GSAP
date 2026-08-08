/** Timeline 기준 페이지의 출처·섹션·coverage 분모를 한곳에서 관리한다. */
export const timelineBasicsMeta = {
  title: '여러 Tween을 하나의 조절 가능한 순서로 어떻게 묶나요?',
  category: 'GSAP · Timeline',
  summary:
    'Tween 하나는 대상 값을 한 animation으로 바꿉니다. 그런데 "먼저 이게, 그다음 저게, 마지막엔 둘이 겹쳐서"를 만들려면 시간을 직접 계산해야 합니다. Timeline은 그 계산을 대신 맡아 주는 그릇이고, 이 페이지는 그릇을 만들고 안에 무언가를 넣는 방법 전체를 다룹니다.',
  sourcePath: 'src/content/gsap/fundamentals/timeline-basics/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'gsap.timeline()', href: 'https://gsap.com/docs/v3/GSAP/gsap.timeline()' },
    { label: 'Timeline', href: 'https://gsap.com/docs/v3/GSAP/Timeline' },
    { label: 'Timeline.vars', href: 'https://gsap.com/docs/v3/GSAP/Timeline/vars' },
    { label: 'Timeline.to()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/to()' },
    { label: 'Timeline.from()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/from()' },
    { label: 'Timeline.fromTo()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/fromTo()' },
    { label: 'Timeline.set()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/set()' },
  ],
} as const

/** 공식 source item 116개를 "그릇을 만들고 → 채우고 → 위치를 정한다"는 여덟 단계에 대응시킨다. */
export const timelineBasicsSections = [
  { number: '01', id: 'why-timeline', title: 'delay를 손으로 계산하지 않으려면', sourceItems: 8 },
  { number: '02', id: 'timeline-instance', title: 'gsap.timeline()이 돌려주는 그릇', sourceItems: 9 },
  { number: '03', id: 'timeline-vars', title: '생성자에 넣을 수 있는 값 22개', sourceItems: 24 },
  { number: '04', id: 'child-creators', title: '안을 채우는 네 메서드 · to · from · fromTo · set', sourceItems: 37 },
  { number: '05', id: 'position-parameter', title: '세 번째 인자가 놓일 자리를 정한다', sourceItems: 19 },
  { number: '06', id: 'defaults-scope', title: 'defaults는 누구에게까지 내려가나', sourceItems: 2 },
  { number: '07', id: 'nesting-and-clock', title: 'Timeline 안의 Timeline과 playhead', sourceItems: 6 },
  { number: '08', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 11 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineBasicsCoverage = {
  officialSources: 7,
  officialSourceItems: 116,
  localSections: 8,
} as const
