import { PracticePanel } from '../../components/learning/PracticePanel'
import { HeroIntroSequenceExample } from './examples/HeroIntroSequenceExample'
import heroIntroSequenceSource from './examples/HeroIntroSequenceExample.tsx?raw'

export function PracticeHeroIntroPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Hero Intro Sequence</h2>
        <p className="practice__desc">
          API 하나를 따로 보는 대신, 실제 히어로 영역에서 필요한 등장 순서, 기본값 공유, 겹치는 타이밍, reduced motion 대응을 하나의 흐름으로 조합한다.
        </p>
      </header>
      <PracticePanel
        title="timeline으로 히어로 진입 흐름 만들기"
        description="timeline이 제목, 설명, 버튼, 카드의 등장 순서를 한 재생 단위로 묶는다. reduced motion 환경에서는 큰 이동을 생략하고 최종 읽기 상태를 바로 보여준다."
        code={heroIntroSequenceSource}
      >
        <HeroIntroSequenceExample />
      </PracticePanel>
    </article>
  )
}
