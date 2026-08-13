/** 네 canonical의 item-level coverage와 probe 분리를 페이지 첫 화면에 드러낸다. */
import { utilityPipelineSourceItems } from '../../utility-pipelines-units.catalog'
import { utilityPipelinesUnitsCoverage, utilityPipelinesUnitsSections } from '../../utility-pipelines-units.meta'

// 공식 문서에 게시된 item만 release 분모로 세고 probe는 실행 근거로 따로 센다
const officialItemCount = utilityPipelineSourceItems.filter((item) => item.origin === 'official').length
// 선행 hub가 소유하지만 이 페이지에서 되돌리면 안 되는 공식 오류는 분모 밖에서 따로 센다
const preservedItemCount = utilityPipelineSourceItems.filter((item) => item.origin === 'upstream-official').length
// 공식이 침묵하거나 스스로 충돌한 지점의 실행 확인 수를 별도로 보여준다
const probeItemCount = utilityPipelineSourceItems.filter((item) => item.origin === 'implementation').length
// catalog가 실제로 참조한 canonical 수로 source coverage 분자를 만든다
const mappedSourceCount = new Set(utilityPipelineSourceItems.filter((item) => item.origin === 'official').map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="pipeline-units-coverage" aria-label="함수 연결과 단위 처리 학습 순서">
      <div className="pipeline-units-coverage__summary">
        <div><strong>{mappedSourceCount}/{utilityPipelinesUnitsCoverage.officialSources}</strong><span>대조한 공식 문서</span></div>
        <div><strong>{officialItemCount}/{utilityPipelinesUnitsCoverage.officialSourceItems}</strong><span>설명한 핵심 동작</span></div>
        <p>네 문서의 핵심 동작 {officialItemCount}개를 함수 연결 → 단위 분리 → 브라우저 속성 확인 순서로 묶고, 선행 문서의 오류 {preservedItemCount}개와 직접 확인한 경계 {probeItemCount}개를 구분했습니다.</p>
      </div>
      <ol>
        {utilityPipelinesUnitsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div><strong>{section.title}</strong><small>{section.sourceItems}개 핵심 동작{'preservedItems' in section ? ` · 앞 문서에서 이어 온 경계 ${section.preservedItems}개` : ''}</small></div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
