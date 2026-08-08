/** 하나의 pseudo rule이 여러 card를 바꾸는 모습을 descriptor와 같은 코드로 보여 준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './SharedRuleLab.css'
import { useSharedRuleAnimation } from './useSharedRuleAnimation'

export function SharedRuleLab() {
  // Hook의 descriptor와 declaration snapshot을 UI·code panel에 그대로 연결한다.
  const { scope, targetClassName, color, setColor, size, setSize, descriptor, declaration, lookupStatus, reducedMotion, replay } = useSharedRuleAnimation()
  // 실제 getRule selector와 tween vars를 새 의미 없이 GSAP 문법으로만 포맷한다.
  const code = `const rule = CSSRulePlugin.getRule('${descriptor.selector}')
gsap.to(rule, {
  duration: ${reducedMotion ? 0 : 0.7},
  cssRule: {
    backgroundColor: '${descriptor.vars.backgroundColor}',
    width: '${descriptor.vars.width}',
    height: '${descriptor.vars.height}',
  },
})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="한 rule로 세 card의 ::before 바꾸기"
        description="질문 하나만 확인합니다. card가 셋인데 왜 color와 size가 항상 같이 바뀔까요?"
        sourcePath="src/content/gsap/plugins-uncategorized/css-rule-plugin/examples/SharedRuleLab/useSharedRuleAnimation.ts"
        reducedMotion={reducedMotion}
        controls={<div className="interactive-example__control-list"><label className="interactive-example__control"><span className="interactive-example__control-heading"><span>backgroundColor</span></span><input type="color" value={color} onChange={(event) => setColor(event.target.value)} /></label><label className="interactive-example__control"><span className="interactive-example__control-heading"><span>pseudo size</span><output>{size}px</output></span><input type="range" min="8" max="32" step="1" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label></div>}
        preview={<div className="shared-rule-lab"><p className="shared-rule-lab__question">한 selector <code>{descriptor.selector}</code>가 세 card의 pseudo element를 공유합니다.</p><div className="shared-rule-lab__cards">{['첫 번째', '두 번째', '세 번째'].map((label) => <article key={label} className={targetClassName}><h4>{label} card</h4><p>같은 rule의 결과</p></article>)}</div><p className="shared-rule-lab__status" role="status">{lookupStatus}</p><p className="shared-rule-lab__declaration"><strong>현재 rule declaration</strong><code>{declaration}</code></p></div>}
        code={code}
        propertyDetails={[{ name: 'getRule(selector)', type: '공식: selector:String → Object', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '구체 selector; pseudo-only selector는 공식상 array' }, { name: 'cssRule', type: 'object', defaultValue: '공식 페이지에 명시 없음', acceptedValues: 'backgroundColor·width·height가 든 rule declaration vars' }, { name: 'duration', type: 'number (초)', defaultValue: '이 lab: 0.7', acceptedValues: '모션 감소 환경에서는 0' }]}
        changes={[`하나의 descriptor가 ${descriptor.vars.backgroundColor}와 ${descriptor.vars.width} 크기를 정합니다.`, '세 card의 inline style은 바꾸지 않고 같은 stylesheet pseudo rule 하나를 바꿉니다.', '컴포넌트 cleanup에서는 tween을 kill하고 원래 rule.cssText를 복원합니다.']}
        watchFor={['color 또는 size를 바꾸면 세 card의 점이 동시에 같은 값으로 바뀌는지 봅니다.', '“현재 rule declaration”은 continuous live region이 아니라 실행이 끝난 뒤 읽은 CSS declaration입니다.', 'rule lookup 상태가 실패라면 위험한 tween을 계속 시도하지 않고 preview는 읽을 수 있는 상태로 남습니다.']}
        explanation={<p><code>CSSRulePlugin</code>은 rule declaration을 proxy style에 복사하고 CSSPlugin으로 보간한 결과를 rule에 다시 씁니다. card마다 별도 tween을 만들지 않았으므로, selector를 공유하는 세 <code>::before</code>가 한 rule의 결과를 함께 받습니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
