/** CSSPlugin 학습 페이지의 header와 여섯 학습 section만 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { cssAnimationMeta } from './css-animation.meta'
import { CssValuesSection } from './sections/CssValuesSection/CssValuesSection'
import { OriginsSection } from './sections/OriginsSection/OriginsSection'
import { PluginBoundarySection } from './sections/PluginBoundarySection/PluginBoundarySection'
import { ThreeDSection } from './sections/ThreeDSection/ThreeDSection'
import { TransformModelSection } from './sections/TransformModelSection/TransformModelSection'
import { VisibilityCleanupSection } from './sections/VisibilityCleanupSection/VisibilityCleanupSection'
import './CssAnimationPage.css'

export function CssAnimationPage() {
  return (
    <article className="css-animation-page">
      <header className="css-animation-page__header">
        <p className="css-animation-page__eyebrow">{cssAnimationMeta.category}</p>
        <h1>{cssAnimationMeta.title}</h1>
        <p className="css-animation-page__summary">{cssAnimationMeta.summary}</p>
        <div className="css-animation-page__official-links">
          <OfficialDocsLink label="CSSPlugin 공식 문서" href={cssAnimationMeta.officialUrl} />
        </div>
        <div className="css-animation-page__path"><span>이 페이지의 코드 위치</span><code>{cssAnimationMeta.sourcePath}</code></div>
        <p className="css-animation-page__reviewed">공식 문서 대조일 · {cssAnimationMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <PluginBoundarySection />
      <CssValuesSection />
      <TransformModelSection />
      <ThreeDSection />
      <OriginsSection />
      <VisibilityCleanupSection />
    </article>
  )
}
