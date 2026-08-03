/** 연속 curve와 Core에 포함된 steps의 불연속 진행을 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { SteppedEaseExample } from '../../examples/SteppedEaseExample/SteppedEaseExample'

export function SteppedEaseSection() {
  return (
    <section className="easing-page__section" aria-labelledby="easing-steps">
      <SectionHeading number="02" id="easing-steps" title="steps는 중간값을 계단으로 나눕니다" description="부드러운 보간이 아니라 sprite·frame 같은 불연속 변화를 만들 때 씁니다." />
      <p><code>ease: 'steps(5)'</code>로 0에서 100까지 이동하면 값은 20, 40, 60, 80, 100의 다섯 단계로 바뀝니다. SteppedEase는 GSAP Core에 포함되고 equation은 0~1을 반환합니다.</p>
      <SteppedEaseExample />
    </section>
  )
}
