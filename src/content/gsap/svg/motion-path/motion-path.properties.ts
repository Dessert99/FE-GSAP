/** MotionPath config의 beginner-facing value contract를 한곳에 둔다. */
export const motionPathProperties = [
  {
    name: 'path',
    type: 'String | Element | Array',
    default: 'required',
    use: 'follower가 읽을 SVG path, data string, points다.',
  },
  {
    name: 'start / end',
    type: 'Number',
    default: '0 / 1',
    use: '0–1 progress와 wrap/backward interval을 고른다.',
  },
  {
    name: 'align',
    type: 'String | Element | self',
    default: 'none',
    use: '서로 다른 좌표 공간을 맞춘다.',
  },
  {
    name: 'alignOrigin',
    type: '[number, number]',
    default: 'target corner',
    use: 'path에 놓을 target 기준점을 고른다.',
  },
  {
    name: 'autoRotate',
    type: 'Boolean | Number',
    default: 'false',
    use: 'tangent 방향 또는 degree offset으로 회전한다.',
  },
  {
    name: 'curviness / type',
    type: 'Number / String',
    default: '1 / curve',
    use: 'point array의 curve 또는 cubic interpretation을 고른다.',
  },
] as const
