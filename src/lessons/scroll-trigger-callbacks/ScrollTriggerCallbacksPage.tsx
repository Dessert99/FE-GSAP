import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { DirectionCallbacksExample } from './examples/DirectionCallbacksExample'
import directionCallbacksSource from './examples/DirectionCallbacksExample.tsx?raw'

export function ScrollTriggerCallbacksPage() {
  return (
    <LessonLayout
      title="ScrollTrigger callbacks"
      description="ScrollTrigger 콜백은 enter/leave 방향을 구분해 UI 상태, 로그, lazy load 같은 부수 효과를 실행할 때 쓴다."
    >
      <ExamplePanel
        title="진입 방향별 콜백"
        description="onEnter, onLeave, onEnterBack, onLeaveBack은 같은 trigger라도 스크롤 방향과 경계에 따라 다르게 호출된다."
        code={directionCallbacksSource}
      >
        <DirectionCallbacksExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
