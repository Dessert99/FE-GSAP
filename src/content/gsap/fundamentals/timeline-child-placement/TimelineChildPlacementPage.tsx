/** Timeline child의 배치 규칙을 부모 확인부터 자동 재조정까지 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AddSignatureSection } from './sections/AddSignatureSection/AddSignatureSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ParentGraphSection } from './sections/ParentGraphSection/ParentGraphSection'
import { PositionSyntaxSection } from './sections/PositionSyntaxSection/PositionSyntaxSection'
import { RecentSection } from './sections/RecentSection/RecentSection'
import { ShiftChildrenSection } from './sections/ShiftChildrenSection/ShiftChildrenSection'
import { SmoothChildTimingSection } from './sections/SmoothChildTimingSection/SmoothChildTimingSection'
import { timelineChildPlacementMeta } from './timeline-child-placement.meta'
import './TimelineChildPlacementPage.css'

export function TimelineChildPlacementPage() {
  return (
    <article className="placement-page">
      <header className="placement-page__header">
        <p className="placement-page__eyebrow">{timelineChildPlacementMeta.category}</p>
        <h1>{timelineChildPlacementMeta.title}</h1>
        <p className="placement-page__summary">{timelineChildPlacementMeta.summary}</p>
        <div className="placement-page__official-links">
          {timelineChildPlacementMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="placement-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{timelineChildPlacementMeta.sourcePath}</code>
        </div>
        <p className="placement-page__reviewed">공식 문서 대조일 · {timelineChildPlacementMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <ParentGraphSection />
      <AddSignatureSection />
      <PositionSyntaxSection />
      <RecentSection />
      <ShiftChildrenSection />
      <SmoothChildTimingSection />
      <BoundariesSection />
    </article>
  )
}
