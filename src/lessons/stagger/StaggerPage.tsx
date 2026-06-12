import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BasicStaggerExample } from './examples/BasicStaggerExample'
import basicStaggerSource from './examples/BasicStaggerExample.tsx?raw'
import { AmountEachStaggerExample } from './examples/AmountEachStaggerExample'
import amountEachStaggerSource from './examples/AmountEachStaggerExample.tsx?raw'
import { GridStaggerExample } from './examples/GridStaggerExample'
import gridStaggerSource from './examples/GridStaggerExample.tsx?raw'

export function StaggerPage() {
  return (
    <LessonLayout
      title="stagger"
      description="stagger는 같은 트윈을 여러 대상에 적용할 때 시작 시간을 조금씩 벌려 순차 흐름을 만든다. 리스트, 카드, 메뉴처럼 같은 UI 요소가 반복될 때 자주 쓴다."
    >
      <ExamplePanel
        title="기본 stagger"
        description="숫자 stagger는 대상 사이의 시작 간격을 초 단위로 지정한다. 같은 애니메이션을 순서대로 흘려보내는 가장 단순한 문법이다."
        code={basicStaggerSource}
      >
        <BasicStaggerExample />
      </ExamplePanel>
      <ExamplePanel
        title="amount와 each"
        description="amount는 전체 분산 시간을 정하고, each는 대상 사이의 간격을 정한다. 개수 변화에 따라 유지하고 싶은 기준이 다를 때 구분해서 쓴다."
        code={amountEachStaggerSource}
      >
        <AmountEachStaggerExample />
      </ExamplePanel>
      <ExamplePanel
        title="grid, from, axis, ease"
        description="객체 stagger는 grid와 from으로 시작 위치를 잡고, axis와 ease로 퍼지는 방향과 시간감을 조절한다. 썸네일·카드 그리드에서 유용하다."
        code={gridStaggerSource}
      >
        <GridStaggerExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
