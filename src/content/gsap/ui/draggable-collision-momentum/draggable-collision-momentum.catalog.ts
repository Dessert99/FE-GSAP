/** P08의 공식 기술 item과 설치본·probe 경계를 item 단위로 유지한다. */
export type DraggableCollisionMomentumItem = {
  id: string
  officialItem: string
  source: string
  origin: 'official' | 'source'
  sectionId: string
}

/** 세 canonical의 기술 내용을 학습 단계와 같은 ID로 나눈다. */
export const draggableCollisionMomentumItems: DraggableCollisionMomentumItem[] = [
  {
    id: 'DRAGMOM-01',
    officialItem:
      'Draggable.hitTest(testObject, threshold)는 target과 element 또는 mouse position의 overlap을 Boolean으로 검사한다.',
    source: '#54',
    origin: 'official',
    sectionId: 'overlap-geometry',
  },
  {
    id: 'DRAGMOM-02',
    officialItem:
      'testObject는 element, pageX/pageY mouse·touch event, selector text, top/left/right/bottom rectangle object가 될 수 있고 hitTest(window)는 viewport visibility를 검사한다.',
    source: '#54',
    origin: 'official',
    sectionId: 'overlap-geometry',
  },
  {
    id: 'DRAGMOM-03',
    officialItem:
      'threshold는 optional Number 또는 String이며 default 0은 어떤 overlap이든 검사하고 Number는 pixel, String은 surface-area percentage다.',
    source: '#54',
    origin: 'official',
    sectionId: 'threshold-forms',
  },
  {
    id: 'DRAGMOM-04',
    officialItem:
      'hitTest()는 threshold에 따라 overlap이면 true, 아니면 false를 반환하며 static Draggable.hitTest(element1, element2, threshold)도 제공한다.',
    source: '#54',
    origin: 'official',
    sectionId: 'threshold-forms',
  },
  {
    id: 'DRAGMOM-05',
    officialItem:
      'DOM hitTest()는 getBoundingClientRect()의 rectangular box를 쓰므로 rotated·non-rectangular shape의 pixel-perfect 판정은 할 수 없다.',
    source: '#54',
    origin: 'official',
    sectionId: 'cleanup-fallback',
  },
  {
    id: 'DRAGMOM-06',
    officialItem:
      'isThrowing은 Draggable target이 InertiaPlugin inertia tween으로 현재 animated일 때 true인 Boolean이다.',
    source: '#35',
    origin: 'official',
    sectionId: 'throw-state',
  },
  {
    id: 'DRAGMOM-07',
    officialItem:
      'tween은 inertia true에서 mouse/touch release 직후 생성되는 read-only Tween instance이며 duration, pause(), resume(), timeScale을 읽거나 제어할 수 있다.',
    source: '#57',
    origin: 'official',
    sectionId: 'tween-inspector',
  },
  {
    id: 'DRAGMOM-08',
    officialItem:
      'element가 throw될 때마다 새 tween이 생기며 onDragEnd callback 안의 this.tween으로 release 시점에 참조할 수 있다.',
    source: '#57',
    origin: 'official',
    sectionId: 'tween-inspector',
  },
  {
    id: 'DRAGMOM-S01',
    officialItem:
      'installed/raw hitTest는 같은 object면 false이고 pixel threshold는 width와 height 모두 strict greater-than, percentage는 둘 중 한 area가 threshold 이상일 때 true다.',
    source: 'official raw + node_modules/gsap/src/Draggable.js 1865-1890; node probe',
    origin: 'source',
    sectionId: 'threshold-forms',
  },
  {
    id: 'DRAGMOM-S02',
    officialItem:
      'installed/raw는 inertia와 InertiaPlugin이 함께 있을 때 isThrowing true와 self.tween을 만들고 press에서 tween을 null로 되돌린다.',
    source: 'official raw + node_modules/gsap/src/Draggable.js 1006-1060, 1211-1216',
    origin: 'source',
    sectionId: 'throw-state',
  },
  {
    id: 'DRAGMOM-S03',
    officialItem:
      'official raw가 null assignment를 보이지만 installed d.ts는 readonly tween을 non-null Tween으로 선언한다.',
    source: 'official raw 1211-1216; node_modules/gsap/types/draggable.d.ts 26-31',
    origin: 'source',
    sectionId: 'tween-inspector',
  },
]
