import { PracticePanel } from '../../components/learning/PracticePanel'
import { AccessibilityAuditExample } from './examples/AccessibilityAuditExample'
import accessibilityAuditSource from './examples/AccessibilityAuditExample.tsx?raw'

export function PracticeAccessibilityAuditPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Accessibility Audit</h2>
        <p className="practice__desc">
          `prefers-reduced-motion`, focus, keyboard 조작을 모션 구현의 완료 기준으로 같이 검증하는 실습이다.
        </p>
      </header>
      <PracticePanel
        title="reduced motion, focus, keyboard 조작 검증"
        description="애니메이션이 있어도 키보드 조작과 focus 흐름이 깨지면 실무 완료가 아니다. 이 실습은 모션을 끄는 조건과 keyboard handler를 같은 컴포넌트 안에서 확인한다."
        code={accessibilityAuditSource}
      >
        <AccessibilityAuditExample />
      </PracticePanel>
    </article>
  )
}
