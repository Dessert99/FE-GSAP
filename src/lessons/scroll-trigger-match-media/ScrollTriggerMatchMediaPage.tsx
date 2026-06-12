import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ResponsiveTriggerExample } from './examples/ResponsiveTriggerExample'
import responsiveTriggerSource from './examples/ResponsiveTriggerExample.tsx?raw'

export function ScrollTriggerMatchMediaPage() {
  return (
    <LessonLayout
      title="ScrollTrigger matchMedia"
      description="gsap.matchMedia()는 화면 조건별로 ScrollTrigger를 만들고 조건이 해제되면 자동으로 정리한다. 반응형 애니메이션에서 핵심 패턴이다."
    >
      <ExamplePanel
        title="화면 폭별 이동 방향"
        description="넓은 화면에서는 가로 이동, 좁은 화면에서는 세로 이동을 만든다. 조건이 바뀌면 이전 tween과 ScrollTrigger가 revert된다."
        code={responsiveTriggerSource}
      >
        <ResponsiveTriggerExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
