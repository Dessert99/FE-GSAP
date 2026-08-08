/** P44의 일곱 registry canonical을 item-level로 고정한다. */
export const scrollTriggerRegistryCatalog = [
  {
    id: 'STR-171',
    officialItem: 'next() returns the next trigger in refresh order',
    sectionId: 'registry-lab',
  },
  {
    id: 'STR-173',
    officialItem: 'previous() returns the previous trigger in refresh order',
    sectionId: 'registry-lab',
  },
  {
    id: 'STR-186',
    officialItem:
      'getAll() returns registered instances except the main ScrollSmoother trigger',
    sectionId: 'registry-lab',
  },
  {
    id: 'STR-187',
    officialItem: 'getById(id) returns the matching instance or undefined',
    sectionId: 'registry-lab',
  },
  {
    id: 'STR-189',
    officialItem:
      'isScrolling() reports whether any related scroller is scrolling',
    sectionId: 'registry-lab',
  },
  {
    id: 'STR-190',
    officialItem: 'isTouch is 0, 1, or 2 for the available touch input mode',
    sectionId: 'registry-lab',
  },
  {
    id: 'STR-191',
    officialItem:
      'killAll(allowListeners?) kills triggers except ScrollSmoother and true preserves global listeners',
    sectionId: 'registry-lab',
  },
]
