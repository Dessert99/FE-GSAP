/** P25의 six Observer creation/registry canonical과 source identity를 고정한다. */
export const observerCreateMeta = {
  title: '여러 입력을 하나의 Observer로 만들고 찾으려면?',
  category: 'GSAP · UI · Observer',
  summary:
    'Observer는 wheel·touch·pointer·scroll 입력을 하나의 configuration과 callback instance로 모으고 id registry에서 찾습니다.',
  sourcePath: 'src/content/gsap/ui/observer-create/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Observer', href: 'https://gsap.com/docs/v3/Plugins/Observer/' },
    {
      label: 'Observer.create()',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/static.create()/',
    },
    {
      label: 'Observer.getAll()',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/static.getAll()/',
    },
    {
      label: 'Observer.getById()',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/static.getById()/',
    },
    {
      label: 'Observer.target',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/target/',
    },
    {
      label: 'Observer.vars',
      href: 'https://gsap.com/docs/v3/Plugins/Observer/vars/',
    },
  ],
} as const

/** six owned canonical을 configuration, registry, instance inspection에 배치한다. */
export const observerCreateSections = [
  {
    id: 'observer-config',
    number: '01',
    title: '입력과 callback을 one vars object로 고정합니다',
    sourceItems: 1,
  },
  {
    id: 'observer-lab',
    number: '02',
    title: 'create와 registry를 실제로 읽습니다',
    sourceItems: 3,
  },
  {
    id: 'observer-instance',
    number: '03',
    title: 'target과 original vars를 검사합니다',
    sourceItems: 2,
  },
] as const
