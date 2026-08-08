/** P07이 소유한 세 Draggable event canonical의 기술 item을 고정한다. */

/** 공식 사실과 설치본 확인을 구분하는 event source 행이다. */
export type DraggableEventSourceItem = {
  id: string
  officialItem: string
  href: string
  sectionId: string
  origin: 'official' | 'implementation'
}

/** listener·pressed·recent-drag의 모든 공식 기술 내용을 학습 순서에 연결한다. */
export const draggableEventSourceItems: DraggableEventSourceItem[] = [
  {
    id: 'DRAGEVENT-21-01',
    officialItem:
      'addEventListener(type, callback)는 특정 event가 발생할 때마다 호출할 함수를 등록한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/',
    sectionId: 'gesture-event-mental-model',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-21-02',
    officialItem:
      'rendered 문서는 listener 안 this가 event를 발생시킨 Draggable의 target이라고 설명한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/',
    sectionId: 'gesture-event-mental-model',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-21-03',
    officialItem:
      '공식 event 목록은 press, click, dragstart, drag, dragend, release, throwcomplete, throwupdate다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/',
    sectionId: 'gesture-event-mental-model',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-21-04',
    officialItem:
      '공식 usage는 press listener에서 this target의 backgroundColor를 gsap.to로 바꾼다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/',
    sectionId: 'listener-cleanup',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-34-01',
    officialItem:
      'isPressed는 Boolean property이며 Draggable이 pressed 상태이면 true다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/isPressed/',
    sectionId: 'pressed-timing',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-55-01',
    officialItem:
      'static Draggable.timeSinceDrag()는 마지막 drag가 끝난 뒤 경과한 시간을 seconds Number로 반환한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.timeSinceDrag()/',
    sectionId: 'recent-drag-decision',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-55-02',
    officialItem:
      '공식 예제는 recent drag 뒤 click action을 건너뛰기 위해 0.2초 threshold와 dragClickables: true를 사용한다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.timeSinceDrag()/',
    sectionId: 'click-drag-boundary',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-55-03',
    officialItem:
      'timeSinceDrag()는 static method 외에 Draggable instance method도 있다.',
    href: 'https://gsap.com/docs/v3/Plugins/Draggable/static.timeSinceDrag()/',
    sectionId: 'recent-drag-decision',
    origin: 'official',
  },
  {
    id: 'DRAGEVENT-IMPL-01',
    officialItem:
      'installed dispatcher는 listener를 배열에 중복 없이 보관하고 removeEventListener(type, callback)로 같은 callback을 제거한다.',
    href: 'node_modules/gsap/Draggable.js',
    sectionId: 'listener-cleanup',
    origin: 'implementation',
  },
  {
    id: 'DRAGEVENT-IMPL-02',
    officialItem:
      'installed dispatcher는 listener this를 Draggable instance로 call하므로 rendered docs의 target-this 설명과 다르다.',
    href: 'node_modules/gsap/Draggable.js',
    sectionId: 'listener-cleanup',
    origin: 'implementation',
  },
]
