import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { MatchMediaReducedMotionExample } from './examples/MatchMediaReducedMotionExample'
import matchMediaReducedMotionSource from './examples/MatchMediaReducedMotionExample.tsx?raw'

export function ReducedMotionPage() {
  return (
    <LessonLayout
      title="prefers-reduced-motion"
      description="prefers-reduced-motion 대응은 사용자의 OS 접근성 설정을 읽고, 큰 이동·회전·반복 모션을 줄이거나 즉시 상태 적용으로 대체하는 실무 패턴이다."
    >
      <ExamplePanel
        title="matchMedia로 모션 강도 분기"
        description="gsap.matchMedia()에 reduceMotion 조건을 넣고, 조건이 참이면 이동 대신 짧은 opacity 변화나 즉시 set으로 대체한다. 조건 변경 시 mm.revert()가 이전 애니메이션을 정리한다."
        code={matchMediaReducedMotionSource}
      >
        <MatchMediaReducedMotionExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
