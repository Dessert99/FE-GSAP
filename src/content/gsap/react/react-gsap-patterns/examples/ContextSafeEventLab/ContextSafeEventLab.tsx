/** contextSafe late event target와 code를 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { reactGsapPatternsProperties } from '../../react-gsap-patterns.properties'
import {
  lateEventDescriptor,
  useContextSafeEventAnimation,
} from './useContextSafeEventAnimation'
import './ContextSafeEventLab.css'

/** component render 뒤 button event가 만든 tween도 cleanup되는지 보여 준다. */
export function ContextSafeEventLab() {
  // runtime이 제공하는 Context-bound handler와 current low-motion config를 받는다.
  const { scope, targetRef, count, reducedMotion, config, pulse } =
    useContextSafeEventAnimation()
  // same contextSafe wrapper와 actual event tween vars를 code로 직렬화한다.
  const code = `const { contextSafe } = useGSAP({ scope })\nconst pulse = contextSafe(() => {\n  gsap.fromTo(target, { scale: 1 }, {\n    scale: ${config.scale},\n    duration: ${config.duration},\n    yoyo: ${!reducedMotion},\n    repeat: ${reducedMotion ? 0 : 1},\n  })\n})`

  return (
    <section id="context-safe-event-lab">
      <InteractiveExample
        title="context-safe late event"
        description="click 이후에 새 tween을 만들 때 contextSafe가 그것을 existing Context cleanup에 연결합니다."
        sourcePath="src/content/gsap/react/react-gsap-patterns/examples/ContextSafeEventLab/useContextSafeEventAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <button type="button" onClick={pulse}>
            pulse local target
          </button>
        }
        preview={
          <div ref={scope} className="context-safe-event">
            <div
              ref={targetRef}
              className={lateEventDescriptor.targetClassName}
            >
              late event target
            </div>
            <p role="status">button pulses: {count}</p>
          </div>
        }
        code={code}
        propertyDetails={reactGsapPatternsProperties}
        changes={[
          `late click tween duration은 ${config.duration}이며 reduced motion에서는 yoyo/repeat가 없습니다.`,
          'contextSafe가 handler execution 동안 만든 tween을 hook Context에 추가합니다.',
          `button result count ${count}는 React가 소유하는 semantic state입니다.`,
        ]}
        watchFor={[
          'button을 누를 때만 pulse가 만들어지는지 봅니다.',
          'reduced motion에서 target이 final scale로 즉시 가고 다시 흔들리지 않는지 봅니다.',
          'component cleanup 뒤 늦은 event tween이 남지 않는다는 Context ownership을 code에서 확인합니다.',
        ]}
        explanation={
          <p>
            React event handler는 <code>useGSAP</code> callback보다 늦게
            실행됩니다. plain handler에서 만든 tween은 Context가 모를 수
            있으므로 <code>contextSafe</code>로 감싸 생성 시점에도 같은 cleanup
            boundary를 유지합니다.
          </p>
        }
        onReplay={pulse}
        replayLabel="late event 다시 실행"
      />
    </section>
  )
}
