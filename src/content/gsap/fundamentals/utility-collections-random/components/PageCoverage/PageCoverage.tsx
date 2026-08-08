/** 공식 source와 로컬 섹션의 coverage 분모를 페이지 위에서 확인하게 한다. */
import { utilityCollectionsRandomSourceItems } from '../../utility-collections-random.catalog'
import { utilityCollectionsRandomSections, utilityCollectionsRandomCoverage } from '../../utility-collections-random.meta'

/** 각 학습 단계가 맡은 공식 item 수를 표시한다. */
export function PageCoverage() {
  const officialItems = utilityCollectionsRandomSourceItems.filter((item) => item.origin === 'official')
  const officialSourceCount = new Set(officialItems.map((item) => item.source)).size
  const probeItemCount = utilityCollectionsRandomSourceItems.filter((item) => item.origin === 'probe').length

  return (
    <aside className="utility-collections-coverage" aria-label="공식 문서 coverage">
      <div className="utility-collections-coverage__summary">
        <div><strong>{officialSourceCount}/{utilityCollectionsRandomCoverage.officialSources}</strong><span>공식 문서</span></div>
        <div><strong>{officialItems.length}/{utilityCollectionsRandomCoverage.officialSourceItems}</strong><span>공식 기술 항목</span></div>
        <p>공식 사실 {officialItems.length}개와 별도 실행 probe {probeItemCount}개를 구분해 연결했습니다.</p>
      </div>
      <ol>{utilityCollectionsRandomSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><span>{section.number}</span><div><strong>{section.title}</strong><small>공식 항목 {section.sourceItems}개</small></div></a></li>)}</ol>
    </aside>
  )
}
