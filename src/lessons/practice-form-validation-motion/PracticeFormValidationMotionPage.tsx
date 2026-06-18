import { PracticePanel } from '../../components/learning/PracticePanel'
import { FormValidationMotionExample } from './examples/FormValidationMotionExample'
import formValidationMotionSource from './examples/FormValidationMotionExample.tsx?raw'

export function PracticeFormValidationMotionPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Form Validation Motion</h2>
        <p className="practice__desc">
          오류 메시지 등장, 잘못된 필드 shake, 첫 오류로 focus 이동하는 흐름을 과하지 않은 모션으로 구현한다.
        </p>
      </header>
      <PracticePanel
        title="오류 메시지, shake, focus 이동 연결하기"
        description="검증 실패 시 motion은 장식이 아니라 사용자가 수정할 위치를 찾는 힌트다. animation이 끝나도 focus와 aria-describedby는 올바르게 남아야 한다."
        code={formValidationMotionSource}
      >
        <FormValidationMotionExample />
      </PracticePanel>
    </article>
  )
}
