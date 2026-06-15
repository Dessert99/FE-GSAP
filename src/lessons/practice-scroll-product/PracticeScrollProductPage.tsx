import { PracticePanel } from '../../components/learning/PracticePanel'
import { ScrollProductStoryExample } from './examples/ScrollProductStoryExample'
import scrollProductStorySource from './examples/ScrollProductStoryExample.tsx?raw'

export function PracticeScrollProductPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Scroll Product Story</h2>
        <p className="practice__desc">
          제품 소개 섹션에서 자주 쓰는 pin, scrub, batch, matchMedia를 하나의 스크롤 흐름으로 조합한다. 데스크톱과 모바일에서 같은 정보를 다른 모션 강도로 보여주는 연습이다.
        </p>
      </header>
      <PracticePanel
        title="ScrollTrigger로 제품 스토리 흐름 만들기"
        description="데스크톱에서는 제품 프레임을 고정하고 스크롤 진행률을 scrub으로 보여준다. 좁은 화면에서는 pin을 빼고 카드가 순차적으로 등장하게 만들어 레이아웃 부담을 줄인다."
        code={scrollProductStorySource}
      >
        <ScrollProductStoryExample />
      </PracticePanel>
    </article>
  )
}
