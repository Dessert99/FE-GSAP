/** 두 canonical과 raw source 확인을 로컬 학습 근거 수와 함께 보여 준다. */
import { cssRulePluginSourceItems } from '../../css-rule-plugin.catalog'
import { cssRulePluginCoverage, cssRulePluginSections } from '../../css-rule-plugin.meta'

// 공식 문서와 설치본 source 확인을 분리해 공식 coverage 분모를 흐리지 않는다.
const officialItems = cssRulePluginSourceItems.filter((item) => item.origin === 'official')
const sourceItems = cssRulePluginSourceItems.filter((item) => item.origin === 'source')
// 두 canonical 모두 실제 catalog 행을 갖는지 source key 집합으로 검산한다.
const mappedSourceCount = new Set(officialItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="css-rule-plugin-coverage" aria-label="공식 source 대응 범위">
      <div className="css-rule-plugin-coverage__summary">
        <div><strong>{mappedSourceCount}/{cssRulePluginCoverage.officialSources}</strong><span>공식 canonical</span></div>
        <div><strong>{officialItems.length}/{cssRulePluginCoverage.officialSourceItems}</strong><span>공식 기술 item</span></div>
        <p>공식 문서 item과 별도로 설치본 raw source를 읽어 확인한 {sourceItems.length}/{cssRulePluginCoverage.sourceVerifiedItems}개 경계는 “source 확인”으로 표시합니다.</p>
      </div>
      <ol>{cssRulePluginSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><span>{section.number}</span><div><strong>{section.title}</strong><small>{section.sourceItems}개 공식 source item</small></div></a></li>)}</ol>
    </nav>
  )
}
