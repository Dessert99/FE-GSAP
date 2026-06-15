import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { LayoutChangeExample } from './examples/LayoutChangeExample'
import layoutChangeSource from './examples/LayoutChangeExample.tsx?raw'

export function FlipPage() {
  return (
    <LessonLayout
      title="Flip"
      description="Flip은 레이아웃 변경 전 위치를 캡처하고, 변경 후 위치까지의 차이를 transform 애니메이션으로 보간한다. 카드 재배치나 상세 확장 UI에서 DOM 흐름을 유지하면서 움직임을 만든다."
    >
      <ExamplePanel
        title="React 상태 변경 전후의 레이아웃 보간"
        description="Flip.getState()로 현재 위치를 저장하고, React 상태로 DOM 배치를 바꾼 뒤 Flip.from()을 실행한다. absolute와 scale은 크기와 위치가 함께 바뀌는 카드 전환에서 자주 쓰는 옵션이다."
        code={layoutChangeSource}
      >
        <LayoutChangeExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
