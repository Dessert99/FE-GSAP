/** tree shaking, SSR, 재등록, cleanup과 페이지 소유권의 경계를 정리한다. */
import { toHref } from "../../../../../../app/routes";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

/** setup을 안전하게 유지하는 제한과 다음 학습 링크를 제공한다. */
export function BoundariesSection() {
  return (
    <section
      id="plugin-boundaries"
      className="plugins-page__section"
      aria-labelledby="plugin-boundaries-title"
    >
      <SectionHeading
        number="05"
        id="plugin-boundaries"
        title="번들·서버·정리의 경계"
        description="등록은 한 번이면 충분하지만, 실제 integration은 번들 위치·브라우저 API·component lifecycle까지 함께 확인해야 합니다."
      />
      <div className="plugins-page__split">
        <div className="plugins-page__prose">
          <h3>한 번만 하면 되는 일</h3>
          <p>
            공식 문서는 registration이 bundler의 tree shaking 문제를 막고 core와
            plugin을 함께 동작하게 한다고 설명합니다. 같은 plugin을 다시
            register해도 해롭지는 않지만 이점도 없습니다.
          </p>
          <p>
            따라서 앱 setup에서 한 번 등록하는 기본 경로를 두고, 여러
            component에서 매번 등록하는 방식은 피합니다.
          </p>
        </div>
        <div className="plugins-page__prose">
          <h3>여기서 결정하지 않는 일</h3>
          <p>
            SSR에서는 browser-only plugin을 client 경계에서 준비해야 할 수 있고,
            DOM을 만드는 plugin instance와 Tween은 component cleanup에서
            kill·revert해야 합니다. 이 overview는 환경별 구현을 대신하지
            않습니다.
          </p>
          <p>
            <a href={toHref("/fundamentals/gsap-to")}>gsap.to()</a>는 Tween의
            target·vars를,{" "}
            <a href={toHref("/fundamentals/gsap-context")}>gsap.context()</a>는
            React cleanup 범위를,{" "}
            <a href={toHref("/fundamentals/responsive-motion")}>
              조건별 animation
            </a>
            은 motion 조건을 각각 소유합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
