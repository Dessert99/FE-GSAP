/** labelled timeline, development inspector, native fallback을 한 화면에 연결한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { gsdevtoolsProperties } from '../../gsdevtools.properties'
import './GsDevToolsLab.css'
import { useGsDevToolsLabAnimation } from './useGsDevToolsLabAnimation'

/** P14가 요구한 inspector descriptor와 native timeline controls를 실행한다. */
export function GsDevToolsLab() {
  // one descriptor가 actual timeline, create config, visible control과 serializer를 함께 공급한다.
  const {
    scope,
    toolContainerRef,
    timeScale,
    setTimeScale,
    playback,
    inspectorStatus,
    descriptor,
    reducedMotion,
    play,
    pause,
    rewind,
  } = useGsDevToolsLabAnimation()
  // actual dynamic loading과 inspector·timeline cleanup을 실행 가능한 setup 경계로 표현한다.
  const code = `const target = document.querySelector('.gsdevtools-lab__dot')
const toolContainer = document.querySelector('.gsdevtools-lab__tool-container')
if (!target || !toolContainer) throw new Error('GSDevTools lab DOM을 찾지 못했습니다.')
const timeline = gsap.timeline({ id: '${descriptor.timelineId}', paused: true })
timeline.addLabel('enter').to(target, { x: 164, duration: ${descriptor.duration}, ease: 'power2.out', id: '${descriptor.childIds[0]}' })
timeline.addLabel('settle').to(target, { scale: 0.82, duration: ${descriptor.duration}, ease: 'power1.inOut', id: '${descriptor.childIds[1]}' })

let tools = null
let active = true
async function connectInspector() {
  if (!import.meta.env.DEV) return
  const { GSDevTools } = await import('gsap/GSDevTools')
  if (!active) return
  gsap.registerPlugin(GSDevTools)
  tools = GSDevTools.create({ animation: timeline, container: toolContainer, id: '${descriptor.config.id}', paused: ${descriptor.config.paused}, timeScale: ${descriptor.config.timeScale}, minimal: ${descriptor.config.minimal}, visibility: '${descriptor.config.visibility}', keyboard: ${descriptor.config.keyboard}, persist: ${descriptor.config.persist}, hideGlobalTimeline: ${descriptor.config.hideGlobalTimeline} })
}
void connectInspector()

function cleanup() {
  active = false
  tools?.kill()
  timeline.kill()
  gsap.set(target, { clearProps: 'transform' })
}`
  return (
    <section id="gsdevtools-lab">
      <InteractiveExample
        title="paused labelled timeline inspector"
        description="timeScale을 고르면 paused timeline과 GSDevTools.create config가 함께 다시 만들어집니다. development에서는 inspector UI를, 어떤 환경에서도 native fallback controls를 관찰하세요."
        sourcePath="src/content/gsap/other/gsdevtools/examples/GsDevToolsLab/useGsDevToolsLabAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>initial timeScale</span>
              </span>
              <select
                value={timeScale}
                onChange={(event) => setTimeScale(Number(event.target.value))}
              >
                <option value={0.25}>0.25x</option>
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
              </select>
            </label>
            <button type="button" onClick={play}>
              play
            </button>
            <button type="button" onClick={pause}>
              pause
            </button>
            <button type="button" onClick={rewind}>
              rewind
            </button>
          </div>
        }
        preview={
          <div ref={scope} className="gsdevtools-lab">
            <div className="gsdevtools-lab__stage" aria-label="inspected labelled timeline stage">
              <span className="gsdevtools-lab__label">enter → settle</span>
              <span className="gsdevtools-lab__dot" />
            </div>
            <div ref={toolContainerRef} className="gsdevtools-lab__tool-container" />
            <p role="status">
              {inspectorStatus}. timeline <code>{descriptor.timelineId}</code> · {playback} ·
              initial timeScale {descriptor.timeScale}x
            </p>
          </div>
        }
        code={code}
        propertyDetails={gsdevtoolsProperties}
        changes={[
          `timeline과 child tween id는 ${descriptor.timelineId}, ${descriptor.childIds.join(', ')}로 고정됩니다.`,
          `create config는 paused: true, timeScale: ${descriptor.timeScale}, minimal: true, visibility: 'auto'를 사용합니다.`,
          'development dynamic import에서만 GSDevTools를 register/create하고 production에는 native controls만 남깁니다.',
        ]}
        watchFor={[
          'development에서 tool container에 minimal GSDevTools UI가 만들어지고, timeline id가 선택되는지 봅니다.',
          'timeScale을 바꾸면 inspector config와 code의 initial value가 같은지 봅니다.',
          'play/pause/rewind native button이 inspector 없이도 same paused timeline을 control하는지 봅니다.',
        ]}
        explanation={
          <p>
            GSDevTools는 animation을 대신 만드는 plugin이 아니라 existing timeline의 time을 검사하는
            development UI입니다. 그래서 timeline을 먼저 만들고, 그 reference를{' '}
            <code>animation</code> config에 연결하며, unmount 때 inspector와 timeline을 함께{' '}
            <code>kill()</code>합니다.
          </p>
        }
        onReplay={rewind}
        replayLabel="paused 시작점으로 되돌리기"
      />
    </section>
  )
}
