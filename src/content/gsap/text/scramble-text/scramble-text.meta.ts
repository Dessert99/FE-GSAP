/** ScrambleText 학습 페이지의 경로와 공식 문서 링크를 정의한다. */
export const scrambleTextMeta = {
  title: '흩어진 글자 사이에서도 최종 문장을 분명하게 하려면?',
  category: 'GSAP · Text · ScrambleText',
  summary:
    'ScrambleText는 한 target의 text를 임시 문자로 바꾸며 새 문장을 점차 reveal하고, 접근 가능한 최종 문장은 별도로 보존합니다.',
  sourcePath: 'src/content/gsap/text/scramble-text/',
  reviewedAt: '2026-08-13',
  officialSources: [
    {
      label: 'ScrambleTextPlugin',
      href: 'https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/',
    },
  ],
} as const
