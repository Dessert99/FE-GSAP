/** 설정 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const tweenConfigurationMeta = {
  title: '설정은 어디서 오나',
  category: 'GSAP · Fundamentals',
  summary:
    'GSAP의 설정은 엔진 자체를 바꾸는 곳과 Tween이 물려받을 값을 정하는 곳으로 나뉩니다. 어디에 적었느냐가 무엇을 이길지와 어디까지 영향을 줄지를 정합니다.',
  sourcePath: 'src/content/gsap/fundamentals/tween-configuration/',
  reviewedAt: '2026-08-13',
  officialSources: [
    { label: 'gsap.config()', href: 'https://gsap.com/docs/v3/GSAP/gsap.config()/' },
    { label: 'gsap.defaults()', href: 'https://gsap.com/docs/v3/GSAP/gsap.defaults()/' },
    { label: 'Tween.vars', href: 'https://gsap.com/docs/v3/GSAP/Tween/vars/' },
  ],
} as const

/** 공식 source item 28개를 설정의 출처와 적용 범위를 따라가는 여섯 질문에 대응시킨다. */
export const tweenConfigurationSections = [
  { number: '01', id: 'two-scopes', title: '설정이 사는 두 곳 구분하기', sourceItems: 5 },
  { number: '02', id: 'config-catalog', title: '엔진 설정 전체 보기', sourceItems: 11 },
  { number: '03', id: 'defaults-inheritance', title: '기본값이 Tween에 실리는 순간', sourceItems: 4 },
  { number: '04', id: 'precedence', title: '누가 이기고, 어디까지 미치나', sourceItems: 4 },
  { number: '05', id: 'vars-record', title: 'Tween에 남는 설정 기록', sourceItems: 4 },
  { number: '06', id: 'boundaries', title: '여기서 다루지 않는 설정', sourceItems: 0 },
] as const

/** source 대조와 local mapping의 분모를 페이지에서 명시적으로 드러낸다. */
export const tweenConfigurationCoverage = {
  officialSources: 3,
  sourceItems: 28,
  localSections: 6,
} as const
