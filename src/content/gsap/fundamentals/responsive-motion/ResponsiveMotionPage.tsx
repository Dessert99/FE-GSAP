/** 조건별 animation의 생성과 정리를 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AddParametersSection } from './sections/AddParametersSection/AddParametersSection'
import { AutoRevertSection } from './sections/AutoRevertSection/AutoRevertSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CleanupOrderSection } from './sections/CleanupOrderSection/CleanupOrderSection'
import { ConditionsObjectSection } from './sections/ConditionsObjectSection/ConditionsObjectSection'
import { ReducedMotionRefreshSection } from './sections/ReducedMotionRefreshSection/ReducedMotionRefreshSection'
import { ScopeSelectorSection } from './sections/ScopeSelectorSection/ScopeSelectorSection'
import { responsiveMotionMeta } from './responsive-motion.meta'
import './ResponsiveMotionPage.css'

export function ResponsiveMotionPage() {
  return (
    <article className="responsive-page">
      <header className="responsive-page__header">
        <p className="responsive-page__eyebrow">{responsiveMotionMeta.category}</p>
        <h1>{responsiveMotionMeta.title}</h1>
        <p className="responsive-page__summary">{responsiveMotionMeta.summary}</p>
        <div className="responsive-page__official-links">
          {responsiveMotionMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="responsive-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{responsiveMotionMeta.sourcePath}</code>
        </div>
        <p className="responsive-page__reviewed">공식 문서 대조일 · {responsiveMotionMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <AutoRevertSection />
      <AddParametersSection />
      <ConditionsObjectSection />
      <CleanupOrderSection />
      <ScopeSelectorSection />
      <ReducedMotionRefreshSection />
      <BoundariesSection />
    </article>
  )
}
