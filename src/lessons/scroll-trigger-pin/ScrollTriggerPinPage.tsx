import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { PinPanelExample } from './examples/PinPanelExample'
import pinPanelSource from './examples/PinPanelExample.tsx?raw'

export function ScrollTriggerPinPage() {
  return (
    <LessonLayout
      title="ScrollTrigger pin"
      description="pin은 start~end 구간 동안 특정 요소를 고정한다. 섹션형 페이지, 제품 설명, 스토리텔링 화면에서 자주 쓰인다."
    >
      <ExamplePanel
        title="구간 동안 패널 고정"
        description="pin 대상은 스크롤이 지나가는 동안 같은 자리에 머문다. pinSpacing 기본값이 뒤 콘텐츠와 겹치지 않도록 공간을 만들어준다."
        code={pinPanelSource}
      >
        <PinPanelExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
