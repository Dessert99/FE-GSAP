/** P23 MotionPath coordinate utility의 page identity를 고정한다. */
export const motionPathCoordinatesMeta = {
  title: '중첩 transform 사이에서 point를 어느 좌표로 읽을까요?',
  category: 'GSAP · SVG · MotionPathPlugin',
  sourcePath: 'src/content/gsap/svg/motion-path-coordinates/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'convertCoordinates()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates()/',
    },
    {
      label: 'getAlignMatrix()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getAlignMatrix()/',
    },
    {
      label: 'getGlobalMatrix()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getGlobalMatrix()/',
    },
    {
      label: 'getRelativePosition()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getRelativePosition()/',
    },
  ],
} as const
