/** lifecycle lab가 표시할 공식 state와 method contract를 제공한다. */
export const splitTextLifecycleProperties = [
  {
    name: 'isSplit',
    type: 'Boolean (official / installed d.ts)',
    defaultValue: 'split 전 false',
    acceptedValues: 'true면 split output arrays가 채워짐',
  },
  {
    name: 'split(vars)',
    type: 'SplitText (installed d.ts)',
    defaultValue: '공식 page: vars default null',
    acceptedValues: 'type, charsClass, wordsClass, linesClass, position',
  },
  {
    name: 'revert()',
    type: 'SplitText (installed source) / return omitted in official page',
    defaultValue: '없음',
    acceptedValues: '원래 innerHTML 복원 후 autoSplit 정리',
  },
  {
    name: 'kill()',
    type: 'void (installed d.ts) / return omitted in official page',
    defaultValue: '없음',
    acceptedValues: 'resize·font autoSplit만 중지',
  },
]
