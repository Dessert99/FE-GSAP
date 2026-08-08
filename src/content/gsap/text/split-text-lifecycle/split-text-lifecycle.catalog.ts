/** P33의 four SplitText lifecycle canonicals를 exact item으로 추적한다. */
export const splitTextLifecycleCatalog = [
  {
    id: 'SPLITLIFE-01',
    officialItem:
      'isSplit is Boolean; true means a split occurred and output arrays are populated, while revert resets it to false.',
    sectionId: 'split-text-lifecycle-lab',
  },
  {
    id: 'SPLITLIFE-02',
    officialItem:
      'kill() stops autoSplit resize/font listeners but does not revert or restore original innerHTML; split() after kill re-enables autoSplit.',
    sectionId: 'resize-font-boundary',
  },
  {
    id: 'SPLITLIFE-03',
    officialItem:
      'revert() restores original pre-split innerHTML and calls kill() internally.',
    sectionId: 'split-text-lifecycle-lab',
  },
  {
    id: 'SPLITLIFE-04',
    officialItem:
      'split(vars) re-splits targets with type/classes/position config and automatically reverts first when necessary.',
    sectionId: 'split-text-lifecycle-lab',
  },
] as const
