/** P03에서 만든 instance가 lifecycle method로 상태를 바꾸는 흐름을 소개한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** enable·disable·kill을 같은 instance의 서로 다른 수명 단계로 설명한다. */
export function LifecycleMentalModelSection() {
  return <section id="lifecycle-mental-model" className="draggable-lifecycle-page__section" aria-labelledby="lifecycle-mental-model-title"><SectionHeading number="01" id="lifecycle-mental-model" title="instance는 enabled와 disposed를 구분한다" description="target 하나에 연결한 Draggable instance를 계속 쓰거나, 잠시 멈추거나, lookup에서 제거하는 세 상태를 분리합니다." /><div className="draggable-lifecycle-page__prose"><p><code>disable()</code>은 같은 instance를 잠시 쉬게 하고 <code>enable()</code>은 다시 user drag를 받게 합니다. 반면 <code>kill()</code>은 instance를 disable하고 lookup에서 제거합니다.</p><p>이 페이지는 animation을 자동 재생하지 않습니다. control은 한 번의 method 호출만 하고, state와 반환값은 instance에서 직접 읽어 보여 줍니다.</p></div><div className="draggable-lifecycle-page__note"><h3>앞선 단계</h3><p>instance를 어떻게 만들고 target으로 다시 찾는지는 <a href={toHref('/fundamentals/draggable-create')}>Draggable create와 identity</a>에서 먼저 확인합니다. plugin registration은 <a href={toHref('/fundamentals/plugins')}>plugin loading과 registration</a>에서 다룹니다.</p></div></section>
}
