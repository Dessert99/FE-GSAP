/** Observer의 pressed와 dragging 상태를 실제 gesture 예제와 함께 설명한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { GestureStateLab } from './examples/GestureStateLab/GestureStateLab'
import { observerGestureStateMeta } from './observer-gesture-state.meta'
import { TransitionSection } from './sections/TransitionSection/TransitionSection'
import './ObserverGestureStatePage.css'

/** Observer의 pressed와 dragging 전환을 비교하는 페이지다. */
export function ObserverGestureStatePage() {
  return (
    <article className="observer-gesture-state">
      <header>
        <p>{observerGestureStateMeta.category}</p>
        <h1>{observerGestureStateMeta.title}</h1>
        <div>
          {observerGestureStateMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <TransitionSection />
      <GestureStateLab />
    </article>
  )
}
