/** target 좌표와 pointer 좌표가 달라지는 press→drag→release lab이다. */
import { draggableCoordinateProperties } from '../../draggable-coordinates.properties'
import { useCoordinateAnimation } from './useCoordinateAnimation'
import './CoordinateLab.css'

/** descriptor 하나에서 code와 실제 drag instance를 함께 보여 준다. */
export function CoordinateLab() {
  // runtime이 만든 actual target, descriptor, phase snapshot을 화면에 연결한다
  const { scope, targetRef, mode, setMode, descriptor, snapshot, reset } =
    useCoordinateAnimation()
  // 선택한 type만 serialize해 실행 코드와 control을 동기화한다
  const code = `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useRef, useState } from 'react'

gsap.registerPlugin(Draggable)

function CoordinateExample() {
const scope = useRef(null)
const targetRef = useRef(null)
const frameRef = useRef(null)
const [resetKey, setResetKey] = useState(0)
const [, setSnapshot] = useState({})

useGSAP(() => {
  const puck = targetRef.current
  if (!puck) return
  gsap.set(puck, { clearProps: 'transform' })

  function read(phase, instance) {
    setSnapshot({
      phase,
      x: instance.x,
      y: instance.y,
      rotation: instance.rotation,
      startX: instance.startX,
      startY: instance.startY,
      deltaX: instance.deltaX,
      deltaY: instance.deltaY,
      endX: instance.endX,
      endY: instance.endY,
      endRotation: instance.endRotation,
      pointerX: instance.pointerX,
      pointerY: instance.pointerY,
      pointerEvent: instance.pointerEvent?.type ?? '아직 없음',
      direction: String(instance.getDirection('start')),
    })
  }

  function scheduleRead(phase, instance) {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      read(phase, instance)
    })
  }

  const [instance] = Draggable.create(puck, {
    type: '${descriptor.type}',
    onPress() { scheduleRead('press', instance) },
    onDrag() { scheduleRead('drag', instance) },
    onRelease() { scheduleRead('release', instance) },
  })
  read('idle', instance)

  return () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    instance.kill()
    gsap.set(puck, { clearProps: 'transform' })
  }
}, {
  scope,
  dependencies: ['${descriptor.type}', resetKey],
  revertOnUpdate: true,
})

function reset() {
  setResetKey((key) => key + 1)
}

return <div ref={scope}>
  <div ref={targetRef} className="coordinate-lab__puck">drag</div>
  <button onClick={reset}>처음 위치로 reset</button>
</div>
}`
  return (
    <section className="coordinate-lab" aria-labelledby="coordinate-lab-title">
      <h3 id="coordinate-lab-title">
        같은 pointer gesture에서 target 값과 pointer 값을 따로 읽어 보세요
      </h3>
      <p className="coordinate-lab__goal">
        puck을 press하고 drag한 뒤 release하세요. translation과 rotation을
        바꾸면 같은 이름의 좌표가 무엇을 뜻하는지도 바뀝니다.
      </p>
      <div ref={scope} className="coordinate-lab__body">
        <div className="coordinate-lab__stage">
          <div className="coordinate-lab__origin" aria-hidden="true" />
          <div ref={targetRef} className="coordinate-lab__puck" tabIndex={0}>
            <strong>drag</strong>
            <span>{descriptor.type}</span>
          </div>
        </div>
        <div className="coordinate-lab__controls">
          <label htmlFor="coordinate-mode">
            좌표 descriptor
            <select
              id="coordinate-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as typeof mode)}
            >
              <option value="translation">translation · x,y</option>
              <option value="rotation">rotation · degrees</option>
            </select>
          </label>
          <button type="button" onClick={reset}>
            즉시 처음 위치로 reset
          </button>
          <p>
            이 reset은 tween이 아니라 <code>gsap.set()</code> cleanup으로 즉시
            적용됩니다.
          </p>
        </div>
      </div>
      <p className="coordinate-lab__phase">
        현재 단계 · <strong>{snapshot.phase}</strong>
      </p>
      <div className="coordinate-lab__readouts">
        <article>
          <h4>target snapshot</h4>
          <dl>
            <div>
              <dt>startX / startY</dt>
              <dd>
                {snapshot.startX} / {snapshot.startY}
              </dd>
            </div>
            <div>
              <dt>x / y</dt>
              <dd>
                {snapshot.x} / {snapshot.y}
              </dd>
            </div>
            <div>
              <dt>deltaX / deltaY</dt>
              <dd>
                {snapshot.deltaX} / {snapshot.deltaY}
              </dd>
            </div>
            <div>
              <dt>rotation</dt>
              <dd>{snapshot.rotation}°</dd>
            </div>
          </dl>
        </article>
        <article>
          <h4>pointer snapshot</h4>
          <dl>
            <div>
              <dt>pointerX / pointerY</dt>
              <dd>
                {snapshot.pointerX} / {snapshot.pointerY}
              </dd>
            </div>
            <div>
              <dt>pointerEvent</dt>
              <dd>{snapshot.pointerEvent}</dd>
            </div>
            <div>
              <dt>getDirection('start')</dt>
              <dd>{snapshot.direction}</dd>
            </div>
          </dl>
        </article>
      </div>
      <aside className="coordinate-lab__release">
        <strong>release summary</strong>
        <span>
          endX {snapshot.endX} · endY {snapshot.endY} · endRotation{' '}
          {snapshot.endRotation}°
        </span>
      </aside>
      <pre className="coordinate-lab__code">
        <code>{code}</code>
      </pre>
      <div className="coordinate-lab__table-wrap">
        <table>
          <caption>drag 단계마다 읽을 수 있는 좌표와 방향</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">타입</th>
              <th scope="col">시점</th>
              <th scope="col">관찰</th>
            </tr>
          </thead>
          <tbody>
            {draggableCoordinateProperties.map((property) => (
              <tr key={property.name}>
                <th scope="row">
                  <code>{property.name}</code>
                </th>
                <td>{property.type}</td>
                <td>{property.timing}</td>
                <td>{property.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="coordinate-lab__source">
        실행 코드 위치 ·{' '}
        <code>examples/CoordinateLab/useCoordinateAnimation.ts</code>
      </p>
    </section>
  )
}
