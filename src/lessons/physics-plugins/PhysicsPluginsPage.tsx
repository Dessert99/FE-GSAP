import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { PhysicsComparisonExample } from './examples/PhysicsComparisonExample'
import physicsComparisonSource from './examples/PhysicsComparisonExample.tsx?raw'

export function PhysicsPluginsPage() {
  return (
    <LessonLayout
      title="Physics2DPlugin / PhysicsPropsPlugin"
      description="Physics2DPlugin은 x/y 이동을 속도·각도·중력으로 계산하고, PhysicsPropsPlugin은 x나 rotation 같은 개별 numeric 속성에 속도·가속도·마찰을 적용한다."
    >
      <ExamplePanel
        title="2D 운동과 속성별 물리값 비교"
        description="physics2D는 발사체처럼 x/y를 함께 계산할 때 쓰고, physicsProps는 x와 rotation처럼 각각 다른 물리 파라미터를 줄 때 쓴다."
        code={physicsComparisonSource}
      >
        <PhysicsComparisonExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
