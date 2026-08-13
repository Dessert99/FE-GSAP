/** CustomEase를 만들고 쓰는 순서를 일곱 학습 섹션으로 바로 찾게 한다. */
import { customEaseSections } from '../../custom-ease.meta'

export function PageCoverage() {
  return (
    <nav className="custom-ease-coverage" aria-label="CustomEase 학습 목차">
      <div className="custom-ease-coverage__summary">
        <strong>어디서부터 읽을까요?</strong>
        <p>곡선을 직접 만들고 이름으로 재사용하는 과정을 일곱 단계로 나누었습니다. 필요한 주제로 바로 이동하세요.</p>
      </div>
      <ol>
        {customEaseSections.map((section) => (
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
