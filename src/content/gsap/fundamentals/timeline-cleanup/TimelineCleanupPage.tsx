/** Timeline cleanup 선택지를 보존 범위에 따라 비교하는 여섯 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AutoRemoveSection } from './sections/AutoRemoveSection/AutoRemoveSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { KillRevertSection } from './sections/KillRevertSection/KillRevertSection'
import { KillTweensSection } from './sections/KillTweensSection/KillTweensSection'
import { PreserveScopeSection } from './sections/PreserveScopeSection/PreserveScopeSection'
import { RemoveClearSection } from './sections/RemoveClearSection/RemoveClearSection'
import { timelineCleanupMeta } from './timeline-cleanup.meta'
import './TimelineCleanupPage.css'

export function TimelineCleanupPage() {
  return (
    <article className="tl-cleanup-page">
      <header className="tl-cleanup-page__header">
        <p className="tl-cleanup-page__eyebrow">{timelineCleanupMeta.category}</p>
        <h1>{timelineCleanupMeta.title}</h1>
        <p className="tl-cleanup-page__summary">{timelineCleanupMeta.summary}</p>
        <div className="tl-cleanup-page__official-links">{timelineCleanupMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <div className="tl-cleanup-page__path"><span>이 페이지의 코드 위치</span><code>{timelineCleanupMeta.sourcePath}</code></div>
        <p className="tl-cleanup-page__reviewed">공식 문서 대조일 · {timelineCleanupMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <PreserveScopeSection />
      <RemoveClearSection />
      <KillTweensSection />
      <KillRevertSection />
      <AutoRemoveSection />
      <BoundariesSection />
    </article>
  )
}
