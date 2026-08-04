/** 곡선 데이터를 바꿔 가며 ease 값과 상자 위치를 함께 확인하는 학습 패널을 조립한다. */
import type { CurvePresetId } from './useCustomEasePathAnimation'
import { useCustomEasePathAnimation } from './useCustomEasePathAnimation'
import './CustomEasePathLab.css'

// radio에 노출할 곡선 preset과 그 곡선이 무엇을 보여 주려는지 한 줄 설명이다
const presetOptions: { value: CurvePresetId; label: string; hint: string }[] = [
  { value: 'smooth', label: '부드러운 S자', hint: '천천히 출발해 천천히 도착하는 가장 흔한 모양' },
  { value: 'hop', label: '공식 hop 예제', hint: '공식 문서가 Quick Start에서 쓰는 그 문자열' },
  { value: 'cubic', label: 'cubic-bezier 네 숫자', hint: 'cubic-bezier.com에서 그대로 복사한 형식' },
  { value: 'overshoot', label: '목적지를 지나치는 곡선', hint: '값이 1을 넘었다가 돌아오는 모양' },
]

export function CustomEasePathLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, presetId, setPresetId, descriptor, observation, status, reducedMotion, seek, play } =
    useCustomEasePathAnimation()

  // 실행에 쓰인 descriptor·관찰값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `CustomEase.create('${descriptor.easeId}', '${descriptor.easeData}')

const tween = gsap.to('${descriptor.targetSelector}', {
  x: ${descriptor.distance},
  ease: '${descriptor.easeId}',
  duration: ${descriptor.duration},
  paused: true,
})

// 재생 대신 헤드를 직접 옮깁니다.
tween.progress(${observation.progress})

// ease 값 ${observation.easeValue} → x = ${observation.offsetX}px`

  return (
    <section className="custom-ease-path-lab" aria-labelledby="custom-ease-path-lab-title">
      <h3 id="custom-ease-path-lab-title">곡선 데이터가 상자를 어디에 두는지 보기</h3>
      <p className="custom-ease-path-lab__goal">
        곡선을 하나 고르고 progress를 직접 옮겨 보세요. 곡선이 그 시점에 내놓은 <strong>ease 값</strong>과 상자의 실제{' '}
        <strong>x</strong>가 어떤 관계인지 확인하는 것이 목표입니다. 대상은 상자 하나, 바뀌는 값도 x 하나뿐입니다.
      </p>

      <div className="custom-ease-path-lab__body" ref={scope}>
        <div className="custom-ease-path-lab__stage">
          <div className="custom-ease-path-lab__track">
            <span className="custom-ease-path-lab__marker" aria-hidden="true" />
            <div className="custom-ease-path-lab__box" aria-hidden="true" />
          </div>
          <p className="custom-ease-path-lab__legend">
            세로선이 <code>x = {descriptor.distance}</code>, 즉 ease 값 1에 해당하는 목적지입니다.
          </p>

          <dl className="custom-ease-path-lab__readout">
            <div>
              <dt>progress</dt>
              <dd>{observation.progress}</dd>
            </div>
            <div>
              <dt>ease 값</dt>
              <dd>{observation.easeValue}</dd>
            </div>
            <div>
              <dt>상자의 x</dt>
              <dd>{observation.offsetX}px</dd>
            </div>
          </dl>

          <p className="custom-ease-path-lab__status" role="status">
            {status}
          </p>
        </div>

        <fieldset className="custom-ease-path-lab__controls">
          <legend>조절할 값</legend>

          <div className="custom-ease-path-lab__radio-group" role="radiogroup" aria-labelledby="custom-ease-preset-label">
            <p id="custom-ease-preset-label">곡선 데이터</p>
            {presetOptions.map((option) => (
              <label key={option.value} htmlFor={`custom-ease-preset-${option.value}`}>
                <input
                  id={`custom-ease-preset-${option.value}`}
                  type="radio"
                  name="custom-ease-preset"
                  value={option.value}
                  checked={presetId === option.value}
                  onChange={() => setPresetId(option.value)}
                />
                <span>
                  {option.label}
                  <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>

          <label htmlFor="custom-ease-progress">progress</label>
          <output htmlFor="custom-ease-progress">
            {observation.progress} · ease 값 {observation.easeValue} · x {observation.offsetX}px
          </output>
          <input
            id="custom-ease-progress"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={observation.progress}
            onChange={(event) => seek(Number(event.target.value))}
          />

          <button type="button" onClick={play}>
            처음부터 재생
          </button>
          {reducedMotion ? (
            <p className="custom-ease-path-lab__reduced">
              모션 감소 설정이 켜져 있어 재생은 이동 없이 끝 값으로 바로 갑니다. slider는 그대로 쓸 수 있습니다.
            </p>
          ) : null}
        </fieldset>
      </div>

      <pre className="custom-ease-path-lab__code">
        <code>{code}</code>
      </pre>

      <div className="custom-ease-path-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            곡선을 바꾸면 <strong>progress는 그대로인데 ease 값과 x가 달라집니다.</strong> 시간은 똑같이 흐르고, 그 시간을 어떤 값으로
            바꿀지만 곡선이 정합니다. 코드 패널의 첫 줄에 들어간 문자열 하나가 유일하게 바뀌는 입력입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>공식 hop 예제</strong>를 고르고 progress를 1까지 끌어 보세요. 상자가 목적지에 닿았다가{' '}
            <strong>출발점으로 되돌아옵니다.</strong> ease 값이 0이기 때문입니다. <strong>목적지를 지나치는 곡선</strong>에서는 ease 값이
            1.2를 넘고 상자가 세로선 오른쪽까지 갑니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            상자의 x는 <code>ease 값 × {descriptor.distance}</code>입니다. 그래서 ease 값이 0이면 출발점, 1이면 목적지, 1.2면 목적지를
            2할 지나친 자리가 됩니다. 곡선 문자열의 <strong>y가 곧 이 ease 값</strong>이고, 공식 hop 데이터는 마지막 y가{' '}
            <code>0</code>이라 끝에서 출발점으로 돌아옵니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            hop처럼 <strong>갔다가 돌아오는 한 번의 움직임</strong>을 tween 하나로 끝낼 때, 그리고 브랜드 모션 가이드가 지정한 곡선을
            디자이너에게 SVG로 받아 그대로 옮길 때 씁니다. 값이 1을 넘는 곡선은 카드가 튀어나오는 강조 연출에 자주 쓰입니다.
          </p>
        </article>
      </div>

      <p className="custom-ease-path-lab__source">
        실행 코드 위치 · <code>examples/CustomEasePathLab/useCustomEasePathAnimation.ts</code>
      </p>
    </section>
  )
}
