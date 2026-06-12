import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { LifecycleCallbacksExample } from './examples/LifecycleCallbacksExample'
import lifecycleCallbacksSource from './examples/LifecycleCallbacksExample.tsx?raw'
import { RepeatReverseCallbacksExample } from './examples/RepeatReverseCallbacksExample'
import repeatReverseCallbacksSource from './examples/RepeatReverseCallbacksExample.tsx?raw'
import { CallbackParamsScopeExample } from './examples/CallbackParamsScopeExample'
import callbackParamsScopeSource from './examples/CallbackParamsScopeExample.tsx?raw'

export function CallbacksPage() {
  return (
    <LessonLayout
      title="콜백"
      description="트윈과 타임라인은 재생 흐름의 주요 지점마다 콜백을 실행할 수 있다. 시작, 업데이트, 완료, 반복, 역재생 완료, 파라미터와 callbackScope를 다룬다."
    >
      <ExamplePanel
        title="onStart / onUpdate / onComplete"
        description="onStart는 재생 시작 시점, onUpdate는 매 tick, onComplete는 끝까지 도착한 시점에 실행된다. 진행률 표시나 완료 후 상태 전환에 쓴다."
        code={lifecycleCallbacksSource}
      >
        <LifecycleCallbacksExample />
      </ExamplePanel>
      <ExamplePanel
        title="onRepeat / onReverseComplete"
        description="onRepeat은 repeat 반복이 시작될 때, onReverseComplete는 역재생으로 시작점에 도착했을 때 실행된다. 반복 루프와 되돌림 플로우를 감지할 때 쓴다."
        code={repeatReverseCallbacksSource}
      >
        <RepeatReverseCallbacksExample />
      </ExamplePanel>
      <ExamplePanel
        title="callback params / callbackScope"
        description="onCompleteParams 같은 params 배열은 콜백에 값을 전달하고, callbackScope는 콜백 내부 this가 가리킬 객체를 정한다."
        code={callbackParamsScopeSource}
      >
        <CallbackParamsScopeExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
