/** 기본 animation 엔진인 Core와 필요할 때 더하는 plugin의 소유권 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CoreBoundarySection() {
  return (
    <section id="core-boundary" className="core-map-page__section" aria-labelledby="core-boundary-title">
      <SectionHeading number="03" id="core-boundary" title="Core와 plugin 경계 세우기" description="Core는 모든 animation의 공통 기반을 맡고, plugin은 drag·scroll·morph처럼 특정 문제의 능력을 추가합니다." />
      <div className="core-map-page__boundary-grid">
        <article>
          <p className="core-map-page__badge">기본 엔진</p>
          <h3>GSAP Core</h3>
          <p>모든 주요 브라우저에서 빠르고 반응형인 animation을 만들 기반입니다. <code>gsap</code>, Tween, Timeline, ease, utility, 기본 생명주기 도구를 포함하고 공식 홈은 Core를 CDN으로 가져오는 입구도 제공합니다.</p>
        </article>
        <div className="core-map-page__boundary-arrow" aria-hidden="true">+</div>
        <article>
          <p className="core-map-page__badge">선택 확장</p>
          <h3>Plugin</h3>
          <p><strong>plugin</strong>은 Core가 모르는 특수 대상이나 동작을 연결하는 확장입니다. 필요한 plugin만 더하므로 기본 Core는 비교적 작게 유지됩니다.</p>
        </article>
      </div>
      <p className="core-map-page__boundary-note"><strong>선택 기준</strong> 일반 property를 시간에 따라 바꾸면 Core부터 확인합니다. scroll 위치, drag gesture, SVG morph처럼 도메인 규칙이 필요할 때 해당 plugin family로 이동합니다.</p>
    </section>
  )
}
