/** 같은 playhead 순간의 다섯 값을 수동 scrub 예제로 관찰한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { PlayheadValuesExample } from '../../examples/PlayheadValuesExample/PlayheadValuesExample'

export function InspectValuesSection() {
  return <section className="tween-playhead-page__section" aria-labelledby="playhead-inspect"><SectionHeading number="04" id="playhead-inspect" title="같은 순간의 다섯 값을 함께 봅니다" description="자동 재생 없이 전체 progress를 움직여 local 값이 cycle 경계에서 되돌아가는 순간을 확인합니다." /><PlayheadValuesExample /></section>
}
