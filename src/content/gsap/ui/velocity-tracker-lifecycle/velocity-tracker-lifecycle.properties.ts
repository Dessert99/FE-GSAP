/** P16 lab의 comma-list와 type/unit을 같은 descriptor vocabulary로 설명한다. */
export const velocityTrackerLifecycleProperties = [
  {
    name: 'x',
    type: 'numeric property',
    trackerType: 'num',
    unit: 'px',
    use: '수평 위치 변화의 velocity를 추적한다.',
  },
  {
    name: 'rotation',
    type: 'numeric property',
    trackerType: 'deg',
    unit: 'deg',
    use: '회전 단위를 보존한 velocity tracking을 보여 준다.',
  },
] as const
