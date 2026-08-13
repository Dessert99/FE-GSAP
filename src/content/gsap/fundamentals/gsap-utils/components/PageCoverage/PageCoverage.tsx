/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { gsapUtilsSourceItems } from '../../gsap-utils.catalog'
import { gsapUtilsCoverage, gsapUtilsSections } from '../../gsap-utils.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = gsapUtilsSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = gsapUtilsSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(gsapUtilsSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="utils-coverage" aria-label="GSAP utility 학습 순서">
      <div className="utils-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{gsapUtilsCoverage.officialSources}
          </strong>
          <span>대조한 공식 문서</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{gsapUtilsCoverage.officialSourceItems}
          </strong>
          <span>설명한 핵심 동작</span>
        </div>
        <p>
          gsap.utils와 Utility Methods 문서의 핵심 동작 {gsapUtilsCoverage.officialSourceItems}개를 "왜 따로 있고 어디서 찾나"를
          따라가는 일곱 단계로 묶었습니다. 문서에 없는 경계 동작 {probeItemCount}개는 직접 확인해 구분했습니다.
        </p>
      </div>
      <ol>
        {gsapUtilsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 핵심 동작</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
