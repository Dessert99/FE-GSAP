/** P08에서 실제로 읽거나 호출하는 collision·momentum surface를 표로 정리한다. */
export const draggableCollisionMomentumProperties = [
  {
    name: 'Draggable.hitTest()',
    type: '(testObject, threshold?) → Boolean',
    defaultValue: 'threshold 0',
    acceptedValues: 'element·event·selector·rectangle; Number pixel | String percentage',
    use: 'puck과 drop zone overlap을 읽는다.',
  },
  {
    name: 'isThrowing',
    type: 'Boolean',
    defaultValue: '공식 페이지에 별도 기본값 없음',
    acceptedValues: 'inertia tween이 target을 animate하는 동안 true',
    use: 'release 뒤 throw state snapshot을 읽는다.',
  },
  {
    name: 'tween',
    type: 'read-only Tween',
    defaultValue: 'inertia true release에서 생성',
    acceptedValues: 'duration()·pause()·resume()·timeScale()',
    use: '새 release tween의 존재와 duration을 읽는다.',
  },
]
