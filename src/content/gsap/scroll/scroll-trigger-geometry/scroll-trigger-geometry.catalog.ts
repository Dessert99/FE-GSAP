/** P41의 fourteen owned canonical identity를 exact audit 순서로 제공한다. */
export const scrollTriggerGeometryCatalog = [
  ['STG-161', 'animation: associated Tween, Timeline, or undefined'],
  ['STG-162', 'direction: moment-by-moment 1 forward or -1 backward'],
  ['STG-165', 'end: refreshed numeric ending scroll position in pixels'],
  ['STG-168', 'isActive: true only between start and end'],
  ['STG-170', 'labelToScroll(label): timeline label scroll position'],
  ['STG-172', 'pin: pinned element or undefined'],
  ['STG-174', 'progress: 0 to 1 distance between start and end'],
  ['STG-176', 'scroll(value?): getter/setter for associated scroller position'],
  ['STG-177', 'scroller: Element or window that owns scrolling'],
  ['STG-178', 'start: refreshed numeric starting scroll position in pixels'],
  [
    'STG-188',
    'isInViewport(target, proportion?, horizontal?): viewport visibility boolean',
  ],
  ['STG-193', 'maxScroll(target, horizontal?): maximum scrollable distance'],
  [
    'STG-196',
    'positionInViewport(element, referencePoint?, horizontal?): normalized viewport position',
  ],
  ['STG-204', 'trigger: trigger element or undefined'],
] as const
