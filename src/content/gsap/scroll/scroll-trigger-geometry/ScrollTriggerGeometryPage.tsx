/** P41 header, geometry ownership explanation, actual ruler를 beginner order로 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { GeometryRuler } from './examples/GeometryRuler/GeometryRuler'
import { GeometryMeaningSection } from './sections/GeometryMeaningSection/GeometryMeaningSection'
import { OwnershipSection } from './sections/OwnershipSection/OwnershipSection'
import { scrollTriggerGeometryMeta } from './scroll-trigger-geometry.meta'
import './ScrollTriggerGeometryPage.css'

/** ScrollTrigger instance geometry와 native/local/viewport coordinate boundary를 가르친다. */
export function ScrollTriggerGeometryPage() {
  return (
    <article className='scroll-trigger-geometry-page'>
      <header>
        <p>{scrollTriggerGeometryMeta.category}</p>
        <h1>{scrollTriggerGeometryMeta.title}</h1>
        <p>{scrollTriggerGeometryMeta.summary}</p>
        <div className='scroll-trigger-geometry-page__links'>
          {scrollTriggerGeometryMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          14 complete technical items covered · 먼저{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>
            P40 ScrollTrigger 생성
          </a>
          에서 create config와 refresh 시점을 확인하세요.
        </p>
      </header>
      <GeometryMeaningSection />
      <OwnershipSection />
      <GeometryRuler />
    </article>
  )
}
