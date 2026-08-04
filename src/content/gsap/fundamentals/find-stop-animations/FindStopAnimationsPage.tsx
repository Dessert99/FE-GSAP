/** 참조를 잃은 Tween의 조회와 중단을 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { FindByIdSection } from './sections/FindByIdSection/FindByIdSection'
import { FindByTargetSection } from './sections/FindByTargetSection/FindByTargetSection'
import { KillScopeSection } from './sections/KillScopeSection/KillScopeSection'
import { LostReferenceSection } from './sections/LostReferenceSection/LostReferenceSection'
import { StopVsRestoreSection } from './sections/StopVsRestoreSection/StopVsRestoreSection'
import { findStopAnimationsMeta } from './find-stop-animations.meta'
import './FindStopAnimationsPage.css'

export function FindStopAnimationsPage() {
  return (
    <article className="find-stop-page">
      <header className="find-stop-page__header">
        <p className="find-stop-page__eyebrow">{findStopAnimationsMeta.category}</p>
        <h1>{findStopAnimationsMeta.title}</h1>
        <p className="find-stop-page__summary">{findStopAnimationsMeta.summary}</p>
        <div className="find-stop-page__official-links">
          {findStopAnimationsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="find-stop-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{findStopAnimationsMeta.sourcePath}</code>
        </div>
        <p className="find-stop-page__reviewed">공식 문서 대조일 · {findStopAnimationsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <LostReferenceSection />
      <FindByIdSection />
      <FindByTargetSection />
      <KillScopeSection />
      <StopVsRestoreSection />
      <BoundariesSection />
    </article>
  )
}
