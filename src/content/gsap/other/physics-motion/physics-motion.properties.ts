/** 두 physics plugin의 input unit과 boundary를 표로 제공한다. */
export const physicsMotionProperties = [
  {
    name: 'physics2D.velocity / angle',
    type: 'Number / Number',
    defaultValue: '0 / 0',
    acceptedValues:
      'pixels per time unit / degrees; angle은 velocity가 있을 때만 방향을 정함',
  },
  {
    name: 'physics2D.gravity / acceleration / accelerationAngle',
    type: 'Number / Number / Number',
    defaultValue: 'null / null / null',
    acceptedValues:
      'pixels per second / pixels per second / degrees; gravity는 90° convenience이며 acceleration과 함께 쓰지 않음',
  },
  {
    name: 'physics2D.friction / xProp / yProp',
    type: 'Number / String / String',
    defaultValue: '0 / x / y',
    acceptedValues:
      '0–1 / x 대신 left 같은 property / y 대신 top 같은 property',
  },
  {
    name: 'physicsProps[property]',
    type: '{ velocity?, acceleration?, friction? }',
    defaultValue: 'velocity: 0, acceleration: 0, friction: 0',
    acceptedValues:
      'any numeric target property; units are that property’s unit per second',
  },
  {
    name: 'ease',
    type: 'Tween ease',
    defaultValue: 'GSAP default',
    acceptedValues:
      'physics2D/physicsProps property motion ignores the tween ease',
  },
]
