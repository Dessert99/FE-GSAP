/** Draggable 다섯 canonical의 생성·조회·검사 사실과 타입 불일치를 로컬 근거에 연결한다. */

/** 이 페이지가 소유하는 다섯 공식 source 식별자다. */
export type DraggableCreateSourceKey = 'draggable' | 'create' | 'get' | 'target' | 'vars'

/** 공식 설명과 설치본 source/type 확인을 분리해 세는 coverage 행이다. */
export type DraggableCreateSourceItem = {
  id: string
  officialItem: string
  source: DraggableCreateSourceKey
  origin: 'official' | 'implementation'
  sectionId: string
}

// create canonical의 Config Object 전체를 P03 source item으로 보존하고 심화 동작은 후속 owner로 넘긴다
const draggableCreateConfigItems: DraggableCreateSourceItem[] = [
  { id: 'DRAGCREATE-21', officialItem: 'activeCursor는 press부터 release까지 쓸 CSS cursor String이다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-22', officialItem: 'allowContextMenu Boolean은 context menu 허용 여부이며 기본값은 false다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-23', officialItem: 'allowEventDefault Boolean true는 original pointer/mouse/touch event의 preventDefault를 호출하지 않으며 기본값은 false다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-24', officialItem: 'allowNativeTouchScrolling Boolean은 single-axis draggable의 반대 축 native touch scrolling을 허용하며 기본값은 true다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-25', officialItem: 'autoScroll Number는 scrollable container edge 40px 안에서 non-zero 값으로 auto-scroll을 켜며 기본값은 0이다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-26', officialItem: 'bounds는 Element, String 또는 Object로 container rectangle이나 min/max coordinate를 제한한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-27', officialItem: 'callbackScope Object는 callback 안 this scope를 정하며 이전 callback-specific scope property는 deprecated지만 동작한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-28', officialItem: 'clickableTest Function은 pressed element를 받아 clickable인지 결정한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-29', officialItem: 'cursor String은 rotation 외 type에서 기본 move cursor를 덮어쓴다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-30', officialItem: 'dragClickables Boolean false는 link/input/select/button/textarea와 data-clickable child의 native behavior를 drag보다 우선한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-31', officialItem: 'dragResistance Number 0~1은 drag 중 resistance를 정하며 1은 drag를 막는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-32', officialItem: 'edgeResistance Number 0~1은 bounds 밖 resistance를 정하며 1은 bounds 밖 drag를 막는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-33', officialItem: 'force3D Boolean은 지원 browser에서 GPU compositing을 위한 3D transform 사용을 바꾸며 false로 끌 수 있다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-34', officialItem: 'inertia Boolean 또는 Object는 release 뒤 momentum motion에 InertiaPlugin을 사용하며 true 또는 detailed object를 받을 수 있다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-35', officialItem: 'inertia가 있을 때 snap은 Function, Object, Array로 release 뒤 landing value 규칙을 정한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-36', officialItem: 'onThrowUpdate Function은 inertia tween render마다 호출되며 drag 중 onDrag를 대신하지 않는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-37', officialItem: 'onThrowComplete Function은 inertia tween 완료 때 호출되며 release 직후 callback은 onDragEnd다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-38', officialItem: 'throwResistance Number 기본값 1000은 inertia release friction을 정하며 InertiaPlugin과 inertia true가 없으면 무시된다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-39', officialItem: 'maxDuration Number 기본값 10초는 inertia tween 최대 duration이며 drag 자체의 시간 제한이 아니다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-40', officialItem: 'minDuration Number 기본값 0.2초는 inertia tween 최소 duration이며 drag 자체의 시간 제한이 아니다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-41', officialItem: 'overshootTolerance Number 기본값 1은 inertia landing 전 bounds overshoot 허용량이며 0이면 허용하지 않는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-42', officialItem: 'liveSnap은 Function, Boolean, Array, Object로 drag 중 snap rule을 적용하며 true는 snap 설정을 사용한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-43', officialItem: 'lockAxis Boolean은 x,y 또는 top,left type에서 initial direction 기준 axis lock을 사용한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-44', officialItem: 'minimumMovement Number는 drag로 해석할 이동 threshold이며 기본 설명은 2px 초과다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-45', officialItem: 'onClick Function은 press/release 사이 3px 미만 이동 때 호출되고 기본 pointerEvent argument를 받는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-46', officialItem: 'onClickParams Array는 onClick에 전달할 optional parameter array다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-47', officialItem: 'onDrag Function은 drag 중 mouse/touch move마다 requestAnimationFrame당 한 번 호출되고 pointerEvent argument를 받는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-48', officialItem: 'onDragParams Array는 onDrag에 전달할 optional parameter array다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-49', officialItem: 'onDragEnd Function은 drag release에 호출되며 이동이 없어도 호출되고 pointerEvent argument를 받는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-50', officialItem: 'onDragEndParams Array는 onDragEnd에 전달할 optional parameter array다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-51', officialItem: 'onDragStart Function은 2px 초과 이동으로 drag가 시작할 때 호출되고 pointerEvent argument를 받는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-52', officialItem: 'onDragStartParams Array는 onDragStart에 전달할 optional parameter array다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-53', officialItem: 'onLockAxis Function은 lockAxis가 axis를 정할 때 또는 single-axis touch gesture가 scroll/drag 방향을 정할 때 호출된다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-54', officialItem: 'onMove Function은 drag 중 move마다 호출될 수 있어 onDrag와 달리 requestAnimationFrame당 여러 번 호출될 수 있다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-55', officialItem: 'onPress Function은 target press 직후 호출되고 pointerEvent argument를 받는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-56', officialItem: 'onPressInit Function은 starting values 기록 전 호출되고 항상 onPress보다 먼저 실행된다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-57', officialItem: 'onPressParams Array는 onPress에 전달할 optional parameter array다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-58', officialItem: 'onRelease Function은 target press 뒤 release 때 drag 여부와 관계없이 호출되고 pointerEvent argument를 받는다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-59', officialItem: 'onReleaseParams Array는 onRelease에 전달할 optional parameter array다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-60', officialItem: 'trigger는 Element, String 또는 Object이며 target 전체 대신 drag를 시작할 child area를 지정한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-61', officialItem: 'type String은 drag가 바꿀 property를 정하며 "x,y"가 기본값이고 "left,top", rotation, x, y, top, left를 받을 수 있다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-62', officialItem: 'zIndexBoost Boolean은 positional drag press 때 기본 1000부터 zIndex를 올리는 동작을 끄며 dynamically created target은 create 전 DOM에 append해야 한다.', source: 'create', origin: 'official', sectionId: 'create' },
]

