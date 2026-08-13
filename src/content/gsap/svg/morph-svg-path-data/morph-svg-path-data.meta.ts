/** P19의 canonical identity와 static geometry utility 경계를 고정한다. */
export const morphSvgPathDataMeta = {
  title: 'SVG shape를 path data와 RawPath로 어떻게 왕복할까요?',
  category: 'GSAP · SVG · MorphSVGPlugin',
  sourcePath: 'src/content/gsap/svg/morph-svg-path-data/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'convertToPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.convertToPath/',
    },
    {
      label: 'rawPathToString()',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.rawPathToString/',
    },
    {
      label: 'stringToRawPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.stringToRawPath/',
    },
  ],
} as const
