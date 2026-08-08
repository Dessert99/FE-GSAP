/** CSSRulePlugin 두 canonical과 raw source에서 대조한 항목을 coverage 근거로 고정한다. */

/** 각 주장과 로컬 학습 근거를 같은 row에서 추적한다. */
export type CssRulePluginSourceItem = {
  id: string
  officialItem: string
  source: 'css-rule-plugin' | 'css-rule-plugin-static-get-rule'
  origin: 'official' | 'source'
  sectionId: string
}

/** 공식 문서 20개와 raw source 확인 5개를 빠짐없이 로컬 섹션에 연결한다. */
export const cssRulePluginSourceItems: CssRulePluginSourceItem[] = [
  { id: 'CSSRULE-01', officialItem: 'CSSRulePlugin은 특정 selector의 모든 객체에 영향을 주는 raw stylesheet rule을 animate하며, 개별 DOM element의 inline style을 바꾸는 방식과 다르다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'rule-target' },
  { id: 'CSSRULE-02', officialItem: 'myClass rule의 background-color를 tween하면 페이지에서 myClass를 쓴 모든 객체의 background color가 바뀌는 예를 든다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'rule-target' },
  { id: 'CSSRULE-03', officialItem: '개별 객체를 정밀하게 제어하려면 일반 CSSPlugin으로 CSS 관련 property를 tween하는 편이 보통 더 좋지만, global rule animation이 유용할 때도 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'rule-target' },
  { id: 'CSSRULE-04', officialItem: '::after와 ::before 같은 pseudo element는 JavaScript에서 직접 reference할 수 없지만 CSSRulePlugin으로 animate할 수 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'rule-target' },
  { id: 'CSSRULE-05', officialItem: 'plugin 자체에 CSS selector를 바탕으로 stylesheet reference를 잡는 static getRule() method가 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'rule-target' },
  { id: 'CSSRULE-06', officialItem: '공식 signature는 CSSRulePlugin.getRule(selector:String): Object이며 static method다.', source: 'css-rule-plugin-static-get-rule', origin: 'official', sectionId: 'get-rule' },
  { id: 'CSSRULE-07', officialItem: 'selector parameter는 animate할 selector와 정확히 일치하는 이름이며 .myClassName 같은 String이다.', source: 'css-rule-plugin-static-get-rule', origin: 'official', sectionId: 'get-rule' },
  { id: 'CSSRULE-08', officialItem: '반환값은 stylesheet object이고 ::before처럼 pseudo element selector만 주면 그 object들의 array다.', source: 'css-rule-plugin-static-get-rule', origin: 'official', sectionId: 'get-rule' },
  { id: 'CSSRULE-09', officialItem: 'getRule()은 tween의 target을 결정하는 데 쓴다.', source: 'css-rule-plugin-static-get-rule', origin: 'official', sectionId: 'get-rule' },
  { id: 'CSSRULE-10', officialItem: '공식 예제는 .myClass::before selector를 getRule()로 찾고 cssRule 안의 color를 tween한다.', source: 'css-rule-plugin-static-get-rule', origin: 'official', sectionId: 'get-rule' },
  { id: 'CSSRULE-11', officialItem: '공식 예제는 getRule() 호출을 별도 변수에 저장하거나 tween target 위치에 직접 넣는 두 형태를 보여 준다.', source: 'css-rule-plugin-static-get-rule', origin: 'official', sectionId: 'shared-effect' },
  { id: 'CSSRULE-12', officialItem: '공식 예제는 CSSRulePlugin file을 load한 뒤 getRule()과 tween을 사용하라고 안내한다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'shared-effect' },
  { id: 'CSSRULE-13', officialItem: 'tween 값은 cssRule: {} object 안에 넣어야 한다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'shared-effect' },
  { id: 'CSSRULE-14', officialItem: '선택한 rule에 이미 정의된 property를 tween하는 편이 보통 좋다. plugin은 다른 selector를 합친 calculated style을 만들 수 없다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'shared-effect' },
  { id: 'CSSRULE-15', officialItem: 'rule에 color가 정의되지 않은 채 blue로 tween하면 transparent에서 blue로 시작할 수 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'shared-effect' },
  { id: 'CSSRULE-16', officialItem: '정의되지 않은 시작값을 추측하지 않으려면 fromTo()로 starting value를 명시할 수 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'shared-effect' },
  { id: 'CSSRULE-17', officialItem: 'media query 안에 정의한 style은 접근하거나 tween하지 못할 수 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'failure-matrix' },
  { id: 'CSSRULE-S04', officialItem: '설치본 3.15.0 source는 browser document.styleSheets CSSOM을 읽어 rule을 찾는다.', source: 'css-rule-plugin-static-get-rule', origin: 'source', sectionId: 'failure-matrix' },
  { id: 'CSSRULE-S05', officialItem: '설치본 3.15.0 source 주석은 다른 domain stylesheet가 Firefox에서 insecure operation error를 던질 수 있다고 기록하며, getRule()은 그 예외를 catch한다.', source: 'css-rule-plugin-static-get-rule', origin: 'source', sectionId: 'failure-matrix' },
  { id: 'CSSRULE-20', officialItem: 'CSSRulePlugin은 CSS variables 방식으로 deprecated 되었고 GSAP은 CSS variable animation을 native 지원한다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'alternatives' },
  { id: 'CSSRULE-21', officialItem: '어떤 property를 target하든 CSS variable animation은 repaint를 일으키므로 sparingly 쓰고 performance에 주의해야 한다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'alternatives' },
  { id: 'CSSRULE-22', officialItem: '대안으로 pseudo element를 real HTML element로 바꾼 뒤 다른 DOM element처럼 직접 animate할 수 있다.', source: 'css-rule-plugin', origin: 'official', sectionId: 'alternatives' },
  { id: 'CSSRULE-S01', officialItem: '설치본 3.15.0 source는 selector의 ::를 :로 정규화하고 소문자로 비교한다.', source: 'css-rule-plugin-static-get-rule', origin: 'source', sectionId: 'get-rule' },
  { id: 'CSSRULE-S02', officialItem: '설치본 3.15.0 source는 document.styleSheets를 순회하고 cross-origin rule 접근 예외를 catch한 뒤 다음 stylesheet를 계속 찾는다.', source: 'css-rule-plugin-static-get-rule', origin: 'source', sectionId: 'failure-matrix' },
  { id: 'CSSRULE-S03', officialItem: '설치본 3.15.0 source는 구체 selector에서 CSSStyleDeclaration을, pseudo-only selector에서 array를 돌린다. 구체 selector를 찾지 못하면 undefined가 되며 local lab은 그 결과를 CSSStyleDeclaration | null로 정규화한다.', source: 'css-rule-plugin-static-get-rule', origin: 'source', sectionId: 'get-rule' },
]
