/** RoughEase config 여섯 개의 효과를 곡선·이동·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { RoughTaper, RoughTemplate } from './useRoughnessAnimation'
import { useRoughnessAnimation } from './useRoughnessAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './RoughnessLab.css'

// radio에 노출할 taper 값과 읽기 쉬운 설명이다
const taperOptions: { value: RoughTaper; label: string }[] = [
  { value: 'none', label: 'none · 처음부터 끝까지 같은 세기' },
  { value: 'in', label: 'in · 시작 쪽으로 갈수록 가늘게' },
  { value: 'out', label: 'out · 끝 쪽으로 갈수록 가늘게' },
  { value: 'both', label: 'both · 양쪽 끝으로 갈수록 가늘게' },
]

// radio에 노출할 template 후보와 읽기 쉬운 설명이다
const templateOptions: { value: RoughTemplate; label: string }[] = [
  { value: 'none', label: 'none · 직선을 기준으로 흔들림' },
  { value: 'power4.inOut', label: 'power4.inOut · S자 곡선을 기준으로 흔들림' },
]

// 곡선의 세로 좌표계 — value -1이 아래 끝, value 2가 위 끝이 되도록 고정해 clamp 효과를 눈금으로 읽게 한다
const chartHeight = 160
const valueToY = (value: number) => Math.round((150 - (value + 1) * (140 / 3)) * 100) / 100

export function RoughnessLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const {
    scope,
    clamp,
    setClamp,
    points,
    setPoints,
    randomize,
    setRandomize,
    strength,
    setStrength,
    taper,
    setTaper,
    template,
    setTemplate,
    descriptor,
    observation,
    status,
    reducedMotion,
    run,
  } = useRoughnessAnimation()

  // runtime이 뽑아 둔 곡선 좌표를 SVG 문법으로만 직렬화한다
  const curvePoints = observation.points.map((point) => `${Math.round(point.progress * 26000) / 100},${valueToY(point.value)}`).join(' ')

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `// 한 번만 해석해 둡니다. 이 문자열을 tween마다 다시 넘기면 흔들림이 매번 달라집니다.
const roughEase = gsap.parseEase(
  '${descriptor.easeExpression}'
)

// 이전 실행이 남긴 위치를 지우고 같은 출발점으로 되돌립니다.
gsap.set('${descriptor.selector}', { x: 0 })

// 위 그래프도 아래 이동도 이 함수 하나를 씁니다. Tween은 실행 전까지 멈춰 둡니다.
const tween = gsap.to('${descriptor.selector}', {
  x: ${descriptor.x},
  duration: ${descriptor.duration},
  ease: roughEase,
  paused: true,
})

function run() {
  tween.restart()
}`

  return (
    <section className="roughness-lab" aria-labelledby="roughness-lab-title">
      <h3 id="roughness-lab-title">config 하나씩 바꿔 흔들림 모양 보기</h3>
      <p className="roughness-lab__goal">
        위 그래프는 지금 config가 만든 ease 곡선이고, 아래 상자는 그 곡선으로 실제 이동합니다. 값을 하나만 바꾸고 곡선이 어떻게
        달라지는지 먼저 본 다음 실행해 보세요.
      </p>

      <div className="roughness-lab__body" ref={scope}>
        <div className="roughness-lab__stage">
          <svg
            className="roughness-lab__chart"
            viewBox={`0 0 260 ${chartHeight}`}
            role="img"
            aria-labelledby="roughness-chart-title roughness-chart-desc"
          >
            <title id="roughness-chart-title">현재 config가 만든 ease 곡선</title>
            <desc id="roughness-chart-desc">
              가로축은 progress 0에서 1, 세로축은 ease 값입니다. 이 곡선의 최솟값은 {observation.min}, 최댓값은 {observation.max},
              방향이 바뀌는 지점은 {observation.turns}번입니다.
            </desc>
            <line className="roughness-lab__guide" x1="0" y1={valueToY(0)} x2="260" y2={valueToY(0)} />
            <line className="roughness-lab__guide" x1="0" y1={valueToY(1)} x2="260" y2={valueToY(1)} />
            <polyline className="roughness-lab__curve" points={curvePoints} />
          </svg>
          <div className="roughness-lab__track">
            <div className="roughness-lab__target" aria-hidden="true" />
          </div>
        </div>

        <fieldset className="roughness-lab__controls">
          <legend>Config Object</legend>

          <label htmlFor="roughness-points">points</label>
          <output htmlFor="roughness-points">{points}</output>
          <input
            id="roughness-points"
            type="range"
            min="2"
            max="50"
            step="1"
            value={points}
            onChange={(event) => setPoints(Number(event.target.value))}
          />

          <label htmlFor="roughness-strength">strength</label>
          <output htmlFor="roughness-strength">{strength}</output>
          <input
            id="roughness-strength"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={strength}
            onChange={(event) => setStrength(Number(event.target.value))}
          />

          <label className="roughness-lab__check" htmlFor="roughness-randomize">
            <input
              id="roughness-randomize"
              type="checkbox"
              checked={randomize}
              onChange={(event) => setRandomize(event.target.checked)}
            />
            randomize
          </label>

          <label className="roughness-lab__check" htmlFor="roughness-clamp">
            <input id="roughness-clamp" type="checkbox" checked={clamp} onChange={(event) => setClamp(event.target.checked)} />
            clamp
          </label>

          <div className="roughness-lab__radio-group" role="radiogroup" aria-labelledby="roughness-taper-label">
            <p id="roughness-taper-label">taper</p>
            {taperOptions.map((option) => (
              <label key={option.value} htmlFor={`roughness-taper-${option.value}`}>
                <input
                  id={`roughness-taper-${option.value}`}
                  type="radio"
                  name="roughness-taper"
                  value={option.value}
                  checked={taper === option.value}
                  onChange={() => setTaper(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className="roughness-lab__radio-group" role="radiogroup" aria-labelledby="roughness-template-label">
            <p id="roughness-template-label">template</p>
            {templateOptions.map((option) => (
              <label key={option.value} htmlFor={`roughness-template-${option.value}`}>
                <input
                  id={`roughness-template-${option.value}`}
                  type="radio"
                  name="roughness-template"
                  value={option.value}
                  checked={template === option.value}
                  onChange={() => setTemplate(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <button type="button" onClick={run}>
            실행
          </button>
        </fieldset>
      </div>

      <p className="roughness-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <dl className="roughness-lab__observation">
        <div>
          <dt id="roughness-obs-range">곡선이 지나간 값의 범위</dt>
          <dd>
            <output aria-labelledby="roughness-obs-range">
              {observation.min} ~ {observation.max}
            </output>
          </dd>
        </div>
        <div>
          <dt id="roughness-obs-turns">방향이 바뀐 횟수</dt>
          <dd>
            <output aria-labelledby="roughness-obs-turns" htmlFor="roughness-points">
              {observation.turns}회
            </output>
          </dd>
        </div>
      </dl>

      <pre className="roughness-lab__code">
        <code>{code}</code>
      </pre>

      <div className="roughness-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>points</code>를 올리면 곡선을 구성하는 point가 많아져 변화가 더 자주 나타날 수 있습니다. <code>strength</code>를 올리면
            point가 template에서 더 멀리 벗어날 수 있습니다. 실제 결과는 위의 방향 전환 횟수와 값 범위로 확인하세요.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            그래프의 가로 안내선 두 줄이 <code>0</code>과 <code>1</code>입니다. <code>clamp</code>를 켜면 곡선이 그 범위를 넘지 않고,
            끄면 설정과 무작위 배치에 따라 범위 밖으로 나갈 수 있습니다. <code>randomize</code>를 끄면 point가 무작위 대신{' '}
            <strong>고른 지그재그</strong>로 배치됩니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            RoughEase는 <strong>template ease를 기준으로 point를 만들고 연결</strong>합니다. <code>points</code>가 개수,{' '}
            <code>strength</code>가 벗어날 수 있는 거리, <code>taper</code>가 어느 쪽에서 거칠기를 줄일지, <code>template</code>이
            기준선입니다. config가 바뀌면 현재 문자열을 다시 해석하므로 <code>randomize: true</code>에서는 무작위 배치도 새로 만들어집니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            글리치 텍스트, 화면 흔들림, 전기 스파크나 낡은 필름 느낌처럼 <strong>일부러 거칠어야 하는</strong> 연출에 씁니다.{' '}
            <code>randomize: false</code>로 두면 무작위가 아닌 규칙적인 왕복이 되어 진동이나 떨림 표현에 어울립니다. 값 자체가 튀면 곤란한
            UI 이동에는 <code>clamp: true</code>를 함께 씁니다.
          </p>
        </article>
      </div>

      <p className="roughness-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/ease-pack/examples/RoughnessLab/useRoughnessAnimation.ts" />
      </p>
    </section>
  )
}
