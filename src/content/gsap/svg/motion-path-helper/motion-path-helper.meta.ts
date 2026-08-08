/** P20의 three canonical과 MotionPathHelper 학습 분모를 고정한다. */
export const motionPathHelperMeta = {
  title: '브라우저에서 motion path를 직접 고치려면?',
  category: 'GSAP · SVG · MotionPathHelper',
  summary:
    'MotionPathHelper는 path anchor와 handle을 browser에서 편집하고, 수정된 path data를 복사할 수 있게 하는 development editor입니다.',
  sourcePath: 'src/content/gsap/svg/motion-path-helper/',
  reviewedAt: '2026-08-08',
  officialSources: [
    {
      label: 'MotionPathHelper',
      href: 'https://gsap.com/docs/v3/Plugins/MotionPathHelper/',
    },
    {
      label: 'MotionPathHelper.kill()',
      href: 'https://gsap.com/docs/v3/MotionPathHelper/kill()/',
    },
    {
      label: 'MotionPathHelper.editPath()',
      href: 'https://gsap.com/docs/v3/MotionPathHelper/static.editPath()/',
    },
  ],
} as const

/** three owned canonical을 create/edit, output, lifecycle 질문에 배치한다. */
export const motionPathHelperSections = [
  {
    id: 'path-data',
    number: '01',
    title: 'path data를 editor 입력으로 둡니다',
    sourceItems: 1,
  },
  {
    id: 'editor-lifecycle',
    number: '02',
    title: 'create와 kill로 임시 editor DOM을 관리합니다',
    sourceItems: 1,
  },
  {
    id: 'editing-boundary',
    number: '03',
    title: 'keyboard editing과 dependency 경계를 확인합니다',
    sourceItems: 1,
  },
] as const
