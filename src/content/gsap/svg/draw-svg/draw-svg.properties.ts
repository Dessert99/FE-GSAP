/** DrawSVG lab이 실제로 쓰는 range grammar와 measurement surface를 작은 표로 고정한다. */
export const drawSvgProperties = [
  {
    name: 'drawSVG',
    type: 'String | Number | Boolean',
    values: '0, true, "100%", "20% 80%", "20 50", "20% 70% live"',
    use: 'stroke의 visible start/end 구간을 정한다.',
  },
  {
    name: 'DrawSVGPlugin.getLength()',
    type: '(Element | selector) → Number',
    values: 'stroke length',
    use: 'range를 실제 length unit으로 환산한다.',
  },
  {
    name: 'DrawSVGPlugin.getPosition()',
    type: '(Element | selector) → number[]',
    values: '[start, end]',
    use: '현재 visible interval을 읽는다.',
  },
] as const
