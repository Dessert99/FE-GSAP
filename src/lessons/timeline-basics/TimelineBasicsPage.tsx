import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BasicTimelineExample } from './examples/BasicTimelineExample'
import basicTimelineSource from './examples/BasicTimelineExample.tsx?raw'
import { PositionParameterExample } from './examples/PositionParameterExample'
import positionParameterSource from './examples/PositionParameterExample.tsx?raw'
import { LabelsDefaultsExample } from './examples/LabelsDefaultsExample'
import labelsDefaultsSource from './examples/LabelsDefaultsExample.tsx?raw'
import { NestedTimelineExample } from './examples/NestedTimelineExample'
import nestedTimelineSource from './examples/NestedTimelineExample.tsx?raw'

export function TimelineBasicsPage() {
  return (
    <LessonLayout
      title="타임라인 기본"
      description="gsap.timeline()은 여러 트윈을 하나의 시퀀스로 묶는다. delay를 직접 계산하지 않고 순서, 겹침, 라벨, defaults, 중첩 구조로 흐름을 관리한다."
    >
      <ExamplePanel
        title="기본 시퀀스"
        description="timeline에 to()를 이어 붙이면 앞 트윈이 끝난 뒤 다음 트윈이 실행된다. 여러 애니메이션을 하나의 재생 단위로 묶는 가장 기본 형태다."
        code={basicTimelineSource}
      >
        <BasicTimelineExample />
      </ExamplePanel>
      <ExamplePanel
        title="position parameter"
        description="position parameter는 트윈이 타임라인 어디에 들어갈지 정한다. '<', '+=', '-=' 같은 값으로 동시 시작, 간격, 겹침을 표현한다."
        code={positionParameterSource}
      >
        <PositionParameterExample />
      </ExamplePanel>
      <ExamplePanel
        title="labels와 defaults"
        description="label은 타임라인의 이름 붙은 지점이고, defaults는 자식 트윈이 상속받는 기본 설정이다. 반복되는 duration/ease를 줄이고 기준점을 명확히 만든다."
        code={labelsDefaultsSource}
      >
        <LabelsDefaultsExample />
      </ExamplePanel>
      <ExamplePanel
        title="중첩 타임라인"
        description="작은 타임라인을 함수로 만든 뒤 master timeline에 add()하면 섹션 단위 애니메이션을 조립할 수 있다."
        code={nestedTimelineSource}
      >
        <NestedTimelineExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
