/** P35의 React resource identity와 source link를 표시한다. */
export const reactGsapPatternsMeta = {
  title: 'React component마다 animation resource를 어떻게 나눌까요?',
  category: 'GSAP · React · Patterns',
  summary:
    'component-owned scope와 contextSafe late event로 React render와 GSAP imperative work의 경계를 정합니다.',
  reviewedAt: '2026-08-09',
  sourcePath: 'src/content/gsap/react/react-gsap-patterns/',
  officialSources: [
    {
      label: 'React advanced techniques',
      href: 'https://gsap.com/resources/react-advanced/',
    },
    {
      label: 'React useful patterns',
      href: 'https://gsap.com/resources/react-basics/',
    },
  ],
} as const
