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
      <ExamplePanel title="기본 이동" code={basicToSource}>
        <BasicToExample />
      </ExamplePanel>
      <ExamplePanel title="여러 속성 동시 변경" code={multiplePropertiesSource}>
        <MultiplePropertiesExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
