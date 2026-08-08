/** P16이 소유한 다섯 VelocityTracker lifecycle canonical을 고정한다. */
export const velocityTrackerLifecycleItems = [
  {
    id: 'VTL-79',
    officialItem:
      'VelocityTracker는 InertiaPlugin 안에서 numeric 또는 function property velocity를 추적하며 static track으로 target당 하나의 tracker를 시작한다.',
    sourceLocation: '#79 Description, tracked properties, warning',
    origin: 'official',
  },
  {
    id: 'VTL-80',
    officialItem:
      'addProp() 문서는 property를 tracking set에 추가한다고 설명한다.',
    sourceLocation: '#80 Description',
    origin: 'official',
  },
  {
    id: 'VTL-85',
    officialItem:
      'removeProp() 문서는 한 property tracking을 멈춘다고 설명한다.',
    sourceLocation: '#85 Details',
    origin: 'official',
  },
  {
    id: 'VTL-87',
    officialItem:
      'track()은 target/property set의 velocity tracking을 시작하고 VelocityTracker를 반환한다.',
    sourceLocation: '#87 Returns and Details',
    origin: 'official',
  },
  {
    id: 'VTL-88',
    officialItem:
      'untrack()은 property list 또는 property를 생략한 whole target의 velocity tracking을 멈춘다.',
    sourceLocation: '#88 Details and examples',
    origin: 'official',
  },
] as const
