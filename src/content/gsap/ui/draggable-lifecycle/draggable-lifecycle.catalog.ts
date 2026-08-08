/** Draggable lifecycle 여섯 canonical의 공식 주장과 raw/type 차이를 item 단위로 고정한다. */

/** 이 페이지가 소유하는 여섯 공식 source 식별자다. */
export type DraggableLifecycleSourceKey = 'disable' | 'enable' | 'enabled' | 'endDrag' | 'kill' | 'startDrag'

/** 공식 설명과 설치본 source/type 확인을 분리해 세는 coverage 행이다. */
export type DraggableLifecycleSourceItem = { id: string; officialItem: string; source: DraggableLifecycleSourceKey; origin: 'official' | 'implementation'; sectionId: string }

/** instance lifecycle을 이해하는 데 필요한 공식 주장과 source/type 차이다. */
export const draggableLifecycleSourceItems: DraggableLifecycleSourceItem[] = [
  { id: 'DRAGLIFE-01', officialItem: 'disable()의 signature는 disable() : Draggable이다.', source: 'disable', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-02', officialItem: 'disable()은 instance를 disable해 enable() 전까지 drag할 수 없게 한다.', source: 'disable', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-03', officialItem: 'disable()은 같은 instance를 반환하므로 chaining할 수 있다.', source: 'disable', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-04', officialItem: 'enable()의 signature는 enable() : Draggable이다.', source: 'enable', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-05', officialItem: 'enable()은 instance를 enable해 target을 다시 drag할 수 있게 한다.', source: 'enable', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-06', officialItem: 'enable()은 같은 instance를 반환하므로 chaining할 수 있다.', source: 'enable', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-07', officialItem: 'enabled(value:Boolean) : Boolean은 enabled state를 get하거나 set하는 method다.', source: 'enabled', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-08', officialItem: 'enabled()처럼 value를 생략하면 instance가 enabled인지 Boolean으로 반환한다.', source: 'enabled', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-09', officialItem: 'enabled(value)를 쓰면 Boolean을 설정하고 instance 자신을 반환해 chaining할 수 있다.', source: 'enabled', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-10', officialItem: 'enabled instance는 mouse event에 응답하고 callback을 실행하며 drag될 수 있다.', source: 'enabled', origin: 'official', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-11', officialItem: 'endDrag(event:Object) : void는 현재 drag를 programmatically 끝낸다.', source: 'endDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-12', officialItem: 'endDrag에는 stop을 시작한 original mouse 또는 touch event를 주고 pageX, pageY, target을 검사할 수 있어야 한다.', source: 'endDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-13', officialItem: 'endDrag는 disable()과 달리 instance를 완전히 꺼 두지 않는다.', source: 'endDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-14', officialItem: 'startDrag(event:Object, align:Boolean) : void는 drag를 programmatically 시작한다.', source: 'startDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-15', officialItem: 'startDrag에는 distance와 start value를 계산할 original mouse, touch 또는 pointer event가 필요하며 event 없이 호출할 수 없다.', source: 'startDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-16', officialItem: 'align이 true면 pointer가 target 위에 있지 않아도 target을 pointer 위치로 맞춘다.', source: 'startDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-17', officialItem: 'enable()은 user interaction을 다시 허용할 뿐이고, startDrag()는 drag를 즉시 시작한다.', source: 'startDrag', origin: 'official', sectionId: 'programmatic-drag' },
  { id: 'DRAGLIFE-18', officialItem: 'kill()의 signature는 kill() : Draggable이다.', source: 'kill', origin: 'official', sectionId: 'kill-recreate' },
  { id: 'DRAGLIFE-19', officialItem: 'kill()은 instance를 disable하고 internal lookup에서 제거해 garbage collection 대상이 되게 한다.', source: 'kill', origin: 'official', sectionId: 'kill-recreate' },
  { id: 'DRAGLIFE-20', officialItem: 'disable한 instance는 Draggable.get()으로 계속 찾지만 kill한 instance는 찾을 수 없다.', source: 'kill', origin: 'official', sectionId: 'kill-recreate' },
  { id: 'DRAGLIFE-21', officialItem: '더 이상 instance가 필요하지 않을 때 kill()을 호출하며, kill()은 같은 instance를 반환한다.', source: 'kill', origin: 'official', sectionId: 'kill-recreate' },
  { id: 'DRAGLIFE-22', officialItem: '설치본 Draggable.js와 draggable.d.ts는 enable/disable의 optional type 내부 인수와 enabled(value)의 this 반환 overload를 보이며, rendered signature의 단순 표기보다 넓다.', source: 'enabled', origin: 'implementation', sectionId: 'enable-disable' },
  { id: 'DRAGLIFE-23', officialItem: '설치본 Draggable.js는 startDrag/endDrag에서 event 또는 직전 pointerEvent fallback을 둔다. 그러나 d.ts는 event를 필수로 하고 공식 문서는 original event 없이는 호출할 수 없다고 하므로 lab은 실제 capture 없이는 호출을 보류한다.', source: 'startDrag', origin: 'implementation', sectionId: 'programmatic-drag' },
]
