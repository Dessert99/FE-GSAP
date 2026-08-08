/** P20 lab이 쓰는 helper config와 edit lifecycle surface를 표로 제공한다. */
export const motionPathHelperProperties = [
  {
    name: 'MotionPathHelper.create(target, vars)',
    type: 'MotionPathHelper (installed d.ts)',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'Tween 또는 element target',
  },
  {
    name: 'path',
    type: 'String | Element | Array',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'selector, SVG path, path data, point array',
  },
  {
    name: 'selected',
    type: 'Boolean',
    defaultValue: 'helper source: true when absent',
    acceptedValues: 'initial path selection',
  },
  {
    name: 'onUpdate',
    type: 'Function',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'path editing update callback',
  },
  {
    name: 'MotionPathHelper.editPath(path, config)',
    type: 'PathEditor (official)',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'SVG path element 또는 selector와 editor config',
  },
  {
    name: 'helper.kill()',
    type: 'void (installed d.ts)',
    defaultValue: '없음',
    acceptedValues: 'editor elements and Copy button disposal',
  },
]
