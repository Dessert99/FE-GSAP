import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { StartEndRangeExample } from './examples/StartEndRangeExample'
import startEndRangeSource from './examples/StartEndRangeExample.tsx?raw'
import { MarkersExample } from './examples/MarkersExample'
import markersSource from './examples/MarkersExample.tsx?raw'

export function ScrollTriggerStartEndPage() {
  return (
    <LessonLayout
      title="ScrollTrigger start / end"
      description="start와 end는 trigger 요소와 scroller의 어느 지점이 만날 때 ScrollTrigger가 active 상태가 되는지 정한다. markers는 그 계산 지점을 화면에 표시해 디버깅할 때 쓴다."
    >
      <ExamplePanel
        title="start / end 범위"
        description="start는 enter 지점, end는 leave 지점이다. scrub이나 pin이 없으면 end는 애니메이션 길이가 아니라 toggle 상태가 끝나는 경계로 이해하는 편이 안전하다."
        code={startEndRangeSource}
      >
        <StartEndRangeExample />
      </ExamplePanel>
      <ExamplePanel
        title="markers로 기준점 확인"
        description="markers를 켜면 start, end, scroller-start, scroller-end 위치가 보인다. 실제 작업에서는 위치가 맞는지 확인한 뒤 배포 전 제거한다."
        code={markersSource}
      >
        <MarkersExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
