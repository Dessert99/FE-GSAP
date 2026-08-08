/** P20이 소유한 three MotionPathHelper canonical을 추적한다. */
export const motionPathHelperCatalog = [
  {
    id: 'MPH-01',
    officialItem:
      'MotionPathHelper는 anchor/control point/path drag와 path data copy를 제공하며 Tween 또는 element로 create할 수 있다.',
    sectionId: 'path-data',
  },
  {
    id: 'MPH-02',
    officialItem:
      'kill()은 path editing elements와 Copy button을 DOM에서 제거한다.',
    sectionId: 'editor-lifecycle',
  },
  {
    id: 'MPH-03',
    officialItem:
      'editPath(path, config)는 SVG path를 browser에서 editable하게 만들고 PathEditor를 return한다.',
    sectionId: 'editing-boundary',
  },
] as const
