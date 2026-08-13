/** wiggles·type·property 값이 곡선과 바늘 하나의 회전을 어떻게 나눠 맡는지 조작·관찰·코드로 함께 확인하는 학습 패널이다. */
import type { WiggleType } from './useWiggleShapeAnimation'
import { graphSize, useWiggleShapeAnimation } from './useWiggleShapeAnimation'
import './WiggleShapeLab.css'

/** 공식 최소 예제(6)와 기본값(10), 문자열 예제(15)를 그대로 고르게 한다. */
const wiggleChoices = [6, 10, 15]

/** 공식이 게시한 다섯 type과 각각의 한 줄 관찰 요약이다. */
const typeChoices: { value: WiggleType; hint: string }[] = [
  { value: 'easeOut', hint: '처음이 가장 크고 점점 작아집니다 (기본값)' },
  { value: 'easeInOut', hint: '가운데가 가장 큽니다' },
  { value: 'anticipate', hint: '본 진동 전에 반대 방향으로 움직입니다' },
  { value: 'uniform', hint: '처음부터 끝까지 세기가 같습니다' },
  { value: 'random', hint: '만들 때마다 모양이 달라집니다' },
]

/** 공식 문장이 세기 비교에 쓴 두 값이다. */
const rotationChoices = [10, 30]

