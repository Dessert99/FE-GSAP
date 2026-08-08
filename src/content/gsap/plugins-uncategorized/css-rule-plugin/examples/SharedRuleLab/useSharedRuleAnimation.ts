/** 하나의 same-origin pseudo rule을 descriptor로 tween하고 원래 declaration을 복원한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// selector 하나로 실험 범위의 모든 card pseudo element를 공유시킨다.
const selector = '.shared-rule-lab__card::before'

/** control 값과 실제 cssRule vars를 중복 없이 묶는 descriptor의 형태다. */
type RuleDescriptor = { selector: string; color: string; size: number; vars: { backgroundColor: string; width: string; height: string } }

/** CSSRulePlugin의 raw 반환에서 이 lab이 tween할 CSS declaration 하나만 안전하게 꺼낸다. */
function toStyleDeclaration(rule: unknown): CSSStyleDeclaration | null {
  return Array.isArray(rule) || !rule || typeof rule !== 'object' || !('cssText' in rule) ? null : rule as CSSStyleDeclaration
}

export function useSharedRuleAnimation() {
  // useGSAP이 stylesheet rule과 preview DOM의 cleanup을 함께 묶을 범위다.
  const scope = useRef<HTMLDivElement>(null)
  // 모든 card가 같은 pseudo rule을 쓴다는 사실을 preview class와 공유한다.
  const targetClassName = 'shared-rule-lab__card'
  // proxy에 복사할 background color를 사용자가 고른다.
  const [color, setColor] = useState('#8b5cf6')
  // pseudo element의 가로·세로를 함께 정하는 px 값을 사용자가 고른다.
  const [size, setSize] = useState(18)
  // 같은 descriptor를 다시 실행해 시작 declaration을 재확인하는 키다.
  const [runKey, setRunKey] = useState(0)
  // 사용자 환경에서 tween duration을 0으로 바꿔야 하는지 읽는다.
  const reducedMotion = useReducedMotion()
  // lookup·GSAP vars·code serializer가 함께 사용하는 유일한 실행 descriptor다.
  const descriptor: RuleDescriptor = { selector, color, size, vars: { backgroundColor: color, width: `${size}px`, height: `${size}px` } }
  // rule declaration을 실제로 읽어 화면에 보여 줄 이산 snapshot이다.
  const [declaration, setDeclaration] = useState('rule을 찾는 중')
  // lookup이 실패했을 때 tween을 만들지 않았음을 화면에 전달한다.
  const [lookupStatus, setLookupStatus] = useState('same-origin rule을 찾는 중')

  useGSAP(
    () => {
      // CSSRulePlugin이 cssRule vars를 처리하도록 GSAP에 한 번 등록한다.
      gsap.registerPlugin(CSSRulePlugin)
      // 구체 pseudo selector의 raw 반환을 lab이 다룰 declaration 하나로 정규화한다.
      const rule = toStyleDeclaration(CSSRulePlugin.getRule(descriptor.selector))
      if (!rule) {
        // stylesheet 접근 실패는 animation 대신 읽을 수 있는 상태 문장으로 남긴다.
        setLookupStatus('rule을 찾지 못했거나 browser CSSOM에서 읽을 수 없습니다')
        setDeclaration('tween을 만들지 않았습니다')
        return undefined
      }
      // cleanup 뒤에도 같은 declaration으로 되돌릴 수 있게 rule 전체 text를 보관한다.
      const originalCssText = rule.cssText
      // 실제 stylesheet declaration을 읽어 code panel 밖의 관찰값으로 남긴다.
      setLookupStatus('same-origin rule을 찾았습니다')
      setDeclaration(rule.cssText)
      // proxy style의 보간 결과를 shared rule에 복사하도록 cssRule vars로 tween한다.
      const tween = gsap.to(rule, { duration: reducedMotion ? 0 : 0.7, cssRule: descriptor.vars, ease: 'power2.out', onComplete: () => setDeclaration(rule.cssText) })
      return () => {
        // rule을 원본 declaration으로 복원해 페이지 밖의 다음 렌더에 영향을 남기지 않는다.
        tween.kill()
        rule.cssText = originalCssText
      }
    },
    // control·모션 설정·replay가 바뀔 때만 이전 tween을 정리하고 descriptor를 다시 실행한다.
    { scope, dependencies: [descriptor.color, descriptor.size, reducedMotion, runKey], revertOnUpdate: true },
  )

  // TSX가 실행 descriptor와 상태를 다시 조립하지 않고 그대로 표시하도록 반환한다.
  return { scope, targetClassName, color, setColor, size, setSize, descriptor, declaration, lookupStatus, reducedMotion, replay: () => setRunKey((key) => key + 1) }
}
