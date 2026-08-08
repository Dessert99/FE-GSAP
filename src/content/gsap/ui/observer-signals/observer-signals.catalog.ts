/** P26이 소유한 ten Observer signal canonical을 source 순서대로 고정한다. */
export const observerSignalsCatalog = [
  {
    id: 'OBSSIG-116',
    officialItem:
      'deltaX is horizontal pixel change since the most recent callback.',
    sectionId: 'signal-meaning',
  },
  {
    id: 'OBSSIG-117',
    officialItem:
      'deltaY is vertical pixel change since the most recent callback.',
    sectionId: 'signal-meaning',
  },
  {
    id: 'OBSSIG-120',
    officialItem: 'event is the most recent watched input event.',
    sectionId: 'event-source',
  },
  {
    id: 'OBSSIG-125',
    officialItem:
      'startX is the latest touch/pointer press clientX from the viewport left.',
    sectionId: 'coordinate-timing',
  },
  {
    id: 'OBSSIG-126',
    officialItem:
      'startY is the latest touch/pointer press clientY from the viewport top.',
    sectionId: 'coordinate-timing',
  },
  {
    id: 'OBSSIG-130',
    officialItem:
      'Observer.isTouch reports 0, 1, or 2 for device touch capability.',
    sectionId: 'event-source',
  },
  {
    id: 'OBSSIG-133',
    officialItem:
      'velocityX is horizontal velocity in pixels per second from watched types.',
    sectionId: 'signal-meaning',
  },
  {
    id: 'OBSSIG-134',
    officialItem:
      'velocityY is vertical velocity in pixels per second from watched types.',
    sectionId: 'signal-meaning',
  },
  {
    id: 'OBSSIG-135',
    officialItem:
      'x is the most recent touch/pointer clientX from the viewport left.',
    sectionId: 'coordinate-timing',
  },
  {
    id: 'OBSSIG-136',
    officialItem:
      'y is the most recent touch/pointer clientY from the viewport top.',
    sectionId: 'coordinate-timing',
  },
] as const
