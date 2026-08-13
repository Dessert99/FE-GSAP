/** 전역 배속을 걸었을 때 tween 자신의 설정은 그대로인 것과, 전역 값이 1로 복원되는 것을 함께 관찰하는 학습 패널이다. */
import type { GlobalSpeed } from './useGlobalTimeScaleAnimation'
import { useGlobalTimeScaleAnimation } from './useGlobalTimeScaleAnimation'
import './GlobalTimeScaleLab.css'

// 라디오로 고를 수 있는 배속 — 0.5와 2는 공식 예제가 직접 든 값이다
const speeds: { value: GlobalSpeed; label: string }[] = [
  { value: 0.25, label: '0.25배 (디버깅용 초저속)' },
  { value: 0.5, label: '0.5배 (공식 예제)' },
  { value: 1, label: '1배 (기본)' },
  { value: 2, label: '2배 (공식 예제)' },
]

export function GlobalTimeScaleLab() {
  // runtime이 소유한 descriptor·관찰값·action을 그대로 받아 화면에만 쓴다
  const { scope, requested, setRequested, descriptor, observation, status, reducedMotion, run, restore } =
    useGlobalTimeScaleAnimation()

  // 실제 실행에 쓰인 배속·거리·시간을 코드 문법으로만 포맷한다
  const code = `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

function GlobalTimeScaleExample() {
const scope = useRef(null)
const tweenRef = useRef(null)
const startedAtRef = useRef(0)
const [, setObservation] = useState({})
const requestedTimeScale = ${descriptor.requestedTimeScale}
const timeScale = ${descriptor.appliedTimeScale}
const duration = ${descriptor.effectiveDuration}

function round(value) {
  return Math.round(value * 100) / 100
}

function report() {
  const tween = tweenRef.current
  if (!tween) return
  const globalTimeScale = gsap.globalTimeline.timeScale()
  setObservation({
    globalTimeScale,
    tweenOwnTimeScale: tween.timeScale(),
    tweenSeconds: round(tween.time()),
    wallSeconds: round((performance.now() - startedAtRef.current) / 1000),
    restored: globalTimeScale === 1,
  })
}

useGSAP(() => {
  const target = scope.current?.querySelector('${descriptor.selector}')
  if (!target) return
  gsap.set(target, { x: 0 })

  // Tween은 버튼을 누를 때 재생하도록 미리 준비합니다
  const tween = gsap.to(target, {
    x: ${descriptor.travelX},
    duration,
    ease: 'none',
    paused: true,
    onUpdate: report,
    onComplete() {
      gsap.globalTimeline.timeScale(1)
      report()
    },
  })
  tweenRef.current = tween
  startedAtRef.current = performance.now()
  report()

  return () => {
    tween.kill()
    gsap.globalTimeline.timeScale(1)
    tweenRef.current = null
  }
}, {
  scope,
  dependencies: [requestedTimeScale, timeScale, duration],
  revertOnUpdate: true,
})

function run() {
  const tween = tweenRef.current
  if (!tween) return
  gsap.globalTimeline.timeScale(timeScale)
  startedAtRef.current = performance.now()
  tween.restart()
}

function restore() {
  gsap.globalTimeline.timeScale(1)
  report()
}

return <div ref={scope}>
  <div className="${descriptor.selector.slice(1)}" />
  <button onClick={run}>실행</button>
  <button onClick={restore}>1로 복원</button>
</div>
}
// 지금 읽은 전역 값: ${observation.globalTimeScale}`

  return (
    <section className="global-timescale-lab" aria-labelledby="global-timescale-lab-title">
      <h3 id="global-timescale-lab-title">전체를 한 번에 느리게 만들어 보기</h3>
      <p className="global-timescale-lab__goal">
        <code>gsap.globalTimeline.timeScale()</code> 하나만 바꿉니다. 상자의 <code>duration</code>은 건드리지 않습니다. tween 자신의{' '}
        <code>timeScale()</code>이 그대로인데도 화면이 느려지는지, 그리고 끝난 뒤 전역 값이 1로 돌아오는지 보세요.
      </p>

      <div className="global-timescale-lab__body" ref={scope}>
        <div className="global-timescale-lab__stage">
          <div className="global-timescale-lab__track">
            <div className="global-timescale-lab__target" />
          </div>
          <dl className="global-timescale-lab__observation">
            <div>
              <dt id="gtl-global">globalTimeline.timeScale()</dt>
              <dd>
                <output aria-labelledby="gtl-global">{observation.globalTimeScale}</output>
              </dd>
            </div>
            <div>
              <dt id="gtl-own">이 Tween 자신의 timeScale()</dt>
              <dd>
                <output aria-labelledby="gtl-own">{observation.tweenOwnTimeScale}</output>
              </dd>
            </div>
            <div>
              <dt id="gtl-tween">Tween이 흐른 시간</dt>
              <dd>
                <output aria-labelledby="gtl-tween">{observation.tweenSeconds}초</output>
              </dd>
            </div>
            <div>
              <dt id="gtl-wall">실제로 흐른 시간</dt>
              <dd>
                <output aria-labelledby="gtl-wall">{observation.wallSeconds}초</output>
              </dd>
            </div>
            <div className="global-timescale-lab__restore-state">
              <dt id="gtl-restored">전역 값 복원 상태</dt>
              <dd>
                <output aria-labelledby="gtl-restored">
                  {observation.restored ? '복원됨 (1)' : `복원 안 됨 (${observation.globalTimeScale})`}
                </output>
              </dd>
            </div>
          </dl>
        </div>

        <div className="global-timescale-lab__controls">
          <fieldset>
            <legend>전역 배속</legend>
            {speeds.map((speed) => (
              <label key={speed.value}>
                <input
                  type="radio"
                  name="global-timescale"
                  value={speed.value}
                  checked={requested === speed.value}
                  onChange={() => setRequested(speed.value)}
                />
                {speed.label}
              </label>
            ))}
          </fieldset>
          <button type="button" onClick={run}>
            실행하기
          </button>
          <button type="button" onClick={restore}>
            지금 1로 되돌리기
          </button>
        </div>
      </div>

      <p className="global-timescale-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 전역 배속을 바꾸지 않고 최종 위치만 보여줍니다.)' : ''}
      </p>

      <pre className="global-timescale-lab__code">
        <code>{code}</code>
      </pre>

      <div className="global-timescale-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>Tween 자신의 timeScale()은 계속 1</strong>인데 화면은 느려집니다. 0.5배에서는 "Tween이 흐른 시간"이 "실제로 흐른
            시간"의 절반쯤에서 따라옵니다. 두 숫자의 차이가 곧 전역 배속입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            끝난 직후 <strong>전역 값 복원 상태</strong>를 보세요. <code>1</code>로 돌아와 있어야 합니다. 실행 도중에{' '}
            <strong>지금 1로 되돌리기</strong>를 누르면 남은 구간이 곧바로 정상 속도로 이어지는 것도 확인할 수 있습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서 표현대로 이 값은 <strong>개별 tween의 timeScale을 설정하지 않습니다.</strong> 모든 animation을 담고 있는 root
            timeline이 재생되는 속도를 바꿀 뿐입니다. 자식은 자기 시간을 부모에게서 받아 가므로 설정이 그대로인 채 느려집니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            <strong>디버깅</strong>입니다. 순식간에 지나가는 전환을 <code>timeScale(0.2)</code>로 늘려 놓고 어느 구간이 어긋났는지
            눈으로 찾습니다. 다만 전역 값이라 확인이 끝나면 반드시 1로 되돌려야 합니다.
          </p>
        </article>
      </div>

      <p className="global-timescale-lab__source">
        실행 코드 위치 · <code>examples/GlobalTimeScaleLab/useGlobalTimeScaleAnimation.ts</code>
      </p>
    </section>
  )
}
