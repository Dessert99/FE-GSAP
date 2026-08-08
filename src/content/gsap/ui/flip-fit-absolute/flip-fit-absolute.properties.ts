/** lab이 실제 호출하는 Flip fit/absolute surface를 작은 표로 고정한다. */
export const flipFitAbsoluteProperties = [
  {
    name: 'Flip.fit()',
    type: 'target, destination | FlipState, vars',
    returnValue: 'vars | Tween | null',
    use: 'calculate/apply/animate mode를 고른다.',
  },
  {
    name: 'getVars',
    type: 'Boolean',
    returnValue: 'fitting vars object',
    use: 'mutate 없이 필요한 fit values를 읽는다.',
  },
  {
    name: 'scale',
    type: 'Boolean',
    returnValue: 'scaleX/scaleY',
    use: 'width/height 대신 transform scale을 쓴다.',
  },
  {
    name: 'Flip.makeAbsolute()',
    type: 'targets | FlipState',
    returnValue: 'Element[]',
    use: '현재 화면 위치를 보존하며 flow에서 뺀다.',
  },
] as const
