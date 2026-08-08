/** P25가 소유한 Observer creation/registry canonical을 추적한다. */
export const observerCreateCatalog = [
  {
    id: 'OBSCREATE-01',
    officialItem:
      'Observer unifies wheel, touch, pointer, scroll input; type is comma-delimited, default wheel,touch,pointer, and tolerance/debounce/preventDefault/lockAxis configure processing.',
    sectionId: 'observer-config',
  },
  {
    id: 'OBSCREATE-02',
    officialItem:
      'Observer.create(vars) creates and returns an Observer instance according to vars.',
    sectionId: 'observer-lab',
  },
  {
    id: 'OBSCREATE-03',
    officialItem:
      'Observer.getAll() returns all created observers that have not been killed.',
    sectionId: 'observer-lab',
  },
  {
    id: 'OBSCREATE-04',
    officialItem:
      'Observer.getById(id) returns the Observer with matching configured id, or undefined when none exists.',
    sectionId: 'observer-lab',
  },
  {
    id: 'OBSCREATE-05',
    officialItem: 'observer.target is the target Element.',
    sectionId: 'observer-instance',
  },
  {
    id: 'OBSCREATE-06',
    officialItem:
      'observer.vars is the configuration object originally passed to Observer.create().',
    sectionId: 'observer-instance',
  },
] as const
