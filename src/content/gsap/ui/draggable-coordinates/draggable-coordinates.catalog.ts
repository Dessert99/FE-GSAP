/** P04가 소유하는 Draggable 좌표 canonical을 item 단위로 고정한다. */

/** 공식 문서·설치본 확인을 구분하는 P04 source 행이다. */
export type DraggableCoordinateSourceItem = {
  id: string
  officialItem: string
  href: string
  sectionId: string
  origin: 'official' | 'implementation'
}

/** 열네 canonical의 좌표·pointer·방향 사실을 학습 섹션에 배치한다. */
export const draggableCoordinateSourceItems: DraggableCoordinateSourceItem[] = [
  {
    id: 'DRAGCOORD-24',
    officialItem:
      'deltaX는 마지막 drag event 이후 x 관련 값의 변화이며 rotation type에서는 rotation 변화다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/deltaX/',
    sectionId: 'coordinate-frames',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-25',
    officialItem: 'deltaY는 마지막 drag event 이후 y 관련 값의 변화다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/deltaY/',
    sectionId: 'coordinate-frames',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-30',
    officialItem:
      'endRotation은 rotation type에서 release 직후 계산되는 read-only 종료 회전값이다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/endRotation/',
    sectionId: 'phase-snapshots',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-31',
    officialItem:
      'endX는 release 직후 채워지는 read-only x 종료값이며 inertia landing 예측에 쓸 수 있다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/endX/',
    sectionId: 'phase-snapshots',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-32',
    officialItem:
      'endY는 release 직후 채워지는 read-only y 종료값이며 inertia landing 예측에 쓸 수 있다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/endY/',
    sectionId: 'phase-snapshots',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-33',
    officialItem:
      'getDirection(from)은 start, velocity 또는 element 기준 방향 문자열을 반환한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/getDirection()/',
    sectionId: 'direction-rotation',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-45',
    officialItem:
      'pointerEvent는 instance에 영향을 준 마지막 pointer event를 가리키는 read-only object다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/pointerEvent/',
    sectionId: 'pointer-target',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-46',
    officialItem:
      'pointerX는 마지막 event의 가로 pointer 위치이며 browser 차이를 정규화한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/pointerX/',
    sectionId: 'pointer-target',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-47',
    officialItem:
      'pointerY는 마지막 event의 세로 pointer 위치이며 browser 차이를 정규화한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/pointerY/',
    sectionId: 'pointer-target',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-48',
    officialItem:
      'rotation은 Draggable target의 현재 rotation 값을 읽는 read-only Number다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/rotation/',
    sectionId: 'direction-rotation',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-50',
    officialItem:
      'startX는 drag가 시작한 target의 x 관련 값을 읽는 read-only Number다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/startX/',
    sectionId: 'phase-snapshots',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-51',
    officialItem:
      'startY는 drag가 시작한 target의 y 관련 값을 읽는 read-only Number다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/startY/',
    sectionId: 'phase-snapshots',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-60',
    officialItem:
      'x는 type에 따라 transform x 또는 inline left 같은 target의 현재 x 관련 값이다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/x/',
    sectionId: 'reading-boundaries',
    origin: 'official',
  },
  {
    id: 'DRAGCOORD-61',
    officialItem:
      'y는 type에 따라 transform y 또는 inline top 같은 target의 현재 y 관련 값이다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/y/',
    sectionId: 'reading-boundaries',
    origin: 'official',
  },
]