/** 생성 instance를 이해하는 데 필요한 공식 주장과 source/type 차이다. */
export const draggableCreateSourceItems: DraggableCreateSourceItem[] = [
  { id: 'DRAGCREATE-01', officialItem: 'Draggable은 mouse와 touch event로 DOM element를 draggable하게 만들며, 사용 전에 gsap.registerPlugin(Draggable)로 등록한다.', source: 'draggable', origin: 'official', sectionId: 'instance-mental-model' },
  { id: 'DRAGCREATE-02', officialItem: '가장 단순한 Draggable.create("#yourID") 호출은 bounds나 release 뒤 kinetic motion 없이 element를 draggable하게 만든다.', source: 'draggable', origin: 'official', sectionId: 'instance-mental-model' },
  { id: 'DRAGCREATE-03', officialItem: '공식 문서는 drag type으로 "x,y", "top,left", "rotation", "x", "y", "top", "left"를 나열한다.', source: 'draggable', origin: 'official', sectionId: 'instance-mental-model' },
  { id: 'DRAGCREATE-04', officialItem: '기본적으로 clickable child의 click/tap은 drag와 다르게 취급하며 dragClickables로 이 동작을 바꿀 수 있다.', source: 'draggable', origin: 'official', sectionId: 'instance-mental-model' },
  { id: 'DRAGCREATE-05', officialItem: 'signature는 Draggable.create(target:Object, vars:Object) : Array이고 static method는 constructor보다 유연한 생성 방법이다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-06', officialItem: 'create target은 DOM element, selector text, element array를 받을 수 있다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-07', officialItem: 'vars는 type, inertia, edgeResistance, onDrag 같은 선택 configuration을 담는 object다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-08', officialItem: 'create는 target마다 하나씩 Draggable instance를 만든 배열을 항상 반환한다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-09', officialItem: '개별 Draggable instance는 하나의 element에만 연결되므로 여러 target을 만들 때 array return이 필요하다.', source: 'create', origin: 'official', sectionId: 'create' },
  { id: 'DRAGCREATE-10', officialItem: 'signature는 Draggable.get(target:Object) : Draggable이며 target과 연결된 instance를 쉽게 가져오는 static method다.', source: 'get', origin: 'official', sectionId: 'lookup-identity' },
  { id: 'DRAGCREATE-11', officialItem: 'get target은 DOM element 자체 또는 selector string일 수 있다.', source: 'get', origin: 'official', sectionId: 'lookup-identity' },
  { id: 'DRAGCREATE-12', officialItem: '공식 get 문서는 target에 연결된 instance가 없으면 undefined를 반환한다고 명시한다.', source: 'get', origin: 'official', sectionId: 'lookup-identity' },
  { id: 'DRAGCREATE-13', officialItem: '공식 예제는 여러 ".draggable" target을 만든 뒤 "#element1" target의 개별 instance를 get으로 찾는다.', source: 'get', origin: 'official', sectionId: 'lookup-identity' },
  { id: 'DRAGCREATE-14', officialItem: 'target은 draggable 중인 object를 가리키는 Object property다.', source: 'target', origin: 'official', sectionId: 'target-vars' },
  { id: 'DRAGCREATE-15', officialItem: 'vars는 constructor로 전달한 configuration variables(type, bounds, onPress, onDrag 등)를 저장하는 Object property다.', source: 'vars', origin: 'official', sectionId: 'target-vars' },
  { id: 'DRAGCREATE-16', officialItem: '공식 overview의 instance property 표는 target을 Object, vars를 Object로 표기한다.', source: 'draggable', origin: 'official', sectionId: 'target-vars' },
  { id: 'DRAGCREATE-17', officialItem: '공식 overview는 inertia가 true일 때 release 뒤 생성되는 Tween을 설명하지만, momentum 상세는 이 페이지 범위 밖이다.', source: 'draggable', origin: 'official', sectionId: 'lifecycle-boundary' },
  { id: 'DRAGCREATE-18', officialItem: '공식 overview는 callbacks와 event dispatching을 제공한다고 설명하지만, gesture event 상세는 이 페이지 범위 밖이다.', source: 'draggable', origin: 'official', sectionId: 'lifecycle-boundary' },
  { id: 'DRAGCREATE-19', officialItem: '설치본 Draggable source는 create에서 target을 배열로 정규화해 각 target마다 new Draggable을 만들고, get은 target의 lookup key로 instance를 읽는다.', source: 'create', origin: 'implementation', sectionId: 'create' },
  { id: 'DRAGCREATE-20', officialItem: '설치본 draggable.d.ts는 get 반환형을 Draggable로 적지만 공식 rendered 문서와 source lookup은 미연결 target에서 undefined가 될 수 있음을 보인다.', source: 'get', origin: 'implementation', sectionId: 'lookup-identity' },
  ...draggableCreateConfigItems,
]
