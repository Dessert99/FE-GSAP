import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { BasicTriggerExample } from './examples/BasicTriggerExample'
import basicTriggerSource from './examples/BasicTriggerExample.tsx?raw'
import { ToggleActionsExample } from './examples/ToggleActionsExample'
import toggleActionsSource from './examples/ToggleActionsExample.tsx?raw'

export function ScrollTriggerBasicsPage() {
  return (
    <LessonLayout
      title="ScrollTrigger 기본"
      description="ScrollTrigger는 스크롤 위치를 기준으로 tween이나 timeline을 실행한다. trigger, start, end, toggleActions가 가장 기본이 되는 설정이다."
    >
      <ExamplePanel
        title="기본 트리거"
        description="scrollTrigger.trigger는 기준 요소를 정하고, start는 기준 요소와 scroller가 만나는 지점을 정한다. 예제 안의 스크롤 영역을 내려 카드가 나타나는 순간을 확인한다."
        code={basicTriggerSource}
      >
        <BasicTriggerExample />
      </ExamplePanel>
      <ExamplePanel
        title="toggleActions"
        description="toggleActions는 onEnter, onLeave, onEnterBack, onLeaveBack 순간에 애니메이션을 어떻게 제어할지 정한다."
        code={toggleActionsSource}
      >
        <ToggleActionsExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
