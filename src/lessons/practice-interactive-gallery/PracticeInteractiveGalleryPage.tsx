import { PracticePanel } from '../../components/learning/PracticePanel'
import { InteractiveGalleryExample } from './examples/InteractiveGalleryExample'
import interactiveGallerySource from './examples/InteractiveGalleryExample.tsx?raw'

export function PracticeInteractiveGalleryPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Interactive Gallery</h2>
        <p className="practice__desc">
          카드 갤러리에서 자주 만나는 정렬 전환, 직접 드래그, wheel/touch 입력을 React 상태와 충돌하지 않게 조합한다.
        </p>
      </header>
      <PracticePanel
        title="Flip, Draggable, Observer로 갤러리 조작 만들기"
        description="Flip은 카드 재배치를 부드럽게 잇고, Draggable은 직접 끌어보는 조작을 담당한다. Observer는 wheel/touch 방향 입력을 상태 변경으로 연결하되 빠른 조작에서도 tween이 쌓이지 않게 한다."
        code={interactiveGallerySource}
      >
        <InteractiveGalleryExample />
      </PracticePanel>
    </article>
  )
}
