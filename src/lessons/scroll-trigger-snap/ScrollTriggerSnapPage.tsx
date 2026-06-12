import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { SnapSectionsExample } from './examples/SnapSectionsExample'
import snapSectionsSource from './examples/SnapSectionsExample.tsx?raw'

export function ScrollTriggerSnapPage() {
  return (
    <LessonLayout
      title="ScrollTrigger snap"
      description="snap은 스크롤이 멈췄을 때 progress를 가장 가까운 지점으로 보정한다. 섹션 단위 스크롤이나 단계형 인터랙션에 쓴다."
    >
      <ExamplePanel
        title="섹션 progress 스냅"
        description="snapTo는 0~1 progress를 기준으로 동작한다. 세 섹션이면 0, 0.5, 1처럼 진행률 단계를 잡아 스크롤 정지 위치를 보정한다."
        code={snapSectionsSource}
      >
        <SnapSectionsExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
