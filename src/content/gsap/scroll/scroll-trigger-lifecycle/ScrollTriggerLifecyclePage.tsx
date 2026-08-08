/** P43의 공식 identity, lifecycle lab, layout decision matrix를 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { LifecycleLab } from './examples/LifecycleLab/LifecycleLab'
import { scrollTriggerLifecycleMeta } from './scroll-trigger-lifecycle.meta'
import './ScrollTriggerLifecyclePage.css'

/** layout 변화와 scroll update에 맞는 ScrollTrigger lifecycle command를 가르친다. */
export function ScrollTriggerLifecyclePage() {
  return (
    <article className='scroll-trigger-lifecycle-page'>
      <header>
        <p>{scrollTriggerLifecycleMeta.category}</p>
        <h1>{scrollTriggerLifecycleMeta.title}</h1>
        <p>{scrollTriggerLifecycleMeta.summary}</p>
        <div className='scroll-trigger-lifecycle-page__links'>
          {scrollTriggerLifecycleMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>
          <code>{scrollTriggerLifecycleMeta.sourcePath}</code> · 공식 대조일{' '}
          {scrollTriggerLifecycleMeta.reviewedAt} · official coverage 9 / 9
        </p>
        <p>
          먼저{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>P40 생성</a>과{' '}
          <a href={toHref('/fundamentals/scroll-trigger-geometry')}>
            P41 geometry
          </a>
          에서 instance와 측정값의 소유권을 확인하세요.
        </p>
      </header>
      <LifecycleLab />
      <section aria-labelledby='lifecycle-decision-title'>
        <h2 id='lifecycle-decision-title'>
          어떤 변화에 어떤 command를 쓸까요?
        </h2>
        <p>
          scroll 위치만 달라졌다면 <code>update()</code>로 현재 state를
          반영하고, element 높이·font·image처럼 layout이 달라졌다면 instance{' '}
          <code>refresh()</code>로 그 trigger만 다시 측정합니다. 여러 trigger의
          순서와 pin 거리가 함께 바뀌면 <code>sort()</code> 뒤 static{' '}
          <code>refresh()</code>를 application owner가 실행합니다.
        </p>
        <p>
          <code>disable(revert, allowAnimation)</code>은 다시 enable할
          instance를 보존하고, <code>kill(revert, allowAnimation)</code>은
          owner가 폐기할 때 사용합니다. 이 lab은 continuous scroll을
          announce하지 않고 command와 refresh event만 discrete log로 남깁니다.
        </p>
      </section>
    </article>
  )
}
