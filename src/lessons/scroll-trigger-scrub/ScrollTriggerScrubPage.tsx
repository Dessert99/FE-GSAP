import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ScrubProgressExample } from './examples/ScrubProgressExample'
import scrubProgressSource from './examples/ScrubProgressExample.tsx?raw'

export function ScrollTriggerScrubPage() {
  return (
    <LessonLayout
      title="ScrollTrigger scrub"
      description="scrub은 스크롤 진행률과 애니메이션 진행률을 연결한다. true는 즉시 따라가고, 숫자 값은 지정한 시간만큼 부드럽게 뒤따른다."
    >
      <ExamplePanel
        title="스크롤 진행률과 tween 연결"
        description="scrub을 켜면 duration은 시간보다 스크롤 구간 안에서의 상대 길이를 뜻한다. progress bar와 카드 이동이 스크롤 위치에 맞춰 움직인다."
        code={scrubProgressSource}
      >
        <ScrubProgressExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
