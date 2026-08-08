/** 속도의 단위와 numeric/auto 입력 선택을 먼저 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function VelocitySampleSection() {
  return (
    <section id="velocity-sample">
      <SectionHeading
        number="01"
        title="속도는 위치가 아니라 초당 변화량입니다"
        question="먼저 puck을 키보드로 움직여 속도 sample을 만듭니다."
      />
      <p>
        <code>velocity: 500</code>은 x를 처음에 초당 500px로 움직이게 합니다.{' '}
        <code>auto</code>는 이미 track한 x에서 그 값을 읽습니다.
      </p>
    </section>
  )
}
