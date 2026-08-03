/** 생성 즉시 적용되는 시작값과 delay 뒤 Tween 시작을 분리한다. */
import { ImmediateRenderExample } from '../../examples/ImmediateRenderExample/ImmediateRenderExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** from 계열을 delayed sequence에 둘 때 immediateRender 판단을 먼저 연습시킨다. */
export function ImmediateRenderSection() {
  return (
    <section id="immediate-render" className="tween-values-page__section" aria-labelledby="immediate-render-title">
      <SectionHeading
        number="05"
        id="immediate-render"
        title="생성 시점과 시작 시점 나누기"
        description="from과 fromTo는 기본적으로 시작값을 생성 즉시 적용합니다. delay가 있어도 Tween 시작까지 현재 모양을 유지한다는 뜻은 아닙니다."
      />
      <ImmediateRenderExample />
      <p className="tween-values-page__note"><strong>FOUC 주의:</strong> 처음 보여야 할 모습과 <code>from()</code> 시작값이 다르면 JavaScript 실행 전 원래 모습이 잠깐 보일 수 있습니다. 중요한 초기 숨김 상태는 CSS에 먼저 두고, 콘텐츠가 영구히 숨지 않도록 fallback도 설계합니다.</p>
    </section>
  )
}
