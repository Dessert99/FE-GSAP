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
    <nav className="timeline-playback-coverage" aria-label="Timeline 재생 제어 학습 순서">
      <div className="timeline-playback-coverage__summary">
        <div>
          <strong>{mappedSources}/{timelinePlaybackControlsCoverage.officialSources}</strong>
          <span>대조한 공식 문서</span>
        </div>
        <div>
          <strong>{officialItems.length}/{timelinePlaybackControlsCoverage.officialSourceItems}</strong>
          <span>설명한 핵심 동작</span>
        </div>
        <div>
          <strong>{probeItems}/{timelinePlaybackControlsCoverage.probeItems}</strong>
          <span>직접 확인한 동작</span>
        </div>
        <p>여덟 공식 문서의 재생 명령을 상태 확인 → 위치 지정 → 정방향·역방향 제어 순서로 묶고, 문서에 없는 경계 동작은 직접 확인해 구분했습니다.</p>
      </div>
      <ol>
        {timelinePlaybackControlsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 핵심 동작</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
