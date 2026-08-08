/** P25 lab descriptor와 official config/registry surface를 표로 제공한다. */
export const observerCreateProperties = [
  {
    name: 'type',
    type: 'String',
    defaultValue: 'wheel,touch,pointer (official)',
    acceptedValues: 'wheel, touch, scroll, pointer comma list',
  },
  {
    name: 'tolerance',
    type: 'Number',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'callback을 trigger할 minimum delta pixels',
  },
  {
    name: 'debounce',
    type: 'Boolean',
    defaultValue: 'true (official)',
    acceptedValues: 'false면 delta-related callback을 event마다 즉시 검사',
  },
  {
    name: 'preventDefault',
    type: 'Boolean',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'cancelable observed event default prevention',
  },
  {
    name: 'lockAxis',
    type: 'Boolean',
    defaultValue: 'false (official behavior)',
    acceptedValues: 'first touch/pointer drag direction until release',
  },
  {
    name: 'Observer.create(vars)',
    type: 'Observer (official)',
    defaultValue: '없음',
    acceptedValues: 'one configured observer instance',
  },
  {
    name: 'Observer.getAll()',
    type: 'Observer[] (official)',
    defaultValue: '없음',
    acceptedValues: 'not-killed registry instances',
  },
  {
    name: 'Observer.getById(id)',
    type: 'Observer | undefined (official)',
    defaultValue: '없으면 undefined',
    acceptedValues: 'configured id lookup',
  },
]
