/** 설치 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const installationMeta = {
  title: 'GSAP 가져오기와 등록하기',
  category: 'GSAP · Quick Start',
  summary:
    'GSAP은 framework를 가리지 않는 JavaScript 파일입니다. 파일을 가져오는 방법을 먼저 고르고, 그다음 필요한 plugin(core에 특수 기능을 더하는 별도 파일)을 core에 등록합니다.',
  sourcePath: 'src/content/gsap/fundamentals/installation/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'Installation', href: 'https://gsap.com/docs/v3/Installation' },
    { label: 'gsap.registerPlugin()', href: 'https://gsap.com/docs/v3/GSAP/gsap.registerPlugin()' },
  ],
} as const

/** 공식 source item 34개를 설치 순서대로 이어지는 여섯 질문에 대응시킨다. */
export const installationSections = [
  { number: '01', id: 'entry-choice', title: '가져오는 방법 고르기', sourceItems: 6 },
  { number: '02', id: 'file-formats', title: '받은 파일의 형식 구분하기', sourceItems: 7 },
  { number: '03', id: 'import-forms', title: '코드에서 실제로 불러오기', sourceItems: 5 },
  { number: '04', id: 'register-plugin', title: 'plugin을 core에 등록하기', sourceItems: 6 },
  { number: '05', id: 'tree-shaking', title: '등록이 필요한 이유 이해하기', sourceItems: 6 },
  { number: '06', id: 'troubleshooting', title: '설치가 안 될 때 확인하기', sourceItems: 4 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const installationCoverage = {
  officialSources: 2,
  sourceItems: 34,
  localSections: 6,
} as const
