/** Observer lifecycle 예제와 생성 prerequisite를 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { ObserverLifecycleLab } from './examples/ObserverLifecycleLab/ObserverLifecycleLab'
import { observerLifecycleMeta } from './observer-lifecycle.meta'

/** Observer의 enable·disable·kill 차이를 설명하는 페이지다. */
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
        <a href={toHref('/fundamentals/observer-create')}>Observer 만들기와 찾기</a>
        에서 instance와 registry 경계를 확인할 수 있습니다.
      </p>
      <ObserverLifecycleLab />
    </article>
  )
}
