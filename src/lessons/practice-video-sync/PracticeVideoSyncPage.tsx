import { PracticePanel } from '../../components/learning/PracticePanel'
import { VideoSyncExample } from './examples/VideoSyncExample'
import videoSyncSource from './examples/VideoSyncExample.tsx?raw'

export function PracticeVideoSyncPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Video Sync</h2>
        <p className="practice__desc">
          스크롤이나 timeline 진행률을 영상 시간, 진행 막대, 주변 UI 상태와 동기화하는 패턴을 다룬다.
        </p>
      </header>
      <PracticePanel
        title="timeline 진행률로 영상 재생 위치 제어하기"
        description="예제는 외부 영상 파일 없이 video shell을 사용하지만, 핵심은 progress 값을 하나의 source of truth로 두고 video.currentTime과 UI를 같이 갱신하는 구조다."
        code={videoSyncSource}
      >
        <VideoSyncExample />
      </PracticePanel>
    </article>
  )
}
