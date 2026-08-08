/** P17이 소유한 다섯 VelocityTracker read item을 section에 고정한다. */
export const velocityTrackerReadCatalog = [
  {
    id: 'VTREAD-01',
    officialItem: 'tracker.get(property)는 지정 property의 current velocity를 Number로 return한다.',
    sectionId: 'read-snapshot',
  },
  {
    id: 'VTREAD-02',
    officialItem:
      'VelocityTracker.getByTarget(target)은 object associated tracker를 return하고 없으면 null이라고 공식 문서가 설명한다.',
    sectionId: 'lookup-membership',
  },
  {
    id: 'VTREAD-03',
    officialItem:
      'VelocityTracker.isTracking(target)은 target velocity tracking 여부를 Boolean으로 return한다.',
    sectionId: 'lookup-membership',
  },
  {
    id: 'VTREAD-04',
    officialItem:
      'VelocityTracker.isTrackingProp(property)은 selected property velocity tracking 여부를 Boolean으로 return한다.',
    sectionId: 'lookup-membership',
  },
  {
    id: 'VTREAD-05',
    officialItem: 'tracker.target은 associated target object를 return한다.',
    sectionId: 'established-tracker',
  },
] as const
