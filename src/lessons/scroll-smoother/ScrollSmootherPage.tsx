import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { SmoothEffectsExample } from './examples/SmoothEffectsExample'
import smoothEffectsSource from './examples/SmoothEffectsExample.tsx?raw'

export function ScrollSmootherPage() {
  return (
    <LessonLayout
      title="ScrollSmoother"
      description="ScrollSmoother는 wrapper/content 구조를 기준으로 페이지 레벨 스크롤을 부드럽게 보정하고, data-speed나 data-lag 효과를 ScrollTrigger와 함께 처리한다."
    >
      <ExamplePanel
        title="페이지 레벨 wrapper / content 구조"
        description="ScrollSmoother는 body 높이와 window 스크롤을 다루므로 iframe 안의 독립 페이지에서 실행한다. 프레임 안을 스크롤하면 smoothing과 data-speed 차이를 확인할 수 있다."
        code={smoothEffectsSource}
      >
        <SmoothEffectsExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
