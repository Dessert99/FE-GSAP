import { PracticePanel } from '../../components/learning/PracticePanel'
import { PageRouteTransitionExample } from './examples/PageRouteTransitionExample'
import pageRouteTransitionSource from './examples/PageRouteTransitionExample.tsx?raw'

export function PracticePageRouteTransitionPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Page / Route Transition</h2>
        <p className="practice__desc">
          실제 라우터를 붙이기 전에 페이지 상태 전환, 이전 화면 exit, 새 화면 enter, cleanup 경계를 한 실습에서 확인한다.
        </p>
      </header>
      <PracticePanel
        title="페이지 전환과 이전 애니메이션 cleanup"
        description="React 상태가 화면을 바꾸고, GSAP timeline은 현재 화면의 enter/exit만 담당한다. 연속 클릭 시 이전 tween을 kill해서 오래된 전환이 새 화면 위에 남지 않게 한다."
        code={pageRouteTransitionSource}
      >
        <PageRouteTransitionExample />
      </PracticePanel>
    </article>
  )
}
