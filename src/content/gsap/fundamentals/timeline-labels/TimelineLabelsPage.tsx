/** label을 다루는 일곱 공식 문서를 "만들고 · 묻고 · 이동하고 · 지운다"는 일곱 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AddLabelSection } from './sections/AddLabelSection/AddLabelSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { LabelMapSection } from './sections/LabelMapSection/LabelMapSection'
import { LabelNavigationSection } from './sections/LabelNavigationSection/LabelNavigationSection'
import { LabelPositionSection } from './sections/LabelPositionSection/LabelPositionSection'
import { RemoveLabelSection } from './sections/RemoveLabelSection/RemoveLabelSection'
import { SeekByNameSection } from './sections/SeekByNameSection/SeekByNameSection'
import { timelineLabelsMeta } from './timeline-labels.meta'
import './TimelineLabelsPage.css'

export function TimelineLabelsPage() {
  return (
    <article className="labels-page">
      <header className="labels-page__header">
        <p className="labels-page__eyebrow">{timelineLabelsMeta.category}</p>
        <h1>{timelineLabelsMeta.title}</h1>
        <p className="labels-page__summary">{timelineLabelsMeta.summary}</p>
        <div className="labels-page__official-links">
          {timelineLabelsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="labels-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{timelineLabelsMeta.sourcePath}</code>
        </div>
        <p className="labels-page__reviewed">공식 문서 대조일 · {timelineLabelsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <LabelMapSection />
      <AddLabelSection />
      <LabelPositionSection />
      <LabelNavigationSection />
      <SeekByNameSection />
      <RemoveLabelSection />
      <BoundariesSection />
    </article>
  )
}
