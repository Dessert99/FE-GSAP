/** P40의 다섯 ScrollTrigger canonical을 정확한 audit 순서로 고정한다. */
export const scrollTriggerCreateCatalog = [
  [
    'STC-160',
    'ScrollTrigger overview: trigger/scroller/start/end/toggleActions/scrub/pin/snap and refresh measurement',
  ],
  [
    'STC-183',
    'ScrollTrigger.config(vars): global behaviors such as limitCallbacks',
  ],
  [
    'STC-184',
    'ScrollTrigger.create(vars): creates and returns a standalone ScrollTrigger',
  ],
  [
    'STC-185',
    'ScrollTrigger.defaults(config): creation defaults apply only when vars omit the value',
  ],
  [
    'STC-205',
    'instance.vars: read-only configuration object used to create the instance',
  ],
] as const
