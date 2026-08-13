/** 현재 값 읽기부터 고빈도 쓰기 선택까지 이어지는 학습 순서를 안내한다. */
import { highFrequencyUpdatesSections } from '../../high-frequency-updates.meta'

export function PageCoverage() {
  return (
    <nav className="hfu-coverage" aria-label="학습 순서">
      <div className="hfu-coverage__summary">
        <strong>학습 순서</strong>
        <p>
          현재 값을 읽은 뒤 즉시 쓸지 부드럽게 따라가게 할지 고르고, 빠른 경로가 생략하는 편의 기능과 조합 방법을 확인합니다.
        </p>
      </div>
      <ol>
        {highFrequencyUpdatesSections.map((section) => (
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
