/** plugin이 core를 대체하지 않고 필요한 capability를 더하는 이유를 설명한다. */
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

/** core와 plugin의 책임 경계를 먼저 고정하는 도입 섹션이다. */
export function PluginMentalModelSection() {
  return (
    <section
      id="plugin-mental-model"
      className="plugins-page__section"
      aria-labelledby="plugin-mental-model-title"
    >
      <SectionHeading
        number="01"
        id="plugin-mental-model"
        title="plugin은 core에 능력을 더한다"
        description="plugin은 별도 애니메이션 엔진이 아니라 GSAP core가 해석할 수 있는 capability를 하나 더하는 JavaScript 파일입니다."
      />
      <div className="plugins-page__split">
        <div className="plugins-page__prose">
          <h3>왜 나눌까요?</h3>
          <p>
            공식 문서는 plugin이 core에 extra capability를 더한다고 설명합니다.
            모두를 기본 번들에 넣지 않아 core는 비교적 작고, 필요한 기능만
            추가할 수 있습니다.
          </p>
          <p>
            core에는 Tween·Timeline, CSS·attribute·array 같은 값 채널, core
            ease, callbacks·keyframes·cleanup, utility methods가 이미 있습니다.
            overview의
            <code>Animate anything</code>·<code>Animate efficiently</code>·
            <code>Utility Methods</code>
            heading은 이 포함 범위를 나누어 보여 줍니다.
          </p>
        </div>
        <div className="plugins-page__prose">
          <h3>먼저 구분할 것</h3>
          <p>
            <strong>core-included</strong> 기능은 별도 파일을 load하거나
            register하지 않습니다. 반대로 overview의
            Scroll·Text·SVG·UI·Other·Eases·React family는 필요한 capability를
            선택해 load와 register를 확인합니다.
          </p>
          <p>
            이 페이지는 그 선택 절차만 소유합니다. 특정 plugin의 options와
            method는 그 plugin의 page에서 다룹니다.
          </p>
        </div>
      </div>
    </section>
  );
}
