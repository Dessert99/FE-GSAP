import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BasicToExample } from './examples/BasicToExample'
import basicToSource from './examples/BasicToExample.tsx?raw'
import { MultiplePropertiesExample } from './examples/MultiplePropertiesExample'
import multiplePropertiesSource from './examples/MultiplePropertiesExample.tsx?raw'

export function GsapToPage() {
  return (
    <LessonLayout
      title="gsap.to()"
      description="요소의 현재 상태에서 지정한 값으로 애니메이션한다. GSAP에서 가장 기본이 되는 트윈이다."
    >
      <ExamplePanel
        title="기본 이동"
        description="gsap.to()는 현재 스타일 값을 출발점으로 삼아 지정한 끝값까지 트윈한다. 가장 흔한 형태의 이동·상태 변화 애니메이션에 쓴다."
        code={basicToSource}
      >
        <BasicToExample />
      </ExamplePanel>
      <ExamplePanel
        title="여러 속성 동시 변경"
        description="하나의 to() 호출에서 여러 속성을 함께 바꾸면 같은 타이밍으로 상태 전환을 묶을 수 있다. 카드 이동, 강조, 버튼 피드백처럼 여러 변화가 동시에 필요한 UI에 쓴다."
        code={multiplePropertiesSource}
      >
        <MultiplePropertiesExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
