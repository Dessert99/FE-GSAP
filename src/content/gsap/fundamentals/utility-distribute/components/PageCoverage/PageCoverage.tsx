/** 공식 source와 로컬 섹션의 item-level 대응 수를 첫 화면에서 검산하게 한다. */
import { utilityDistributeSourceItems } from '../../utility-distribute.catalog'
import { utilityDistributeCoverage, utilityDistributeSections } from '../../utility-distribute.meta'

// 공식 게시물만 공식 coverage 분모에 넣는다
const officialItemCount = utilityDistributeSourceItems.filter((item) => item.origin === 'official').length
// 설치본 실행으로 확인한 항목은 공식 수와 섞지 않는다
const probeItemCount = utilityDistributeSourceItems.filter((item) => item.origin === 'implementation').length
// 실제 catalog가 근거를 연결한 canonical 수를 센다
const mappedSourceCount = new Set(utilityDistributeSourceItems.map((item) => item.source)).size

/** 공식 32개와 probe 5개가 어떤 학습 단계에 놓였는지 보여 준다. */
export function PageCoverage() {
  return (
    <nav className="utility-distribute-coverage" aria-label="공식 source 대응 범위">
      <div className="utility-distribute-coverage__summary">
        <div><strong>{mappedSourceCount}/{utilityDistributeCoverage.officialSources}</strong><span>공식 source</span></div>
        <div><strong>{officialItemCount}/{utilityDistributeCoverage.officialSourceItems}</strong><span>공식 item</span></div>
        <div><strong>{probeItemCount}/{utilityDistributeCoverage.probeItems}</strong><span>분리된 probe</span></div>
        <p>공식 계약은 그대로 보존하고, 문서가 말하지 않은 조합 결과는 GSAP 3.15.0 probe로 분리했습니다.</p>
      </div>
      <ol>
        {utilityDistributeSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div><strong>{section.title}</strong><small>{section.sourceItems}개 공식 item</small></div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
