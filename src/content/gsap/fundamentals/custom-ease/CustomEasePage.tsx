/** 직접 만든 속도 곡선을 쓰기까지의 과정을 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CreateAndReferenceSection } from './sections/CreateAndReferenceSection/CreateAndReferenceSection'
import { CurveAsFunctionSection } from './sections/CurveAsFunctionSection/CurveAsFunctionSection'
import { GetSvgDataSection } from './sections/GetSvgDataSection/GetSvgDataSection'
import { PathDataSection } from './sections/PathDataSection/PathDataSection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import { VisualizerSection } from './sections/VisualizerSection/VisualizerSection'
import { customEaseMeta } from './custom-ease.meta'
import './CustomEasePage.css'

export function CustomEasePage() {
  return (
    <article className="custom-ease-page">
      <header className="custom-ease-page__header">
        <p className="custom-ease-page__eyebrow">{customEaseMeta.category}</p>
        <h1>{customEaseMeta.title}</h1>
        <p className="custom-ease-page__summary">{customEaseMeta.summary}</p>
        <div className="custom-ease-page__official-links">
          {customEaseMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="custom-ease-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{customEaseMeta.sourcePath}</code>
        </div>
        <p className="custom-ease-page__reviewed">공식 문서 대조일 · {customEaseMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <CurveAsFunctionSection />
      <SetupSection />
      <CreateAndReferenceSection />
      <PathDataSection />
      <VisualizerSection />
      <GetSvgDataSection />
      <BoundariesSection />
    </article>
  )
}
