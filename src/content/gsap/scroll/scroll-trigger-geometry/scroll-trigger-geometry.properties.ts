/** P41 snapshot field의 units·owner·refresh boundary를 compact reference로 제공한다. */
export const scrollTriggerGeometryProperties = [
  ['start / end', 'Number px', 'refresh 때 계산되는 scroll position'],
  ['progress', 'Number 0–1', 'start와 end 사이의 normalized distance'],
  ['direction', '1 | -1', '마지막 scroll update 방향'],
  ['isActive', 'Boolean', 'start와 end 사이인지'],
  [
    'trigger / pin',
    'Element | undefined',
    'trigger source와 optional pin owner',
  ],
  [
    'scroller / scroll()',
    'Element | Window / Number',
    'scrolling owner와 current position',
  ],
  [
    'isInViewport / positionInViewport',
    'Boolean / Number',
    'browser viewport utility, local scroller geometry와 다름',
  ],
] as const
