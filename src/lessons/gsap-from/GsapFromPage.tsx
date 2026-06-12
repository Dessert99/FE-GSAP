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
      <ExamplePanel
        title="아래에서 페이드인"
        description="gsap.from()은 지정한 시작값에서 현재 DOM 상태로 들어오게 만든다. 최종 CSS 상태를 유지한 채 등장 애니메이션만 추가할 때 유용하다."
        code={fromSource}
      >
        <FromExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
