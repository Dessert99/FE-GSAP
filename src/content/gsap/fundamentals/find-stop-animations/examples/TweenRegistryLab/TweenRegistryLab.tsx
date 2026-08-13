/** 세 조회 API의 범위 차이를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import { useTweenRegistryAnimation } from './useTweenRegistryAnimation'
import './TweenRegistryLab.css'

export function TweenRegistryLab() {
  // runtime이 소유한 descriptor·조회 결과·조작 action을 그대로 받아 화면에만 쓴다
  const { scope, descriptor, progress, query, status, reducedMotion, runQuery, play, pause, seek, reset } =
    useTweenRegistryAnimation()

  // 실행에 쓰인 descriptor와 마지막 조회 결과를 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const box = gsap.utils.toArray('${descriptor.selector}', scope.current)[0]
gsap.set(box, { x: 0 })

// 반환값을 보관하지 않고 id만 붙여 만듭니다.
gsap.to(box, {
  x: ${descriptor.targetX},
  duration: ${descriptor.duration},
  ease: 'none',
  id: '${descriptor.tweenId}',
  paused: true,
  onUpdate() {
    const tween = gsap.getById('${descriptor.tweenId}')
    setProgress(Number(tween?.progress().toFixed(2) ?? 0))
  },
})

// 재생·일시정지·slider도 id로 다시 찾은 Tween을 조작합니다.
function play() { gsap.getById('${descriptor.tweenId}')?.restart() }
function pause() { gsap.getById('${descriptor.tweenId}')?.pause() }
function seek(value) { gsap.getById('${descriptor.tweenId}')?.progress(value) }

// 조회 버튼은 세 질문을 같은 순간에 실행합니다.
gsap.getById('${descriptor.tweenId}')  // → ${query ? query.byId : '아직 조회하지 않음'}
gsap.getTweensOf(box).length         // → ${query ? query.tweensOfCount : '아직 조회하지 않음'}
gsap.isTweening(box)                 // → ${query ? String(query.tweening) : '아직 조회하지 않음'}`

  return (
    <section className="tween-registry-lab" aria-labelledby="tween-registry-lab-title">
      <h3 id="tween-registry-lab-title">변수 없이 Tween을 다시 조회하기</h3>
      <p className="tween-registry-lab__goal">
        아래 상자를 움직이는 Tween은 어떤 변수에도 담겨 있지 않습니다. <code>id</code> 하나와 상자 element만 가지고 세 가지 방법으로
        찾아보고, 각 방법이 서로 다른 답을 주는 순간을 확인하세요.
      </p>

      <div className="tween-registry-lab__body" ref={scope}>
        <div className="tween-registry-lab__stage">
          <div className="tween-registry-lab__box" />
          <p className="tween-registry-lab__playhead">
            <span>재생 헤드</span>
            <output aria-live="off">progress {progress.toFixed(2)}</output>
          </p>
        </div>

        <fieldset className="tween-registry-lab__controls">
          <legend>조작</legend>

          {descriptor.allowPlayback ? (
            <>
              <button type="button" onClick={play}>
                처음부터 재생
              </button>
              <button type="button" onClick={pause}>
                일시정지
              </button>
            </>
          ) : (
            <>
              <label htmlFor="registry-progress">재생 헤드 위치</label>
              <output htmlFor="registry-progress">{progress.toFixed(2)}</output>
              <input
                id="registry-progress"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={progress}
                onChange={(event) => seek(Number(event.target.value))}
              />
            </>
          )}

          <button type="button" onClick={runQuery}>
            지금 조회하기
          </button>
          <button type="button" onClick={reset}>
            Tween 새로 만들기
          </button>
        </fieldset>
      </div>

      <p className="tween-registry-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이라 재생 버튼 대신 슬라이더로 재생 헤드를 옮깁니다.)' : ''}
      </p>

      <dl className="tween-registry-lab__observation">
        <div>
          <dt id="registry-obs-id">gsap.getById('{descriptor.tweenId}')</dt>
          <dd>
            <output aria-labelledby="registry-obs-id">{query ? query.byId : '아직 조회하지 않음'}</output>
          </dd>
        </div>
        <div>
          <dt id="registry-obs-target">gsap.getTweensOf(box).length</dt>
          <dd>
            <output aria-labelledby="registry-obs-target">{query ? `${query.tweensOfCount}개` : '아직 조회하지 않음'}</output>
          </dd>
        </div>
        <div>
          <dt id="registry-obs-active">gsap.isTweening(box)</dt>
          <dd>
            <output aria-labelledby="registry-obs-active">{query ? String(query.tweening) : '아직 조회하지 않음'}</output>
          </dd>
        </div>
        <div>
          <dt id="registry-obs-progress">조회한 순간의 progress</dt>
          <dd>
            <output aria-labelledby="registry-obs-progress">{query ? query.atProgress.toFixed(2) : '아직 조회하지 않음'}</output>
          </dd>
        </div>
      </dl>

      <pre className="tween-registry-lab__code">
        <code>{code}</code>
      </pre>

      <div className="tween-registry-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            변수가 없어도 <code>getById</code>가 <strong>Tween instance를 그대로 돌려줍니다.</strong> 돌려받은 instance의{' '}
            <code>progress()</code>를 읽어 화면에 찍었으니, 이름만 가지고 진짜 그 Tween을 되찾은 것이 맞습니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            {reducedMotion ? (
              <>
                슬라이더로 옮긴 Tween은 계속 paused 상태라 <code>getById</code>와 <code>getTweensOf</code>에는 잡히고{' '}
                <code>isTweening</code>은 <code>false</code>입니다.
              </>
            ) : (
              <>
                움직이는 <strong>도중에</strong> 한 번, <strong>일시정지한 뒤</strong> 한 번 조회해 보세요. <code>getById</code>와{' '}
                <code>getTweensOf</code>는 두 번 다 찾아내지만 <code>isTweening</code>만 <strong>true → false</strong>로 바뀝니다.
              </>
            )}
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            앞의 두 조회는 <strong>"GSAP이 아직 들고 있는가"</strong>를 묻고, <code>isTweening</code>은{' '}
            <strong>"지금 값을 쓰고 있는가"</strong>를 묻습니다. 공식 문서가 밝힌 대로 paused·completed·시작 전 Tween은 active로 치지
            않습니다. 질문이 다르니 답도 다릅니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            같은 버튼을 연달아 눌러 animation이 겹치는 것을 막을 때 <code>isTweening</code>으로 먼저 확인합니다. 반대로 화면을 떠날 때
            정리해야 할 Tween이 남아 있는지 확인할 때는 <code>getTweensOf</code>가 맞습니다.
          </p>
        </article>
      </div>

      <p className="tween-registry-lab__source">
        실행 코드 위치 · <code>examples/TweenRegistryLab/useTweenRegistryAnimation.ts</code>
      </p>
    </section>
  )
}
