/** ScrollTrigger 수명 주기 명령과 레이아웃 판단 기준을 한 페이지에 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { LifecycleLab } from './examples/LifecycleLab/LifecycleLab'
import { scrollTriggerLifecycleMeta } from './scroll-trigger-lifecycle.meta'
import './ScrollTriggerLifecyclePage.css'

/** 레이아웃 변화와 스크롤 갱신에 맞는 ScrollTrigger 명령을 가르친다. */
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
          먼저{' '}
          <a href={toHref('/fundamentals/scroll-trigger-create')}>생성</a>과{' '}
          <a href={toHref('/fundamentals/scroll-trigger-geometry')}>
            geometry
          </a>
          에서 인스턴스와 측정값을 먼저 확인하세요.
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
          순서와 pin 거리가 함께 바뀌면 앱 초기화 지점에서 <code>sort()</code>{' '}
          뒤 static <code>refresh()</code>를 실행합니다.
        </p>
        <p>
          <code>disable(revert, allowAnimation)</code>은 다시 enable할
          instance를 보존하고, <code>kill(revert, allowAnimation)</code>은 더는
          쓰지 않을 때 호출합니다. 이 예제는 연속 스크롤 값 대신 명령과 refresh
          이벤트만 로그로 남깁니다.
        </p>
      </section>
    </article>
  )
}
