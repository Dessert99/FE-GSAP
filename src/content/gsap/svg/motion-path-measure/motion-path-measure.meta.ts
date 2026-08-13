/** P24 official identity와 descriptor source path를 표시한다. */
export const motionPathMeasureMeta = {
  title: '경로의 길이와 한 지점을 어떻게 재나요?',
  category: 'GSAP · SVG · MotionPathPlugin',
  reviewedAt: '2026-08-13',
  sourcePath: 'src/content/gsap/svg/motion-path-measure/',
  officialSources: [
    {
      label: 'getLength()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getLength()/',
    },
    {
      label: 'getPositionOnPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getPositionOnPath()/',
    },
    {
      label: 'sliceRawPath()',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.sliceRawPath()/',
    },
  ],
} as const
