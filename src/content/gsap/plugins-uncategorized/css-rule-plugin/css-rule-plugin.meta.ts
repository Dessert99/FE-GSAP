/** CSSRulePlugin 학습 페이지의 출처·섹션·coverage 기준을 한곳에서 관리한다. */
export const cssRulePluginMeta = {
  title: '한 CSS rule을 tween하면 왜 여러 card가 함께 바뀌나요?',
  category: 'GSAP · Plugins · CSSRulePlugin',
  summary:
    'CSSRulePlugin은 DOM 하나의 inline style 대신 stylesheet rule을 tween합니다. 같은 selector를 쓰는 모든 요소가 바뀌는 이유와, CSSOM 접근이 실패할 수 있는 경계를 함께 확인합니다.',
  sourcePath: 'src/content/gsap/plugins-uncategorized/css-rule-plugin/',
  reviewedAt: '2026-08-08',
  officialSources: [
    { label: 'CSSRulePlugin', href: 'https://gsap.com/docs/v3/Plugins/CSSRulePlugin/' },
    { label: 'CSSRulePlugin.getRule()', href: 'https://gsap.com/docs/v3/Plugins/CSSRulePlugin/methods/static-getRule()/' },
  ],
} as const

/** 공식 기술 item을 초보자 질문 흐름의 다섯 섹션에 대응시킨다. */
export const cssRulePluginSections = [
  { number: '01', id: 'rule-target', title: 'element 하나 대신 공유 rule을 고릅니다', sourceItems: 5 },
  { number: '02', id: 'get-rule', title: 'getRule()로 stylesheet의 대상을 찾습니다', sourceItems: 5 },
  { number: '03', id: 'shared-effect', title: 'proxy를 거쳐 cssRule vars를 tween합니다', sourceItems: 6 },
  { number: '04', id: 'failure-matrix', title: '찾지 못하거나 읽지 못하는 경계를 먼저 봅니다', sourceItems: 1 },
  { number: '05', id: 'alternatives', title: 'CSS 변수와 실제 element를 선택하는 기준', sourceItems: 3 },
] as const

/** 공식 canonical과 raw source 확인 항목의 분모를 분리해 표시한다. */
export const cssRulePluginCoverage = {
  officialSources: 2,
  officialSourceItems: 20,
  sourceVerifiedItems: 5,
  localSections: 5,
} as const
