/** P31 config object의 nine option 계약을 official defaults와 함께 보존한다. */
export const scrambleTextProperties = [
  {
    name: 'text',
    type: 'String',
    defaultValue: 'original when omitted or {original}',
    acceptedValues: 'replacement text',
  },
  {
    name: 'chars',
    type: 'String',
    defaultValue: 'upperCase',
    acceptedValues: 'upperCase, lowerCase, upperAndLowerCase, custom string',
  },
  {
    name: 'speed',
    type: 'Number',
    defaultValue: '1',
    acceptedValues: 'random-character refresh frequency',
  },
  {
    name: 'delimiter',
    type: 'String',
    defaultValue: "''",
    acceptedValues: "'' for characters, ' ' for word units",
  },
  {
    name: 'tweenLength',
    type: 'Boolean',
    defaultValue: 'true',
    acceptedValues: 'false jumps differing replacement length',
  },
  {
    name: 'newClass',
    type: 'String',
    defaultValue: 'null',
    acceptedValues: 'class applied with a span to new text',
  },
  {
    name: 'oldClass',
    type: 'String',
    defaultValue: 'null',
    acceptedValues: 'class applied with a span to original text',
  },
  {
    name: 'revealDelay',
    type: 'Number',
    defaultValue: '0',
    acceptedValues: 'tween seconds before reveal begins',
  },
  {
    name: 'rightToLeft',
    type: 'Boolean',
    defaultValue: 'false',
    acceptedValues: 'true reveals from right to left',
  },
] as const
