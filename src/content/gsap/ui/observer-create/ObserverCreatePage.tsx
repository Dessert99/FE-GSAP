/** P25의 Observer configuration, registry, instance inspection 학습 단위를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { ObserverInputPad } from './examples/ObserverInputPad/ObserverInputPad'
import { observerCreateMeta } from './observer-create.meta'
import './ObserverCreatePage.css'

/** Observer 하나의 lifecycle과 registry lookup을 가르치는 P25 페이지다. */
export function ObserverCreatePage() {
  return (
    <article className="observer-create-page">
      <header>
        <p>{observerCreateMeta.category}</p>
        <h1>{observerCreateMeta.title}</h1>
        <p>{observerCreateMeta.summary}</p>
        <div className="observer-create-page__links">
          {observerCreateMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <section id="observer-config">
        <p>01 · configuration</p>
        <h2>events를 raw listener로 따로 처리하지 않습니다</h2>
        <p>
          <code>type</code>은 wheel, touch, pointer, scroll을 comma list로
          고르고, <code>tolerance</code>는 callback threshold,{' '}
          <code>debounce</code>는 rAF tick delta collection,{' '}
          <code>preventDefault</code>는 observed event handling,{' '}
          <code>lockAxis</code>는 pointer/touch first drag axis를 담당합니다.
        </p>
      </section>
      <ObserverInputPad />
      <section id="observer-instance">
        <p>03 · instance boundary</p>
        <h2>
          registry는 찾기 위한 것이지 모든 observer를 죽이는 목록이 아닙니다
        </h2>
        <p>
          <code>getAll()</code>은 not-killed observer array,{' '}
          <code>getById()</code>는 configured id instance를 찾습니다. instance{' '}
          <code>target</code>은 listened Element이고 <code>vars</code>는
          create에 passed original configuration입니다. 이 page cleanup은 own
          ref 하나만 <code>kill()</code>합니다.
        </p>
      </section>
    </article>
  )
}
