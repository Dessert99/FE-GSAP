import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { StrokeRevealExample } from './examples/StrokeRevealExample'
import strokeRevealSource from './examples/StrokeRevealExample.tsx?raw'

export function DrawSvgPluginPage() {
  return (
    <LessonLayout
      title="DrawSVGPlugin"
      description="DrawSVGPlugin은 SVG stroke의 보이는 구간을 tween한다. 로고 라인 드로잉, 아이콘 경로 강조, 진행 상태 표현처럼 stroke 기반 SVG에서 자주 쓴다."
    >
      <ExamplePanel
        title="stroke 구간 그리기"
        description="drawSVG는 stroke의 시작/끝 구간을 퍼센트나 길이로 제어한다. 0%에서 100%로 tween하면 path가 그려지는 효과를 만들 수 있다."
        code={strokeRevealSource}
      >
        <StrokeRevealExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
