/** P07 event source·section·coverage 분모를 page와 handoff에 함께 제공한다. */

/** Draggable event 페이지의 official identity와 canonical 링크다. */
export const draggableEventsMeta = {
  title: 'Draggable gesture event는 언제 한 번 반응해야 할까요?',
  category: 'GSAP · UI · Draggable',
  summary:
    'listener가 받는 gesture event, press 상태, 그리고 최근 drag 뒤 click을 구분해 polling 없이 한 번의 결정으로 반응하는 법을 살펴봅니다.',
  sourcePath: 'src/content/gsap/ui/draggable-events/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'addEventListener()',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/',
    },
    {
      label: 'isPressed',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/isPressed/',
    },
    {
      label: 'Draggable.timeSinceDrag()',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.timeSinceDrag()/',
    },
  ],
} as const

/** source item을 gesture 이해 순서로 재배치한다. */
export const draggableEventsSections = [
  {
    number: '01',
    id: 'gesture-event-mental-model',
    title: 'event는 gesture의 한 순간을 알린다',
    sourceItems: 3,
  },
  {
    number: '02',
    id: 'pressed-timing',
    title: 'isPressed는 누르는 동안만 읽는다',
    sourceItems: 1,
  },
  {
    number: '03',
    id: 'recent-drag-decision',
    title: 'recent drag 시간으로 click 결정을 늦춘다',
    sourceItems: 2,
  },
  {
    number: '04',
    id: 'listener-cleanup',
    title: '등록한 listener는 같은 callback으로 정리한다',
    sourceItems: 2,
  },
  {
    number: '05',
    id: 'click-drag-boundary',
    title: 'click과 drag의 의도를 시간으로 구분한다',
    sourceItems: 0,
  },
] as const

/** 여덟 공식 item과 두 설치본 차이를 서로 다른 분모로 선언한다. */
export const draggableEventsCoverage = {
  officialSources: 3,
  officialSourceItems: 8,
  implementationItems: 2,
  runtimeProbeItems: 1,
  localSections: 5,
} as const
