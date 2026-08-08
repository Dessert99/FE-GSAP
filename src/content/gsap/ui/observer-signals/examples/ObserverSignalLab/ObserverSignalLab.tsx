/** 하나의 Observer descriptor가 signal vector, frozen snapshot, code를 함께 구동한다. */
import type { CSSProperties } from 'react'
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { observerSignalsProperties } from '../../observer-signals.properties'
import {
  useObserverSignalRuntime,
  type ObserverSignalReadout,
} from './useObserverSignalRuntime'
import './ObserverSignalLab.css'

// 큰 delta가 axes를 넘지 않도록 vector preview의 이동량을 제한한다
const clampVector = (value: number) => Math.max(-56, Math.min(56, value))

// nullable coordinate를 실제 input 전에도 오해 없는 text로 바꾼다
const formatNumber = (value: number | null) =>
  value === null ? 'not received' : value.toFixed(1)

// one readout을 phase table의 label/value tuple로 순서 있게 만든다
const createRows = (readout: ObserverSignalReadout) =>
  [
    ['phase', readout.phase],
    [
      'startX / startY',
      `${formatNumber(readout.startX)} / ${formatNumber(readout.startY)}`,
    ],
    ['x / y', `${formatNumber(readout.x)} / ${formatNumber(readout.y)}`],
    [
      'deltaX / deltaY',
      `${readout.deltaX.toFixed(1)} / ${readout.deltaY.toFixed(1)} px`,
    ],
    [
      'velocityX / velocityY',
      `${readout.velocityX.toFixed(1)} / ${readout.velocityY.toFixed(1)} px/s`,
    ],
    ['event.type', readout.eventType],
    ['Observer.isTouch', String(readout.isTouch)],
  ] as const

/** pointer·wheel input을 actual Observer signal과 명시적 frozen snapshot으로 비교한다. */
export function ObserverSignalLab() {
  // runtime의 owned Observer refs와 one descriptor-derived outputs를 받는다
  const {
    scope,
    inputPadRef,
    descriptor,
    visualReadout,
    snapshot,
    announcement,
    requestFreeze,
  } = useObserverSignalRuntime()
  // callback-cycle delta가 static axes 안에서만 보이도록 style value를 만든다
  const vectorStyle = {
    transform: `translate(${clampVector(visualReadout.deltaX)}px, ${clampVector(visualReadout.deltaY)}px)`,
  } satisfies CSSProperties
  // visual readout과 frozen snapshot을 같은 table row shape로 만든다
  const visualRows = createRows(visualReadout)
  // snapshot이 없을 때는 request action 전임을 명시적으로 남긴다
  const snapshotRows = snapshot ? createRows(snapshot) : null
  // descriptor literal과 actual create callbacks를 code panel에만 직렬화한다
  const code = `const descriptor = {
  id: '${descriptor.id}',
  type: '${descriptor.type}',
  tolerance: ${descriptor.tolerance},
  debounce: ${descriptor.debounce},
}

const observer = Observer.create({
  target: inputPad,
  ...descriptor,
  onPress: (self) => publishVisual(self, 'press'),
  onMove: (self) => publishVisual(self, 'move'),
  onChange: (self) => publishVisual(self, 'change'),
  onWheel: (self) => publishVisual(self, 'wheel'),
})

const snapshot = readSignal(observer, 'frozen')`

  // one input scope와 one freeze action을 InteractiveExample에 전달한다
  return (
    <section id="observer-signal-lab">
      <InteractiveExample
        title="one signal scope: current readout과 frozen snapshot"
        description="pad에서 pointer를 움직이거나 wheel을 돌린 뒤 snapshot을 고정하세요. 움직이는 값은 화면에만, 고정 요청 결과만 상태 메시지로 전달됩니다."
        sourcePath="src/content/gsap/ui/observer-signals/examples/ObserverSignalLab/useObserverSignalRuntime.ts"
        controls={
          <div className="observer-signal-lab__controls">
            <button type="button" onClick={requestFreeze}>
              현재 signal snapshot 고정
            </button>
            <p>
              pointer move 또는 wheel을 입력한 뒤 이 버튼으로 한 시점을
              비교합니다.
            </p>
          </div>
        }
        preview={
          <div ref={scope} className="observer-signal-lab">
            <div
              ref={inputPadRef}
              className="observer-signal-lab__pad"
              tabIndex={0}
              aria-describedby="observer-signal-lab-help"
            >
              <span
                className="observer-signal-lab__axis observer-signal-lab__axis--x"
                aria-hidden="true"
              >
                x
              </span>
              <span
                className="observer-signal-lab__axis observer-signal-lab__axis--y"
                aria-hidden="true"
              >
                y
              </span>
              <span
                className="observer-signal-lab__vector"
                style={vectorStyle}
                aria-hidden="true"
              />
              <span>pointer move or wheel here</span>
            </div>
            <p id="observer-signal-lab-help">
              axes의 점은 마지막 callback delta 방향입니다. 값은 자동으로
              읽히지만 말하지는 않습니다.
            </p>
            <div className="observer-signal-lab__tables">
              <section aria-labelledby="observer-signal-current-title">
                <h4 id="observer-signal-current-title">visual readout</h4>
                <table>
                  <tbody>
                    {visualRows.map(([label, value]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <section aria-labelledby="observer-signal-snapshot-title">
                <h4 id="observer-signal-snapshot-title">
                  request-to-freeze snapshot
                </h4>
                {snapshotRows ? (
                  <table>
                    <tbody>
                      {snapshotRows.map(([label, value]) => (
                        <tr key={label}>
                          <th scope="row">{label}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>
                    아직 snapshot이 없습니다. 명시적으로 고정하면 여기에서
                    비교합니다.
                  </p>
                )}
              </section>
            </div>
            <p className="observer-signal-lab__announcement" role="status">
              {announcement}
            </p>
          </div>
        }
        code={code}
        propertyDetails={[...observerSignalsProperties]}
        changes={[
          'startX/startY는 press 기준점이고 x/y는 current client coordinate입니다.',
          'deltaX/deltaY는 callback-cycle 변화량이며 velocityX/velocityY는 pixels per second입니다.',
          'event는 최근 watched input을, Observer.isTouch는 static device capability를 읽습니다.',
        ]}
        watchFor={[
          'wheel은 delta와 velocity를 바꾸지만 x/y의 client coordinate를 새로 만들지 않습니다.',
          'continuous visual table은 live region이 아니고 freeze button 결과만 status로 전달됩니다.',
          'snapshot은 다음 input으로 바뀌지 않으므로 current readout과 시간 기준을 비교할 수 있습니다.',
        ]}
        explanation={
          <p>
            같은 Observer instance라도 각 signal은 서로 다른 질문에 답합니다.
            press 기준점은 start, 현재 pointer 위치는 x/y, callback 사이의
            변화는 delta, 시간당 변화는 velocity, 입력 종류는 event에서
            읽습니다.
          </p>
        }
        onReplay={requestFreeze}
        replayLabel="현재 snapshot 고정"
      />
    </section>
  )
}
