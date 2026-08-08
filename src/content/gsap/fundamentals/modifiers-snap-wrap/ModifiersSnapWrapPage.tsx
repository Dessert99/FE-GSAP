/** 계산된 값을 매 render마다 가공하는 흐름을 여섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { InterceptSection } from './sections/InterceptSection/InterceptSection'
import { ModifierCaveatsSection } from './sections/ModifierCaveatsSection/ModifierCaveatsSection'
import { SnapPluginSection } from './sections/SnapPluginSection/SnapPluginSection'
import { SnapUtilitySection } from './sections/SnapUtilitySection/SnapUtilitySection'
import { WrapFamilySection } from './sections/WrapFamilySection/WrapFamilySection'
import { modifiersSnapWrapMeta } from './modifiers-snap-wrap.meta'
import './ModifiersSnapWrapPage.css'

export function ModifiersSnapWrapPage() {
  return (
    <article className="msw-page">
      <header className="msw-page__header">
        <p className="msw-page__eyebrow">{modifiersSnapWrapMeta.category}</p>
        <h1>{modifiersSnapWrapMeta.title}</h1>
        <p className="msw-page__summary">{modifiersSnapWrapMeta.summary}</p>
        <div className="msw-page__official-links">
          {modifiersSnapWrapMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="msw-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{modifiersSnapWrapMeta.sourcePath}</code>
        </div>
        <p className="msw-page__reviewed">공식 문서 대조일 · {modifiersSnapWrapMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <InterceptSection />
      <ModifierCaveatsSection />
      <SnapPluginSection />
      <SnapUtilitySection />
      <WrapFamilySection />
      <BoundariesSection />
    </article>
  )
}
