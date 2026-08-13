/** attribute 채널과 CSS transform 채널의 분리를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import { useSvgAttributeAnimation } from './useSvgAttributeAnimation'
import './SvgAttributeLab.css'

export function SvgAttributeLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, targetRadius, setTargetRadius, duration, setDuration, descriptor, observation, status, reducedMotion, run } =
    useSvgAttributeAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const circle = containerRef.current.querySelector('${descriptor.selector}')

// 1. 시작 반지름을 attr 채널로 되돌립니다.
gsap.set('${descriptor.selector}', { attr: { r: ${descriptor.baselineAttr.r} } })

// 2. CSS transform은 Tween을 준비할 때 고정하고 이후 Tween에서는 건드리지 않습니다.
gsap.set('${descriptor.selector}', { x: ${descriptor.fixedTransform.x} })

// 3. attr 안의 r만 움직이는 paused Tween을 준비합니다.
const tween = gsap.to('${descriptor.selector}', {
  attr: { r: ${descriptor.targetAttr.r} },
  duration: ${descriptor.effectiveDuration},
  ease: 'none',
  paused: true,
  onUpdate() {
    setObservation({
      currentRadius: Number(circle.getAttribute('r')),
      transformX: Number.parseFloat(String(gsap.getProperty(circle, 'x'))),
    })
  },
})

// 4. 실행 버튼을 누르면 준비한 Tween을 처음부터 재생합니다.
function run() {
  tween.restart()
}`

  return (
    <section className="svg-attribute-lab" aria-labelledby="svg-attribute-lab-title">
      <h3 id="svg-attribute-lab-title">attribute만 움직이고 transform은 그대로 두기</h3>
      <p className="svg-attribute-lab__goal">
        아래 원은 <code>r</code> attribute만 바뀝니다. 같은 원의 CSS transform <code>x</code>는 Tween을 준비할 때 고정하고 반지름
        Tween에서는 건드리지 않습니다. 두 숫자를 함께 확인해 보세요.
      </p>

      <div className="svg-attribute-lab__body" ref={scope}>
        <div className="svg-attribute-lab__stage">
          <svg viewBox="0 0 240 160" role="img" aria-labelledby="svg-attribute-lab-svg-title svg-attribute-lab-svg-desc">
            <title id="svg-attribute-lab-svg-title">반지름이 변하는 원 하나</title>
            <desc id="svg-attribute-lab-svg-desc">
              현재 반지름 {observation.currentRadius}, 고정된 CSS transform x는 {observation.transformX}입니다.
            </desc>
            <circle
              className="svg-attribute-lab__baseline"
              cx="66"
              cy="80"
              r={descriptor.baselineAttr.r}
              aria-hidden="true"
            />
            <circle className={descriptor.selector.slice(1)} cx="66" cy="80" r={descriptor.baselineAttr.r} />
          </svg>
          <p className="svg-attribute-lab__legend">
            <span className="svg-attribute-lab__legend-baseline">점선</span> 시작 반지름 {descriptor.baselineAttr.r} ·{' '}
            <span className="svg-attribute-lab__legend-live">채운 원</span> 현재 반지름
          </p>
        </div>

        <fieldset className="svg-attribute-lab__controls">
          <legend>attr 안에 넣을 값</legend>

          <label htmlFor="svg-attr-radius">목표 반지름 (attr.r)</label>
          <output htmlFor="svg-attr-radius">{targetRadius}</output>
          <input
            id="svg-attr-radius"
            type="range"
            min="8"
            max="70"
            step="1"
            value={targetRadius}
            onChange={(event) => setTargetRadius(Number(event.target.value))}
          />

          <label htmlFor="svg-attr-duration">duration</label>
          <output htmlFor="svg-attr-duration">{duration}초</output>
          <input
            id="svg-attr-duration"
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />

          <button type="button" onClick={run}>
            실행
          </button>
        </fieldset>
      </div>

      <p className="svg-attribute-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <dl className="svg-attribute-lab__observation">
        <div>
          <dt id="svg-attr-obs-radius">attribute 채널 · 현재 r</dt>
          <dd>
            <output aria-labelledby="svg-attr-obs-radius" htmlFor="svg-attr-radius">
              {observation.currentRadius}
            </output>
          </dd>
        </div>
        <div>
          <dt id="svg-attr-obs-transform">CSS transform 채널 · 현재 x</dt>
          <dd>
            <output aria-labelledby="svg-attr-obs-transform">{observation.transformX}</output>
          </dd>
        </div>
        <div>
          <dt id="svg-attr-obs-duration">요청한 duration · 실제 duration</dt>
          <dd>
            <output aria-labelledby="svg-attr-obs-duration" htmlFor="svg-attr-duration">
              {descriptor.requestedDuration}초 · {descriptor.effectiveDuration}초
            </output>
          </dd>
        </div>
      </dl>

      <pre className="svg-attribute-lab__code">
        <code>{code}</code>
      </pre>

      <div className="svg-attribute-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            slider를 움직이고 실행하면 원의 크기만 바뀝니다. 원의 <strong>위치는 한 번도 움직이지 않습니다.</strong> 크기는{' '}
            <code>attr</code> 안의 <code>r</code>이 바꾸고, 위치는 <code>attr</code> 밖의 <code>x</code>가 정해 둔 뒤 그대로이기
            때문입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            관찰 패널의 두 숫자를 비교하세요. <strong>현재 r</strong>은 실행할 때마다 바뀌지만 <strong>현재 x</strong>는 항상{' '}
            {descriptor.fixedTransform.x}입니다. 같은 element인데도 두 채널이 서로를 건드리지 않습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            GSAP은 <code>attr</code> 객체 안의 이름을 <strong>element의 attribute</strong>로, 바깥의 이름을{' '}
            <strong>CSS</strong>로 해석합니다. 해석하는 곳이 아예 달라서 이름이 겹쳐도 충돌하지 않습니다. 공식 문서도 같은 element에{' '}
            <code>attr</code> 안의 <code>x</code>와 바깥의 <code>x</code>를 함께 쓴 예제로 이 구분을 보여줍니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            SVG 도형의 attribute 자체를 바꿔야 할 때 씁니다. 원의 <code>r</code>, 사각형의 <code>width</code>, 선의 좌표를{' '}
            <code>attr</code> 안에 적으면 태그의 값이 바뀝니다. 도형 전체를 옮기거나 회전할 때는 예제의 <code>x</code>처럼 transform 값을
            바깥에 적습니다.
          </p>
        </article>
      </div>

      <p className="svg-attribute-lab__source">
        실행 코드 위치 · <code>examples/SvgAttributeLab/useSvgAttributeAnimation.ts</code>
      </p>
    </section>
  )
}
