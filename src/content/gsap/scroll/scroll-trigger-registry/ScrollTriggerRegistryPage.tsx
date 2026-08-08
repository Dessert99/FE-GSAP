/** P44의 registry boundary와 local navigator를 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { RegistryNavigator } from './examples/RegistryNavigator/RegistryNavigator'
import { scrollTriggerRegistryMeta } from './scroll-trigger-registry.meta'
import './ScrollTriggerRegistryPage.css'

/** refresh order 탐색과 global registry cleanup boundary를 가르친다. */
export function ScrollTriggerRegistryPage() {
  return (
    <article className='scroll-trigger-registry-page'>
      <header>
        <p>{scrollTriggerRegistryMeta.category}</p>
        <h1>{scrollTriggerRegistryMeta.title}</h1>
        <p>{scrollTriggerRegistryMeta.summary}</p>
        <div className='scroll-trigger-registry-page__links'>
          {scrollTriggerRegistryMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{scrollTriggerRegistryMeta.sourcePath}</code> · 공식 대조일{' '}
          {scrollTriggerRegistryMeta.reviewedAt} · official coverage 7 / 7
        </p>
        <p>
          먼저{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>P40 생성</a>
          에서 instance를 만든 뒤 registry를 읽으세요.
        </p>
      </header>
      <RegistryNavigator />
      <section aria-labelledby='registry-boundary-title'>
        <h2 id='registry-boundary-title'>
          전역 registry와 component owner는 다릅니다
        </h2>
        <p>
          <code>getAll()</code>과 <code>getById()</code>는 현재 registry를
          읽습니다. <code>next()</code>와 <code>previous()</code>는 refresh
          order를 따르므로 생성한 순서와 같다고 가정하지 않습니다.
        </p>
        <p>
          <code>killAll()</code>은 main ScrollSmoother trigger를 제외한 전역
          trigger를 kill합니다. 이 lab의 버튼은 foreign trigger가 없을 때만 실제
          호출한 뒤 세 owned trigger를 다시 만들며, 평상시 unmount cleanup은
          owned instance만 kill합니다.
        </p>
      </section>
    </article>
  )
}
