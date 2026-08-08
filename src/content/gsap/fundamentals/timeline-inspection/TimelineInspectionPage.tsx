/** Timeline object graph을 세 조회 메서드와 두 metadata 속성으로 읽는 일곱 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { DataSection } from './sections/DataSection/DataSection'
import { GetByIdSection } from './sections/GetByIdSection/GetByIdSection'
import { GetChildrenSection } from './sections/GetChildrenSection/GetChildrenSection'
import { GetTweensOfSection } from './sections/GetTweensOfSection/GetTweensOfSection'
import { NestedTreeSection } from './sections/NestedTreeSection/NestedTreeSection'
import { ScrollTriggerSection } from './sections/ScrollTriggerSection/ScrollTriggerSection'
import { timelineInspectionMeta } from './timeline-inspection.meta'
import './TimelineInspectionPage.css'

export function TimelineInspectionPage() {
  return (
    <article className="inspect-page">
      <header className="inspect-page__header">
        <p className="inspect-page__eyebrow">{timelineInspectionMeta.category}</p>
        <h1>{timelineInspectionMeta.title}</h1>
        <p className="inspect-page__summary">{timelineInspectionMeta.summary}</p>
        <div className="inspect-page__official-links">
          {timelineInspectionMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}
        </div>
        <div className="inspect-page__path"><span>이 페이지의 코드 위치</span><code>{timelineInspectionMeta.sourcePath}</code></div>
        <p className="inspect-page__reviewed">공식 문서 대조일 · {timelineInspectionMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <NestedTreeSection />
      <GetChildrenSection />
      <GetByIdSection />
      <GetTweensOfSection />
      <DataSection />
      <ScrollTriggerSection />
      <BoundariesSection />
    </article>
  )
}
