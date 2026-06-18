import { PracticePanel } from '../../components/learning/PracticePanel'
import { NavigationModalExample } from './examples/NavigationModalExample'
import navigationModalSource from './examples/NavigationModalExample.tsx?raw'

export function PracticeNavigationModalPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Navigation / Modal Microinteractions</h2>
        <p className="practice__desc">
          메뉴와 모달처럼 작은 상태 전환이 많은 UI에서 enter/exit 모션, ESC 닫기, focus 복귀, 연타 대응을 함께 확인한다.
        </p>
      </header>
      <PracticePanel
        title="상태 전환이 꼬이지 않는 모달 모션 만들기"
        description="열림과 닫힘을 같은 timeline으로 관리하고, 닫힘 애니메이션이 끝난 뒤 React 상태를 제거한다. ESC와 focus 복귀까지 포함해 실제 UI에 가까운 흐름으로 검증한다."
        code={navigationModalSource}
      >
        <NavigationModalExample />
      </PracticePanel>
    </article>
  )
}
