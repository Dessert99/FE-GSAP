/** 겹침 판정과 release momentum을 이해하는 다섯 학습 단계를 안내한다. */
import { draggableCollisionMomentumSections } from '../../draggable-collision-momentum.meta'

export function PageCoverage() {
  return (
    <nav className="draggable-collision-momentum-coverage" aria-label="이 페이지의 학습 순서">
      <div>
        <strong>학습 순서</strong>
        <span>겹침과 관성 상태</span>
      </div>
      <div>
        <strong>핵심 질문</strong>
        <span>겹쳤는가, 아직 던져지는 중인가</span>
      </div>
      <p>hitTest의 threshold부터 release Tween과 cleanup까지 한 target으로 확인합니다.</p>
      <ol>
        {draggableCollisionMomentumSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
