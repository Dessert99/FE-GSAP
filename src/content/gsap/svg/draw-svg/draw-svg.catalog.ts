/** DrawSVG value·measurement·geometry 사실과 rendered/type/raw 차이를 item 단위로 고정한다. */
export type DrawSvgSourceKey = 'drawSVG' | 'getLength' | 'getPosition'
export type DrawSvgSourceItem = {
  id: string
  officialItem: string
  source: DrawSvgSourceKey
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 세 DrawSVG canonical의 모든 기술 항목을 local evidence에 연결한다. */
export const drawSvgSourceItems: DrawSvgSourceItem[] = [
  {
    id: 'DRAWSVG-01',
    officialItem:
      'DrawSVGPlugin은 path, line, polyline, polygon, rect, ellipse stroke를 progressively reveal 또는 hide한다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'stroke-dash-mental-model',
  },
  {
    id: 'DRAWSVG-02',
    officialItem:
      'DrawSVGPlugin은 stroke-dashoffset과 stroke-dasharray CSS property를 제어한다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'stroke-dash-mental-model',
  },
  {
    id: 'DRAWSVG-03',
    officialItem:
      'drawSVG 값은 animation 중간값이 아니라 tween의 end state 또는 from() tween의 start state인 stroked portion이다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'stroke-dash-mental-model',
  },
  {
    id: 'DRAWSVG-04',
    officialItem:
      '20% 80%는 path 양 끝에 20% gap을 남기고 중간 구간을 보이며 50% 50%에서 0% 100%로 가면 center outward reveal이 된다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'stroke-dash-mental-model',
  },
  {
    id: 'DRAWSVG-05',
    officialItem:
      'range start와 end를 함께 제어하므로 같은 길이의 dash를 path 한 끝에서 다른 끝으로 이동시킬 수 있다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-06',
    officialItem:
      'drawSVG value는 percentage 또는 absolute length를 받을 수 있다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-07',
    officialItem:
      'single value는 start 0을 가정하므로 100%, 0 100%, true는 같다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-08',
    officialItem:
      'stroke animation 전 CSS 또는 SVG attribute로 stroke와 stroke-width를 실제로 적용해야 한다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-09',
    officialItem:
      '여러 .draw-me stroke는 gsap.from과 stagger로 순서 있게 reveal할 수 있다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-10',
    officialItem:
      'DrawSVG tween은 timeline에 넣어 pause, resume, reverse, seek, nesting으로 control할 수 있다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-11',
    officialItem:
      'responsive resize처럼 element length가 animation 중 바뀌는 rare case에는 value 뒤 live를 붙여 every tick length를 recalculate한다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-12',
    officialItem:
      'multi-M path는 browser rendering이 어렵기 때문에 single segment path가 좋고 helper가 segment별 path로 split할 수 있다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'value-grammar',
  },
  {
    id: 'DRAWSVG-13',
    officialItem:
      'DrawSVGPlugin은 fill을 animate하지 않고 stroke만 affect한다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'reveal-lab',
  },
  {
    id: 'DRAWSVG-14',
    officialItem:
      'Firefox가 path total length를 짧게 계산하면 102% overshoot 또는 closer anchors가 workaround이며 plugin bug가 아니다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'rendered-geometry-boundaries',
  },
  {
    id: 'DRAWSVG-15',
    officialItem:
      'iOS Safari rect stroke rendering bug의 workaround는 rect를 path 또는 polyline으로 바꾸는 것이다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'rendered-geometry-boundaries',
  },
  {
    id: 'DRAWSVG-16',
    officialItem:
      'use element contents는 browser가 허용하지 않아 tween해도 화면 변화가 없다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'rendered-geometry-boundaries',
  },
  {
    id: 'DRAWSVG-17',
    officialItem:
      'getLength(element: Element | Selector text) : Number signature다.',
    source: 'getLength',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-18',
    officialItem:
      'getLength element은 stroke length를 정할 Element 또는 selector text다.',
    source: 'getLength',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-19',
    officialItem: 'getLength returns SVG element stroke length Number다.',
    source: 'getLength',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-20',
    officialItem:
      'getLength는 path, rect, circle, ellipse, line, polyline, polygon stroke를 지원한다.',
    source: 'getLength',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-21',
    officialItem:
      'getLength와 getPosition을 함께 쓰면 position[1] / (length / 100)을 floor해 current percentage를 계산할 수 있다.',
    source: 'getLength',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-22',
    officialItem:
      'getPosition(element: Element | Selector text) : Number signature다.',
    source: 'getPosition',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-23',
    officialItem:
      'getPosition element은 stroke position을 읽을 Element 또는 selector text다.',
    source: 'getPosition',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-24',
    officialItem: 'getPosition returns SVG element stroke position이다.',
    source: 'getPosition',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-25',
    officialItem:
      'getPosition도 path, rect, circle, ellipse, line, polyline, polygon을 대상으로 한다.',
    source: 'getPosition',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-26',
    officialItem:
      'getPosition과 getLength official example은 position[1]으로 total percentage를 계산한다.',
    source: 'getPosition',
    origin: 'official',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-27',
    officialItem:
      'Quick Start는 gsap.registerPlugin(DrawSVGPlugin) 뒤 drawSVG: 0 from tween을 보인다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'reveal-lab',
  },
  {
    id: 'DRAWSVG-28',
    officialItem:
      'Minimal usage는 draw-me class stroke를 drawSVG: 0 from tween으로 그린다.',
    source: 'drawSVG',
    origin: 'official',
    sectionId: 'reveal-lab',
  },
  {
    id: 'DRAWSVG-29',
    officialItem:
      'installed d.ts와 official rendered example은 getPosition이 number[]임을 보이지만 rendered signature/Returns는 Number로 표기한다.',
    source: 'getPosition',
    origin: 'implementation',
    sectionId: 'length-position',
  },
  {
    id: 'DRAWSVG-30',
    officialItem:
      'installed/raw getLength는 missing target에 0, getPosition은 [0, 0]을 반환하며 invisible getBBox failure를 warn하고 supported shapes attribute fallback을 시도한다.',
    source: 'getLength',
    origin: 'implementation',
    sectionId: 'rendered-geometry-boundaries',
  },
  {
    id: 'DRAWSVG-31',
    officialItem:
      'installed/raw는 live suffix뿐 아니라 vector-effect non-scaling-stroke에도 length update를 매 tick 적용하며 undocumented nowrap parsing도 가진다.',
    source: 'drawSVG',
    origin: 'implementation',
    sectionId: 'value-grammar',
  },
]
