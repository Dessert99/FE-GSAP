/** gsap.utils property와 Utility Methods hub가 같은 17개 함수의 두 입구임을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function WhyUtilsSection() {
  return (
    <section className="utils-page__section" id="why-utils" aria-labelledby="why-utils-title">
      <SectionHeading
        number="01"
        id="why-utils"
        title="왜 animation 밖에 계산 함수가 따로 있나"
        description="Tween은 값을 시간에 따라 바꾸고, utility는 그 Tween에 넣을 값을 계산합니다. 역할을 나누면 같은 계산을 animation 밖에서도 재사용할 수 있습니다."
      />

      <div className="utils-page__split">
        <article className="utils-page__prose">
          <h3><code>gsap.utils</code>는 method가 아닙니다</h3>
          <p>
            공식 <code>gsap.utils</code> 페이지는 이 항목을 GSAP의 <strong>properties</strong> 아래에 놓고 타입을 <code>Object</code>라고만
            적습니다. 즉 <code>gsap.utils()</code>처럼 부르는 함수가 아니라 <code>clamp</code>·<code>pipe</code> 같은 함수를 꺼내는
            namespace입니다.
          </p>
          <pre className="utils-page__code"><code>{`gsap.utils.clamp(0, 100, -12) // 0\ngsap.utils.pipe(...)             // 함수`}</code></pre>
        </article>

        <article className="utils-page__prose">
          <h3>공식 입구가 두 개인 이유</h3>
          <p>
            <strong>gsap.utils</strong> 페이지는 GSAP 객체의 property 관점에서, <strong>Utility Methods</strong> 페이지는 쓸 수 있는
            도구 모음 관점에서 같은 17개를 보여 줍니다. 둘 다 utility가 유용하다는 소개와 <em>combining utility methods</em> 영상을
            싣습니다.
          </p>
          <p>이 레슨은 두 허브의 목록까지만 소유합니다. 각 함수의 overload와 경계값은 표에 적힌 전용 레슨이 맡습니다.</p>
        </article>
      </div>

      <aside className="utils-page__note">
        <h3>먼저 구분할 것</h3>
        <p><code>gsap.to()</code>는 target의 값을 시간에 따라 갱신합니다. <code>gsap.utils.clamp()</code>는 입력 하나를 받아 출력 하나를 계산할 뿐 재생 시간도 playhead도 만들지 않습니다.</p>
      </aside>
    </section>
  )
}
