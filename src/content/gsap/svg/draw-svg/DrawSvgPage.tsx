/** DrawSVG value grammar와 rendered stroke measurement의 다섯 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { LengthPositionSection } from './sections/LengthPositionSection/LengthPositionSection'
import { RenderedGeometryBoundariesSection } from './sections/RenderedGeometryBoundariesSection/RenderedGeometryBoundariesSection'
import { RevealLabSection } from './sections/RevealLabSection/RevealLabSection'
import { StrokeDashMentalModelSection } from './sections/StrokeDashMentalModelSection/StrokeDashMentalModelSection'
import { ValueGrammarSection } from './sections/ValueGrammarSection/ValueGrammarSection'
import { drawSvgMeta } from './draw-svg.meta'
import './DrawSvgPage.css'

/** P09 DrawSVG의 stroke reveal과 measurement를 보여 주는 학습 페이지다. */
export function DrawSvgPage() {
  return (
    <article className="draw-svg-page">
      <header className="draw-svg-page__header">
        <p className="draw-svg-page__eyebrow">{drawSvgMeta.category}</p>
        <h1>{drawSvgMeta.title}</h1>
        <p className="draw-svg-page__summary">{drawSvgMeta.summary}</p>
        <div className="draw-svg-page__official-links">
          {drawSvgMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p className="draw-svg-page__path">
          이 페이지의 코드 위치 · <code>{drawSvgMeta.sourcePath}</code>
        </p>
        <p className="draw-svg-page__reviewed">
          공식 문서 대조일 · {drawSvgMeta.reviewedAt}
        </p>
      </header>
      <PageCoverage />
      <StrokeDashMentalModelSection />
      <ValueGrammarSection />
      <RevealLabSection />
      <LengthPositionSection />
      <RenderedGeometryBoundariesSection />
    </article>
  )
}
