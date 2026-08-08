/** P17 query matrix가 표시하는 read API의 공식 return과 installed boundary다. */
export const velocityTrackerReadProperties = [
  {
    name: 'tracker.get(property)',
    type: 'Number',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'tracked property의 current velocity',
  },
  {
    name: 'VelocityTracker.getVelocity(target, property)',
    type: 'Number (installed type)',
    defaultValue: '공식 P17 canonical 아님',
    acceptedValues: 'tracked target/property convenience read',
  },
  {
    name: 'VelocityTracker.getByTarget(target)',
    type: 'VelocityTracker | null (official)',
    defaultValue: '없으면 null (official)',
    acceptedValues: 'associated target lookup',
  },
  {
    name: 'VelocityTracker.isTracking(target, property)',
    type: 'Boolean (installed type)',
    defaultValue: '공식 property argument 명시 없음',
    acceptedValues: 'selected target/property membership',
  },
  {
    name: 'tracker.isTracking(property)',
    type: 'Boolean (installed source)',
    defaultValue: '공식 method name isTrackingProp',
    acceptedValues: 'selected property membership',
  },
  {
    name: 'tracker.target',
    type: 'Object',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'associated original target identity',
  },
]
