/** Draggable의 collision·throw state·tween 관찰을 다섯 학습 섹션으로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { CleanupFallbackSection } from './sections/CleanupFallbackSection/CleanupFallbackSection'
import { OverlapGeometrySection } from './sections/OverlapGeometrySection/OverlapGeometrySection'
import { ThrowStateSection } from './sections/ThrowStateSection/ThrowStateSection'
import { ThresholdFormsSection } from './sections/ThresholdFormsSection/ThresholdFormsSection'
import { TweenInspectorSection } from './sections/TweenInspectorSection/TweenInspectorSection'
import { draggableCollisionMomentumMeta } from './draggable-collision-momentum.meta'
import './DraggableCollisionMomentumPage.css'

export function DraggableCollisionMomentumPage() {
  return (
    <article className="draggable-collision-momentum-page">
      <header className="draggable-collision-momentum-page__header">
        <p>{draggableCollisionMomentumMeta.category}</p>
        <h1>{draggableCollisionMomentumMeta.title}</h1>
        <p>{draggableCollisionMomentumMeta.summary}</p>
        <div>
          {draggableCollisionMomentumMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <code>{draggableCollisionMomentumMeta.sourcePath}</code>
      </header>
      <PageCoverage />
      <OverlapGeometrySection />
      <ThresholdFormsSection />
      <ThrowStateSection />
      <TweenInspectorSection />
      <CleanupFallbackSection />
    </article>
  )
}
