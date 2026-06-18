import { PracticePanel } from '../../components/learning/PracticePanel'
import { ListReorderFilteringExample } from './examples/ListReorderFilteringExample'
import listReorderFilteringSource from './examples/ListReorderFilteringExample.tsx?raw'

export function PracticeListReorderFilteringPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: List Reorder / Filtering</h2>
        <p className="practice__desc">
          데이터 필터링과 정렬로 DOM 순서가 바뀔 때 `Flip`으로 이전 위치와 새 위치를 자연스럽게 연결한다.
        </p>
      </header>
      <PracticePanel
        title="데이터 필터링과 Flip 레이아웃 전환"
        description="React는 필터링된 목록을 다시 렌더링하고, Flip은 그 전후의 위치 차이만 애니메이션한다. 상태 변경 전 getState, 상태 변경 후 Flip.from 순서가 핵심이다."
        code={listReorderFilteringSource}
      >
        <ListReorderFilteringExample />
      </PracticePanel>
    </article>
  )
}
