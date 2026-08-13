/** P04의 source·섹션·coverage 분모를 페이지와 handoff에서 함께 쓴다. */

/** Draggable 좌표 페이지의 머리말과 공식 canonical 링크다. */
export const draggableCoordinatesMeta = {
  title: 'Draggable 좌표는 target, pointer, 시점 중 무엇을 말할까요?',
  category: 'GSAP · UI · Draggable',
  summary:
    'drag의 시작·현재·변화·종료 값을 target과 pointer 좌표로 나누어 읽고, rotation mode의 다른 의미도 함께 확인합니다.',
  sourcePath: 'src/content/gsap/ui/draggable-coordinates/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'deltaX',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/deltaX/',
    },
    {
      label: 'deltaY',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/deltaY/',
    },
    {
      label: 'endRotation',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/endRotation/',
    },
    { label: 'endX', href: 'https://gsap.com/docs/v3/Plugins/Draggable/endX/' },
    { label: 'endY', href: 'https://gsap.com/docs/v3/Plugins/Draggable/endY/' },
    {
      label: 'getDirection()',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/getDirection()/',
    },
    {
      label: 'pointerEvent',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/pointerEvent/',
    },
    {
      label: 'pointerX',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/pointerX/',
    },
    {
      label: 'pointerY',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/pointerY/',
    },
    {
      label: 'rotation',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/rotation/',
    },
    {
      label: 'startX',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/startX/',
    },
    {
      label: 'startY',
      href: 'https://gsap.com/docs/v3/Plugins/Draggable/startY/',
    },
    { label: 'x', href: 'https://gsap.com/docs/v3/Plugins/Draggable/x/' },
    { label: 'y', href: 'https://gsap.com/docs/v3/Plugins/Draggable/y/' },
  ],
} as const

/** 열네 source item을 초보자 질문 순서로 재배치한다. */
export const draggableCoordinatesSections = [
  {
    number: '01',
    id: 'coordinate-frames',
    title: '변화량은 target의 지난 frame과 비교한다',
    sourceItems: 2,
  },
  {
    number: '02',
    id: 'phase-snapshots',
    title: 'press, drag, release마다 다른 snapshot을 읽는다',
    sourceItems: 5,
  },
  {
    number: '03',
    id: 'pointer-target',
    title: 'pointer 위치와 target 위치는 같은 좌표가 아니다',
    sourceItems: 3,
  },
  {
    number: '04',
    id: 'direction-rotation',
    title: '방향 기준과 rotation mode를 분리한다',
    sourceItems: 2,
  },
  {
    number: '05',
    id: 'reading-boundaries',
    title: '읽기 전용 값의 timing과 환경을 확인한다',
    sourceItems: 2,
  },
] as const

/** coverage는 열네 공식 canonical과 별도 설치본 대조를 명시한다. */
export const draggableCoordinatesCoverage = {
  officialSources: 14,
  officialSourceItems: 14,
  implementationItems: 0,
  runtimeProbeItems: 0,
  localSections: 5,
} as const
