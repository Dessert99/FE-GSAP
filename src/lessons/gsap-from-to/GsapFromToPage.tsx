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
      <ExamplePanel title="시작값 → 끝값 명시" code={basicFromToSource}>
        <BasicFromToExample />
      </ExamplePanel>
      <ExamplePanel title="크기·회전 동시 제어" code={scaleRotateFromToSource}>
        <ScaleRotateFromToExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
