/** React GSAP pattern 학습 페이지의 경로와 공식 자료 링크를 정의한다. */
export const reactGsapPatternsMeta = {
  title: 'React component마다 animation resource를 어떻게 나눌까요?',
  category: 'GSAP · React · Patterns',
  summary:
    'component 내부 scope와 contextSafe late event로 React render와 GSAP 명령형 작업의 경계를 정합니다.',
  reviewedAt: '2026-08-13',
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
