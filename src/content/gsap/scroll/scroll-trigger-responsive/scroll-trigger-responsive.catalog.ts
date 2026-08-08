/** P45의 네 owned ScrollTrigger canonicals를 exact audit 순서로 고정한다. */
export const scrollTriggerResponsiveCatalog = [
  [
    'STR-181',
    'clearMatchMedia(query?): deprecated legacy breakpoints clear without killing associated triggers or animations',
  ],
  [
    'STR-182',
    'clearScrollMemory(scrollRestoration?): clears ScrollTrigger recorded positions and may set history restoration',
  ],
  [
    'STR-192',
    'matchMedia(vars): deprecated in favor of gsap.matchMedia(); matching-query triggers and animations revert and kill',
  ],
  [
    'STR-199',
    'saveStyles(targets): records inline style snapshot for internal revert after refresh or matchMedia changes',
  ],
] as const
