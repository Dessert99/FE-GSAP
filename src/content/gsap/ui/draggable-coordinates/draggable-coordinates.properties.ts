/** CoordinateLab이 보여 주는 P04 read surface를 짧은 표로 제공한다. */

/** 공식 property와 method의 관찰 관점을 한 행으로 담는다. */
export type DraggableCoordinateProperty = {
  name: string
  type: string
  timing: string
  use: string
}

/** 좌표 surface는 setter가 아니라 instance에서 읽는 값임을 보인다. */
export const draggableCoordinateProperties: DraggableCoordinateProperty[] = [
  {
    name: 'startX / startY',
    type: 'Number',
    timing: 'press',
    use: 'target의 시작값',
  },
  { name: 'x / y', type: 'Number', timing: 'drag', use: 'target의 현재값' },
  {
    name: 'deltaX / deltaY',
    type: 'Number',
    timing: 'drag',
    use: '마지막 drag event 이후 변화',
  },
  {
    name: 'pointerX / pointerY',
    type: 'Number',
    timing: 'event',
    use: '마지막 pointer 위치',
  },
  {
    name: 'endX / endY / endRotation',
    type: 'Number',
    timing: 'release',
    use: '종료 예측값',
  },
  {
    name: 'getDirection()',
    type: 'String',
    timing: 'read',
    use: '기준별 방향',
  },
]
