import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { TimelineDebuggerExample } from './examples/TimelineDebuggerExample'
import timelineDebuggerSource from './examples/TimelineDebuggerExample.tsx?raw'

export function GSDevToolsPage() {
  return (
    <LessonLayout
      title="GSDevTools"
      description="GSDevTools는 timeline을 scrub, pause, replay하면서 디버깅하는 개발용 UI다. 복잡한 sequence의 타이밍과 라벨을 확인할 때 쓴다."
    >
      <ExamplePanel
        title="timeline에 디버그 컨트롤 붙이기"
        description="GSDevTools.create()에 animation으로 timeline을 넘기면 해당 timeline만 제어하는 디버그 패널이 생긴다. 컴포넌트 cleanup에서는 tool.kill()로 제거한다."
        code={timelineDebuggerSource}
      >
        <TimelineDebuggerExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
