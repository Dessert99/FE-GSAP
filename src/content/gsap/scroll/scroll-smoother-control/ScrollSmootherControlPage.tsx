/** ScrollSmoother command·native anchor·cleanup 경계를 학습 순서로 조립한다. */
import { toHref } from '../../../../app/routes'
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { SectionNavigator } from './components/SectionNavigator/SectionNavigator'
import { scrollSmootherControlMeta } from './scroll-smoother-control.meta'
import './ScrollSmootherControlPage.css'

/** running ScrollSmoother instance의 상태 읽기와 복원을 정적으로 가르친다. */
export function ScrollSmootherControlPage() {
  return (
    <article className='scroll-smoother-control-page'>
      <header>
        <p className='scroll-smoother-control-page__eyebrow'>
          {scrollSmootherControlMeta.category}
        </p>
        <h1>{scrollSmootherControlMeta.title}</h1>
        <p>{scrollSmootherControlMeta.summary}</p>
        <div className='scroll-smoother-control-page__links'>
          {scrollSmootherControlMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
      </header>
      <SectionNavigator />
      <section
        id='state-reads'
        tabIndex={-1}
        aria-labelledby='state-reads-title'
      >
        <p>02 · queries</p>
        <h2 id='state-reads-title'>
          값을 읽고, 계산한 offset을 명시적으로 사용합니다
        </h2>
        <p>
          <code>getVelocity()</code>는 현재 smoothed scroll의 초당 pixel 값을
          반환합니다. <code>offset(target, position)</code>은 target이 viewport
          position에 닿는 pixel 위치를 계산하며, 그 결과를{' '}
          <code>scrollTop(offset)</code>에 넘길 수 있습니다.
        </p>
        <p>
          공식 문서는 세 번째 인자를 설명하지 않습니다. 설치된 3.15
          source와 d.ts에는 <code>ignoreSpeed</code>가 있으며, <code>true</code>
          일 때 <code>st.start / speed</code>로 계산합니다. 이 version-specific
          인자는 공식 계약과 분리해 확인합니다.
        </p>
      </section>
      <section
        id='pause-command'
        tabIndex={-1}
        aria-labelledby='pause-command-title'
      >
        <p>03 · input gate</p>
        <h2 id='pause-command-title'>paused는 boolean getter와 setter입니다</h2>
        <p>
          <code>paused()</code>로 현재 gate를 읽고 <code>paused(true)</code>로
          scrollbar를 포함한 smoother-controlled 입력을 멈춥니다. pause 중에도
          이 instance의 <code>scrollTop()</code>과 <code>scrollTo()</code>{' '}
          command는 동작합니다. UI가 정한 상태를 다시 <code>paused(false)</code>
          로 복원할 책임이 있는 코드에서만 이 setter를 호출합니다.
        </p>
      </section>
      <section
        id='scroll-command'
        tabIndex={-1}
        aria-labelledby='scroll-command-title'
      >
        <p>04 · destination</p>
        <h2 id='scroll-command-title'>
          motion preference는 smooth argument로 전달합니다
        </h2>
        <p>
          <code>scrollTo(target, smooth, position)</code>은 target 또는 number를
          목적지로 사용하고, position은 target 기준과 viewport 기준을 짝지은
          문자열입니다. <code>true</code>는 configured smoothing을 사용하지만
          touch device의 기본 호출은 smoothing을 적용하지 않습니다. reduced
          motion에서는 <code>smooth</code>에 <code>false</code>를 넘겨 즉시
          목적지로 이동하고, native anchor 자체는 계속 native browser
          navigation으로 둡니다.
        </p>
        <p>
          <code>scrollTop()</code>은 pixel 위치를 읽고,{' '}
          <code>scrollTop(position)</code>은 pause 중에도 즉시 위치를
          설정합니다. 공식 문서는 setter 반환을 <code>void</code>로 설명하지만
          설치된 3.15 source와 d.ts는 instance를 반환하므로,
          반환값에 의존한 chaining은 피합니다.
        </p>
      </section>
      <section id='cleanup' tabIndex={-1} aria-labelledby='cleanup-title'>
        <p>05 · restoration</p>
        <h2 id='cleanup-title'>
          만든 instance는 kill로 정리합니다
        </h2>
        <p>
          <code>kill()</code>은 whole ScrollSmoother와 적용된 effects를
          종료합니다. 설치된 implementation은 관련 trigger와 listeners를
          해제하고 wrapper/content의 inline state를 복원하므로, instance를 만든
          곳의 cleanup에서 한 번 호출합니다.
        </p>
        <p>
          먼저{' '}
          <a href={toHref('/fundamentals/scroll-smoother-create')}>
            ScrollSmoother 생성
          </a>
          에서 instance를 만든 위치를 확인하고,{' '}
          <a href={toHref('/fundamentals/scroll-smoother-effects')}>
            ScrollSmoother 효과
          </a>
          에서 effect trigger와 instance 전체 정리의 경계를 이어서 확인할 수
          있습니다.
        </p>
      </section>
    </article>
  )
}
