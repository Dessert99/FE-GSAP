/** P43의 아홉 lifecycle canonical을 item-level로 고정한다. */
export const scrollTriggerLifecycleCatalog = [
  ['163', 'disable(revert?, allowAnimation?) preserves a reusable instance'],
  ['164', 'enable(reset?, refresh?) reactivates a disabled instance'],
  ['169', 'kill(revert?, allowAnimation?) permanently disposes an instance'],
  ['175', 'instance refresh() recalculates one trigger geometry'],
  [
    '179',
    'addEventListener(type, callback) subscribes global lifecycle events',
  ],
  ['197', 'static refresh(safe?) recalculates every registered trigger'],
  ['198', 'removeEventListener(type, callback) removes the same callback'],
  ['202', 'sort(compare?) reorders and returns registered triggers'],
  ['203', 'update() applies current scroll state without remeasurement'],
].map(([number, officialItem]) => ({
  id: `STL-${number}`,
  officialItem,
  sectionId: 'lifecycle-lab',
}))
