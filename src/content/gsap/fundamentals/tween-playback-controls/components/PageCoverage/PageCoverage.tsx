/** 여섯 학습 단계를 먼저 훑고 필요한 재생 제어로 바로 이동하게 한다. */
import { tweenPlaybackControlsSections } from '../../tween-playback-controls.meta'

export function PageCoverage() {
  return (
    <nav className="playback-coverage" aria-label="학습 순서">
      <div className="playback-coverage__summary">
        <p>
          먼저 멈춤 상태와 재생 방향을 구분한 뒤, 멈추기·이어 가기·재시작·역재생과 상태 읽기를 차례로 연습합니다.
        </p>
      </div>
      <ol>
        {tweenPlaybackControlsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
