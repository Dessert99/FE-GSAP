/** distribute()의 반환 함수에서 2차원 위치 배분과 소유권 경계까지 이어 붙인다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AmountEachSection } from './sections/AmountEachSection/AmountEachSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { ConfigCatalogSection } from './sections/ConfigCatalogSection/ConfigCatalogSection'
import { GridGeometrySection } from './sections/GridGeometrySection/GridGeometrySection'
import { ReturnedFunctionSection } from './sections/ReturnedFunctionSection/ReturnedFunctionSection'
import { utilityDistributeMeta } from './utility-distribute.meta'
import './UtilityDistributePage.css'

export function UtilityDistributePage() {
  return (
    <article className="utility-distribute-page">
      <header className="utility-distribute-page__header">
        <p className="utility-distribute-page__eyebrow">{utilityDistributeMeta.category}</p>
        <h1>{utilityDistributeMeta.title}</h1>
        <p className="utility-distribute-page__summary">{utilityDistributeMeta.summary}</p>
        <div className="utility-distribute-page__official-links">{utilityDistributeMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div>
        <div className="utility-distribute-page__path"><span>이 페이지의 코드 위치</span><code>{utilityDistributeMeta.sourcePath}</code></div>
        <p className="utility-distribute-page__reviewed">공식 문서 대조일 · {utilityDistributeMeta.reviewedAt}</p>
      </header>
      <PageCoverage />
      <ReturnedFunctionSection />
      <AmountEachSection />
      <GridGeometrySection />
      <ConfigCatalogSection />
      <BoundariesSection />
    </article>
  )
}
