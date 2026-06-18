import { PracticePanel } from '../../components/learning/PracticePanel'
import { SvgTextMotionExample } from './examples/SvgTextMotionExample'
import svgTextMotionSource from './examples/SvgTextMotionExample.tsx?raw'

export function PracticeSvgTextMotionPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: SVG / Text Motion Section</h2>
        <p className="practice__desc">
          브랜드 섹션에서 SVG 경로, path follower, 분해된 헤드라인, 상태 문구 변경을 하나의 읽기 흐름으로 묶는다.
        </p>
      </header>
      <PracticePanel
        title="SVG 라인과 텍스트 모션을 하나의 시퀀스로 연결하기"
        description="DrawSVGPlugin이 라인을 그리는 동안 MotionPathPlugin은 점을 같은 경로로 이동시킨다. SplitText와 TextPlugin은 시각적 강조와 문구 변경을 담당하되 원래 텍스트 의미는 DOM에 남긴다."
        code={svgTextMotionSource}
      >
        <SvgTextMotionExample />
      </PracticePanel>
    </article>
  )
}
