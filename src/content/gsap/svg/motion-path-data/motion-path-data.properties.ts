/** P22 pipeline이 표시하는 six utility input/output 및 option 경계를 표로 제공한다. */
export const motionPathDataProperties = [
  {
    name: 'pointsToSegment(points, curviness)',
    type: 'Array → Array',
    defaultValue: 'curviness 1 (official)',
    acceptedValues: 'alternating x/y points; 0 hard corners, higher is curvier',
  },
  {
    name: 'arrayToRawPath(values, vars)',
    type: 'Array → RawPath Array',
    defaultValue: 'curviness 1 (official)',
    acceptedValues: 'thru/cubic, relative, x, y, curviness',
  },
  {
    name: 'convertToPath(shape, swap)',
    type: 'String | Element → SVGPathElement[]',
    defaultValue: 'swap true (official)',
    acceptedValues: 'circle, rect, ellipse, line and supported SVG shapes',
  },
  {
    name: 'getRawPath(value)',
    type: 'String | Element → RawPath',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'selector, SVG path element, raw d string',
  },
  {
    name: 'rawPathToString(rawPath)',
    type: 'RawPath → String',
    defaultValue: '없음',
    acceptedValues: 'cubic numeric segment arrays',
  },
  {
    name: 'stringToRawPath(data)',
    type: 'String → RawPath',
    defaultValue: '없음',
    acceptedValues: 'SVG d path data',
  },
]