export function WiggleShapeLab() {
  // 훅이 제공한 controls·descriptor·관찰값을 그대로 받아 화면에 쓴다
  const {
    scope,
    wiggles,
    setWiggles,
    type,
    setType,
    rotation,
    setRotation,
    progress,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
    seek,
  } = useWiggleShapeAnimation()

  // 실제 paused Tween과 같은 순서로 초기화·생성·재생·스크럽 코드를 보여준다
  const code = `gsap.registerPlugin(CustomEase, CustomWiggle)

// 1. 진동 횟수와 스타일만 넘겨 이름 붙은 곡선을 만듭니다.
CustomWiggle.create('${descriptor.wiggleId}', { wiggles: ${descriptor.createConfig.wiggles}, type: '${descriptor.createConfig.type}' })

// 2. 만든 이름을 그대로 넘겨 곡선을 SVG path 문자열로 받습니다.
const wigglePath = CustomEase.getSVGData('${descriptor.wiggleId}', { width: ${graphSize.width}, height: ${graphSize.height} })

// 3. 이전 실행이 남긴 회전을 0도로 되돌립니다.
gsap.set('${descriptor.selector}', { rotation: 0 })

// 4. 세기는 config가 아니라 이 rotation 값이 정합니다.
const tween = gsap.to('${descriptor.selector}', {
  rotation: ${descriptor.rotation},
  duration: ${descriptor.duration},
  ease: '${descriptor.wiggleId}',
  paused: true,
})

// 재생 버튼과 progress 입력은 같은 Tween을 제어합니다.
function run() {
  if (reducedMotion) {
    tween.progress(1).pause()
    return
  }
  tween.restart()
}

function seek(value) {
  tween.pause().progress(value)
}`

  // 곡선 좌표계에서 출력값 0은 세로 한가운데다 — 아래로 내려간 값은 반대 방향 회전을 뜻한다
  const zeroLine = graphSize.height
  // 곡선 위 현재 위치 — progress는 x축, ease 출력값은 y축이라는 관계를 점 하나로 보여준다
  const cursor = { x: progress * graphSize.width, y: graphSize.height * (1 - observation.ratio) }

  return (
    <section className="wiggle-shape-lab" aria-labelledby="wiggle-shape-lab-title">
      <h3 id="wiggle-shape-lab-title">흔들림의 횟수·스타일과 세기를 따로 바꿔 보기</h3>
      <p className="wiggle-shape-lab__goal">
        바늘 하나가 좌우로 흔들립니다. 움직이는 값은 <code>rotation</code> 하나뿐입니다.{' '}
        <strong>몇 번, 어떤 결로 흔들지는 곡선이</strong> 정하고, <strong>얼마나 멀리 갈지는 Tween의 값이</strong> 정합니다. 둘을
        따로 바꿔 보세요.
      </p>

      <div className="wiggle-shape-lab__body" ref={scope}>
        <div className="wiggle-shape-lab__stage">
          <div className="wiggle-shape-lab__pivot">
            <div className="wiggle-shape-lab__needle" />
          </div>
          <p className="wiggle-shape-lab__caption">
            바늘 하나 · 움직이는 값은 <code>rotation</code> 하나 · 목표값 {descriptor.rotation}도
          </p>
        </div>

        <div className="wiggle-shape-lab__graph">
          <svg viewBox="-6 -6 312 332" role="img" aria-labelledby="wiggle-graph-title wiggle-graph-desc">
            <title id="wiggle-graph-title">CustomWiggle이 만든 ease 곡선</title>
            <desc id="wiggle-graph-desc">
              가로는 시간 진행률 0에서 1, 세로는 ease 출력값입니다. 가운데 가로선이 출력값 0이고 위로 갈수록 1, 아래로 갈수록 -1에
              가깝습니다. 현재 진행률은 {progress.toFixed(2)}이고 그때의 출력값은 {observation.ratio.toFixed(3)}입니다. 곡선은
              출력값 {observation.endRatio.toFixed(0)}에서 끝나 시작한 자리로 돌아옵니다.
            </desc>
            <line className="wiggle-shape-lab__zero" x1="0" y1={zeroLine} x2={graphSize.width} y2={zeroLine} />
            <path className="wiggle-shape-lab__curve" d={observation.wigglePath} />
            <circle className="wiggle-shape-lab__cursor" cx={cursor.x} cy={cursor.y} r="5" />
          </svg>
          <p className="wiggle-shape-lab__legend">
            가운데 실선이 출력값 0입니다. 곡선이 위에 있으면 목표 각도 쪽으로, 아래에 있으면 반대 방향으로 돌아간 상태입니다.
          </p>
        </div>

        <fieldset className="wiggle-shape-lab__controls">
          <legend>곡선이 정하는 값과 Tween이 정하는 값</legend>

          <p className="wiggle-shape-lab__field-label" id="wiggle-count-label">
            wiggles · 앞뒤로 오가는 횟수
          </p>
          <div className="wiggle-shape-lab__choices" role="group" aria-labelledby="wiggle-count-label">
            {wiggleChoices.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="wiggle-count"
                  value={value}
                  checked={wiggles === value}
                  onChange={() => setWiggles(value)}
                />
                <span>
                  {value}
                  {value === 10 ? ' (기본값)' : ''}
                </span>
              </label>
            ))}
          </div>

          <p className="wiggle-shape-lab__field-label" id="wiggle-type-label">
            type · 흔들림의 결
          </p>
          <div className="wiggle-shape-lab__types" role="group" aria-labelledby="wiggle-type-label">
            {typeChoices.map((choice) => (
              <label key={choice.value}>
                <input
                  type="radio"
                  name="wiggle-type"
                  value={choice.value}
                  checked={type === choice.value}
                  onChange={() => setType(choice.value)}
                />
                <span>
                  <code>{choice.value}</code>
                  <small>{choice.hint}</small>
                </span>
              </label>
            ))}
          </div>

          <p className="wiggle-shape-lab__field-label" id="wiggle-rotation-label">
            rotation · 세기 (config가 아니라 Tween 값)
          </p>
          <div className="wiggle-shape-lab__choices" role="group" aria-labelledby="wiggle-rotation-label">
            {rotationChoices.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="wiggle-rotation"
                  value={value}
                  checked={rotation === value}
                  onChange={() => setRotation(value)}
                />
                <span>{value}도</span>
              </label>
            ))}
          </div>

          <label className="wiggle-shape-lab__field-label" htmlFor="wiggle-progress">
            progress · 직접 끌어 보기
          </label>
          <output htmlFor="wiggle-progress">{progress.toFixed(2)}</output>
          <input
            id="wiggle-progress"
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

      <p className="wiggle-shape-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 자동 재생 대신 최종 상태만 보여줍니다.)' : ''}
      </p>

      <dl className="wiggle-shape-lab__observation">
        <div>
          <dt id="wiggle-obs-ratio">지금 progress에서 ease가 내놓는 값</dt>
          <dd>
            <output aria-labelledby="wiggle-obs-ratio" htmlFor="wiggle-progress">
              {observation.ratio.toFixed(3)}
            </output>
          </dd>
        </div>
        <div>
          <dt id="wiggle-obs-angle">그래서 지금 바늘의 각도</dt>
          <dd>
            <output aria-labelledby="wiggle-obs-angle">{(observation.ratio * descriptor.rotation).toFixed(1)}도</output>
          </dd>
        </div>
        <div>
          <dt id="wiggle-obs-end">곡선이 끝나는 값</dt>
          <dd>
            <output aria-labelledby="wiggle-obs-end">{observation.endRatio.toFixed(0)}</output>
          </dd>
        </div>
      </dl>

      <pre className="wiggle-shape-lab__code">
        <code>{code}</code>
      </pre>

      <div className="wiggle-shape-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>wiggles</code>를 6에서 15로 올리면 <strong>진동 횟수가 늘어납니다.</strong> <code>type</code>을 바꾸면 횟수는
            그대로인데 <strong>어느 시점이 가장 크게 흔들리는지</strong>가 달라집니다.{' '}
            <code>rotation</code>을 10과 30 사이에서 바꾸면 <strong>곡선은 그대로인데 바늘이 가는 거리만</strong> 달라집니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            관찰 패널의 두 숫자를 비교하세요. <strong>ease가 내놓는 값</strong>은 −1과 1 사이를 오가고,{' '}
            <strong>바늘의 각도</strong>는 그 값에 목표 각도를 곱한 결과입니다. <code>rotation</code>만 바꿔 보면 왼쪽 숫자는
            그대로이고 오른쪽 숫자만 커집니다. 그리고 어떤 설정에서든 곡선은 <strong>0에서 끝나 제자리로 돌아옵니다.</strong>
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서의 문장 그대로입니다. <strong>"ease는 tween에 넘긴 각 property 값을 향한 움직임의 비율만 제어한다."</strong>{' '}
            그래서 CustomWiggle에는 세기 option이 아예 없습니다. 얼마나 멀리 갈지는 언제나 Tween이 넘긴 값이 정하고, 곡선은 그 값의
            몇 퍼센트 지점에 있을지만 정합니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            잘못된 입력에 폼이 좌우로 떨릴 때, 알림 종이 딸랑거릴 때, 눌리지 않는 버튼이 "안 된다"고 반응할 때 씁니다. 이런 움직임은
            대부분 <strong>같은 값을 여러 번 오가고 제자리로 돌아오는</strong> 형태라, keyframes로 지점을 일일이 적는 것보다 진동
            횟수 하나로 정하는 편이 훨씬 짧습니다.
          </p>
        </article>
      </div>

      <p className="wiggle-shape-lab__source">
        실행 코드 위치 · <code>examples/WiggleShapeLab/useWiggleShapeAnimation.ts</code>
      </p>
    </section>
  )
}
