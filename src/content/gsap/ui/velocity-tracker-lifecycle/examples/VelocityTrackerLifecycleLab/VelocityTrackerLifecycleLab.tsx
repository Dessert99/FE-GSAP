/** one x/rotation target의 tracking-set lifecycle을 조작하는 lab이다. */
import { useVelocityTrackerLifecycleRuntime } from './useVelocityTrackerLifecycleRuntime'
import './VelocityTrackerLifecycleLab.css'
/** native button control로 property membership과 whole-target cleanup을 관찰하게 한다. */
export function VelocityTrackerLifecycleLab() {
  // runtime이 실행한 descriptor와 sparse lifecycle snapshot을 같은 source로 받는다
  const {
    scope,
    targetRef,
    descriptor,
    snapshot,
    lastActionCode,
    reducedMotion,
    nudge,
    toggleProperty,
    trackSet,
    untrackAll,
  } = useVelocityTrackerLifecycleRuntime()
  // mount setup과 같은 track 호출은 최근 action에서 중복 표시하지 않는다
  const initialTrackCode = `VelocityTracker.track(target, '${descriptor.propertyList}', '${descriptor.typeList}')`
  // setup 이후 실제로 실행한 최근 action만 같은 문맥 뒤에 이어 붙인다
  const recentActionCode =
    lastActionCode === initialTrackCode ? '' : `\n${lastActionCode}`
  // stable target setup과 최근 action, whole-target cleanup을 같은 실행 문맥으로 표시한다
  const code = `const target = document.querySelector('.velocity-tracker-lab__target')
if (!target) throw new Error('velocity target을 찾지 못했습니다.')
gsap.registerPlugin(InertiaPlugin)
VelocityTracker.register(gsap)
const [tracker] = VelocityTracker.track(target, '${descriptor.propertyList}', '${descriptor.typeList}')

// setup 이후 최근 control이 실행한 호출
${recentActionCode}

function cleanup() {
  tracker.remove('x')
  tracker.remove('rotation')
  VelocityTracker.untrack(target)
}`
  return (
    <section
      className="velocity-tracker-lab"
      aria-labelledby="velocity-tracker-lab-title"
    >
      <h3 id="velocity-tracker-lab-title">한 target의 tracking set</h3>
      <p>
        목표: x(px)와 rotation(deg)을 같은 target에서 추적하고, 한 property와
        target 전체 cleanup의 차이를 관찰합니다. 모든 control은 native
        button이므로 Tab 뒤 Space 또는 Enter로 실행할 수 있습니다.
      </p>
      <div ref={scope} className="velocity-tracker-lab__stage">
        <button
          ref={targetRef}
          type="button"
          className="velocity-tracker-lab__target"
          aria-describedby="velocity-tracker-lab-status"
        >
          stable target
        </button>
      </div>
      <div className="velocity-tracker-lab__controls">
        <fieldset>
          <legend>target 값 변경</legend>
          <button type="button" onClick={() => nudge('x', -1)}>
            x −24 px
          </button>
          <button type="button" onClick={() => nudge('x', 1)}>
            x +24 px
          </button>
          <button type="button" onClick={() => nudge('rotation', -1)}>
            rotation −15 deg
          </button>
          <button type="button" onClick={() => nudge('rotation', 1)}>
            rotation +15 deg
          </button>
        </fieldset>
        <fieldset>
          <legend>property membership</legend>
          {descriptor.properties.map((property) => (
            <button
              key={property.name}
              type="button"
              onClick={() => toggleProperty(property.name)}
            >
              {snapshot.membership[property.name]
                ? `${property.name} remove`
                : `${property.name} add (${property.unit})`}
            </button>
          ))}
          <button type="button" onClick={trackSet}>
            track x,rotation
          </button>
          <button type="button" onClick={untrackAll}>
            untrack all
          </button>
        </fieldset>
      </div>
      <p>
        시스템 reduced motion: {reducedMotion ? '켜짐' : '꺼짐'} · 이 lab은
        decorative tween 없이 <code>gsap.set()</code>으로 즉시 값을 바꿉니다.
      </p>
      <p id="velocity-tracker-lab-status" role="status">
        {snapshot.notice}
      </p>
      <dl>
        <div>
          <dt>getByTarget found</dt>
          <dd>{String(snapshot.trackerFound)}</dd>
        </div>
        {descriptor.properties.map((property) => (
          <div key={property.name}>
            <dt>{property.name} membership</dt>
            <dd>
              {String(snapshot.membership[property.name])} ·{' '}
              {Math.round(snapshot.values[property.name])} {property.unit}
            </dd>
          </div>
        ))}
      </dl>
      <pre>
        <code>{code}</code>
      </pre>
      <div className="velocity-tracker-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            remove는 한 property만, untrack all은 target의 현재 set 전체를
            멈춥니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            membership과 getByTarget 결과는 ticker 매 frame이 아니라 action
            뒤에만 갱신됩니다.
          </p>
        </article>
        <article>
          <h4>왜 stable target인가요?</h4>
          <p>
            tracker lookup은 같은 target object를 기준으로 하므로 React node
            identity를 바꾸지 않습니다.
          </p>
        </article>
      </div>
    </section>
  )
}
