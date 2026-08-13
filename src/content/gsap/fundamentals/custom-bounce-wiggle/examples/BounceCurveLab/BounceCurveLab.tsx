/** CustomBounce의 네 option이 곡선과 공 하나의 낙하를 어떻게 바꾸는지 조작·관찰·코드로 함께 확인하는 학습 패널이다. */
import { graphSize, useBounceCurveAnimation } from './useBounceCurveAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './BounceCurveLab.css'

/** 공식이 범위만 밝힌 strength에서 "적게·기본·많이"를 대표하는 세 값이다. */
const strengthChoices = [0.3, 0.7, 0.9]

/** 공식 설명이 언급한 0(없음)·2(보통)·4(더 김) 세 값만 고르게 한다. */
const squashChoices = [0, 2, 4]

export function BounceCurveLab() {
  // 훅이 제공한 controls·descriptor·관찰값을 그대로 받아 화면에 쓴다
  const {
    scope,
    strength,
    setStrength,
    endAtStart,
    setEndAtStart,
    squash,
    setSquash,
    squashIdMode,
    setSquashIdMode,
    progress,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
    seek,
  } = useBounceCurveAnimation()

  // 실행에 쓰인 config를 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const createConfigCode = [
    `strength: ${descriptor.createConfig.strength}`,
    `endAtStart: ${descriptor.createConfig.endAtStart}`,
    `squash: ${descriptor.createConfig.squash}`,
    ...(descriptor.createConfig.squashID ? [`squashID: '${descriptor.createConfig.squashID}'`] : []),
  ].join(', ')

  // 실제 paused timeline과 같은 순서로 초기화·Tween 구성·재생·스크럽 코드를 보여준다
  const code = `gsap.registerPlugin(CustomEase, CustomBounce)

// 1. 설정값 하나로 bounce ease를 만듭니다. squash가 0보다 크면 squash ease도 같이 생깁니다.
CustomBounce.create('${descriptor.bounceId}', { ${createConfigCode} })

// 2. 만든 이름을 그대로 넘겨 곡선을 SVG path 문자열로 받습니다.
const bouncePath = CustomEase.getSVGData('${descriptor.bounceId}', { width: ${graphSize.width}, height: ${graphSize.height} })
${
  descriptor.squashId
    ? `// squash 곡선도 별도 path로 보관합니다.
const squashPath = CustomEase.getSVGData('${descriptor.squashId}', { width: ${graphSize.width}, height: ${graphSize.height} })`
    : ''
}

// 3. 이전 실행이 남긴 위치와 크기를 원래 값으로 되돌립니다.
gsap.set('${descriptor.selector}', { y: 0, scaleX: 1, scaleY: 1 })

// 4. 재생과 progress 조작에 함께 쓸 timeline을 만듭니다.
const timeline = gsap.timeline({ paused: true })

// 5. 위치는 위에서 바닥까지 떨어뜨립니다.
timeline.from('${descriptor.selector}', {
  y: ${descriptor.liftY},
  duration: ${descriptor.duration},
  ease: '${descriptor.bounceId}',
})
${
  descriptor.squashId
    ? `
// 6. 같은 대상, 같은 시각에 scale Tween을 겹칩니다.
timeline.to(
  '${descriptor.selector}',
  {
    scaleX: ${descriptor.squashVars.scaleX},
    scaleY: ${descriptor.squashVars.scaleY},
    duration: ${descriptor.duration},
    ease: '${descriptor.squashId}',
    transformOrigin: '${descriptor.squashVars.transformOrigin}',
  },
  0,
)`
    : `
// squash가 0이라 두 번째 곡선도, 두 번째 Tween도 없습니다.`
}

// 재생 버튼과 progress 입력은 같은 timeline을 제어합니다.
function run() {
  if (reducedMotion) {
    timeline.progress(1).pause()
    return
  }
  timeline.restart()
}

