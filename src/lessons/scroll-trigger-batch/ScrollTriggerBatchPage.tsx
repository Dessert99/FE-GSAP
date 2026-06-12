import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BatchCardsExample } from './examples/BatchCardsExample'
import batchCardsSource from './examples/BatchCardsExample.tsx?raw'

export function ScrollTriggerBatchPage() {
  return (
    <LessonLayout
      title="ScrollTrigger.batch()"
      description="ScrollTrigger.batch()는 여러 요소의 진입 콜백을 한 번에 묶어 처리한다. 목록 카드, 이미지 그리드, 피드 UI에서 반복 애니메이션을 줄일 때 유용하다."
    >
      <ExamplePanel
        title="목록 카드 묶음 진입"
        description="각 카드마다 ScrollTrigger가 만들어지지만, 같은 시점에 들어온 요소들은 batch 콜백에서 배열로 전달되어 stagger 처리할 수 있다."
        code={batchCardsSource}
      >
        <BatchCardsExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
