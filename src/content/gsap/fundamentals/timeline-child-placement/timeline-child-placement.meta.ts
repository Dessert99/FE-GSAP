/** Timeline child 배치 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const timelineChildPlacementMeta = {
  title: 'child는 부모 시간축의 어디에 놓이고 변경 시 어떻게 따라가나요?',
  category: 'GSAP · Timeline',
  summary:
    'Timeline은 animation을 담는 상자가 아니라 자식마다 시작 좌표를 하나씩 배정하는 시간축입니다. 다섯 개의 공식 API는 그 좌표를 정하고(add), 방금 정한 좌표를 가리키고(recent), 이미 정한 좌표를 통째로 옮기고(shiftChildren), 좌표가 누구 것인지 밝히고(parent), 값이 바뀔 때 좌표를 다시 맞출지 결정합니다(smoothChildTiming).',
  sourcePath: 'src/content/gsap/fundamentals/timeline-child-placement/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'Timeline.parent', href: 'https://gsap.com/docs/v3/GSAP/Timeline/parent' },
    { label: 'Timeline.smoothChildTiming', href: 'https://gsap.com/docs/v3/GSAP/Timeline/smoothChildTiming' },
    { label: 'Timeline.add()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/add()' },
    { label: 'Timeline.recent()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/recent()' },
    { label: 'Timeline.shiftChildren()', href: 'https://gsap.com/docs/v3/GSAP/Timeline/shiftChildren()' },
  ],
} as const

/** 공식 source item 63개를 "좌표는 누구 것이고, 어떻게 정하고, 어떻게 옮기나"라는 흐름의 일곱 단계에 대응시킨다. */
export const timelineChildPlacementSections = [
  { number: '01', id: 'parent-graph', title: '부모는 언제나 하나뿐이다', sourceItems: 8 },
  { number: '02', id: 'add-signature', title: 'add()가 받는 것과 돌려주는 것', sourceItems: 7 },
  { number: '03', id: 'position-syntax', title: 'position 표기 하나가 자리를 정한다', sourceItems: 23 },
  { number: '04', id: 'recent-pointer', title: '방금 넣은 child를 가리키기', sourceItems: 5 },
  { number: '05', id: 'shift-children', title: '이미 놓인 child를 통째로 밀기', sourceItems: 8 },
  { number: '06', id: 'smooth-child-timing', title: '값이 바뀌면 좌표가 따라 움직일까', sourceItems: 12 },
  { number: '07', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const timelineChildPlacementCoverage = {
  officialSources: 5,
  officialSourceItems: 63,
  localSections: 7,
} as const
