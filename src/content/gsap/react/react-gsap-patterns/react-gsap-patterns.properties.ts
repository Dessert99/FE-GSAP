/** P35 examples가 실제로 쓰는 resource-boundary 값을 표로 제공한다. */
export const reactGsapPatternsProperties = [
  {
    name: 'scope',
    type: 'React Ref',
    defaultValue: '—',
    acceptedValues:
      'component가 소유한 DOM subtree로 selector와 Context cleanup을 한정',
  },
  {
    name: 'contextSafe(handler)',
    type: 'Function → Function',
    defaultValue: '—',
    acceptedValues: 'late event 안에서 만든 GSAP object를 hook Context에 기록',
  },
  {
    name: 'dependencies / revertOnUpdate',
    type: 'unknown[] / Boolean',
    defaultValue: '[] / false',
    acceptedValues:
      'stable input만 dependencies에 두고 update cleanup 필요 때 true',
  },
]
