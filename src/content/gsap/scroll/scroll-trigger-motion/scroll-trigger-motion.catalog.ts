/** P42가 소유한 네 ScrollTrigger canonical을 item-level로 고정한다. */
export const scrollTriggerMotionCatalog = [
  {
    id: 'STM-166',
    officialItem:
      'getTween() returns scrub tween, and getTween(true) returns snap tween.',
    sectionId: 'motion-lab',
  },
  {
    id: 'STM-167',
    officialItem: 'getVelocity() returns scroll velocity with direction sign.',
    sectionId: 'motion-lab',
  },
  {
    id: 'STM-180',
    officialItem: 'batch() groups callbacks with interval and batchMax.',
    sectionId: 'motion-lab',
  },
  {
    id: 'STM-201',
    officialItem:
      'snapDirectional() returns a direction-aware snapping function.',
    sectionId: 'motion-lab',
  },
] as const
