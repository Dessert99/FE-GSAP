/** command descriptor와 actual SplitText DOM snapshots를 한 learning frame에 연결한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import {
  splitTextLifecycleCommands,
  splitTextLifecycleConfig,
} from '../../split-text-lifecycle.descriptor'
import { splitTextLifecycleProperties } from '../../split-text-lifecycle.properties'
import { useSplitTextLifecycleRuntime } from './useSplitTextLifecycleRuntime'
import './SplitTextLifecycleLab.css'

/** P33 command가 실제 split DOM·isSplit·code와 함께 변하는 lab이다. */
export function SplitTextLifecycleLab() {
  // runtime이 관리하는 실제 target, command descriptor, snapshots를 가져온다.
  const {
    targetRef,
    command,
    setCommand,
    width,
    setWidth,
    beforeSnapshot,
    afterSnapshot,
    isSplit,
    status,
    reducedMotion,
    runCommand,
  } = useSplitTextLifecycleRuntime()
  // selected descriptor가 표시할 실제 method call을 고른다.
  const selectedCommand = splitTextLifecycleCommands[command]
  // re-split 전에 stale wrapper animation을 정리하는 실제 순서를 code에 더한다.
  const commandCode =
    command === 'resplit'
      ? `ownedAnimation?.kill()\n${selectedCommand.code}`
      : selectedCommand.code
  // 같은 config descriptor와 selected command를 code panel 문법으로 직렬화한다.
  const code = `import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const splitOptions = ${JSON.stringify(splitTextLifecycleConfig, null, 2)}

const onSplit = (split) => gsap.from(split.chars, {
  autoAlpha: 0,
  y: ${reducedMotion ? 0 : 10},
  duration: ${reducedMotion ? 0 : 0.25},
  stagger: ${reducedMotion ? 0 : 0.015},
})
const splitConfig = { ...splitOptions, onSplit }

// ${selectedCommand.label} 명령
${commandCode}`
  return (
    <section id="split-text-lifecycle-lab">
      <InteractiveExample
        title="resizable SplitText lifecycle"
        description="너비를 바꾼 뒤 command를 실행하고, 원래 DOM과 split wrapper snapshot이 어떻게 다른지 확인하세요. re-split은 먼저 이 lab이 만든 animation을 멈춥니다."
        sourcePath="src/content/gsap/text/split-text-lifecycle/examples/SplitTextLifecycleLab/useSplitTextLifecycleRuntime.ts"
        controls={
          <div className="split-text-lifecycle-lab__controls">
            <label>
              text width: {width}px
              <input
                aria-label="SplitText target width"
                type="range"
                min="220"
                max="520"
                step="10"
                value={width}
                onChange={(event) => setWidth(Number(event.target.value))}
              />
            </label>
            <label>
              lifecycle command
              <select
                aria-label="SplitText lifecycle command"
                value={command}
                onChange={(event) =>
                  setCommand(event.target.value as typeof command)
                }
              >
                {Object.entries(splitTextLifecycleCommands).map(
                  ([value, descriptor]) => (
                    <option key={value} value={value}>
                      {descriptor.label}
                    </option>
                  ),
                )}
              </select>
            </label>
            <button type="button" onClick={runCommand}>
              run {selectedCommand.label}
            </button>
          </div>
        }
        preview={
          <div className="split-text-lifecycle-lab__preview">
            <p
              ref={targetRef}
              className="split-text-lifecycle-lab__target"
              style={{ maxWidth: `${width}px` }}
            >
              Responsive text keeps its original sentence available while
              SplitText creates temporary line, word, and character wrappers.
            </p>
            <p role="status">
              {status} · isSplit: {String(isSplit)} · reduced motion:{' '}
              {String(reducedMotion)}
            </p>
            <div className="split-text-lifecycle-lab__snapshots">
              <section aria-labelledby="before-dom-snapshot">
                <h3 id="before-dom-snapshot">before DOM</h3>
                <code>{beforeSnapshot?.html ?? 'target 대기 중'}</code>
                <p>
                  aria-label: {beforeSnapshot?.ariaLabel ?? 'none'} ·
                  aria-hidden: {beforeSnapshot?.ariaHidden ?? 'none'}
                </p>
              </section>
              <section aria-labelledby="after-dom-snapshot">
                <h3 id="after-dom-snapshot">after DOM</h3>
                <code>{afterSnapshot?.html ?? 'split 대기 중'}</code>
                <p>
                  child elements: {afterSnapshot?.childCount ?? 0} · aria-label:{' '}
                  {afterSnapshot?.ariaLabel ?? 'none'}
                </p>
              </section>
            </div>
          </div>
        }
        code={code}
        propertyDetails={splitTextLifecycleProperties}
        changes={[
          'split과 re-split은 temporary wrapper를 만들고 isSplit true를 보고합니다.',
          'revert는 원래 innerHTML과 원래 aria attributes를 복원합니다.',
          'kill은 autoSplit work만 멈추고 wrapper DOM은 의도적으로 유지합니다.',
        ]}
        watchFor={[
          'before snapshot은 원래 DOM으로 유지되고 after만 변합니다.',
          'kill은 isSplit true를 유지하고 revert는 false로 바꿉니다.',
          '너비가 바뀐 뒤 cleanup 전까지 autoSplit이 resize/font re-split work를 소유합니다.',
        ]}
        explanation={
          <p>
            P32 creation에서 만든 wrapper와 array를 전제로 합니다. target에는
            live region이 없고, SplitText <code>aria: auto</code> supplies one
            readable label while wrappers are hidden from assistive technology.
          </p>
        }
        onReplay={runCommand}
        replayLabel="run command"
      />
    </section>
  )
}
