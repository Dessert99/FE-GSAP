/** scoped list DOM과 runtime-derived reveal code를 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { reactGsapPatternsProperties } from '../../react-gsap-patterns.properties'
import {
  scopedListDescriptor,
  useScopedListRevealAnimation,
} from './useScopedListRevealAnimation'
import './ScopedListRevealLab.css'

/** list resource가 sibling component와 selector를 공유하지 않음을 보여 준다. */
export function ScopedListRevealLab() {
  // component-local runtime scope와 current motion config를 받는다.
  const { scope, reducedMotion, config, replay } =
    useScopedListRevealAnimation()
  // runtime이 사용한 selector와 duration/stagger를 code로 직렬화한다.
  const code = `const [runKey, setRunKey] = useState(0)\n\nuseGSAP(() => {\n  gsap.from('.${scopedListDescriptor.itemClassName}', {\n    y: ${reducedMotion ? 0 : 20},\n    autoAlpha: ${reducedMotion ? 1 : 0},\n    duration: ${config.duration},\n    stagger: ${config.stagger},\n  })\n}, { scope, dependencies: [config.duration, config.stagger, reducedMotion, runKey], revertOnUpdate: true })`

  return (
    <section id="scoped-list-reveal-lab">
      <InteractiveExample
        title="scoped list reveal"
        description="list component가 own scope ref를 selector boundary로 전달합니다. 이 list의 item만 reveal되고 unmount/update에서는 Context가 cleanup합니다."
        sourcePath="src/content/gsap/react/react-gsap-patterns/examples/ScopedListRevealLab/useScopedListRevealAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <p>
            replay는 이 component-owned list Context만 다시 만듭니다. sibling
            selector나 global query를 추가하지 않습니다.
          </p>
        }
        preview={
          <div ref={scope} className="scoped-list-reveal">
            <ul>
              {['scope', 'stable deps', 'context cleanup'].map((item) => (
                <li key={item} className={scopedListDescriptor.itemClassName}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
        code={code}
        propertyDetails={reactGsapPatternsProperties}
        changes={[
          `duration ${config.duration}, stagger ${config.stagger}은 reduced-motion branch와 함께 바뀝니다.`,
          `.${scopedListDescriptor.itemClassName} selector는 local scope 밖을 찾지 않습니다.`,
          'useGSAP Context가 update와 unmount에서 이 resource의 tween을 revert합니다.',
        ]}
        watchFor={[
          '세 item이 같은 local list 안에서만 순서대로 나타나는지 봅니다.',
          'reduced motion에서는 duration/stagger가 0이고 final visible state가 즉시 나오는지 봅니다.',
          '다른 example의 button/pulse는 이 selector에 포함되지 않는지 봅니다.',
        ]}
        explanation={
          <p>
            React가 semantic <code>ul</code>/<code>li</code> structure를
            유지하고, GSAP은 mount 후 presentation만 바꿉니다. reusable
            component라도 ref가 가리키는 DOM resource를 분명히 두면 cleanup과
            composition을 예측할 수 있습니다.
          </p>
        }
        onReplay={replay}
        replayLabel="local list 다시 reveal"
      />
    </section>
  )
}
