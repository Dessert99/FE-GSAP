/** 현재 상태 의존 여부를 묻는 최종 선택표로 네 method를 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 실제 작업에서 먼저 물을 질문과 method를 일대일로 연결한다. */
export function ChooseMethodSection() {
  return (
    <section id="choose" className="tween-values-page__section" aria-labelledby="choose-title">
      <SectionHeading
        number="07"
        id="choose"
        title="현재 상태 의존 여부로 선택하기"
        description="method 이름을 외우기보다 어느 끝을 현재 상태에 맡길지 결정하면 선택이 짧아집니다."
      />
      <div className="tween-values-page__choice-grid">
        <article><h3>현재 → 목표</h3><p>현재 화면을 출발점으로 읽고 목표만 쓰려면 <strong>to</strong>.</p></article>
        <article><h3>명시한 시작 → 현재</h3><p>지금 모습이 도착점이고 들어오는 상태만 쓰려면 <strong>from</strong>.</p></article>
        <article><h3>명시한 시작 → 명시한 끝</h3><p>렌더 전 상태가 무엇이든 같은 두 끝을 보장하려면 <strong>fromTo</strong>.</p></article>
        <article><h3>시간 없이 즉시</h3><p>중간값 없이 다음 상태를 바로 적용하려면 <strong>set</strong>.</p></article>
      </div>
    </section>
  )
}
