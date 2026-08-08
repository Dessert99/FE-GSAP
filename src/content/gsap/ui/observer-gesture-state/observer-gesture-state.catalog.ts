/** P27이 소유한 Observer state canonical 두 개를 고정한다. */
export const observerGestureStateItems = [
  {
    id: 'OGS-121',
    item: 'isDragging becomes true after press exceeds dragMinimum until release',
  },
  {
    id: 'OGS-123',
    item: 'isPressed is true from pointer/touch press until release',
  },
] as const
