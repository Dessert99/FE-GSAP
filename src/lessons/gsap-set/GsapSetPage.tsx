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
      <ExamplePanel
        title="set vs to — 즉시 vs 애니메이션"
        description="gsap.set()은 트윈을 만들지 않고 속성을 즉시 적용한다. 애니메이션 과정이 필요한 to()와 달리 초기 배치나 상태 리셋에 쓴다."
        code={basicSetSource}
      >
        <BasicSetExample />
      </ExamplePanel>
      <ExamplePanel
        title="초기 상태 설정 후 애니메이션"
        description="set()으로 시작 상태를 먼저 고정한 뒤 to()로 움직이면 초기화와 애니메이션 단계를 분리할 수 있다. 조건부 진입이나 재생 전 리셋에 유용하다."
        code={setThenAnimateSource}
      >
        <SetThenAnimateExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
