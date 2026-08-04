/** React 안에서 GSAP을 만들고 정리하는 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const reactUseGsapMeta = {
  title: 'React 안에서 GSAP 만들고 정리하기',
  category: 'GSAP · React',
  summary:
    'React는 컴포넌트를 지웠다 다시 만듭니다. 그때 남은 애니메이션을 치우지 않으면 같은 대상에 두 개가 겹칩니다. useGSAP()은 그 정리를 대신해 주는 훅입니다.',
  sourcePath: 'src/content/gsap/fundamentals/react-use-gsap/',
  reviewedAt: '2026-08-04',
  officialSources: [{ label: 'GSAP & React', href: 'https://gsap.com/resources/React' }],
} as const

/** 공식 source item 19개를 "왜 필요한가 → 어떻게 쓰는가 → 무엇을 조심하는가"의 여섯 단계에 대응시킨다. */
export const reactUseGsapSections = [
  { number: '01', id: 'why-cleanup', title: 'React가 애니메이션에 만드는 문제', sourceItems: 3 },
  { number: '02', id: 'hook-basics', title: 'useGSAP()이 대신해 주는 것', sourceItems: 4 },
  { number: '03', id: 'config-object', title: '옵션 세 개가 정하는 것', sourceItems: 3 },
  { number: '04', id: 'context-safe', title: '훅 밖에서 만든 애니메이션', sourceItems: 6 },
  { number: '05', id: 'ssr', title: '서버에서 렌더링할 때', sourceItems: 3 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 것', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const reactUseGsapCoverage = {
  officialSources: 1,
  officialSourceItems: 19,
  localSections: 6,
} as const
