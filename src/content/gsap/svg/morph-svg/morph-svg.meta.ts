/** MorphSVG 공식 identity와 정확한 네 source item 수를 고정한다. */
export const morphSvgMeta = {
  title: '두 SVG path를 자연스럽게 이어 바꾸려면?',
  category: 'GSAP · SVG · MorphSVGPlugin',
  summary:
    'MorphSVGPlugin은 path d 데이터를 보간하고, point mapping·winding·config가 어색한 중간 모양을 줄이게 합니다.',
  sourcePath: 'src/content/gsap/svg/morph-svg/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'MorphSVGPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/',
    },
    {
      label: 'defaultRender',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.defaultRender/',
    },
    {
      label: 'defaultType',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.defaultType/',
    },
    {
      label: 'defaultUpdateTarget',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.defaultUpdateTarget/',
    },
  ],
} as const