function seek(value) {
  timeline.pause().progress(value)
}`

  // 곡선 위 현재 위치 — progress는 x축, ease 출력값은 y축이라는 관계를 점 하나로 보여준다
  const cursor = { x: progress * graphSize.width, y: graphSize.height * (1 - observation.ratio) }

  return (
    <section className="bounce-curve-lab" aria-labelledby="bounce-curve-lab-title">
      <h3 id="bounce-curve-lab-title">튕김의 세기와 끝나는 자리 바꿔 보기</h3>
      <p className="bounce-curve-lab__goal">
        공 하나가 위에서 떨어집니다. 움직이는 값은 <code>y</code> 하나뿐이고, 어떻게 튕길지는 전부 <code>CustomBounce</code>가 만든
        곡선이 정합니다. 설정을 바꿔 <strong>곡선과 낙하가 함께 달라지는 것</strong>을 확인해 보세요.
      </p>

      <div className="bounce-curve-lab__body" ref={scope}>
        <div className="bounce-curve-lab__stage">
          <div className="bounce-curve-lab__ball" />
          <div className="bounce-curve-lab__ground" aria-hidden="true" />
          <p className="bounce-curve-lab__caption">
            공 하나 · 움직이는 값은 <code>y</code> 하나
            {descriptor.squashId ? '와 함께 겹쳐 실행되는 scaleX·scaleY' : ''}
          </p>
        </div>

        <div className="bounce-curve-lab__graph">
          <svg viewBox="-6 -6 312 272" role="img" aria-labelledby="bounce-graph-title bounce-graph-desc">
            <title id="bounce-graph-title">CustomBounce가 만든 ease 곡선</title>
            <desc id="bounce-graph-desc">
              가로는 시간 진행률 0에서 1, 세로는 ease 출력값입니다. 현재 진행률은 {progress.toFixed(2)}이고 그때의 출력값은{' '}
              {observation.ratio.toFixed(3)}입니다. 곡선은 출력값 {observation.endRatio.toFixed(0)}에서 끝납니다.
            </desc>
            <line className="bounce-curve-lab__axis" x1="0" y1={graphSize.height} x2={graphSize.width} y2={graphSize.height} />
            <line className="bounce-curve-lab__axis" x1="0" y1="0" x2={graphSize.width} y2="0" />
            {observation.squashPath ? (
              <path className="bounce-curve-lab__squash-curve" d={observation.squashPath} />
            ) : null}
            <path className="bounce-curve-lab__bounce-curve" d={observation.bouncePath} />
            <circle className="bounce-curve-lab__cursor" cx={cursor.x} cy={cursor.y} r="5" />
          </svg>
          <p className="bounce-curve-lab__legend">
            <span className="bounce-curve-lab__legend-bounce">실선</span> bounce 곡선 (<code>{descriptor.bounceId}</code>)
            {descriptor.squashId ? (
              <>
                {' · '}
                <span className="bounce-curve-lab__legend-squash">점선</span> squash 곡선 (<code>{descriptor.squashId}</code>)
              </>
            ) : (
              ' · squash 곡선 없음'
            )}
          </p>
        </div>

        <fieldset className="bounce-curve-lab__controls">
          <legend>CustomBounce.create()에 넘길 값</legend>

          <p className="bounce-curve-lab__field-label" id="bounce-strength-label">
            strength · 얼마나 많이 튕길지
          </p>
          <div className="bounce-curve-lab__choices" role="group" aria-labelledby="bounce-strength-label">
            {strengthChoices.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="bounce-strength"
                  value={value}
                  checked={strength === value}
                  onChange={() => setStrength(value)}
                />
                <span>
                  {value}
                  {value === 0.7 ? ' (기본값)' : ''}
                </span>
              </label>
            ))}
          </div>

          <p className="bounce-curve-lab__field-label" id="bounce-squash-label">
            squash · 바닥에 붙어 있는 시간
          </p>
          <div className="bounce-curve-lab__choices" role="group" aria-labelledby="bounce-squash-label">
            {squashChoices.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="bounce-squash"
                  value={value}
                  checked={squash === value}
                  onChange={() => setSquash(value)}
                />
                <span>
                  {value}
                  {value === 0 ? ' (기본값)' : ''}
                </span>
              </label>
            ))}
          </div>

          <label className="bounce-curve-lab__toggle">
            <input type="checkbox" checked={endAtStart} onChange={(event) => setEndAtStart(event.target.checked)} />
            <span>endAtStart · 시작한 자리로 돌아와 끝내기</span>
          </label>

          <label className="bounce-curve-lab__toggle">
            <input
              type="checkbox"
              checked={squashIdMode === 'explicit'}
              disabled={squash === 0}
              onChange={(event) => setSquashIdMode(event.target.checked ? 'explicit' : 'derived')}
            />
            <span>squashID · squash ease 이름 직접 짓기</span>
          </label>

          <label className="bounce-curve-lab__field-label" htmlFor="bounce-progress">
            progress · 직접 끌어 보기
          </label>
          <output htmlFor="bounce-progress">{progress.toFixed(2)}</output>
          <input
            id="bounce-progress"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
          />

          <button type="button" onClick={run}>
            재생
          </button>
        </fieldset>
      </div>

      <p className="bounce-curve-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 자동 재생 대신 최종 상태만 보여줍니다.)' : ''}
      </p>

      <dl className="bounce-curve-lab__observation">
        <div>
          <dt id="bounce-obs-ratio">지금 progress에서 ease가 내놓는 값</dt>
          <dd>
            <output aria-labelledby="bounce-obs-ratio" htmlFor="bounce-progress">
              {observation.ratio.toFixed(3)}
            </output>
          </dd>
        </div>
        <div>
          <dt id="bounce-obs-end">곡선이 끝나는 값 (endAtStart {endAtStart ? 'true' : 'false'})</dt>
          <dd>
            <output aria-labelledby="bounce-obs-end">{observation.endRatio.toFixed(0)}</output>
          </dd>
        </div>
        <div>
          <dt id="bounce-obs-squash">만들어진 squash ease 이름</dt>
          <dd>
            <output aria-labelledby="bounce-obs-squash">{descriptor.squashId ?? '없음 (squash: 0)'}</output>
          </dd>
        </div>
      </dl>

      <pre className="bounce-curve-lab__code">
        <code>{code}</code>
      </pre>

      <div className="bounce-curve-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>strength</code>를 0.3에서 0.9로 올리면 <strong>튕기는 횟수가 늘어나고</strong> 공도 그만큼 여러 번
            튑니다. <code>squash</code>를 0에서 2, 4로 올리면 곡선이 <strong>바닥값 근처에 머무는 구간이 길어지고</strong> 두 번째
            곡선(점선)이 생깁니다. <code>endAtStart</code>를 켜면 곡선이 1이 아니라 <strong>0에서 끝납니다.</strong>
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            progress를 직접 끌면서 <strong>곡선 위의 점</strong>과 <strong>공의 높이</strong>를 같이 보세요. 가로는 시간, 세로는
            ease가 내놓는 값입니다. 값이 1에 가까울수록 공은 바닥에, 0에 가까울수록 시작 높이에 있습니다. 관찰 패널의 "곡선이 끝나는
            값"도 <code>endAtStart</code>에 따라 1과 0 사이를 오갑니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서는 CustomBounce를 <strong>"넘긴 변수로 CustomEase를 만들어 주는 wrapper"</strong>라고 설명합니다. 즉 여기서
            바뀌는 것은 공의 물리 계산이 아니라 <strong>곡선 하나</strong>입니다. Tween은 <code>y</code>를 시작값에서 끝값까지
            옮기기만 하고, 그 사이 어느 지점에 있을지는 이 곡선이 정합니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            모달이 떨어져 자리를 잡거나, 장바구니 아이콘이 통통 튀며 도착하거나, 게임 UI의 코인이 바닥에 떨어질 때 씁니다. 내장{' '}
            <code>"bounce"</code>는 세기를 못 바꾸기 때문에, <strong>브랜드마다 다른 탄성감</strong>이 필요하면 이 방법을 씁니다.
          </p>
        </article>
      </div>

      <p className="bounce-curve-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/custom-bounce-wiggle/examples/BounceCurveLab/useBounceCurveAnimation.ts" />
      </p>
    </section>
  )
}
