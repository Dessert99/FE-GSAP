/** CSSRulePlugin과 getRule()의 공식 표현과 local runtime 정규화 경계를 표 데이터로 고정한다. */
export const cssRulePluginProperties = [
  { name: 'CSSRulePlugin', type: 'GSAP plugin object', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '별도 load/import 후 gsap.registerPlugin(CSSRulePlugin)', timing: 'cssRule vars를 해석하기 전 등록', caveat: '공식 문서는 CSS variables 방식으로 deprecated 되었음을 명시한다.' },
  { name: 'CSSRulePlugin.getRule(selector)', type: '공식 문서: selector:String → Object', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '.myClass·#myID·.myClass::before 같은 정확한 selector', timing: 'tween target을 만들기 전', caveat: 'pseudo-only ::before는 array를 돌린다고 공식 문서가 명시한다.' },
  { name: 'getRule() local lookup', type: 'CSSStyleDeclaration | null', defaultValue: '없음', acceptedValues: '이 lab의 구체 pseudo selector 하나', timing: 'React effect 안에서 stylesheet가 준비된 뒤', caveat: '공식 API signature가 아니라 array/예외 경계를 안전하게 표시하려는 local 정규화다.' },
  { name: 'cssRule', type: 'object', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '{ color: "blue" }처럼 rule에 쓸 CSS property', timing: 'gsap.to() vars 안', caveat: '값을 반드시 cssRule: {} 안에 감싼다.' },
  { name: 'rule declaration', type: 'CSSStyleDeclaration', defaultValue: '선택한 stylesheet rule의 선언값', acceptedValues: 'rule에 이미 정의된 property가 권장됨', timing: 'tween 시작값을 읽을 때', caveat: 'calculated style을 만들지 못하므로 선언이 없으면 transparent 같은 의도 밖 시작값이 될 수 있다.' },
] as const
