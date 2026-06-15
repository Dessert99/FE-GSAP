import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { DirectionObserverExample } from './examples/DirectionObserverExample'
import directionObserverSource from './examples/DirectionObserverExample.tsx?raw'

export function ObserverPage() {
  return (
    <LessonLayout
      title="Observer"
      description="Observer는 wheel, touch, pointer 입력을 같은 방향·속도 이벤트로 묶어 처리한다. 커스텀 스크롤, 슬라이드, 제스처 기반 UI의 입력 레이어로 쓴다."
    >
      <ExamplePanel
        title="wheel / touch / pointer 방향 감지"
        description="type에 여러 입력을 지정하면 onUp, onDown, onLeft, onRight 같은 방향 콜백으로 받을 수 있다. tolerance는 작은 흔들림을 이벤트로 처리하지 않게 거른다."
        code={directionObserverSource}
      >
        <DirectionObserverExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
