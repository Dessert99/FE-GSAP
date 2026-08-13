/** ScrollToPlugin의 두 공식 문서 항목을 coverage 기준으로 고정한다. */
export const scrollToCatalog = [
  {
    id: 'STO-158',
    officialItem:
      'ScrollToPlugin tweens window or an element with x/y number, element, string, max, offset and autoKill boundaries.',
    sectionId: 'local-scroll-lab',
  },
  {
    id: 'STO-159',
    officialItem:
      'ScrollToPlugin.config() sets global autoKill configuration; installed source also reads autoKillThreshold.',
    sectionId: 'config-restoration',
  },
] as const
