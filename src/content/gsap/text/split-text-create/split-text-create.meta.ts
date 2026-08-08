/** P32의 official identity와 7개 source link를 표시한다. */
export const splitTextCreateMeta = {
  title: '문장을 나누면 어떤 DOM과 배열이 생길까요?',
  category: 'GSAP · Text · SplitText',
  summary:
    '하나의 문장을 chars·words·lines·masks로 나누고, instance가 실제로 만든 wrapper를 검사합니다.',
  reviewedAt: '2026-08-08',
  sourcePath: 'src/content/gsap/text/split-text-create/',
  officialSources: [
    { label: 'SplitText', href: 'https://gsap.com/docs/v3/Plugins/SplitText/' },
    {
      label: 'SplitText.chars',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/chars/',
    },
    {
      label: 'SplitText.lines',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/lines/',
    },
    {
      label: 'SplitText.masks',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/masks/',
    },
    {
      label: 'SplitText.create()',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/static.create()/',
    },
    {
      label: 'SplitText.vars',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/vars/',
    },
    {
      label: 'SplitText.words',
      href: 'https://gsap.com/docs/v3/Plugins/SplitText/words/',
    },
  ],
} as const
