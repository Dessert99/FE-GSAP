/** P34 config object의 complete option 계약을 rendered defaults와 함께 제공한다. */
export const textPluginProperties = [
  {
    name: 'value',
    type: 'String',
    defaultValue: 'REQUIRED',
    acceptedValues: 'replacement text',
  },
  {
    name: 'delimiter',
    type: 'String',
    defaultValue: "''",
    acceptedValues: "'' characters or ' ' words",
  },
  {
    name: 'newClass',
    type: 'String',
    defaultValue: 'not specified',
    acceptedValues: 'span class for new text',
  },
  {
    name: 'oldClass',
    type: 'String',
    defaultValue: 'not specified',
    acceptedValues: 'span class for old text',
  },
  {
    name: 'padSpace',
    type: 'Boolean',
    defaultValue: 'official page에 명시 없음',
    acceptedValues: 'true uses trailing non-breaking space padding',
  },
  {
    name: 'preserveSpaces',
    type: 'Boolean',
    defaultValue: 'not specified',
    acceptedValues: 'true maintains extra HTML spaces',
  },
  {
    name: 'rtl',
    type: 'Boolean',
    defaultValue: 'not specified',
    acceptedValues: 'true introduces text right to left',
  },
  {
    name: 'speed',
    type: 'Number',
    defaultValue: 'not specified',
    acceptedValues: '0.05 / speed * text_changes duration formula',
  },
  {
    name: 'type',
    type: 'String',
    defaultValue: 'not specified',
    acceptedValues: "'diff' skips identical positions",
  },
] as const
