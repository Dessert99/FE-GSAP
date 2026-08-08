/** 공식 source와 item이 로컬 섹션에 전부 연결됐는지 첫 화면에서 보여 준다. */
import { timelinePlaybackControlsSourceItems } from '../../timeline-playback-controls.catalog'
import { timelinePlaybackControlsCoverage, timelinePlaybackControlsSections } from '../../timeline-playback-controls.meta'

// 실행 확인 item은 공식 분모와 섞지 않아 원문 coverage를 부풀리지 않는다
const officialItems = timelinePlaybackControlsSourceItems.filter((item) => item.origin === 'official')
// catalog가 실제로 근거를 가진 canonical 종류를 분자로 쓴다
const mappedSources = new Set(officialItems.map((item) => item.source)).size
// 공식이 침묵하거나 실행과 어긋난 항목은 별도 분자로 표시한다
const probeItems = timelinePlaybackControlsSourceItems.length - officialItems.length

export function PageCoverage() {
  return (
    <nav className="timeline-playback-coverage" aria-label="Timeline playback 공식 source 대응 범위">
      <div className="timeline-playback-coverage__summary">
        <div>
          <strong>{mappedSources}/{timelinePlaybackControlsCoverage.officialSources}</strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>{officialItems.length}/{timelinePlaybackControlsCoverage.officialSourceItems}</strong>
          <span>공식 기술 item</span>
        </div>
        <div>
          <strong>{probeItems}/{timelinePlaybackControlsCoverage.probeItems}</strong>
          <span>runtime probe</span>
        </div>
        <p>여덟 canonical을 렌더 원문과 raw HTML로 두 번 대조하고, Timeline 고유 label·child cascade와 공식 오류를 따로 확인했습니다.</p>
      </div>
      <ol>
        {timelinePlaybackControlsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 공식 item</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
