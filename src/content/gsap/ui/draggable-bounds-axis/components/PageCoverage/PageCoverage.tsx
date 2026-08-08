/** 열두 canonical과 설치본 source 확인이 다섯 학습 단계에 모두 연결됐음을 보여 준다. */
import { draggableBoundsAxisItems } from '../../draggable-bounds-axis.catalog'
import { draggableBoundsAxisCoverage, draggableBoundsAxisSections } from '../../draggable-bounds-axis.meta'

const officialItems = draggableBoundsAxisItems.filter((item) => item.origin === 'official')
const sourceItems = draggableBoundsAxisItems.filter((item) => item.origin === 'source')
const canonicalCount = new Set(officialItems.map((item) => item.source)).size

export function PageCoverage() {
  return <nav className="draggable-bounds-axis-coverage" aria-label="공식 source 대응 범위"><div><strong>{canonicalCount}/{draggableBoundsAxisCoverage.officialSources}</strong><span>공식 canonical</span></div><div><strong>{officialItems.length}/{draggableBoundsAxisCoverage.officialSourceItems}</strong><span>공식 기술 item</span></div><p>설치본 source/type 경계 {sourceItems.length}/{draggableBoundsAxisCoverage.sourceVerifiedItems}개는 공식 분모와 따로 기록했습니다.</p><ol>{draggableBoundsAxisSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.number} · {section.title} <small>{section.sourceItems}개</small></a></li>)}</ol></nav>
}
