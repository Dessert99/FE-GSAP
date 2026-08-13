/** one stable card의 from/to FLIP 순서를 diagram과 code panel으로 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { flipFirstLastProperties } from '../../flip-first-last.properties'
import './FlipCardLab.css'
import { useFlipCardAnimation } from './useFlipCardAnimation'

export function FlipCardLab() {
  // single descriptor가 mode control, diagram, runtime call과 serializer를 함께 공급한다.
  const { scope, cardRef, stageRef, mode, setMode, location, descriptor, reducedMotion, runFlip } =
    useFlipCardAnimation()
  // runtime descriptor의 actual from/to sequence를 code 문법으로만 표현한다.
  const code = `gsap.registerPlugin(Flip)

const stage = document.querySelector('.flip-card-lab__stage')
const card = document.querySelector('.flip-card-lab__card')
if (!(stage instanceof HTMLElement) || !(card instanceof HTMLElement)) {
  throw new Error('FLIP card를 찾지 못했습니다.')
}

let timeline = null
let location = stage.classList.contains('flip-card-lab__stage--right') ? 'right' : 'left'

function applyLayout(next) {
  stage.classList.toggle('flip-card-lab__stage--left', next === 'left')
  stage.classList.toggle('flip-card-lab__stage--right', next === 'right')
  location = next
}

function runFlip() {
  timeline?.kill()
  Flip.killFlipsOf(card)
  const current = location
  const destination = current === 'left' ? 'right' : 'left'
  ${
    descriptor.mode === 'from'
      ? `const state = Flip.getState(card, { props: '${descriptor.props}' })
  applyLayout(destination)
  timeline = Flip.from(state, { duration: ${descriptor.duration}, ease: '${descriptor.ease}' })`
      : `applyLayout(destination)
  const destinationState = Flip.getState(card, { props: '${descriptor.props}' })
  applyLayout(current)
  timeline = Flip.to(destinationState, { duration: ${descriptor.duration}, ease: '${descriptor.ease}' })
  applyLayout(destination)`
  }
}

function cleanup() {
  timeline?.kill()
  Flip.killFlipsOf(card)
  applyLayout('left')
}`
  return (
    <div ref={scope}>
      <InteractiveExample
        title="one stable card FLIP cycle"
        description="mode를 고르고 실행하세요. React가 소유한 button node는 그대로 두고, stage class만 바꿔 Flip이 capture한 layout과 final layout을 비교합니다."
        sourcePath="src/content/gsap/ui/flip-first-last/examples/FlipCardLab/useFlipCardAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>mode</span>
              </span>
              <select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>
                <option value="from">Flip.from(state)</option>
                <option value="to">Flip.to(state)</option>
              </select>
            </label>
            <button type="button" onClick={runFlip}>
              capture → layout mutate → {descriptor.method}
            </button>
          </div>
        }
        preview={
          <div className="flip-card-lab">
            <ol>
              {descriptor.diagram.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div ref={stageRef} className="flip-card-lab__stage flip-card-lab__stage--left">
              <div className="flip-card-lab__lane">
                <span>logical first lane</span>
              </div>
              <div className="flip-card-lab__lane">
                <span>logical last lane</span>
              </div>
              <button ref={cardRef} type="button" className="flip-card-lab__card">
                focused card
              </button>
            </div>
            <p role="status">
              현재 actual class layout: {location}. {descriptor.mode} mode, duration{' '}
              {descriptor.duration}s
            </p>
          </div>
        }
        code={code}
        propertyDetails={flipFirstLastProperties}
        changes={[
          'Flip.from은 current layout을 capture한 뒤 next lane class를 final layout으로 적용합니다.',
          'Flip.to는 destination을 임시 capture하고 current를 복구한 뒤 destination class를 commit합니다.',
          '새 실행은 previous timeline을 kill해 이전 offsets가 새 layout과 싸우지 않게 합니다.',
        ]}
        watchFor={[
          'card가 같은 focusable button node로 유지되고 lane class만 바뀌는지 봅니다.',
          'from/to를 바꾸면 diagram과 code의 capture/mutation 순서가 함께 바뀌는지 봅니다.',
          '모션 감소에서는 duration 0으로 class layout이 즉시 final state가 되는지 봅니다.',
        ]}
        explanation={
          <p>
            Flip은 layout mutation을 대신하지 않습니다. 이 예제는 stable button node를 유지한 채
            stage class로 final layout을 만들고, Flip이 recorded state와 그 layout 차이를 temporary
            transform으로 invert한 뒤 play하게 합니다.
          </p>
        }
        onReplay={runFlip}
        replayLabel="같은 mode로 다시 실행"
      />
    </div>
  )
}
