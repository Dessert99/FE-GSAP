/** ScrollSmoother의 smooth·progress·effects 학습 순서를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { EffectsMethodModel } from './components/EffectsMethodModel/EffectsMethodModel'
import { EffectsLifecycleSection } from './sections/EffectsLifecycleSection/EffectsLifecycleSection'
import { NativeRenderedBoundarySection } from './sections/NativeRenderedBoundarySection/NativeRenderedBoundarySection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import { scrollSmootherEffectsMeta } from './scroll-smoother-effects.meta'
import './ScrollSmootherEffectsPage.css'

/** existing ScrollSmoother의 smooth·effects·progress 관계를 정적으로 가르친다. */
export function ScrollSmootherEffectsPage() {
  return (
    <article className="scroll-smoother-effects-page">
      <header>
        <p className="scroll-smoother-effects-page__eyebrow">
          {scrollSmootherEffectsMeta.category}
        </p>
        <h1>{scrollSmootherEffectsMeta.title}</h1>
        <p>{scrollSmootherEffectsMeta.summary}</p>
        <div className="scroll-smoother-effects-page__official-links">
          {scrollSmootherEffectsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <SetupSection />
      <NativeRenderedBoundarySection />
      <EffectsMethodModel />
      <EffectsLifecycleSection />
    </article>
  )
}
