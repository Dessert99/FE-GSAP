/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { tweenInstanceSourceItems } from '../../tween-instance.catalog'
import { tweenInstanceCoverage, tweenInstanceSections } from '../../tween-instance.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = tweenInstanceSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = tweenInstanceSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(tweenInstanceSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="instance-coverage" aria-label="공식 source 대응 범위">
      <div className="instance-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{tweenInstanceCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{tweenInstanceCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          Tween 본문과 data · scrollTrigger · targets() 세 속성 문서의 기술 item {tweenInstanceCoverage.officialSourceItems}개를 "만들면
          무엇이 남는가"를 따라가는 일곱 단계로 다시 묶었습니다. 여기에 공식 문서에 없어 직접 실행해 확인한 항목 {probeItemCount}개를 따로
          표시합니다.
        </p>
      </div>
      <ol>
        {tweenInstanceSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 source item</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
