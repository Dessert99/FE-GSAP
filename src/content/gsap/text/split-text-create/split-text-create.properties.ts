/** SplitText create-time vars와 instance array의 값을 표로 제공한다. */
export const splitTextCreateProperties = [
  {
    name: 'SplitText.create(target, vars)',
    type: 'Element | String | Array, Object',
    defaultValue: '—',
    acceptedValues: 'standalone SplitText instance 반환',
  },
  {
    name: 'type',
    type: 'String',
    defaultValue: 'chars,words,lines',
    acceptedValues: 'comma-delimited chars, words, lines; 필요한 type만 선택',
  },
  {
    name: 'mask',
    type: 'lines | words | chars',
    defaultValue: 'undefined',
    acceptedValues: '하나의 type만 mask wrapper와 masks array로 만듦',
  },
  {
    name: 'aria',
    type: 'auto | hidden | none',
    defaultValue: 'auto',
    acceptedValues: 'parent label과 generated child aria-hidden 전략',
  },
  {
    name: 'autoSplit',
    type: 'Boolean',
    defaultValue: 'false',
    acceptedValues: 'fonts 완료 또는 lines+width 변화 때 revert/re-split',
  },
  {
    name: 'chars / words / lines / masks',
    type: 'Element[]',
    defaultValue: '[] before split',
    acceptedValues: 'instance가 생성한 wrapper element arrays',
  },
]
