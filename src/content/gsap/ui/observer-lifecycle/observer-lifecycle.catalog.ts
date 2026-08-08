/** P28 lifecycle item을 exact canonical 단위로 추적한다. */
export const observerLifecycleCatalog = [
  {
    id: 'OBSLIFE-01',
    officialItem:
      'disable() removes required event listeners and fires onDisable when previously enabled.',
    sectionId: 'lifecycle-lab',
  },
  {
    id: 'OBSLIFE-02',
    officialItem: 'enable() adds listeners, fires onEnable, and returns self.',
    sectionId: 'lifecycle-lab',
  },
  {
    id: 'OBSLIFE-03',
    officialItem: 'isEnabled indicates whether Observer is enabled.',
    sectionId: 'lifecycle-lab',
  },
  {
    id: 'OBSLIFE-04',
    officialItem:
      'kill() disables and removes from internal registry permanently; use disable for later enable.',
    sectionId: 'lifecycle-lab',
  },
] as const
