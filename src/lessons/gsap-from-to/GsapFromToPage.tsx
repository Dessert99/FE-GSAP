import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BasicFromToExample } from './examples/BasicFromToExample'
import basicFromToSource from './examples/BasicFromToExample.tsx?raw'
import { ScaleRotateFromToExample } from './examples/ScaleRotateFromToExample'
import scaleRotateFromToSource from './examples/ScaleRotateFromToExample.tsx?raw'

export function GsapFromToPage() {
  return (
    <LessonLayout
      title="gsap.fromTo()"
      description="시작 상태와 끝 상태를 둘 다 명시한다. 요소의 현재 값에 의존하지 않으므로 시작점을 정확히 통제하고 싶을 때 쓴다."
    >
      <ExamplePanel
        title="시작값 → 끝값 명시"
        description="gsap.fromTo()는 시작값과 끝값을 모두 코드에 적는다. 이전 렌더 상태나 CSS 초기값에 의존하지 않고 같은 애니메이션을 재현해야 할 때 쓴다."
        code={basicFromToSource}
      >
        <BasicFromToExample />
      </ExamplePanel>
      <ExamplePanel
        title="크기·회전 동시 제어"
        description="fromTo()에서 여러 속성의 시작·끝을 함께 지정하면 복합 등장 상태를 정확히 통제할 수 있다. 모달, 배지, 아이콘처럼 시작 상태가 중요할 때 쓰기 좋다."
        code={scaleRotateFromToSource}
      >
        <ScaleRotateFromToExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
