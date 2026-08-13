/** 만들어진 Tween의 콜백 교체와 완료 대기를 다섯 학습 단계로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AfterCreationSection } from './sections/AfterCreationSection/AfterCreationSection'
import { BoundariesSection } from './sections/BoundariesSection/BoundariesSection'
import { EventCallbackArgsSection } from './sections/EventCallbackArgsSection/EventCallbackArgsSection'
import { EventCallbackFormSection } from './sections/EventCallbackFormSection/EventCallbackFormSection'
import { ThenPromiseSection } from './sections/ThenPromiseSection/ThenPromiseSection'
import { tweenCallbacksPromiseMeta } from './tween-callbacks-promise.meta'
import './TweenCallbacksPromisePage.css'

export function TweenCallbacksPromisePage() {
  return (
    <article className="callbacks-page">
      <header className="callbacks-page__header">
        <p className="callbacks-page__eyebrow">{tweenCallbacksPromiseMeta.category}</p>
        <h1>{tweenCallbacksPromiseMeta.title}</h1>
        <p className="callbacks-page__summary">{tweenCallbacksPromiseMeta.summary}</p>
        <div className="callbacks-page__official-links">
          {tweenCallbacksPromiseMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p className="callbacks-page__reviewed">공식 문서 대조일 · {tweenCallbacksPromiseMeta.reviewedAt}</p>
      </header>

      <PageCoverage />
      <AfterCreationSection />
      <EventCallbackFormSection />
      <EventCallbackArgsSection />
      <ThenPromiseSection />
      <BoundariesSection />
    </article>
  )
}
