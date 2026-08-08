/** P11 공식 item과 source/type boundary를 section mapping과 함께 보관한다. */
export type FlipFirstLastItem = {
  id: string
  officialItem: string
  source: string
  origin: 'official' | 'source'
  sectionId: string
}

/** 각 claim을 한 ID로 고정해 handoff coverage가 기계적으로 감사되게 한다. */
export const flipFirstLastItems: FlipFirstLastItem[] = [
  {
    id: 'FLIPFL-01',
    officialItem:
      'Flip은 DOM structure change로 jump할 두 state를 seamless transition으로 연결하며 First, Last, Invert, Play technique을 사용한다.',
    source: '#67',
    origin: 'official',
    sectionId: 'first-last',
  },
  {
    id: 'FLIPFL-02',
    officialItem:
      '기본 순서는 getState, DOM/style mutation, Flip.from(state)이며 Flip은 old offsets를 적용한 뒤 제거를 animate한다.',
    source: '#67',
    origin: 'official',
    sectionId: 'first-last',
  },
  {
    id: 'FLIPFL-03',
    officialItem:
      'Flip.getState(targets, vars)는 selector, Element, Array, NodeList target의 current state를 capture하며 return은 FlipState다.',
    source: '#67/#71',
    origin: 'official',
    sectionId: 'capture',
  },
  {
    id: 'FLIPFL-04',
    officialItem:
      '기본 capture는 viewport position, size, rotation, skew, opacity이고 props comma list로 extra CSS property를 capture할 수 있다.',
    source: '#67/#71',
    origin: 'official',
    sectionId: 'capture',
  },
  {
    id: 'FLIPFL-05',
    officialItem:
      'Flip.from(state, vars)는 state와 current state를 비교해 previous state처럼 보이게 한 뒤 current state로 Timeline을 반환한다.',
    source: '#67/#70',
    origin: 'official',
    sectionId: 'from-to',
  },
  {
    id: 'FLIPFL-06',
    officialItem:
      'Flip.to(state, vars)는 Flip.from과 inverse로 current state에서 provided state로 Timeline을 반환한다.',
    source: '#67/#75',
    origin: 'official',
    sectionId: 'from-to',
  },
  {
    id: 'FLIPFL-07',
    officialItem:
      'from/to vars는 duration, ease, onComplete, onUpdate 같은 standard tween special properties를 사용할 수 있다.',
    source: '#67/#70/#75',
    origin: 'official',
    sectionId: 'from-to',
  },
  {
    id: 'FLIPFL-08',
    officialItem:
      'absolute true는 flex/grid layout 문제를 돕지만 document flow에서 제거되어 아래 layout이 collapse할 수 있다.',
    source: '#67',
    origin: 'official',
    sectionId: 'vars-caveats',
  },
  {
    id: 'FLIPFL-09',
    officialItem:
      'nested true는 parent와 child target을 함께 flip할 때 offsets가 compound되지 않게 extra calculation을 한다.',
    source: '#67',
    origin: 'official',
    sectionId: 'vars-caveats',
  },
  {
    id: 'FLIPFL-10',
    officialItem:
      'simple true는 rotation/scale/skew container가 없음을 약속하고 extra calculation을 skip하는 faster mode다.',
    source: '#67',
    origin: 'official',
    sectionId: 'vars-caveats',
  },
  {
    id: 'FLIPFL-11',
    officialItem:
      'Flip handles interruptions; framework render가 immediate가 아니면 render 뒤 Flip.from을 시작하고 new instances에는 targets/data-flip-id matching이 필요하다.',
    source: '#67',
    origin: 'official',
    sectionId: 'cleanup',
  },
  {
    id: 'FLIPFL-12',
    officialItem:
      '3D transforms는 accommodate하지 않으며 box-sizing border-box가 accurate width/height calculation에 strongly recommended된다.',
    source: '#67',
    origin: 'official',
    sectionId: 'cleanup',
  },
  {
    id: 'FLIPFL-S01',
    officialItem:
      'installed raw creates a GSAP timeline for _fromTo and exposes static from/to as opposite relative directions; d.ts declares both Timeline return.',
    source: 'node_modules/gsap/src/Flip.js 322-329; types/Flip.d.ts 93,191',
    origin: 'source',
    sectionId: 'from-to',
  },
  {
    id: 'FLIPFL-S02',
    officialItem:
      'installed raw getState can force an active target flip to completion for accurate final capture, matching official parent wording.',
    source: 'node_modules/gsap/src/Flip.js getState implementation; #67 rendered lines 210-218',
    origin: 'source',
    sectionId: 'capture',
  },
]
