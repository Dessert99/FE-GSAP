import type { OfficialReference } from '../../components/demo/OfficialDocsLink/OfficialDocsLink'

export const gsapToReferences = {
  method: {
    label: 'gsap.to()',
    href: 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/',
  },
  basicMovement: [
    {
      label: 'x · CSS',
      href: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/',
    },
  ],
  multipleProperties: [
    {
      label: 'CSS 속성',
      href: 'https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/',
    },
  ],
  relativeValue: [
    {
      label: '상대값',
      href: 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values',
    },
  ],
  functionValue: [
    {
      label: '함수 기반 값',
      href: 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#function-based-values',
    },
  ],
  multipleTargets: [
    {
      label: 'stagger',
      href: 'https://gsap.com/resources/getting-started/Staggers/',
    },
  ],
  cardFeedback: [
    {
      label: 'React · useGSAP()',
      href: 'https://gsap.com/resources/React/',
    },
  ],
} satisfies Record<string, OfficialReference | OfficialReference[]>
