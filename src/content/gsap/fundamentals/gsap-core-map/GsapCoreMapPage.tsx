/** GSAP Core의 관계와 공식 탐색 범위를 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { gsapCoreMapMeta } from './gsap-core-map.meta'
import { AccessPointSection } from './sections/AccessPointSection/AccessPointSection'
import { AnimationModelSection } from './sections/AnimationModelSection/AnimationModelSection'
import { ApiMapSection } from './sections/ApiMapSection/ApiMapSection'
import { CoreBoundarySection } from './sections/CoreBoundarySection/CoreBoundarySection'
import { NextStepsSection } from './sections/NextStepsSection/NextStepsSection'
import { VersionCheckSection } from './sections/VersionCheckSection/VersionCheckSection'
import './GsapCoreMapPage.css'

export function GsapCoreMapPage() {
  return (
    <article className="core-map-page">
      <header className="core-map-page__header">
        <p className="core-map-page__eyebrow">{gsapCoreMapMeta.category}</p>
        <h1>{gsapCoreMapMeta.title}</h1>
        <p className="core-map-page__summary">{gsapCoreMapMeta.summary}</p>
        <div className="core-map-page__official-links">
          {gsapCoreMapMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}
        </div>
        <div className="core-map-page__path"><span>이 페이지의 코드 위치</span><code>{gsapCoreMapMeta.sourcePath}</code></div>
        <p className="core-map-page__reviewed">공식 문서 대조일 · {gsapCoreMapMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <AccessPointSection />
      <AnimationModelSection />
      <CoreBoundarySection />
      <ApiMapSection />
      <VersionCheckSection />
      <NextStepsSection />
    </article>
  )
}
