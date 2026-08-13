/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { tweenTimingMathSourceItems } from '../../tween-timing-math.catalog'
import { tweenTimingMathCoverage, tweenTimingMathSections } from '../../tween-timing-math.meta'

// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(
  tweenTimingMathSourceItems.filter((item) => item.origin === 'official').map((item) => item.source),
).size

export function PageCoverage() {
  return (
    <nav className="timing-coverage" aria-label="공식 문서 학습 범위">
      <div className="timing-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{tweenTimingMathCoverage.officialSources}
          </strong>
          <span>공식 문서</span>
        </div>
        <div>
          <strong>전체</strong>
          <span>설명 확인</span>
        </div>
        <p>
          시간을 다루는 Tween 메서드 일곱 문서에서 확인한 설명을 "하나의 시간축을 어디서부터 읽어 나가나"라는 흐름의 일곱 단계로 다시
          묶었습니다. 공식 문서에 없는 동작은 직접 실행해 확인한 결과라고 구분해 표시합니다.
        </p>
      </div>
      <ol>
        {tweenTimingMathSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems === 0 ? '선택 연습' : '공식 설명 확인'}</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
