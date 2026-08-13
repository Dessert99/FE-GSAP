/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { tweenInstanceSourceItems } from '../../tween-instance.catalog'
import { tweenInstanceCoverage, tweenInstanceSections } from '../../tween-instance.meta'

// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(tweenInstanceSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="instance-coverage" aria-label="공식 문서 학습 범위">
      <div className="instance-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{tweenInstanceCoverage.officialSources}
          </strong>
          <span>공식 문서</span>
        </div>
        <div>
          <strong>전체</strong>
          <span>설명 확인</span>
        </div>
        <p>
          Tween 본문과 data · scrollTrigger · targets() 세 속성 문서에서 확인한 설명을 "만들면 무엇이 남는가"를 따라가는 일곱 단계로
          다시 묶었습니다. 공식 문서에 없는 동작은 직접 실행해 확인한 결과라고 구분해 표시합니다.
        </p>
      </div>
      <ol>
        {tweenInstanceSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>공식 설명 확인</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
