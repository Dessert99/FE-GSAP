import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BasicSetExample } from './examples/BasicSetExample'
import basicSetSource from './examples/BasicSetExample.tsx?raw'
import { SetThenAnimateExample } from './examples/SetThenAnimateExample'
import setThenAnimateSource from './examples/SetThenAnimateExample.tsx?raw'

export function GsapSetPage() {
  return (
    <LessonLayout
      title="gsap.set()"
      description="애니메이션 없이 속성을 즉시 적용한다(duration 0). 주로 애니메이션 전에 초기 상태를 잡는 데 쓴다."
    >
      <ExamplePanel title="set vs to — 즉시 vs 애니메이션" code={basicSetSource}>
        <BasicSetExample />
      </ExamplePanel>
      <ExamplePanel title="초기 상태 설정 후 애니메이션" code={setThenAnimateSource}>
        <SetThenAnimateExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
