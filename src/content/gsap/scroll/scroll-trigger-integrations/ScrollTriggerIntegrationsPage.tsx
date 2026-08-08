/** P46 header와 one local integration architecture example을 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { LocalObserver } from './examples/LocalObserver/LocalObserver'
import { scrollTriggerIntegrationsMeta } from './scroll-trigger-integrations.meta'
import './ScrollTriggerIntegrationsPage.css'

/** custom scroller와 normalized input의 ownership boundary를 가르친다. */
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
          <code>{scrollTriggerIntegrationsMeta.sourcePath}</code> · 공식 대조일{' '}
          {scrollTriggerIntegrationsMeta.reviewedAt} · official coverage 3 / 3
        </p>
        <p>
          먼저{' '}
          <a href={toHref('/fundamentals/observer-create')}>P25 Observer</a>와{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>P40 생성</a>,{' '}
          <a href={toHref('/fundamentals/scroll-trigger-geometry')}>
            P41 geometry
          </a>
          ,{' '}
          <a href={toHref('/fundamentals/scroll-trigger-motion')}>P42 motion</a>
          ,{' '}
          <a href={toHref('/fundamentals/scroll-trigger-lifecycle')}>
            P43 생명주기
          </a>
          를 확인하면 integration 경계를 순서대로 이어갈 수 있습니다.
        </p>
      </header>
      <LocalObserver />
    </article>
  )
}
