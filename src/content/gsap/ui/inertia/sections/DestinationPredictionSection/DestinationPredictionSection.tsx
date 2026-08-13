/** resistance와 duration이 natural destination 계산에 주는 의미를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function DestinationPredictionSection() {
  return (
    <section id="destination-prediction">
      <SectionHeading
        number="03"
        title="플러그인이 감속 duration을 계산합니다"
        question="빠른 sample은 대체로 더 오래, resistance는 더 짧게 멈추게 합니다."
      />
      <p>
        실제 tween의 duration과 도착점은 plugin이 velocity, ease, resistance,
        bounds와 end를 함께 써서 결정합니다. lab은 별도 예측식을 만들지 않고
        onComplete에서 실제 x를 읽습니다.
      </p>
    </section>
  )
}
