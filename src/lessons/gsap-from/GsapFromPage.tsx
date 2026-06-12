import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { FromExample } from './examples/FromExample'
import fromSource from './examples/FromExample.tsx?raw'

export function GsapFromPage() {
  return (
    <LessonLayout
      title="gsap.from()"
      description="지정한 시작 값에서 요소의 현재 상태로 애니메이션한다. 등장(enter) 연출에 자주 쓴다."
    >
      <ExamplePanel title="아래에서 페이드인" code={fromSource}>
        <FromExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
