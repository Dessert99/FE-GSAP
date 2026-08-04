/** CSS가 아닌 값의 채널 선택을 다섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AttrCssSplitSection } from './sections/AttrCssSplitSection/AttrCssSplitSection'
import { AttrSyntaxSection } from './sections/AttrSyntaxSection/AttrSyntaxSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { EndArraySection } from './sections/EndArraySection/EndArraySection'
import { ValueChannelSection } from './sections/ValueChannelSection/ValueChannelSection'
import { nonCssTargetValuesMeta } from './non-css-target-values.meta'
import './NonCssTargetValuesPage.css'

export function NonCssTargetValuesPage() {
  return (
    <article className="non-css-page">
      <header className="non-css-page__header">
        <p className="non-css-page__eyebrow">{nonCssTargetValuesMeta.category}</p>
        <h1>{nonCssTargetValuesMeta.title}</h1>
        <p className="non-css-page__summary">{nonCssTargetValuesMeta.summary}</p>
        <div className="non-css-page__official-links">
          {nonCssTargetValuesMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="non-css-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{nonCssTargetValuesMeta.sourcePath}</code>
        </div>
        <p className="non-css-page__reviewed">공식 문서 대조일 · {nonCssTargetValuesMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <ValueChannelSection />
      <AttrSyntaxSection />
      <AttrCssSplitSection />
      <EndArraySection />
      <BoundariesSection />
    </article>
  )
}
