/** 공식 overview의 plugin family와 dependency 표시를 선택표로 재구성한다. */
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

/** core 포함 여부·독립 파일·의존 plugin·외부 통합을 비교한다. */
export function PluginFamiliesSection() {
  return (
    <section
      id="plugin-families"
      className="plugins-page__section"
      aria-labelledby="plugin-families-title"
    >
      <SectionHeading
        number="04"
        id="plugin-families"
        title="어떤 종류의 plugin을 고를까?"
        description="overview의 목록은 기능 카탈로그가 아니라, 먼저 필요한 capability와 dependency를 고르는 지도입니다."
      />
      <div className="plugins-page__table-wrap">
        <table className="plugins-page__table">
          <caption>plugin family를 고를 때 먼저 확인할 경계</caption>
          <thead>
            <tr>
              <th scope="col">선택</th>
              <th scope="col">대표 범위</th>
              <th scope="col">준비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Core-included</th>
              <td>Tween·Timeline, 값 채널, eases, utilities</td>
              <td>별도 load·register 없음</td>
            </tr>
            <tr>
              <th scope="row">Standalone family</th>
              <td>Scroll, Text, SVG, UI, Other, Eases, React</td>
              <td>필요한 파일을 load한 뒤 register</td>
            </tr>
            <tr>
              <th scope="row">Dependent plugin</th>
              <td>
                ScrollSmoother → ScrollTrigger, CustomWiggle·CustomBounce →
                CustomEase
              </td>
              <td>의존 plugin도 함께 준비·등록</td>
            </tr>
            <tr>
              <th scope="row">Third-party integration</th>
              <td>Easel, Pixi처럼 외부 runtime과 함께 쓰는 plugin</td>
              <td>GSAP 외 integration의 환경 계약 확인</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="plugins-page__note">
        overview는 ScrollTrigger·ScrollTo·ScrollSmoother,
        SplitText·ScrambleText·Text Replacement,
        DrawSVG·MorphSVG·MotionPath·MotionPathHelper,
        Flip·Draggable·Inertia·Observer,
        Physics2D·PhysicsProps·GSDevTools·Easel·Pixi,
        CustomEase·EasePack·CustomWiggle·CustomBounce, 그리고 React의 useGSAP를
        각 family에 나열합니다.
      </p>
      <p className="plugins-page__note">
        overview의 CDN/npm badge는 availability를 보여 줍니다. badge 하나만 보고
        API semantics를 추정하지 말고, 선택한 plugin의 canonical page에서
        target·환경·cleanup을 확인하세요.
      </p>
    </section>
  );
}
