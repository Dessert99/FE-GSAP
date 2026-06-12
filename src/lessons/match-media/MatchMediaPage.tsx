import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ResponsiveMatchMediaExample } from './examples/ResponsiveMatchMediaExample'
import responsiveMatchMediaSource from './examples/ResponsiveMatchMediaExample.tsx?raw'

export function MatchMediaPage() {
  return (
    <LessonLayout
      title="gsap.matchMedia()"
      description="gsap.matchMedia()는 미디어쿼리 조건별로 GSAP 코드를 등록하고, 조건이 바뀌면 해당 조건에서 만든 애니메이션을 자동으로 되돌린다."
    >
      <ExamplePanel
        title="반응형 분기"
        description="조건 객체를 넘기면 context.conditions로 현재 매칭 상태를 읽을 수 있다. 데스크톱·모바일·reduced motion 분기를 한곳에서 관리한다."
        code={responsiveMatchMediaSource}
      >
        <ResponsiveMatchMediaExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
