import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { PlaybackControlsExample } from './examples/PlaybackControlsExample'
import playbackControlsSource from './examples/PlaybackControlsExample.tsx?raw'
import { SeekProgressExample } from './examples/SeekProgressExample'
import seekProgressSource from './examples/SeekProgressExample.tsx?raw'
import { TimeScaleExample } from './examples/TimeScaleExample'
import timeScaleSource from './examples/TimeScaleExample.tsx?raw'

export function TimelineControlsPage() {
  return (
    <LessonLayout
      title="타임라인 제어"
      description="타임라인은 여러 트윈을 하나의 animation 객체처럼 제어할 수 있다. play, pause, reverse, restart, seek, progress, timeScale을 UI 이벤트와 연결한다."
    >
      <ExamplePanel
        title="play / pause / reverse / restart"
        description="생성해 둔 timeline 인스턴스를 ref에 보관하면 버튼 이벤트에서 전체 시퀀스를 재생, 정지, 역재생, 처음부터 재시작할 수 있다."
        code={playbackControlsSource}
      >
        <PlaybackControlsExample />
      </ExamplePanel>
      <ExamplePanel
        title="seek / progress"
        description="seek()는 초 단위 시간으로 이동하고, progress()는 0~1 비율로 타임라인 진행률을 이동한다. 디버깅과 스크러빙 UI의 기초다."
        code={seekProgressSource}
      >
        <SeekProgressExample />
      </ExamplePanel>
      <ExamplePanel
        title="timeScale"
        description="timeScale()은 타임라인 전체 속도를 바꾼다. 같은 시퀀스를 빠르게 미리 보거나 느리게 디버깅할 때 유용하다."
        code={timeScaleSource}
      >
        <TimeScaleExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
