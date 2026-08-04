/** 체크박스만으로는 바뀌지 않는 실행을 gsap.matchMediaRefresh()가 어떻게 되돌리고 다시 태우는지 확인하는 학습 패널을 조립한다. */
import { osQueries, targetClassName, useReduceMotionRefreshAnimation } from './useReduceMotionRefreshAnimation'
import './ReduceMotionRefreshLab.css'

export function ReduceMotionRefreshLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, appReduceMotion, toggleAppReduceMotion, observation, refresh, play } = useReduceMotionRefreshAnimation()
  const descriptor = observation.descriptor

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = descriptor
    ? `// media query가 아니라 우리가 들고 있는 앱 설정
let appReduceMotion = ${descriptor.appReduceMotion}

const mm = gsap.matchMedia(scope)

mm.add(
  {
    osReduceMotion: '${osQueries.osReduceMotion}',
    osFullMotion: '${osQueries.osFullMotion}',
  },
  (context) => {
    const { osReduceMotion } = context.conditions
    // 지금 실행에서는 osReduceMotion=${descriptor.osReduceMotion}, appReduceMotion=${descriptor.appReduceMotion}
    const reduceMotion = osReduceMotion || appReduceMotion

    gsap.set('.${targetClassName}', { rotation: 0 })
    gsap.to('.${targetClassName}', {
      rotation: 360,
      duration: ${descriptor.duration},
      paused: true,
    })
  },
)

// 체크박스가 바뀐 뒤 이 한 줄이 있어야 handler가 새 값을 다시 읽습니다
gsap.matchMediaRefresh()`
    : '// MatchMedia가 아직 조건을 평가하지 않았습니다.'

  return (
    <section className="reduce-motion-refresh-lab" aria-labelledby="reduce-motion-refresh-lab-title">
      <h3 id="reduce-motion-refresh-lab-title">체크박스를 바꿔도 animation이 그대로인 이유</h3>
      <p className="reduce-motion-refresh-lab__goal">
        먼저 체크박스만 바꾸고 <strong>duration</strong>을 보세요. 값이 그대로입니다. 그다음{' '}
        <code>gsap.matchMediaRefresh()</code> 버튼을 누르면 정리 횟수와 실행 횟수가 함께 오르고 duration이 바뀝니다.
      </p>

      <div className="reduce-motion-refresh-lab__body" ref={scope}>
        <div className="reduce-motion-refresh-lab__stage">
          <div className={targetClassName} />
        </div>

        <dl className="reduce-motion-refresh-lab__observation">
          <div>
            <dt id="rmr-os">
              <code>osReduceMotion</code> 조건
            </dt>
            <dd>
              <output aria-labelledby="rmr-os">{descriptor ? String(descriptor.osReduceMotion) : '—'}</output>
            </dd>
          </div>
          <div>
            <dt id="rmr-full">
              <code>osFullMotion</code> 조건
            </dt>
            <dd>
              <output aria-labelledby="rmr-full">{descriptor ? String(descriptor.osFullMotion) : '—'}</output>
            </dd>
          </div>
          <div>
            <dt id="rmr-app">체크박스 값 (지금)</dt>
            <dd>
              <output aria-labelledby="rmr-app">{String(appReduceMotion)}</output>
            </dd>
          </div>
          <div>
            <dt id="rmr-used">handler가 마지막에 읽은 체크박스 값</dt>
            <dd>
              <output aria-labelledby="rmr-used">{descriptor ? String(descriptor.appReduceMotion) : '—'}</output>
            </dd>
          </div>
          <div>
            <dt id="rmr-duration">실행에 쓰인 duration</dt>
            <dd>
              <output aria-labelledby="rmr-duration">{descriptor ? `${descriptor.duration}초` : '—'}</output>
            </dd>
          </div>
          <div>
            <dt id="rmr-counts">실행 / 정리 / MatchMedia 생성</dt>
            <dd>
              <output aria-labelledby="rmr-counts">
                {observation.runCount} / {observation.cleanupCount} / {observation.createCount}
              </output>
            </dd>
          </div>
        </dl>

        <fieldset className="reduce-motion-refresh-lab__controls">
          <legend>조작</legend>

          <label htmlFor="reduce-motion-refresh-app">
            <input
              id="reduce-motion-refresh-app"
              type="checkbox"
              checked={appReduceMotion}
              onChange={(event) => toggleAppReduceMotion(event.target.checked)}
            />
            이 앱에서 모션 줄이기
          </label>

          <button type="button" onClick={refresh}>
            gsap.matchMediaRefresh() 호출
          </button>
          <button type="button" onClick={play}>
            지금 설정으로 재생
          </button>
        </fieldset>
      </div>

      <p className="reduce-motion-refresh-lab__status" role="status">
        handler {observation.runCount}회 실행 · 정리 {observation.cleanupCount}회 · MatchMedia {observation.createCount}회 생성
      </p>

      <pre className="reduce-motion-refresh-lab__code">
        <code>{code}</code>
      </pre>

      <div className="reduce-motion-refresh-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            체크박스를 눌러도 <strong>handler가 마지막에 읽은 값</strong>은 그대로입니다. 이미 만들어진 Tween은 체크박스를 보고 있지
            않기 때문입니다. refresh를 누르면 그 한 번에 <strong>정리 1회와 실행 1회</strong>가 함께 일어나고, 그제서야 새 값이 반영된
            duration이 나옵니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>MatchMedia 생성 횟수는 계속 1</strong>입니다. 공식 문장이 밝힌 대로 refresh는 인스턴스를 destroy하지 않습니다. 그리고
            정리 횟수가 실행 횟수보다 항상 하나 작습니다 — 되돌리기가 먼저, 다시 실행이 나중입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문장 그대로입니다 — <strong>활성·매치 중인 모든 MatchMedia 객체를 즉시 revert한 다음, 현재 매치되는 것을 실행한다.</strong>{' '}
            조건 자체는 하나도 바뀌지 않았지만 handler를 다시 태우기 때문에, media query 밖에 있는 앱 설정도 그 재실행에 함께 실립니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            사이트 안에 "모션 줄이기" 토글을 두는 경우입니다. 운영체제 설정은 우리가 바꿀 수 없지만, 앱 설정은 사용자가 언제든 바꿉니다.
            그 토글의 <code>onChange</code>에서 <code>gsap.matchMediaRefresh()</code>를 부르면 조건별 setup 코드를 한 벌만 유지한 채 새
            설정을 적용할 수 있습니다.
          </p>
        </article>
      </div>

      <div className="reduce-motion-refresh-lab__warning">
        <h4>두 가지 경계</h4>
        <p>
          <strong>매치되는 조건이 하나도 없으면 refresh는 아무 일도 하지 않습니다.</strong> "현재 매치되는 것을 실행한다"가 공식 문장이기
          때문입니다. 그래서 이 예제는 <code>reduce</code>와 <code>no-preference</code>처럼 서로 반대인 조건 쌍을 넣어 항상 하나는
          매치되게 했습니다.
        </p>
        <p>
          <strong>refresh는 이 예제만 되돌리지 않습니다.</strong> 공식 문장이 "활성·매치 중인 <em>모든</em> MatchMedia 객체"라고 적은
          대로, 위 예제의 MatchMedia도 함께 되돌아가고 다시 실행됩니다. 버튼을 누른 뒤 위 예제의 실행 횟수도 올라간 것을 확인해 보세요.
        </p>
      </div>

      <p className="reduce-motion-refresh-lab__source">
        실행 코드 위치 · <code>examples/ReduceMotionRefreshLab/useReduceMotionRefreshAnimation.ts</code>
      </p>
    </section>
  )
}
