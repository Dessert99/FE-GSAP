/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { tweenConfigurationSourceItems } from '../../tween-configuration.catalog'
import { tweenConfigurationCoverage, tweenConfigurationSections } from '../../tween-configuration.meta'

export function PageCoverage() {
  return (
    <nav className="tween-config-coverage" aria-label="공식 source 대응 범위">
      <div className="tween-config-coverage__summary">
        <div>
          <strong>{tweenConfigurationCoverage.officialSources}/3</strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {tweenConfigurationSourceItems.length}/{tweenConfigurationCoverage.sourceItems}
          </strong>
          <span>기술 item</span>
        </div>
        <p>설정이 어디서 와서 어디까지 적용되는지를 기준으로 28개 기술 item을 여섯 단계로 다시 묶었습니다.</p>
      </div>
      <ol>
        {tweenConfigurationSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 source item</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
