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
        lab의 predicted end는 학습용 예상값입니다. 실제 tween의 duration과
        overshoot는 plugin이 ease, resistance, bounds를 함께 써서 결정하므로
        snapshot은 onComplete에서만 다시 읽습니다.
      </p>
    </section>
  )
}
