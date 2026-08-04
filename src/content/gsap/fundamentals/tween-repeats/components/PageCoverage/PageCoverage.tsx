/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { tweenRepeatsSourceItems } from '../../tween-repeats.catalog'
import { tweenRepeatsCoverage, tweenRepeatsSections } from '../../tween-repeats.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = tweenRepeatsSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = tweenRepeatsSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(tweenRepeatsSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="repeats-coverage" aria-label="공식 source 대응 범위">
      <div className="repeats-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{tweenRepeatsCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{tweenRepeatsCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          Tween의 반복·회차 메서드 네 개와 invalidate의 기술 item {tweenRepeatsCoverage.officialSourceItems}개를 "반복은 어떻게 세나"와
          "기억한 값은 언제 지워지나"라는 두 질문의 일곱 단계로 다시 묶었습니다. 여기에 공식 문서에 없어 직접 실행해 확인한 항목{' '}
          {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {tweenRepeatsSections.map((section) => (
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
