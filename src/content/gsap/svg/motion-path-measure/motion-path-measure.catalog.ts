/** P24가 소유한 세 MotionPath measurement canonical을 고정한다. */
export const motionPathMeasureItems = [
  {
    id: 'MPM-108',
    item: 'getLength accepts Element/String/RawPath and returns path length',
  },
  {
    id: 'MPM-109',
    item: 'getPositionOnPath samples cached RawPath at progress and optional degree angle',
  },
  {
    id: 'MPM-113',
    item: 'sliceRawPath returns a sliced RawPath for start/end including wrap boundary',
  },
] as const
