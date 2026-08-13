/** autoAlpha와 clearProps의 runtime 결과와 표시 코드를 같은 descriptor로 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './CssLifecycleExample.css'
import { type CssLifecycleMode, useCssLifecycleAnimation } from './useCssLifecycleAnimation'

// select 값과 lifecycle 질문을 같은 이름으로 표시한다.
const modeLabels: Record<CssLifecycleMode, string> = {
  autoAlpha: 'autoAlpha · opacity + visibility',
  clearProps: 'clearProps · inline style 제거',
}

// 실제 runtime vars를 onComplete 관찰까지 포함한 code 문법으로 바꾼다.
function serializeVars(vars: Record<string, unknown>) {
  // observation callback을 제외한 실제 GSAP option을 먼저 직렬화한다.
  const learningEntries = Object.entries(vars).filter(([property]) => property !== 'onComplete')
  // 실제 property 순서와 값을 code line으로 유지한다.
  const valueLines = learningEntries.map(([property, value]) => {
    // string 값에만 따옴표를 더해 실행 타입을 보존한다.
    const serialized = typeof value === 'string' ? `'${value}'` : String(value)
    return `  ${property}: ${serialized}`
  })
  return [...valueLines, '  onComplete: inspectInlineStyles'].join(',\n')
}

export function CssLifecycleExample() {
  // 실제 method·vars·완료 style 결과를 hook에서 함께 받는다.
  const runtime = useCssLifecycleAnimation()
  // code panel은 실행 method와 config를 의미 변경 없이 직렬화한다.
  const code = `gsap.${runtime.descriptor.method}('.${runtime.targetClassName}', {\n${serializeVars(runtime.animationConfig)}\n})`

  return (
    <div ref={runtime.scope}>
      <InteractiveExample
        title="보이지 않는 상태와 inline style은 언제 정리될까요?"
        description="autoAlpha는 opacity와 visibility의 완료 상태를, clearProps는 트윈이 남긴 inline transform과 색을 제거하는 시점을 보여줍니다."
        sourcePath="src/content/gsap/fundamentals/css-animation/examples/CssLifecycleExample/useCssLifecycleAnimation.ts"
        reducedMotion={runtime.reducedMotion}
        controls={(
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>정리 방식</span></span>
              <select value={runtime.mode} onChange={(event) => runtime.setMode(event.target.value as CssLifecycleMode)}>
                {(Object.keys(modeLabels) as CssLifecycleMode[]).map((mode) => <option key={mode} value={mode}>{modeLabels[mode]}</option>)}
              </select>
            </label>
          </div>
        )}
        preview={(
          <div className="css-lifecycle-example">
            <div className={runtime.targetClassName}>STYLE</div>
            <p aria-live="polite">{runtime.result}</p>
          </div>
        )}
        code={code}
        propertyDetails={[
          { name: 'autoAlpha', type: 'number', defaultValue: '현재 opacity', acceptedValues: 'opacity 값 · 0이면 hidden, 그 외 inherit' },
          { name: 'clearProps', type: 'string | true', defaultValue: '지정 안 함', acceptedValues: 'comma-separated property·all·true' },
          { name: 'autoRound', type: 'boolean', defaultValue: 'true', acceptedValues: 'false로 px·zIndex 중간값 정수화 해제' },
        ]}
        changes={[
          runtime.mode === 'autoAlpha' ? 'opacity가 0에 도달할 때 visibility도 hidden이 됩니다.' : '완료 시 inline transform과 backgroundColor가 제거되어 class style이 다시 적용됩니다.',
          'preview 아래 결과 문장이 inline 값과 computed visibility를 완료 시점에 직접 읽습니다.',
        ]}
        watchFor={['autoAlpha 0이 단순 투명과 달리 클릭 대상도 숨기는 visibility 상태를 남기는지 봅니다.', 'transform 일부를 clear하면 합쳐진 inline transform 전체가 사라지는 경계를 확인합니다.']}
        explanation={<p><code>autoAlpha</code>는 0일 때 <code>hidden</code>, 그 외에는 parent 상속을 지키기 위해 <code>inherit</code>를 사용합니다. <code>clearProps</code>는 완료 뒤 stylesheet가 다시 우선하도록 inline 흔적을 제거합니다.</p>}
        onReplay={runtime.replay}
      />
    </div>
  )
}
