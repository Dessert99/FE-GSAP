/** P22가 소유한 six MotionPath utility canonical을 item-level로 추적한다. */
export const motionPathDataCatalog = [
  {
    id: 'MPDATA-01',
    officialItem:
      'pointsToSegment(points, curviness)는 alternating x/y points를 cubic segment Array로 만들며 curviness 0은 hard corner, 1은 default, 2는 더 curvy하다.',
    sectionId: 'input-shapes',
  },
  {
    id: 'MPDATA-02',
    officialItem:
      'arrayToRawPath(values, vars)는 curve RawPath Array를 return하며 vars는 curviness, relative, type, x, y를 받을 수 있고 cubic type은 anchor/control-point order로 해석한다.',
    sectionId: 'input-shapes',
  },
  {
    id: 'MPDATA-03',
    officialItem:
      'convertToPath(shape, swap)은 SVG shape selector 또는 element를 path Array로 바꾸며 swap default는 DOM replacement이고 false는 replacement를 막는다.',
    sectionId: 'svg-boundary',
  },
  {
    id: 'MPDATA-04',
    officialItem:
      'getRawPath(value)는 selector, path element 또는 raw SVG path data에서 contiguous segment RawPath Array를 읽는다.',
    sectionId: 'raw-pipeline',
  },
  {
    id: 'MPDATA-05',
    officialItem:
      'rawPathToString(rawPath)는 alternating x/y cubic RawPath segment arrays를 SVG d string으로 바꾸며 stringToRawPath와 대응한다.',
    sectionId: 'raw-pipeline',
  },
  {
    id: 'MPDATA-06',
    officialItem:
      'stringToRawPath(data)는 SVG d string을 RawPath로 바꾸고 어떤 original command도 resulting RawPath에서는 cubic bezier가 된다.',
    sectionId: 'raw-pipeline',
  },
] as const
