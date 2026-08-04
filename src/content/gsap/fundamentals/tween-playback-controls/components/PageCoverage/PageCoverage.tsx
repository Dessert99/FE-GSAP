/** 공식 source와 로컬 학습 섹션의 전체 대응 상태를 첫 화면에서 확인하게 한다. */
import { tweenPlaybackControlsSourceItems } from '../../tween-playback-controls.catalog'
import { tweenPlaybackControlsCoverage, tweenPlaybackControlsSections } from '../../tween-playback-controls.meta'

// 공식 문서에 게시된 주장만 coverage 분모에 넣고 실행으로 확인한 항목은 따로 센다
const officialItemCount = tweenPlaybackControlsSourceItems.filter((item) => item.origin === 'official').length
const probeItemCount = tweenPlaybackControlsSourceItems.length - officialItemCount
// 선언한 source 수가 아니라 catalog가 실제로 근거를 댄 source 수를 세어 분자로 쓴다
const mappedSourceCount = new Set(tweenPlaybackControlsSourceItems.map((item) => item.source)).size

export function PageCoverage() {
  return (
    <nav className="playback-coverage" aria-label="공식 source 대응 범위">
      <div className="playback-coverage__summary">
        <div>
          <strong>
            {mappedSourceCount}/{tweenPlaybackControlsCoverage.officialSources}
          </strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{tweenPlaybackControlsCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          Tween 메서드 8개 문서의 기술 item {tweenPlaybackControlsCoverage.officialSourceItems}개를 "지금 이 Tween을 어떻게 하고
          싶은가"라는 의도의 여섯 단계로 다시 묶었습니다. 여기에 공식 문서가 침묵하거나 실행과 어긋나 직접 확인한 항목{' '}
          {probeItemCount}개를 따로 표시합니다.
        </p>
      </div>
      <ol>
        {tweenPlaybackControlsSections.map((section) => (
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
