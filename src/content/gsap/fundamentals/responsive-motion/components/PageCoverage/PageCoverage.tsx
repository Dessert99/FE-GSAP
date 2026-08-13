/** 조건을 등록하고 정리와 강제 재실행까지 이어지는 학습 순서를 안내한다. */
import { responsiveMotionSections } from '../../responsive-motion.meta'

export function PageCoverage() {
  return (
    <nav className="responsive-coverage" aria-label="학습 순서">
      <div className="responsive-coverage__summary">
        <strong>학습 순서</strong>
        <p>
          조건과 handler를 연결하고, 조건이 바뀔 때의 자동 정리와 앱 설정을 다시 읽는 강제 재실행까지 차례로 확인합니다.
        </p>
      </div>
      <ol>
        {responsiveMotionSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
