/** P27 header와 독립 학습 단위를 조립한다. */
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
        <p>2 official state items covered</p>
      </header>
      <TransitionSection />
      <GestureStateLab />
    </article>
  )
}
