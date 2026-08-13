/** keyboard sample과 inertia throw를 하나의 bounded puck에서 실행한다. */
import type { KeyboardEvent } from 'react'
import { inertiaProperties } from '../../inertia.properties'
import { useInertiaPuckAnimation } from './useInertiaPuckAnimation'
import './InertiaPuckLab.css'

export function InertiaPuckLab() {
  // runtime hook은 descriptor와 display snapshot을 동일한 target call에서 제공한다
  const {
    scope,
    puckRef,
    descriptor,
    snapshot,
    reducedMotion,
    setMode,
    sampleVelocity,
    throwPuck,
  } = useInertiaPuckAnimation()
  // keyboard left/right를 sample action으로 한정해 native button activation과 구분한다
  const onPuckKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    sampleVelocity(event.key === 'ArrowRight' ? 28 : -28)
  }
  // 표시 코드는 runtime과 같은 target·tracking·cleanup 경계 안에서 descriptor를 직렬화한다
  const actionCode = reducedMotion
    ? `gsap.killTweensOf(puck)
const position = Number(gsap.getProperty(puck, 'x')) || 0
const finalX = gsap.utils.snap([${descriptor.end.join(', ')}], position)
gsap.set(puck, { x: finalX })`
    : `gsap.killTweensOf(puck)
gsap.to(puck, {\n  inertia: {\n    x: { velocity: ${typeof descriptor.velocity === 'string' ? `'${descriptor.velocity}'` : descriptor.velocity}, min: ${descriptor.min}, max: ${descriptor.max}, end: [${descriptor.end.join(', ')}] },\n    resistance: ${descriptor.resistance},\n    duration: { min: ${descriptor.duration.min}, max: ${descriptor.duration.max} },\n  },\n  onComplete: () => console.log(Number(gsap.getProperty(puck, 'x')) || 0),\n})`
  // plugin setup과 action, whole-target teardown을 하나의 복사 가능한 snippet으로 묶는다
  const code = `const puck = document.querySelector('.inertia-puck-lab__puck')
if (!puck) throw new Error('inertia puck을 찾지 못했습니다.')
gsap.registerPlugin(InertiaPlugin)
InertiaPlugin.track(puck, 'x')

${actionCode}

function cleanup() {
  gsap.killTweensOf(puck)
  InertiaPlugin.untrack(puck, 'x')
}`
  return (
    <section
      className="inertia-puck-lab"
      aria-labelledby="inertia-puck-lab-title"
    >
      <h3 id="inertia-puck-lab-title">
        한 puck의 속도로 어느 notch에 멈출까요?
      </h3>
      <p>
        puck에 focus한 뒤 ←/→를 눌러 x sample을 만들고, numeric 또는 tracker{' '}
        <code>auto</code>를 골라 throw합니다.
      </p>
      <div ref={scope} className="inertia-puck-lab__stage">
        <div className="inertia-puck-lab__line" aria-hidden="true">
          {descriptor.end.map((end) => (
            <i key={end} style={{ left: `${end / 2.8}%` }} />
          ))}
        </div>
        <button
          ref={puckRef}
          type="button"
          className="inertia-puck-lab__puck"
          onKeyDown={onPuckKeyDown}
          aria-describedby="inertia-puck-note"
        >
          puck
        </button>
      </div>
      <div className="inertia-puck-lab__controls">
        <label>
          <span>velocity input</span>
          <select
            value={descriptor.mode}
            onChange={(event) =>
              setMode(event.target.value as typeof descriptor.mode)
            }
          >
            <option value="numeric">numeric sample</option>
            <option value="auto">tracked auto</option>
          </select>
        </label>
        <button type="button" onClick={() => sampleVelocity(-28)}>
          ← sample
        </button>
        <button type="button" onClick={() => sampleVelocity(28)}>
          sample →
        </button>
        <button type="button" onClick={throwPuck}>
          throw with inertia
        </button>
      </div>
      <p
        id="inertia-puck-note"
        className="inertia-puck-lab__notice"
        aria-live="polite"
      >
        {snapshot.notice}
      </p>
      <dl>
        <div>
          <dt>tracking x</dt>
          <dd>{String(snapshot.tracked)}</dd>
        </div>
        <div>
          <dt>read velocity</dt>
          <dd>{Math.round(snapshot.velocity)} px/s</dd>
        </div>
        <div>
          <dt>last position의 nearest notch</dt>
          <dd>{Math.round(snapshot.nearestNotch)}</dd>
        </div>
        <div>
          <dt>last position</dt>
          <dd>{Math.round(snapshot.position)}</dd>
        </div>
      </dl>
      <pre>
        <code>{code}</code>
      </pre>
      <div className="inertia-puck-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            numeric은 descriptor 수치를, auto는 실제 tracker read를 inertia
            input으로 씁니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            min/max 밖으로 final resting value가 나가지 않고 end array의 notch로
            향합니다.
          </p>
        </article>
        <article>
          <h4>왜 readout이 멈춰 있나요?</h4>
          <p>
            매 frame React state를 쓰지 않아 runtime tween과 설명 UI가 경쟁하지
            않습니다.
          </p>
        </article>
      </div>
      <table>
        <thead>
          <tr>
            <th>property</th>
            <th>type</th>
            <th>lab use</th>
          </tr>
        </thead>
        <tbody>
          {inertiaProperties.map((property) => (
            <tr key={property.name}>
              <th>
                <code>{property.name}</code>
              </th>
              <td>{property.type}</td>
              <td>{property.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
