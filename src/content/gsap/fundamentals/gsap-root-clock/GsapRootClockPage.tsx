/** 모든 animation을 매 frame 진행시키는 root 구조와 동력을 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { gsapRootClockMeta } from './gsap-root-clock.meta'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ExportRootSection } from './sections/ExportRootSection/ExportRootSection'
import { GlobalTimelineSection } from './sections/GlobalTimelineSection/GlobalTimelineSection'
import { LagSmoothingSection } from './sections/LagSmoothingSection/LagSmoothingSection'
import { TickerSection } from './sections/TickerSection/TickerSection'
import { UpdateRootSection } from './sections/UpdateRootSection/UpdateRootSection'
import { WhoDrivesSection } from './sections/WhoDrivesSection/WhoDrivesSection'
import './GsapRootClockPage.css'

export function GsapRootClockPage() {
  return (
    <article className="root-clock-page">
      <header className="root-clock-page__header">
        <p className="root-clock-page__eyebrow">{gsapRootClockMeta.category}</p>
        <h1>{gsapRootClockMeta.title}</h1>
        <p className="root-clock-page__summary">{gsapRootClockMeta.summary}</p>
        <div className="root-clock-page__official-links">
          {gsapRootClockMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="root-clock-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{gsapRootClockMeta.sourcePath}</code>
        </div>
        <p className="root-clock-page__reviewed">공식 문서 대조일 · {gsapRootClockMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <WhoDrivesSection />
      <GlobalTimelineSection />
      <TickerSection />
      <LagSmoothingSection />
      <ExportRootSection />
      <UpdateRootSection />
      <BoundariesSection />
    </article>
  )
}
