/** P32가 소유한 SplitText create-time canonical 7개를 고정한다. */
export const splitTextCreateItems = [
  {
    id: 'STC-206',
    item: 'SplitText constructor/create, type, classes, mask, aria and autoSplit configuration',
  },
  {
    id: 'STC-207',
    item: 'chars is the array of newly created character elements',
  },
  { id: 'STC-210', item: 'lines is the array of newly created line elements' },
  {
    id: 'STC-211',
    item: 'masks is the array of clipping mask wrapper elements',
  },
  {
    id: 'STC-214',
    item: 'SplitText.create(target, vars) creates and returns a standalone instance',
  },
  {
    id: 'STC-215',
    item: 'vars contains the configuration used by the instance',
  },
  { id: 'STC-216', item: 'words is the array of newly created word elements' },
] as const
