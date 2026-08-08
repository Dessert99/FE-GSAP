/** untrack의 property-list와 whole-target form을 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
/** static untrack이 instance remove 여러 번과 다른 호출 경계임을 설명한다. */
export function WholeTargetUntrackSection() {
  return (
    <section>
      <SectionHeading number="04" title="whole-target untrack" />
      <p>
        <code>VelocityTracker.untrack(target, 'x,rotation')</code>은
        comma-list만 멈추고, property를 생략한{' '}
        <code>VelocityTracker.untrack(target)</code>은 그 target의 모든 tracked
        property를 멈춥니다.
      </p>
      <p>
        lab의 <strong>untrack all</strong>은 후자입니다. 이후 다시 track set을
        실행하면 같은 stable target에서 membership을 다시 시작할 수 있습니다.
      </p>
    </section>
  )
}
