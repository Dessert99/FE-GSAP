/** 범위 제한·정규화·대응·보간·색 분리를 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CalculationLabSection } from './sections/CalculationLabSection/CalculationLabSection'
import { ColorComponentsSection } from './sections/ColorComponentsSection/ColorComponentsSection'
import { InterpolationShapesSection } from './sections/InterpolationShapesSection/InterpolationShapesSection'
import { PipelineModelSection } from './sections/PipelineModelSection/PipelineModelSection'
import { RangeContractsSection } from './sections/RangeContractsSection/RangeContractsSection'
import { rangeInterpolationMeta } from './range-interpolation.meta'
import './RangeInterpolationPage.css'

export function RangeInterpolationPage() {
  return (
    <article className="range-page">
      <header className="range-page__header">
        <p className="range-page__eyebrow">{rangeInterpolationMeta.category}</p>
        <h1>{rangeInterpolationMeta.title}</h1>
        <p className="range-page__summary">{rangeInterpolationMeta.summary}</p>
        <div className="range-page__official-links">
          {rangeInterpolationMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="range-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{rangeInterpolationMeta.sourcePath}</code>
        </div>
        <p className="range-page__reviewed">공식 문서 대조일 · {rangeInterpolationMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <PipelineModelSection />
      <RangeContractsSection />
      <CalculationLabSection />
      <InterpolationShapesSection />
      <ColorComponentsSection />
      <BoundariesSection />
    </article>
  )
}
