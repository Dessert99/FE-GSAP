/** bounds·축·scroll·재측정을 익히는 다섯 학습 단계를 안내한다. */
import { draggableBoundsAxisSections } from '../../draggable-bounds-axis.meta'

export function PageCoverage() {
  return <nav className="draggable-bounds-axis-coverage" aria-label="이 페이지의 학습 순서"><div><strong>학습 순서</strong><span>Draggable 공간 제약</span></div><div><strong>핵심 질문</strong><span>어디까지, 어느 축으로 움직일 수 있나</span></div><p>bounds 측정부터 축 잠금, edge scroll, 외부 layout 변화 뒤 재측정까지 차례로 살펴봅니다.</p><ol>{draggableBoundsAxisSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title}</a></li>)}</ol></nav>
}
