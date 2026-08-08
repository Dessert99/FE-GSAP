/** one input pad, keyboard direction buttons, registry inspector를 Observer descriptor와 동기화한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { observerCreateProperties } from '../../observer-create.properties'
import './ObserverInputPad.css'
import { useObserverInputPadRuntime } from './useObserverInputPadRuntime'

/** P25의 actual create result를 native controls와 registry table로 표시한다. */
export function ObserverInputPad() {
  // runtime descriptor와 observer callback/registry readout을 one lab에 연결한다.
  const {
    padRef,
    descriptor,
    direction,
    delta,
    registry,
    sendKeyboardDirection,
  } = useObserverInputPadRuntime()
  // same descriptor literal을 create call code에만 format한다.
  const code = `const observer = Observer.create({
  target: inputPad,
  id: '${descriptor.id}',
  type: '${descriptor.type}',
  tolerance: ${descriptor.tolerance},
  debounce: ${descriptor.debounce},
  preventDefault: ${descriptor.preventDefault},
  lockAxis: ${descriptor.lockAxis},
})
const all = Observer.getAll()
const found = Observer.getById('${descriptor.id}')`

  return (
    <section id="observer-lab">
      <InteractiveExample
        title="owned Observer input pad and registry"
        description="pad 위에서 pointer drag 또는 wheel을 사용하거나 keyboard direction buttons를 누르세요. Observer callback의 discrete direction과 actual registry lookup을 나란히 확인합니다."
        sourcePath="src/content/gsap/ui/observer-create/examples/ObserverInputPad/useObserverInputPadRuntime.ts"
        controls={
          <div className="observer-input-pad__buttons">
            {(['up', 'down', 'left', 'right'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendKeyboardDirection(item)}
              >
                keyboard {item}
              </button>
            ))}
          </div>
        }
        preview={
          <div className="observer-input-pad">
            <div
              ref={padRef}
              className="observer-input-pad__target"
              tabIndex={0}
              aria-label="Observer input pad"
            >
              pointer drag or wheel here
            </div>
            <p role="status">last direction: {direction}</p>
            <output>
              delta x: {delta.x} · delta y: {delta.y}
            </output>
            <dl>
              <div>
                <dt>Observer.getAll().length</dt>
                <dd>{registry.count}</dd>
              </div>
              <div>
                <dt>getById owned match</dt>
                <dd>{String(registry.found)}</dd>
              </div>
              <div>
                <dt>observer.target === pad</dt>
                <dd>{String(registry.targetMatches)}</dd>
              </div>
              <div>
                <dt>observer.vars.id</dt>
                <dd>{registry.varsId || 'pending'}</dd>
              </div>
            </dl>
          </div>
        }
        code={code}
        propertyDetails={observerCreateProperties}
        changes={[
          'type은 observed inputs를 comma list로 정합니다.',
          'tolerance/debounce는 movement callback timing을 바꾸고 lockAxis는 first drag direction을 고정합니다.',
          'registry inspector는 getAll/getById와 target/vars를 actual instance에서 읽습니다.',
        ]}
        watchFor={[
          'continuous delta output은 live region이 아니며 screen reader에 매 movement를 말하지 않습니다.',
          'keyboard buttons는 pointer event를 흉내 내지 않고 direction vocabulary의 accessible fallback입니다.',
          'unmount cleanup은 registry all을 kill하지 않고 this owned observer 하나만 kill합니다.',
        ]}
        explanation={
          <p>
            Observer는 여러 physical input을 directional callback으로
            정리합니다. ScrollTrigger를 이미 load했다면{' '}
            <code>ScrollTrigger.observe()</code>는{' '}
            <code>Observer.create()</code>와 identical하므로 Observer file을
            따로 load하지 않아도 됩니다.
          </p>
        }
        onReplay={() => sendKeyboardDirection('up')}
        replayLabel="show keyboard up"
      />
    </section>
  )
}
