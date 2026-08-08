/** P11 lab이 실제로 쓰는 Flip API와 vars의 local reference다. */
export const flipFirstLastProperties = [
  {
    name: 'Flip.getState()',
    type: '(targets, vars?) → FlipState',
    defaultValue: 'position/size/rotation/skew/opacity',
    acceptedValues: 'DOM target + props string',
    use: 'DOM mutation 전에 First를 capture한다.',
  },
  {
    name: 'Flip.from()',
    type: '(state, vars?) → Timeline',
    defaultValue: '공식 페이지에 별도 default 없음',
    acceptedValues: 'duration, ease, callbacks, absolute, nested, simple',
    use: 'First처럼 보이게 invert한 뒤 Last로 play한다.',
  },
  {
    name: 'Flip.to()',
    type: '(state, vars?) → Timeline',
    defaultValue: '공식 페이지에 별도 default 없음',
    acceptedValues: 'Flip.from()의 inverse',
    use: '현재에서 captured state로 향하는 비교 mode다.',
  },
]
