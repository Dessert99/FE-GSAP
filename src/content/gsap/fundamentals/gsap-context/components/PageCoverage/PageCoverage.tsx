/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { gsapContextSourceItems } from '../../gsap-context.catalog'
import { gsapContextCoverage, gsapContextSections } from '../../gsap-context.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = gsapContextSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = gsapContextSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(gsapContextSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="context-coverage" aria-label="공식 source 대응 범위">
      <div className="context-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{gsapContextCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{gsapContextCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          gsap.context()와 gsap.utils.selector()의 기술 item {gsapContextCoverage.officialSourceItems}개를 "모아서 되돌리기 → 범위
          가두기 → 나중에 생기는 것"이라는 여섯 단계로 다시 묶었습니다. 여기에 공식 문서에 없어 직접 실행해 확인한 항목{' '}
          {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {gsapContextSections.map((section) => (
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
