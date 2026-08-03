/** 공식 source 21개가 일곱 학습 단계에 모두 배치됐음을 탐색 전에 보여준다. */
import { tweenStartEndValuesCoverage, tweenStartEndValuesSections } from '../../tween-start-end-values.meta'
import { tweenStartEndValuesReference } from '../../tween-start-end-values.reference'

/** 공식 source와 로컬 section의 전체 대응 범위를 표시한다. */
export function PageCoverage() {
  return (
    <nav className="tween-values-coverage" aria-label="공식 source 대응 범위">
      <div className="tween-values-coverage__summary">
        <div><strong>{tweenStartEndValuesCoverage.officialSources}/3</strong><span>공식 source</span></div>
        <div><strong>{tweenStartEndValuesReference.length}/21</strong><span>기술 item</span></div>
        <p>세 문서의 21개 항목을 값의 소유권부터 method 선택까지 일곱 질문으로 다시 묶었습니다.</p>
      </div>
      <ol>
        {tweenStartEndValuesSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div><strong>{section.title}</strong><small>{section.sourceItems}개 source item</small></div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
