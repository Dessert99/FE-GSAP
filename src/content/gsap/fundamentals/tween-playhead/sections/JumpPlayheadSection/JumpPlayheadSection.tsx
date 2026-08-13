/** seek의 상태 보존과 이동 구간 callback 실행 옵션을 조작 예제로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { SeekEventsExample } from '../../examples/SeekEventsExample/SeekEventsExample'

export function JumpPlayheadSection() {
  return <section className="tween-playhead-page__section" aria-labelledby="playhead-jump"><SectionHeading number="05" id="playhead-jump" title="위치를 옮기는 일과 재생 상태는 별개입니다" description="seek는 즉시 이동하지만 paused·reversed 상태를 바꾸지 않고 이동 구간의 callback 실행 여부만 선택합니다." /><SeekEventsExample /></section>
}
