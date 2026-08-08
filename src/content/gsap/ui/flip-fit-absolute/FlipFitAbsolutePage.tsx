/** Flip fit/absolute의 coordinate·calculation·flow·restoration 학습 단계를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { ContainingBlockSection } from './sections/ContainingBlockSection/ContainingBlockSection'
import { CoordinateOwnershipSection } from './sections/CoordinateOwnershipSection/CoordinateOwnershipSection'
import { FitModesSection } from './sections/FitModesSection/FitModesSection'
import { AbsoluteFlowSection } from './sections/AbsoluteFlowSection/AbsoluteFlowSection'
import { RestorationSection } from './sections/RestorationSection/RestorationSection'
import { flipFitAbsoluteMeta } from './flip-fit-absolute.meta'
import './FlipFitAbsolutePage.css'
export function FlipFitAbsolutePage() {
  return (
    <article className="flip-fit-absolute-page">
      <header>
        <p>{flipFitAbsoluteMeta.category}</p>
        <h1>{flipFitAbsoluteMeta.title}</h1>
        <p>{flipFitAbsoluteMeta.summary}</p>
        <div>
          {flipFitAbsoluteMeta.officialSources.map((s) => (
            <OfficialDocsLink key={s.href} {...s} />
          ))}
        </div>
        <p>
          <code>{flipFitAbsoluteMeta.sourcePath}</code>
        </p>
      </header>
      <PageCoverage />
      <CoordinateOwnershipSection />
      <FitModesSection />
      <AbsoluteFlowSection />
      <ContainingBlockSection />
      <RestorationSection />
    </article>
  )
}
