/** ScrollTrigger integration 경계와 local Observer 예제를 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { LocalObserver } from './examples/LocalObserver/LocalObserver'
import { scrollTriggerIntegrationsMeta } from './scroll-trigger-integrations.meta'
import './ScrollTriggerIntegrationsPage.css'

/** custom scroller와 normalized input이 맡는 서로 다른 역할을 가르친다. */
export function ScrollTriggerIntegrationsPage() {
  return (
    <article className='scroll-trigger-integrations-page'>
      <header>
        <p>{scrollTriggerIntegrationsMeta.category}</p>
        <h1>{scrollTriggerIntegrationsMeta.title}</h1>
        <p>{scrollTriggerIntegrationsMeta.summary}</p>
        <div>
          {scrollTriggerIntegrationsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          먼저{' '}
          <a href={toHref('/fundamentals/observer-create')}>Observer</a>와{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>생성</a>,{' '}
          <a href={toHref('/fundamentals/scroll-trigger-geometry')}>
            geometry
          </a>
          ,{' '}
          <a href={toHref('/fundamentals/scroll-trigger-motion')}>motion</a>
          ,{' '}
          <a href={toHref('/fundamentals/scroll-trigger-lifecycle')}>
            생명주기
          </a>
          를 확인하면 integration 경계를 순서대로 이어갈 수 있습니다.
        </p>
      </header>
      <LocalObserver />
    </article>
  )
}
