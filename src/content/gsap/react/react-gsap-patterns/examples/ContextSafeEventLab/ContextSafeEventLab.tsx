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
  // 실제 ref·motion config·contextSafe callback을 단독으로 읽을 수 있게 직렬화한다.
  const code = `import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

export function ContextSafeExample() {
  const scope = useRef(null)
  const targetRef = useRef(null)
  const [count, setCount] = useState(0)
  const reducedMotion = useReducedMotion()
  const config = { scale: ${config.scale}, duration: ${config.duration} }
  const { contextSafe } = useGSAP({ scope })
  const pulse = contextSafe(() => {
    const target = targetRef.current
    if (!target) return

    gsap.fromTo(target, { scale: 1 }, {
      scale: config.scale,
      duration: config.duration,
      yoyo: ${!reducedMotion},
      repeat: ${reducedMotion ? 0 : 1},
    })
    setCount((value) => value + 1)
  })

  return (
    <div ref={scope}>
      <button type="button" onClick={pulse}>pulse</button>
      <div ref={targetRef}>late event target</div>
      <p role="status">button pulses: {count}</p>
    </div>
  )
}`

  return (
    <section id="context-safe-event-lab">
      <InteractiveExample
        title="click 뒤 만든 tween도 함께 정리하기"
        description="click 이후에 새 tween을 만들 때 contextSafe가 그것을 기존 Context cleanup에 연결합니다."
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
          'component cleanup 뒤 늦은 event tween도 같은 Context에서 정리되는지 code에서 확인합니다.',
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
