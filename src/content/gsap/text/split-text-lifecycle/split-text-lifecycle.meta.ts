/** SplitText lifecycle 학습 페이지의 경로와 공식 문서 링크를 정의한다. */
export const splitTextLifecycleMeta = {
  title: 'SplitText를 다시 나누고 원래 DOM으로 되돌리려면?',
  category: 'GSAP · Text · SplitText',
  summary:
    'font와 너비가 바뀔 때 split state를 다시 만들고, revert와 kill의 다른 정리 범위를 구분합니다.',
  sourcePath: 'src/content/gsap/text/split-text-lifecycle/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'SplitText.isSplit',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/isSplit/',
    },
    {
      label: 'SplitText.kill()',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/kill()/',
    },
    {
      label: 'SplitText.revert()',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/revert()/',
    },
    {
      label: 'SplitText.split()',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/split()/',
    },
  ],
} as const

/** lifecycle 학습 section과 source item 수를 제공한다. */
export const splitTextLifecycleSections = [
  {
    id: 'split-text-lifecycle-lab',
    number: '01',
    title: 'split state와 원본 DOM',
    sourceItems: 4,
  },
  {
    id: 'resize-font-boundary',
    number: '02',
    title: 'resize·font autoSplit 정리',
    sourceItems: 2,
  },
] as const
