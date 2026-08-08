/** CSSRulePlugin의 공유 rule 대상·lookup·실행·대안 경계를 다섯 섹션으로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AlternativesSection } from './sections/AlternativesSection/AlternativesSection'
import { FailureMatrixSection } from './sections/FailureMatrixSection/FailureMatrixSection'
import { GetRuleSection } from './sections/GetRuleSection/GetRuleSection'
import { RuleTargetSection } from './sections/RuleTargetSection/RuleTargetSection'
import { SharedEffectSection } from './sections/SharedEffectSection/SharedEffectSection'
import { cssRulePluginMeta } from './css-rule-plugin.meta'
import './CssRulePluginPage.css'

export function CssRulePluginPage() {
  return (
    <article className="css-rule-plugin-page">
      <header className="css-rule-plugin-page__header">
        <p className="css-rule-plugin-page__eyebrow">{cssRulePluginMeta.category}</p><h1>{cssRulePluginMeta.title}</h1><p className="css-rule-plugin-page__summary">{cssRulePluginMeta.summary}</p>
        <div className="css-rule-plugin-page__official-links">{cssRulePluginMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <div className="css-rule-plugin-page__path"><span>이 페이지의 코드 위치</span><code>{cssRulePluginMeta.sourcePath}</code></div><p className="css-rule-plugin-page__reviewed">공식 문서 대조일 · {cssRulePluginMeta.reviewedAt}</p>
      </header>
      <PageCoverage /><RuleTargetSection /><GetRuleSection /><SharedEffectSection /><FailureMatrixSection /><AlternativesSection />
    </article>
  )
}
