/** P37 canonical의 parameter·state·cleanup 값을 정적 reference로 제공한다. */
export const scrollSmootherEffectsProperties = [
  {
    name: 'smooth(duration?)',
    type: 'Number getter / setter',
    defaultValue: 'not stated on canonical',
    acceptedValues: 'seconds to catch up to native scroll position',
  },
  {
    name: 'progress',
    type: 'Number readonly',
    defaultValue: '0 at top',
    acceptedValues: '0 top · 0.5 halfway · 1 bottom',
  },
  {
    name: 'effects(targets, config?)',
    type: 'String | Element | Array, Object | null',
    defaultValue: 'config omitted: data-speed/data-lag',
    acceptedValues: 'speed and/or lag; function values accepted',
  },
  {
    name: 'speed',
    type: 'Number | "auto" | function',
    defaultValue: '1 when no data/config value is found',
    acceptedValues: 'parallax ratio; auto calculates within parent',
  },
  {
    name: 'lag',
    type: 'Number | function',
    defaultValue: '0 when no data/config value is found',
    acceptedValues: 'seconds for visual catch-up',
  },
  {
    name: 'cleanup',
    type: 'effect trigger Array',
    defaultValue: 'none',
    acceptedValues: 'speed: 1 + lag: 0 removal, or getter Array trigger.kill()',
  },
] as const
