import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BoundsInertiaExample } from './examples/BoundsInertiaExample'
import boundsInertiaSource from './examples/BoundsInertiaExample.tsx?raw'

export function DraggablePage() {
  return (
    <LessonLayout
      title="Draggable"
      description="Draggable은 DOM 요소를 pointer/touch 입력으로 직접 끌 수 있게 만들고, bounds·resistance·inertia 같은 실제 UI 제약을 함께 다룬다."
    >
      <ExamplePanel
        title="bounds와 inertia"
        description="bounds는 드래그 가능한 영역을 제한하고, edgeResistance는 경계 밖으로 밀 때의 저항을 만든다. InertiaPlugin이 등록되어 있으면 inertia로 손을 뗀 뒤의 관성 이동까지 처리할 수 있다."
        code={boundsInertiaSource}
      >
        <BoundsInertiaExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
