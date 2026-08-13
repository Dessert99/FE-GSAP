/** 공식 문서와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { gsapContextSourceItems } from '../../gsap-context.catalog'
import { gsapContextCoverage, gsapContextSections } from '../../gsap-context.meta'

// 선언한 문서 수가 아니라 catalog가 실제로 근거를 댄 문서 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(gsapContextSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="context-coverage" aria-label="공식 문서 학습 범위">
      <div className="context-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{gsapContextCoverage.officialSources}
          </strong>
          <span>공식 문서</span>
        </div>
        <div>
          <strong>전체</strong>
          <span>설명 확인</span>
        </div>
        <p>
          gsap.context()와 gsap.utils.selector() 문서에서 확인한 설명을 "모아서 되돌리기 → 범위 가두기 → 나중에 생기는 것"이라는 여섯
          단계로 다시 묶었습니다. 공식 문서에 없는 동작은 직접 실행해 확인한 결과라고 구분해 표시합니다.
        </p>
      </div>
      <ol>
        {gsapContextSections.map((section) => (
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
