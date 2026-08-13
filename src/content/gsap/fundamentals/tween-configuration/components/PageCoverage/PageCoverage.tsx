/** 공식 문서의 설정 개념을 여섯 학습 순서로 안내한다. */
import { tweenConfigurationSections } from '../../tween-configuration.meta'

export function PageCoverage() {
  return (
    <nav className="tween-config-coverage" aria-label="이 페이지의 학습 순서">
      <div className="tween-config-coverage__summary">
        <div>
          <strong>학습 순서</strong>
          <span>Tween 설정</span>
        </div>
        <p>설정이 어디서 오고 어디까지 적용되는지 여섯 단계로 살펴봅니다.</p>
      </div>
      <ol>
        {tweenConfigurationSections.map((section) => (
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
