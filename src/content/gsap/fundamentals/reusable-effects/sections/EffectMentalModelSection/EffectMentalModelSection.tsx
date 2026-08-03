/** effect를 animation instance가 아니라 입력을 받아 instance를 만드는 recipe로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 중앙 registry가 targets와 config를 새 실행으로 번역하는 흐름을 보여준다. */
export function EffectMentalModelSection() {
  return (
    <section className="reusable-effects-page__section" aria-labelledby="mental-model">
      <SectionHeading number="01" id="mental-model" title="effect는 완성 animation과 무엇이 다른가요?" description="effect는 미리 재생되는 Tween이 아니라, targets와 config를 받을 때마다 새 animation을 만드는 이름 있는 recipe입니다." />
      <div className="reusable-effects-page__recipe-flow" aria-label="effect recipe의 입력과 출력">
        <div><small>호출 입력</small><strong>targets + config</strong></div><span aria-hidden="true">→</span><div><small>중앙 registry</small><strong>gsap.effects.fadeIn</strong></div><span aria-hidden="true">→</span><div><small>callback 반환</small><strong>Tween 또는 Timeline</strong></div>
      </div>
      <div className="reusable-effects-page__prose"><p>카드, 모달, 알림처럼 같은 등장 동작이 여러 곳에 반복되면 각 컴포넌트에 Tween vars를 복사하기 쉽습니다. effect는 달라질 target과 config를 입력으로 남기고 recipe 자체는 한 번만 등록합니다.</p><p>등록된 recipe는 새 targets와 config로 다시 호출할 수 있어 프로젝트 안에서 일관된 motion을 유지하고, 이름과 callback을 함께 옮기면 다른 프로젝트에서도 재사용할 수 있습니다.</p></div>
    </section>
  )
}
