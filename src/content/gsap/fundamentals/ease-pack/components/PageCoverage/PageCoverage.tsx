/** 공식 세 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { easePackSourceItems } from '../../ease-pack.catalog'
import { easePackCoverage, easePackSections } from '../../ease-pack.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = easePackSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = easePackSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(easePackSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="ease-pack-coverage" aria-label="공식 문서 학습 범위">
      <div className="ease-pack-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{easePackCoverage.officialSources}
          </strong>
          <span>공식 문서</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{easePackCoverage.officialSourceItems}
          </strong>
          <span>확인한 설명</span>
        </div>
        <p>
          ExpoScaleEase·RoughEase·SlowMo 세 문서에서 확인한 설명 {easePackCoverage.officialSourceItems}개를 "이 ease는 어떤 문제를
          푸는가"라는 흐름의 여섯 단계로 다시 묶었습니다. 공식 문서에 없어 설치된 GSAP으로 확인한 동작 {probeItemCount}개는 따로
          표시합니다.
        </p>
      </div>
      <ol>
        {easePackSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 설명</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
