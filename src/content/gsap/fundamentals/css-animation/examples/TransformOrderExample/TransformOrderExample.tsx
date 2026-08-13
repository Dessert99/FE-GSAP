/** transform key 선언 순서와 실제 고정 합성 순서를 한 대상에서 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './TransformOrderExample.css'
import { type TransformDeclarationOrder, useTransformOrderAnimation } from './useTransformOrderAnimation'

// select에 표시할 두 object literal 순서를 학습 문장으로 연결한다.
const orderLabels: Record<TransformDeclarationOrder, string> = {
  'translate-first': 'x → scale → rotation',
  'rotation-first': 'rotation → scale → x',
}

// 실제 descriptor entries를 순서 변경 없이 code line으로 바꾼다.
function serializeEntries(entries: ReadonlyArray<readonly [string, number]>, duration: number, ease: string) {
  // runtime descriptor의 insertion order를 code line에도 유지한다.
  const valueLines = entries.map(([property, value]) => `  ${property}: ${value}`)
  return [...valueLines, `  duration: ${duration}`, `  ease: '${ease}'`].join(',\n')
}

export function TransformOrderExample() {
  // 실제 Tween config와 표시할 선언 순서를 hook에서 함께 받는다.
  const runtime = useTransformOrderAnimation()
  // code panel은 object insertion order를 그대로 보여준다.
  const code = `gsap.to('.${runtime.targetClassName}', {\n${serializeEntries(runtime.descriptor.entries, runtime.animationConfig.duration, runtime.animationConfig.ease)}\n})`

  return (
    <div ref={runtime.scope}>
      <InteractiveExample
        title="property를 적는 순서가 결과를 바꿀까요?"
        description="같은 x·scale·rotation을 object에 서로 다른 순서로 적습니다. 실행 전에 transform 결과가 달라질지 예상해 보세요."
        sourcePath="src/content/gsap/fundamentals/css-animation/examples/TransformOrderExample/useTransformOrderAnimation.ts"
        reducedMotion={runtime.reducedMotion}
        controls={(
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>선언 순서</span></span>
              <select value={runtime.order} onChange={(event) => runtime.setOrder(event.target.value as TransformDeclarationOrder)}>
                {(Object.keys(orderLabels) as TransformDeclarationOrder[]).map((order) => <option key={order} value={order}>{orderLabels[order]}</option>)}
              </select>
            </label>
          </div>
        )}
        preview={(
          <div className="transform-order-example">
            <div className="transform-order-example__lane"><div className={runtime.targetClassName}>순서</div></div>
            <p aria-live="polite">{runtime.hasRun ? 'GSAP 고정 순서로 같은 transform을 합성했습니다.' : '선언 순서를 고른 뒤 실행하세요.'}</p>
          </div>
        )}
        code={code}
        propertyDetails={[
          { name: 'x', type: 'number | string', defaultValue: '0px', acceptedValues: 'px 기본 숫자·단위 문자열·상대값' },
          { name: 'scale', type: 'number', defaultValue: '1', acceptedValues: 'scaleX와 scaleY에 함께 적용할 배율' },
          { name: 'rotation', type: 'number | string', defaultValue: '0deg', acceptedValues: 'deg 기본 숫자·rad·방향 suffix' },
        ]}
        changes={['표시된 코드의 key 순서는 바뀌어도 대상은 같은 최종 transform에 도달합니다.', 'GSAP은 translation → scale → rotationX → rotationY → skew → rotationZ 순서를 사용합니다.']}
        watchFor={['두 선언 순서에서 target의 최종 위치·크기·각도가 같은지 봅니다.', 'transform string이 아니라 alias를 쓰면 matrix 재해석을 피할 수 있습니다.']}
        explanation={<p>일반 CSS transform string은 작성 순서가 결과에 영향을 줍니다. GSAP alias는 각 값을 따로 cache하고 일관된 순서로 합쳐 선언 순서의 우연을 제거합니다.</p>}
        onReplay={runtime.replay}
      />
    </div>
  )
}
