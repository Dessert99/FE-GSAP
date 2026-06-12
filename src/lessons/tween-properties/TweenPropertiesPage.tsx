import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { DurationDelayExample } from './examples/DurationDelayExample'
import durationDelaySource from './examples/DurationDelayExample.tsx?raw'
import { RepeatYoyoExample } from './examples/RepeatYoyoExample'
import repeatYoyoSource from './examples/RepeatYoyoExample.tsx?raw'
import { OverwriteImmediateRenderExample } from './examples/OverwriteImmediateRenderExample'
import overwriteImmediateRenderSource from './examples/OverwriteImmediateRenderExample.tsx?raw'

export function TweenPropertiesPage() {
  return (
    <LessonLayout
      title="트윈 핵심 속성"
      description="트윈의 시간, 반복, 충돌 처리, 초기 렌더링을 제어하는 기본 옵션을 다룬다."
    >
      <ExamplePanel title="duration / delay" code={durationDelaySource}>
        <DurationDelayExample />
      </ExamplePanel>
      <ExamplePanel title="repeat / yoyo / repeatDelay" code={repeatYoyoSource}>
        <RepeatYoyoExample />
      </ExamplePanel>
      <ExamplePanel title="overwrite / immediateRender" code={overwriteImmediateRenderSource}>
        <OverwriteImmediateRenderExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
