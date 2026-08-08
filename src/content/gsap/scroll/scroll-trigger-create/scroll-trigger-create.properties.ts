/** local descriptor가 보여 줄 생성 property의 source-backed 경계를 표로 제공한다. */
export const scrollTriggerCreateProperties = [
  [
    'trigger / scroller',
    'Element',
    'viewport scroller',
    '측정할 element와 scroll owner',
  ],
  [
    'start / end',
    'String | Number | Function',
    'top bottom / bottom top',
    'refresh에서 numeric scroll position으로 계산',
  ],
  [
    'toggleActions',
    'String',
    'play',
    'enter·leave·enterBack·leaveBack action 순서',
  ],
  [
    'scrub / pin / snap',
    'Boolean | Number / Boolean | Element / config',
    'false / false / undefined',
    '이 example은 snap false, reduced motion은 scrub·pin false',
  ],
  [
    'markers',
    'Boolean | Object',
    'false',
    '개발 중 start/end/trigger marker를 표시',
  ],
] as const
