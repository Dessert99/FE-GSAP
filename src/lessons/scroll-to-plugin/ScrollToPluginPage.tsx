import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ScrollToTargetExample } from './examples/ScrollToTargetExample'
import scrollToTargetSource from './examples/ScrollToTargetExample.tsx?raw'

export function ScrollToPluginPage() {
  return (
    <LessonLayout
      title="ScrollToPlugin"
      description="ScrollToPlugin은 window나 스크롤 가능한 요소의 scrollTop/scrollLeft를 GSAP tween으로 이동시킨다. 앵커 이동, 목차, 스텝 이동에 자주 쓴다."
    >
      <ExamplePanel
        title="내부 scroller의 목표 요소로 이동"
        description="scrollTo.y에 DOM 요소를 넘기면 해당 요소 위치로 스크롤된다. offsetY는 고정 헤더나 sticky nav 높이만큼 도착 지점을 보정할 때 쓴다."
        code={scrollToTargetSource}
      >
        <ScrollToTargetExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
