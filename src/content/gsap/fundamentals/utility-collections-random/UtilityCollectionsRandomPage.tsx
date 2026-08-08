/** 후보 collection의 정규화·무작위 선택·in-place shuffle을 다섯 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { CollectionNormalizationSection } from './sections/CollectionNormalizationSection/CollectionNormalizationSection'
import { RandomChoiceSection } from './sections/RandomChoiceSection/RandomChoiceSection'
import { ShuffleMutationSection } from './sections/ShuffleMutationSection/ShuffleMutationSection'
import { TweenBoundarySection } from './sections/TweenBoundarySection/TweenBoundarySection'
import { utilityCollectionsRandomMeta } from './utility-collections-random.meta'
import './UtilityCollectionsRandomPage.css'

/** 후보 collection utility 페이지를 그린다. */
export function UtilityCollectionsRandomPage() {
  return (
    <article className="utility-collections-page">
      <header className="utility-collections-page__header">
        <p className="utility-collections-page__eyebrow">{utilityCollectionsRandomMeta.category}</p>
        <h1>{utilityCollectionsRandomMeta.title}</h1>
        <p className="utility-collections-page__summary">{utilityCollectionsRandomMeta.summary}</p>
        <div className="utility-collections-page__official-links">
          {utilityCollectionsRandomMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}
        </div>
        <div className="utility-collections-page__path"><span>이 페이지의 코드 위치</span><code>{utilityCollectionsRandomMeta.sourcePath}</code></div>
        <p className="utility-collections-page__reviewed">공식 문서 대조일 · {utilityCollectionsRandomMeta.reviewedAt}</p>
      </header>
      <PageCoverage />
      <CollectionNormalizationSection />
      <RandomChoiceSection />
      <ShuffleMutationSection />
      <TweenBoundarySection />
      <BoundariesSection />
    </article>
  )
}
