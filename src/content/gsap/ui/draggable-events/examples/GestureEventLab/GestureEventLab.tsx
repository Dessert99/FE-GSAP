/** event descriptor가 listener 등록·log·표시 코드를 함께 만드는 interactive lab이다. */
import { draggableEventProperties } from '../../draggable-events.properties'
import {
  gestureEventDescriptors,
  useGestureEventRuntime,
} from './useGestureEventRuntime'
import './GestureEventLab.css'

/** 한 draggable target의 gesture event와 recent-drag 결정을 관찰하게 한다. */
export function GestureEventLab() {
  // runtime이 만든 real target, event log, static snapshot과 actions를 연결한다
  const {
    scope,
    targetRef,
    entries,
    isPressed,
    elapsed,
    decision,
    recentDragThreshold,
    simulate,
    checkClickDecision,
  } = useGestureEventRuntime()
  // runtime descriptor 목록만 문법으로 직렬화해 등록 코드와 버튼 이름을 맞춘다
  const code = gestureEventDescriptors
    .map(
      (descriptor) =>
        `draggable.addEventListener('${descriptor.name}', onGesture)`,
    )
    .join('\n')
  return (
    <section
      className="gesture-event-lab"
      aria-labelledby="gesture-event-lab-title"
    >
      <h3 id="gesture-event-lab-title">
        한 gesture의 순간마다 한 번만 log를 남겨 보세요
      </h3>
      <p className="gesture-event-lab__goal">
        카드를 직접 drag하거나 event 버튼을 누르세요. listener는 event가 발생할
        때만 실행되고, recent-drag 시간은 click 결정을 누를 때만 읽습니다.
      </p>
      <div ref={scope} className="gesture-event-lab__body">
        <div className="gesture-event-lab__stage">
          <div
            ref={targetRef}
            className="gesture-event-lab__target"
            tabIndex={0}
          >
            <strong>drag target</strong>
            <span>직접 press · drag · release</span>
          </div>
        </div>
        <div className="gesture-event-lab__controls">
          <p>접근 가능한 event simulation</p>
          <div>
            {gestureEventDescriptors.map((descriptor) => (
              <button
                key={descriptor.name}
                type="button"
                onClick={() => simulate(descriptor)}
              >
                {descriptor.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={checkClickDecision}>
            recent-drag click 결정 확인
          </button>
          <p>
            button simulation은 등록 listener를 dispatch하지만 실제 pointer
            press나 drag 종료 시간을 만들지 않습니다.
          </p>
        </div>
      </div>
      <dl className="gesture-event-lab__snapshot">
        <div>
          <dt>instance.isPressed</dt>
          <dd>{String(isPressed)}</dd>
        </div>
        <div>
          <dt>Draggable.timeSinceDrag()</dt>
          <dd>{elapsed.toFixed(2)} seconds</dd>
        </div>
        <div>
          <dt>official threshold</dt>
          <dd>{recentDragThreshold} seconds</dd>
        </div>
      </dl>
      <p className="gesture-event-lab__decision">{decision}</p>
      <pre className="gesture-event-lab__code">
        <code>{code}</code>
      </pre>
      <div className="gesture-event-lab__log-wrap">
        <h4>gesture log</h4>
        <ol>
          {entries.length === 0 ? (
            <li>
              직접 drag하거나 simulation button을 누르면 event가 여기
              추가됩니다.
            </li>
          ) : (
            entries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.event}</strong>
                <span>
                  {entry.origin} · isPressed {String(entry.pressed)} ·{' '}
                  {entry.elapsed.toFixed(2)}s
                </span>
              </li>
            ))
          )}
        </ol>
      </div>
      <div className="gesture-event-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            event마다 listener가 한 번 log를 추가합니다. 매 frame clock을 돌리지
            않아도 press·drag·release처럼 의미 있는 순간을 구분할 수 있습니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            실제 target을 누르는 동안 <code>isPressed</code>가 true가 되고
            release 뒤 false가 됩니다. simulation은 listener 흐름만 보여 주므로
            physical state를 바꾸지 않습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            <code>timeSinceDrag()</code>는 마지막 drag가 끝난 뒤 seconds를
            반환합니다. click handler가 그 순간에 threshold와 비교하면 최근 drag
            뒤의 의도치 않은 click을 건너뛸 수 있습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            drag 가능한 container 안 link나 button의 click action을 보호할 때 쓸
            수 있습니다. 공식 예제처럼 그 경우 <code>dragClickables: true</code>
            도 함께 검토합니다.
          </p>
        </article>
      </div>
      <div className="gesture-event-lab__table-wrap">
        <table>
          <caption>이 lab의 event/state surface</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">타입</th>
              <th scope="col">시점</th>
              <th scope="col">관찰</th>
            </tr>
          </thead>
          <tbody>
            {draggableEventProperties.map((property) => (
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
      <p className="gesture-event-lab__source">
        실행 코드 위치 ·{' '}
        <code>examples/GestureEventLab/useGestureEventRuntime.ts</code>
      </p>
    </section>
  )
}
