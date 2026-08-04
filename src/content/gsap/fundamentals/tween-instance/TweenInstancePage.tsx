/** 만들어진 Tween instance에 무엇이 남는지를 일곱 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { DataAndIdSection } from './sections/DataAndIdSection/DataAndIdSection'
import { InstanceLifecycleSection } from './sections/InstanceLifecycleSection/InstanceLifecycleSection'
import { InstanceSurfaceSection } from './sections/InstanceSurfaceSection/InstanceSurfaceSection'
import { ScrollTriggerBoundarySection } from './sections/ScrollTriggerBoundarySection/ScrollTriggerBoundarySection'
import { TargetsMethodSection } from './sections/TargetsMethodSection/TargetsMethodSection'
import { TweenIdentitySection } from './sections/TweenIdentitySection/TweenIdentitySection'
import { tweenInstanceMeta } from './tween-instance.meta'
import './TweenInstancePage.css'

export function TweenInstancePage() {
  return (
    <article className="instance-page">
      <header className="instance-page__header">
        <p className="instance-page__eyebrow">{tweenInstanceMeta.category}</p>
        <h1>{tweenInstanceMeta.title}</h1>
        <p className="instance-page__summary">{tweenInstanceMeta.summary}</p>
        <div className="instance-page__official-links">
          {tweenInstanceMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="instance-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{tweenInstanceMeta.sourcePath}</code>
        </div>
        <p className="instance-page__reviewed">공식 문서 대조일 · {tweenInstanceMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <TweenIdentitySection />
      <InstanceLifecycleSection />
      <InstanceSurfaceSection />
      <TargetsMethodSection />
      <DataAndIdSection />
      <ScrollTriggerBoundarySection />
      <BoundariesSection />
    </article>
  )
}
