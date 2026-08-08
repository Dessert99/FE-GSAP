/** P28 lifecycle lab과 P25 prerequisite를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { ObserverLifecycleLab } from './examples/ObserverLifecycleLab/ObserverLifecycleLab'
import { observerLifecycleMeta } from './observer-lifecycle.meta'

/** Observer enable/disable/kill boundary를 가르치는 P28 페이지다. */
export function ObserverLifecyclePage() {
  return (
    <article>
      <header>
        <p>{observerLifecycleMeta.category}</p>
        <h1>{observerLifecycleMeta.title}</h1>
        <p>{observerLifecycleMeta.summary}</p>
        {observerLifecycleMeta.officialSources.map((source) => (
          <OfficialDocsLink key={source.href} {...source} />
        ))}
      </header>
      <p>
        먼저{' '}
        <a href={toHref('/fundamentals/observer-create')}>P25 Observer 생성</a>
        에서 instance와 registry 경계를 확인할 수 있습니다.
      </p>
      <ObserverLifecycleLab />
    </article>
  )
}
