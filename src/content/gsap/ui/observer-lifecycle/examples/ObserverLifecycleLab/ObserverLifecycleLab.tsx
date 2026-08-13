/** native lifecycle command controls와 actual isEnabled state를 동기화한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { observerLifecycleProperties } from '../../observer-lifecycle.properties'
import { useObserverLifecycleRuntime } from './useObserverLifecycleRuntime'

/** command descriptor가 실제 Observer lifecycle과 표시 코드를 함께 구동한다. */
export function ObserverLifecycleLab() {
  // runtime이 만든 target, command descriptor, actual state를 연결한다.
  const { targetRef, command, setCommand, state, isEnabled, runCommand } =
    useObserverLifecycleRuntime()
  // 같은 command descriptor로 instance 생성부터 선택한 method까지 재현한다.
  const commandCode =
    command === 'recreate'
      ? 'observer.kill()\nobserver = createObserver()'
      : `observer.${command}()`
  // 모든 상태에서 단독 실행할 수 있도록 Observer 선언을 함께 표시한다.
  const code = `import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(Observer)

const setup = () => {
  const target = document.querySelector('.observer-lifecycle-lab__target')
  if (!target) throw new Error('lifecycle target이 필요합니다.')
  const createObserver = () => Observer.create({ target, type: 'pointer' })
  let observer = createObserver()

  ${commandCode.replaceAll('\n', '\n  ')}
  return () => observer.kill()
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`
  return (
    <section id="lifecycle-lab">
      <InteractiveExample
        title="Observer lifecycle 바꾸기"
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
            className="observer-lifecycle-lab__target"
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
          '화면 상태, isEnabled 값, 실행 가능한 명령이 서로 맞는지 확인합니다.',
          'cleanup이 이 예제에서 만든 instance만 정리하는지 확인합니다.',
        ]}
        explanation={
          <p>
            Observer를 만들고 찾는 방법을 먼저 익힌 뒤, 여기서는 같은 instance를
            잠시 멈추는 경우와 완전히 정리하는 경우를 구분합니다.
          </p>
        }
        onReplay={runCommand}
        replayLabel="run command"
      />
    </section>
  )
}
