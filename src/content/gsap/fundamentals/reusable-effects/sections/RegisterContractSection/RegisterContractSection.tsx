/** registerEffect config의 네 key와 callback 입력·반환 계약을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 등록할 값과 effect 호출 시점에 전달되는 값을 구분한다. */
export function RegisterContractSection() {
  return (
    <section className="reusable-effects-page__section" aria-labelledby="register-contract">
      <SectionHeading number="02" id="register-contract" title="registerEffect에는 무엇을 등록하나요?" description="공식 예제의 등록 config는 effect 이름, callback, 기본값, Timeline 확장 여부를 한 번에 정의합니다." />
      <div className="reusable-effects-page__table-wrap"><table><thead><tr><th scope="col">key</th><th scope="col">역할</th><th scope="col">기본·경계</th></tr></thead><tbody>
        <tr><th scope="row"><code>name</code></th><td><code>gsap.effects</code> object의 key</td><td>확장하면 Timeline method 이름도 됨</td></tr>
        <tr><th scope="row"><code>effect</code></th><td><code>(targets, config, timeline?)</code> callback</td><td>direct 반환값이 되며 확장 시 animation을 반환해야 함</td></tr>
        <tr><th scope="row"><code>defaults</code></th><td>호출 config에서 빠진 key를 채움</td><td>호출에서 명시한 값이 우선</td></tr>
        <tr><th scope="row"><code>extendTimeline</code></th><td>Timeline prototype method 생성 여부</td><td>기본 false</td></tr>
      </tbody></table></div>
      <pre><code>{`const result = gsap.registerEffect({
  name: 'projectFadeIn',
  effect: (targets, config, timeline) =>
    gsap.to(targets, { duration: config.duration }),
  defaults: { duration: 2 },
  extendTimeline: false
})

// result는 undefined — registerEffect()의 반환 타입은 void`}</code></pre>
      <p className="reusable-effects-page__note">공식 예제는 <code>name</code>, <code>effect</code>, <code>defaults</code>, <code>extendTimeline</code>을 보여줍니다. <code>void</code> 반환과 callback의 세 번째 <code>timeline</code>은 현재 설치된 GSAP 3.15.0 타입과 구현에서 확인한 항목입니다.</p>
      <p className="reusable-effects-page__note">callback에 도착한 <code>targets</code>는 selector나 단일 Element가 아니라 이미 정규화된 target array입니다. Timeline 확장으로 호출하면 설치본 구현은 세 번째 <code>timeline</code>에 호출한 parent Timeline을 전달합니다.</p>
    </section>
  )
}
