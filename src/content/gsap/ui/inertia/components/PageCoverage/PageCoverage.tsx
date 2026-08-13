/** 속도 sampling부터 멈춤점 제한과 cleanup까지 학습 순서를 안내한다. */
import { inertiaSections } from '../../inertia.meta'

export function PageCoverage() {
  return (
    <aside className="inertia-page__coverage">
      <strong>학습 순서</strong>
      <span>속도를 읽고 bounds와 end로 최종 위치를 제한합니다.</span>
      <ol>
        {inertiaSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.number} · {section.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
