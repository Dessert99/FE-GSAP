import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { WrapModifierExample } from './examples/WrapModifierExample'
import wrapModifierSource from './examples/WrapModifierExample.tsx?raw'
import { SnapModifierExample } from './examples/SnapModifierExample'
import snapModifierSource from './examples/SnapModifierExample.tsx?raw'

export function ModifiersPluginPage() {
  return (
    <LessonLayout
      title="ModifiersPlugin"
      description="ModifiersPlugin은 tween이 계산한 값을 화면에 쓰기 직전에 함수로 가공한다. 무한 루프 위치 보정, 단위 변환, 단계 보정처럼 최종 출력값을 제어할 때 쓴다."
    >
      <ExamplePanel
        title="wrap으로 반복 위치 만들기"
        description="x 값이 계속 증가해도 modifiers에서 범위 안으로 되돌리면 끊기지 않는 반복 이동을 만들 수 있다."
        code={wrapModifierSource}
      >
        <WrapModifierExample />
      </ExamplePanel>
      <ExamplePanel
        title="snap으로 단계 보정하기"
        description="modifiers는 tween이 만든 연속 값을 마지막에 보정한다. snap과 함께 쓰면 움직임은 tween이 만들고 출력은 일정 간격에 붙일 수 있다."
        code={snapModifierSource}
      >
        <SnapModifierExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
