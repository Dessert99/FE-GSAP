/** native lifecycle command controls와 actual isEnabled state를 동기화한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { observerLifecycleProperties } from '../../observer-lifecycle.properties'
import { useObserverLifecycleRuntime } from './useObserverLifecycleRuntime'

/** P28 command descriptor가 actual Observer lifecycle을 설명한다. */
export function ObserverLifecycleLab() {
  // runtime이 만든 target, command descriptor, actual state를 연결한다.
  const { targetRef, command, setCommand, state, isEnabled, runCommand } =
    useObserverLifecycleRuntime()
  // 같은 command descriptor가 code panel의 실제 method call도 결정한다.
  const code =
    command === 'recreate'
      ? "const observer = Observer.create({ target, type: 'pointer' })"
      : `observer.${command}()`
  return (
    <section id="lifecycle-lab">
      <InteractiveExample
        title="owned Observer lifecycle"
        description="disable, enable, kill, recreate 중 하나를 선택하세요. killed state에서는 enable을 실행하지 않고 recreate만 새 instance를 만듭니다."
        sourcePath="src/content/gsap/ui/observer-lifecycle/examples/ObserverLifecycleLab/useObserverLifecycleRuntime.ts"
        controls={
          <div className="interactive-example__control-list">
            <select
              aria-label="Observer lifecycle command"
              value={command}
              onChange={(event) =>
                setCommand(event.target.value as typeof command)
              }
            >
              <option value="disable">disable</option>
              <option value="enable" disabled={state === 'killed'}>
                enable
              </option>
              <option value="kill" disabled={state === 'killed'}>
                kill
              </option>
              <option value="recreate">recreate</option>
            </select>
            <button type="button" onClick={runCommand}>
              run {command}
            </button>
          </div>
        }
        preview={
          <div
            ref={targetRef}
            tabIndex={0}
            aria-label="Observer lifecycle input target"
          >
            <p role="status">lifecycle state: {state}</p>
            <p>isEnabled: {String(isEnabled)}</p>
          </div>
        }
        code={code}
        propertyDetails={observerLifecycleProperties}
        changes={[
          'disable removes listeners while retaining the instance.',
          'enable reattaches listeners before the instance is killed.',
          'kill needs explicit recreate; it cannot be re-enabled.',
        ]}
        watchFor={[
          'state, actual isEnabled, and command availability agree.',
          'cleanup kills every page-owned instance only.',
        ]}
        explanation={
          <p>
            P25 create is the prerequisite and is linked after root route
            integration.
          </p>
        }
        onReplay={runCommand}
        replayLabel="run command"
      />
    </section>
  )
}
