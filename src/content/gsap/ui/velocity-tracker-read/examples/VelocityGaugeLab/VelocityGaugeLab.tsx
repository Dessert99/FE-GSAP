/** one target/property descriptor가 live gauge, query matrix, code를 함께 공급한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { velocityTrackerReadProperties } from '../../velocity-tracker-read.properties'
import './VelocityGaugeLab.css'
import { useVelocityGaugeRuntime } from './useVelocityGaugeRuntime'

/** P17의 actual lookup/read calls를 snapshot UI로 가르친다. */
export function VelocityGaugeLab() {
  // one descriptor가 selected property, range input, runtime query와 serializer를 함께 공급한다.
  const {
    property,
    setProperty,
    position,
    snapshot,
    descriptor,
    reducedMotion,
    setPropertyValue,
    captureSnapshot,
  } = useVelocityGaugeRuntime()
  // runtime descriptor와 same call order를 code 문법으로만 표현한다.
  const code = `gsap.registerPlugin(VelocityTracker)

const ${descriptor.targetLabel} = { x: 0, rotation: 0 }
const [tracker] = VelocityTracker.track(${descriptor.targetLabel}, '${descriptor.properties}', '${descriptor.type}')

function setPropertyValue(value) {
  ${descriptor.targetLabel}.${descriptor.property} = value
}

function captureSnapshot() {
  const found = VelocityTracker.getByTarget(${descriptor.targetLabel}) ?? tracker
  return {
    found: Boolean(found),
    staticTracked: VelocityTracker.isTracking(${descriptor.targetLabel}, '${descriptor.property}'),
    instanceTracked: Boolean(found?.isTracking('${descriptor.property}')),
    velocity: found ? found.get('${descriptor.property}') : null,
    staticVelocity: found ? VelocityTracker.getVelocity(${descriptor.targetLabel}, '${descriptor.property}') : null,
  }
}

function cleanup() {
  VelocityTracker.untrack(${descriptor.targetLabel}, '${descriptor.properties}')
}`
  const displayedVelocity = snapshot?.instanceVelocity ?? 'sample pending'
  return (
    <section id="velocity-gauge-lab">
      <InteractiveExample
        title="stable target velocity snapshot"
        description="x 또는 rotation 값을 먼저 바꾼 뒤 snapshot을 요청하세요. gauge와 query matrix는 그 순간 한 번만 갱신되므로 slider input 자체가 screen reader에 계속 velocity를 알리지 않습니다."
        sourcePath="src/content/gsap/ui/velocity-tracker-read/examples/VelocityGaugeLab/useVelocityGaugeRuntime.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>read property</span>
              </span>
              <select
                value={property}
                onChange={(event) => setProperty(event.target.value as typeof property)}
              >
                <option value="x">x · px/s</option>
                <option value="rotation">rotation · deg/s</option>
              </select>
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>{descriptor.property} value</span>
                <output>{position[descriptor.property]}</output>
              </span>
              <input
                type="range"
                min={descriptor.input.min}
                max={descriptor.input.max}
                step={descriptor.input.step}
                value={position[descriptor.property]}
                onChange={(event) => setPropertyValue(Number(event.target.value))}
              />
            </label>
            <button type="button" onClick={captureSnapshot}>
              requested snapshot 읽기
            </button>
          </div>
        }
        preview={
          <div className="velocity-gauge-lab">
            <div className="velocity-gauge-lab__stage">
              <span
                className="velocity-gauge-lab__target"
                style={{ transform: `translateX(${position.x}px) rotate(${position.rotation}deg)` }}
              >
                stable target
              </span>
            </div>
            <div className="velocity-gauge-lab__matrix">
              <p>
                <strong>tracker.get('{descriptor.property}')</strong> → {displayedVelocity}{' '}
                {snapshot?.instanceVelocity !== null && snapshot ? descriptor.unit : ''}
              </p>
              <p>
                getByTarget: {snapshot ? String(snapshot.lookupFound) : 'pending'} · static
                membership: {snapshot ? String(snapshot.staticMembership) : 'pending'} · instance
                membership: {snapshot ? String(snapshot.instanceMembership) : 'pending'}
              </p>
              <p>
                tracker.target === stable target:{' '}
                {snapshot ? String(snapshot.targetIdentity) : 'pending'} · missing lookup:{' '}
                {snapshot ? String(snapshot.missingLookup) : 'pending'} · missing membership:{' '}
                {snapshot ? String(snapshot.missingMembership) : 'pending'}
              </p>
            </div>
            {snapshot ? (
              <p role="status">
                requested snapshot: {descriptor.property} instance velocity {displayedVelocity}{' '}
                {descriptor.unit}; static getVelocity {snapshot.staticVelocity ?? 'sample pending'}{' '}
                {descriptor.unit}.
              </p>
            ) : null}
          </div>
        }
        code={code}
        propertyDetails={velocityTrackerReadProperties}
        changes={[
          `${descriptor.property} input은 same stable target을 바꾸고, requested snapshot만 ${descriptor.unit} gauge를 갱신합니다.`,
          'getByTarget → membership → get 순서라 missing target에는 instance get을 호출하지 않습니다.',
          'static isTracking(target, property)과 instance property query를 함께 표시해 installed 3.15 call boundary를 드러냅니다.',
        ]}
        watchFor={[
          'slider를 바꾼 직후와 잠시 멈춘 뒤 snapshot 숫자가 sample timing에 따라 달라지는지 봅니다.',
          'x/rotation을 바꾸면 unit, query property, code가 같은 descriptor 값으로 바뀌는지 봅니다.',
          'missing target은 false lookup/membership으로만 보이고 velocity read가 시도되지 않는지 봅니다.',
        ]}
        explanation={
          <p>
            VelocityTracker는 <strong>속도를 만들어 내는 animation</strong>이 아니라 최근 property
            변화의 rate를 기억하는 tracker입니다. 따라서 read 전에 target과 property를 모두
            확인하고, user가 원할 때만 snapshot을 발표하는 편이 continuous input을 더 읽기 쉽게
            만듭니다.
          </p>
        }
        onReplay={captureSnapshot}
        replayLabel="현재 값 snapshot 다시 읽기"
      />
    </section>
  )
}
