/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { modifiersSnapWrapSourceItems } from '../../modifiers-snap-wrap.catalog'
import { modifiersSnapWrapCoverage, modifiersSnapWrapSections } from '../../modifiers-snap-wrap.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = modifiersSnapWrapSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = modifiersSnapWrapSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(modifiersSnapWrapSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="msw-coverage" aria-label="값 보정과 순환 학습 순서">
      <div className="msw-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{modifiersSnapWrapCoverage.officialSources}
          </strong>
          <span>대조한 공식 문서</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{modifiersSnapWrapCoverage.officialSourceItems}
          </strong>
          <span>설명한 핵심 동작</span>
        </div>
        <p>
          공식 다섯 문서의 핵심 동작 {modifiersSnapWrapCoverage.officialSourceItems}개를 "가로채기 → 눈금 → 순환"의 여섯 단계로 묶었습니다. 문서에 없는 경계 동작 {probeItemCount}개는 직접 확인해 구분했습니다.</p>
      </div>
      <ol>
        {modifiersSnapWrapSections.map((section) => (
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
