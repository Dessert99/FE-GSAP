/** gsap.utils 관문을 두 호출 방식과 네 utility 갈래로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { CatalogMapSection } from './sections/CatalogMapSection/CatalogMapSection'
import { CollectionFamilySection } from './sections/CollectionFamilySection/CollectionFamilySection'
import { ComposeFamilySection } from './sections/ComposeFamilySection/ComposeFamilySection'
import { RangeFamilySection } from './sections/RangeFamilySection/RangeFamilySection'
import { SpreadFamilySection } from './sections/SpreadFamilySection/SpreadFamilySection'
import { TwoModesSection } from './sections/TwoModesSection/TwoModesSection'
import { WhyUtilsSection } from './sections/WhyUtilsSection/WhyUtilsSection'
import { gsapUtilsMeta } from './gsap-utils.meta'
import './GsapUtilsPage.css'

export function GsapUtilsPage() {
  return (
    <article className="utils-page">
      <header className="utils-page__header">
        <p className="utils-page__eyebrow">{gsapUtilsMeta.category}</p>
        <h1>{gsapUtilsMeta.title}</h1>
        <p className="utils-page__summary">{gsapUtilsMeta.summary}</p>
        <div className="utils-page__official-links">
          {gsapUtilsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="utils-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{gsapUtilsMeta.sourcePath}</code>
        </div>
        <p className="utils-page__reviewed">공식 문서 대조일 · {gsapUtilsMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <WhyUtilsSection />
      <TwoModesSection />
      <CatalogMapSection />
      <RangeFamilySection />
      <ComposeFamilySection />
      <CollectionFamilySection />
      <SpreadFamilySection />
    </article>
  )
}
