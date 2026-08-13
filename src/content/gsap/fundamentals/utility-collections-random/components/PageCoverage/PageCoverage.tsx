/** 공식 source와 로컬 섹션의 coverage 분모를 페이지 위에서 확인하게 한다. */
import { utilityCollectionsRandomSourceItems } from '../../utility-collections-random.catalog'
import { utilityCollectionsRandomSections, utilityCollectionsRandomCoverage } from '../../utility-collections-random.meta'

/** 각 학습 단계가 맡은 공식 item 수를 표시한다. */
export function PageCoverage() {
  const officialItems = utilityCollectionsRandomSourceItems.filter((item) => item.origin === 'official')
  const officialSourceCount = new Set(officialItems.map((item) => item.source)).size
  const probeItemCount = utilityCollectionsRandomSourceItems.filter((item) => item.origin === 'probe').length

  return (
    <aside className="utility-collections-coverage" aria-label="컬렉션과 무작위 값 학습 순서">
      <div className="utility-collections-coverage__summary">
        <div><strong>{officialSourceCount}/{utilityCollectionsRandomCoverage.officialSources}</strong><span>공식 문서</span></div>
        <div><strong>{officialItems.length}/{utilityCollectionsRandomCoverage.officialSourceItems}</strong><span>설명한 핵심 동작</span></div>
        <p>공식 문서의 핵심 동작 {officialItems.length}개를 배열 정규화 → 선택 → 섞기 순서로 묶고, 문서에 없는 경계 {probeItemCount}개는 직접 확인했습니다.</p>
      </div>
      <ol>{utilityCollectionsRandomSections.map((section) => <li key={section.id}><a href={`#${section.id}`}><span>{section.number}</span><div><strong>{section.title}</strong><small>{section.sourceItems}개 핵심 동작</small></div></a></li>)}</ol>
    </aside>
  )
}
