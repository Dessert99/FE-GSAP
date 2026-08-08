/** Inertia와 네 static method의 공식 기술 항목을 item 단위로 보존한다. */
export type InertiaSourceItem = {
  id: string
  officialItem: string
  source: 'plugin' | 'getVelocity' | 'isTracking' | 'track' | 'untrack'
  origin: 'official' | 'implementation'
  sectionId: string
}

export const inertiaSourceItems: InertiaSourceItem[] = [
  {
    id: 'INERTIA-01',
    officialItem:
      'InertiaPlugin은 initial velocity와 optional end restriction을 존중하며 numeric property를 부드럽게 감속한다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'velocity-sample',
  },
  {
    id: 'INERTIA-02',
    officialItem:
      'gsap.registerPlugin(InertiaPlugin) 뒤 gsap.to(obj, { inertia })로 사용한다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'velocity-sample',
  },
  {
    id: 'INERTIA-03',
    officialItem:
      'simple numeric inertia value는 property의 initial velocity이며 units per second다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'velocity-sample',
  },
  {
    id: 'INERTIA-04',
    officialItem:
      'velocity는 Number 또는 tracked property의 auto이며 auto는 velocity를 생략해도 된다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'velocity-sample',
  },
  {
    id: 'INERTIA-05',
    officialItem:
      'Inertia는 x/y뿐 아니라 numeric property와 function-based getter/setter에도 작동한다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'velocity-sample',
  },
  {
    id: 'INERTIA-06',
    officialItem:
      'getVelocity(target, property)는 tracking을 시작한 target property의 current velocity를 반환한다.',
    source: 'getVelocity',
    origin: 'official',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-07',
    officialItem:
      'getVelocity target은 Element 또는 selector이고 property는 x/rotation/left 같은 String이다.',
    source: 'getVelocity',
    origin: 'official',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-08',
    officialItem:
      'track(target, props)는 Element, selector 또는 Array와 comma-delimited props를 받고 VelocityTracker Array를 반환한다.',
    source: 'track',
    origin: 'official',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-09',
    officialItem:
      'track은 GSAP update마다 time-stamped value 둘을 기록하며 100ms와 2 ticks 뒤 auto velocity를 쓸 수 있다.',
    source: 'track',
    origin: 'official',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-10',
    officialItem:
      'isTracking(target, property)은 target/property가 tracked면 true, 아니면 false를 반환한다.',
    source: 'isTracking',
    origin: 'official',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-11',
    officialItem:
      'track의 tracker reference는 성능상 직접 get에 쓸 수 있으나 detailed VelocityTracker API는 별도 페이지가 소유한다.',
    source: 'getVelocity',
    origin: 'official',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-12',
    officialItem:
      'Inertia는 velocity와 ease를 바탕으로 natural-looking duration을 자동 계산한다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'destination-prediction',
  },
  {
    id: 'INERTIA-13',
    officialItem:
      'duration은 hard-code하거나 { min, max } range로 제한할 수 있고 boundary overshoot에 영향 준다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'destination-prediction',
  },
  {
    id: 'INERTIA-14',
    officialItem:
      'resistance는 second당 저항량이며 friction처럼 감속을 바꾼다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'destination-prediction',
  },
  {
    id: 'INERTIA-15',
    officialItem:
      'track한 값을 inertia tween이 internal auto velocity로 사용하므로 velocity를 생략할 수 있다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'destination-prediction',
  },
  {
    id: 'INERTIA-16',
    officialItem: 'min/max는 velocity가 아니라 final resting value의 range다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'bounds-end',
  },
  {
    id: 'INERTIA-17',
    officialItem:
      'min과 max가 같으면 exact end가 되고 end로 같은 목적을 표현할 수 있다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'bounds-end',
  },
  {
    id: 'INERTIA-18',
    officialItem:
      'end Number는 exact landing, numeric Array는 natural landing과 가장 가까운 notch, Function은 natural end를 받아 number를 반환한다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'bounds-end',
  },
  {
    id: 'INERTIA-19',
    officialItem:
      'linkedProps는 function end에 함께 처리할 comma-delimited properties를 object로 전달한다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'bounds-end',
  },
  {
    id: 'INERTIA-20',
    officialItem:
      'bounds에서는 바로 edge에서 멈추지 않고 빠른 velocity면 overshoot 후 ease back할 수 있다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'bounds-end',
  },
  {
    id: 'INERTIA-21',
    officialItem:
      'Draggable와 잘 맞지만 Draggable 없이 independently tracking하여 쓸 수 있다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'bounds-end',
  },
  {
    id: 'INERTIA-22',
    officialItem:
      'untrack(target, props)는 특정 comma-delimited props 또는 props 생략 시 object의 all properties tracking을 멈춘다.',
    source: 'untrack',
    origin: 'official',
    sectionId: 'cleanup-boundaries',
  },
  {
    id: 'INERTIA-23',
    officialItem:
      'performance와 garbage collection을 위해 완료되면 untrack하는 것이 좋다.',
    source: 'track',
    origin: 'official',
    sectionId: 'cleanup-boundaries',
  },
  {
    id: 'INERTIA-24',
    officialItem:
      'Inertia는 physics/collision engine이 아니라 numeric value의 velocity 기반 tween plugin이다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'cleanup-boundaries',
  },
  {
    id: 'INERTIA-25',
    officialItem: 'reversible tween과 timeline seek/reverse가 가능하다.',
    source: 'plugin',
    origin: 'official',
    sectionId: 'cleanup-boundaries',
  },
  {
    id: 'INERTIA-26',
    officialItem:
      'installed source는 tracking이 없으면 auto velocity에서 console warning을 내고 tracker가 없을 때 velocity를 만들지 않는다.',
    source: 'plugin',
    origin: 'implementation',
    sectionId: 'tracking-lifecycle',
  },
  {
    id: 'INERTIA-27',
    officialItem:
      'installed type은 getVelocity target을 Element로 좁히므로 lab은 element ref를 직접 전달한다.',
    source: 'getVelocity',
    origin: 'implementation',
    sectionId: 'cleanup-boundaries',
  },
]
