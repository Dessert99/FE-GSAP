/** engine 설정과 tween 기본값이 서로 다른 두 저장소라는 멘탈 모델을 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const configCode = `// engine 설정 — animation이 아니라 GSAP 자체의 동작을 바꿉니다.
gsap.config({
  nullTargetWarn: false,
})`

const defaultsCode = `// tween 기본값 — 이후 만드는 모든 Tween이 물려받습니다.
gsap.defaults({
  ease: 'power2.in',
  duration: 1,
})`

export function TwoScopesSection() {
  return (
    <section id="two-scopes" className="tween-config-page__section" aria-labelledby="two-scopes-title">
      <SectionHeading
        number="01"
        id="two-scopes"
        title="설정이 사는 두 곳 구분하기"
        description="GSAP의 설정은 한 군데에 모여 있지 않습니다. 엔진 자체의 동작과 Tween이 물려받을 값은 저장소가 다르고, 바꾸는 함수도 다릅니다."
      />

      <div className="tween-config-page__split">
        <article>
          <h3>
            <code>gsap.config()</code>
          </h3>
          <p>
            <strong>엔진 설정</strong>입니다. 경고를 띄울지, 어떤 단위를 기본으로 쓸지처럼 개별 animation과 무관한 동작을 정합니다.
          </p>
          <pre className="tween-config-page__code">
            <code>{configCode}</code>
          </pre>
        </article>
        <article>
          <h3>
            <code>gsap.defaults()</code>
          </h3>
          <p>
            <strong>Tween 기본값</strong>입니다. 앞으로 만들 Tween이 값을 지정하지 않았을 때 대신 채워질 값을 정합니다.
          </p>
          <pre className="tween-config-page__code">
            <code>{defaultsCode}</code>
          </pre>
        </article>
      </div>

      <div className="tween-config-page__note">
        <p>
          <strong>어느 쪽인지 헷갈릴 때의 기준:</strong> 공식 문서는 <code>units</code>·<code>autoSleep</code>·<code>force3D</code>처럼
          tween과 무관한 설정은 <code>gsap.config()</code>를 쓰라고 안내합니다. 반대로 <code>duration</code>·<code>ease</code>처럼 개별
          Tween에 넘길 수 있는 값이면 <code>gsap.defaults()</code>입니다.
        </p>
      </div>

      <p className="tween-config-page__note">
        두 함수 모두 <strong>바꾸려는 항목만 적으면 됩니다.</strong> 적지 않은 항목은 그대로 남습니다. 전체를 다시 써서 덮어쓰는 방식이
        아닙니다.
      </p>
    </section>
  )
}
