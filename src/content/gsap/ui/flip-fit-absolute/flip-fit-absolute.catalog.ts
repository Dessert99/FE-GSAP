/** Flip.fit과 makeAbsolute의 공식 주장과 source/type return 차이를 item 단위로 고정한다. */
export type FlipFitSourceItem = {
  id: string
  officialItem: string
  source: 'fit' | 'makeAbsolute'
  origin: 'official' | 'implementation'
  sectionId: string
}
export const flipFitAbsoluteSourceItems: FlipFitSourceItem[] = [
  {
    id: 'FLIPFIT-01',
    officialItem:
      'Flip.fit(targetToResize, destinationTargetOrState, vars) signature와 one-element fitting 역할',
    source: 'fit',
    origin: 'official',
    sectionId: 'coordinate-ownership',
  },
  {
    id: 'FLIPFIT-02',
    officialItem:
      'target은 selector 또는 Element이고 destination은 selector, Element 또는 FlipState다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'coordinate-ownership',
  },
  {
    id: 'FLIPFIT-03',
    officialItem:
      'fit은 기본 x,y,rotation,skewX,width,height를 바꾸고 scale true는 width/height 대신 scaleX/scaleY를 쓴다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-04',
    officialItem:
      'fitChild는 child의 area로 fitting calculation을 하고 scale true처럼 동작한다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-05',
    officialItem:
      'vars는 duration/ease/onComplete/delay 등 tween property와 absolute/fitChild/scale special setting을 담는다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-06',
    officialItem:
      'duration이 없으면 fit은 instantly apply하고 duration이 있으면 gsap.to tween을 반환한다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-07',
    officialItem:
      'previously recorded FlipState를 destination으로 주면 과거 position/size로 fit할 수 있다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-08',
    officialItem:
      'absolute true는 target position을 absolute로 만들어 flex/grid layout challenge를 풀 수 있다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'absolute-flow',
  },
  {
    id: 'FLIPFIT-09',
    officialItem:
      'getVars true는 fit하지 않고 x,y,scaleX,scaleY,rotation,skewX 등의 fitting vars object만 반환한다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-10',
    officialItem:
      'props는 position/dimension/rotation/skew 외 CSS property comma list를 맞춘다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-11',
    officialItem:
      'simple true는 rotated/scaled/skewed container가 없다는 전제로 extra calculation을 생략한다.',
    source: 'fit',
    origin: 'official',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-12',
    officialItem:
      'Flip.makeAbsolute(targets) : Array signature와 current positioning 보존',
    source: 'makeAbsolute',
    origin: 'official',
    sectionId: 'absolute-flow',
  },
  {
    id: 'FLIPFIT-13',
    officialItem:
      'makeAbsolute target은 selector, Element, Array, NodeList 또는 FlipState다.',
    source: 'makeAbsolute',
    origin: 'official',
    sectionId: 'absolute-flow',
  },
  {
    id: 'FLIPFIT-14',
    officialItem: 'makeAbsolute returns affected Elements Array다.',
    source: 'makeAbsolute',
    origin: 'official',
    sectionId: 'absolute-flow',
  },
  {
    id: 'FLIPFIT-15',
    officialItem:
      'makeAbsolute 기능은 Flip.from과 Flip.fit의 absolute true에도 들어 있지만 independently 노출된다.',
    source: 'makeAbsolute',
    origin: 'official',
    sectionId: 'absolute-flow',
  },
  {
    id: 'FLIPFIT-16',
    officialItem:
      'Flip.makeAbsolute("*")는 document 전체를 absolute로 만들 수 있으나 필요하지 않은 예다.',
    source: 'makeAbsolute',
    origin: 'official',
    sectionId: 'containing-block',
  },
  {
    id: 'FLIPFIT-17',
    officialItem:
      'installed d.ts fit return은 Tween | object | null로 getVars/apply/animate 분기를 명시하고 raw는 getVars면 vars, duration이면 tween, 아니면 null을 반환한다.',
    source: 'fit',
    origin: 'implementation',
    sectionId: 'fit-modes',
  },
  {
    id: 'FLIPFIT-18',
    officialItem:
      'installed raw makeAbsolute는 inline position,width,height,padding,gridArea를 기록·변경하므로 lab은 original style과 flow를 직접 복원한다.',
    source: 'makeAbsolute',
    origin: 'implementation',
    sectionId: 'restoration',
  },
]
