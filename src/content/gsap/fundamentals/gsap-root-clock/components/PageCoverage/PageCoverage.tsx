/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { gsapRootClockSourceItems } from '../../gsap-root-clock.catalog'
import { gsapRootClockCoverage, gsapRootClockSections } from '../../gsap-root-clock.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = gsapRootClockSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = gsapRootClockSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(gsapRootClockSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="root-clock-coverage" aria-label="GSAP 시간 구조 학습 순서">
      <div className="root-clock-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{gsapRootClockCoverage.officialSources}
          </strong>
          <span>대조한 공식 문서</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{gsapRootClockCoverage.officialSourceItems}
          </strong>
          <span>설명한 핵심 동작</span>
        </div>
        <p>
          globalTimeline·ticker·exportRoot()·updateRoot() 네 문서의 핵심 동작 {gsapRootClockCoverage.officialSourceItems}개를 "누가
          움직이나 → 시간의 구조 → 시간의 동력 → 밀렸을 때 → 떼어내기 → 직접 주기"라는 일곱 단계로 다시 묶었습니다. 여기에 공식 문서에
          없어 직접 실행해 확인한 항목 {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {gsapRootClockSections.map((section) => (
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
