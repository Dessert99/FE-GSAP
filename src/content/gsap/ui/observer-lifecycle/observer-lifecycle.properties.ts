/** P28 command descriptor가 표시할 lifecycle contract를 제공한다. */
export const observerLifecycleProperties = [
  {
    name: 'disable()',
    type: 'void (installed d.ts)',
    defaultValue: '없음',
    acceptedValues: 'remove listeners',
  },
  {
    name: 'enable()',
    type: 'Self (official) / this (installed d.ts)',
    defaultValue: '없음',
    acceptedValues:
      'optional Event for immediate onPress; re-enable and chaining',
  },
  {
    name: 'isEnabled',
    type: 'Boolean (official)',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'current listener-enabled state',
  },
  {
    name: 'kill()',
    type: 'void (installed d.ts)',
    defaultValue: '없음',
    acceptedValues: 'permanent registry removal; recreate instead of re-enable',
  },
]
