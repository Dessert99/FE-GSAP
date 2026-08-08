/** ScrollSmoother의 global setup 조건과 사용하지 않는 runtime 경계를 설명한다. */
import { SmootherStructureDiagram } from '../../components/SmootherStructureDiagram/SmootherStructureDiagram'

/** native model과 singleton ownership을 실행 없이 단계별로 가르친다. */
export function SetupSection() {
  return (
    <section aria-labelledby="scroll-smoother-setup-title">
      <p>01 · root setup</p>
      <h2 id="scroll-smoother-setup-title">한 document, 한 ScrollSmoother</h2>
      <p>
        ScrollSmoother는 local card 안에서 시험할 plugin이 아닙니다. root page의
        native scroll, body 높이, wrapper/content inline style, ScrollTrigger
        default scroller를 함께 다루므로 application bootstrap owner만 만들고
        죽여야 합니다.
      </p>
      <SmootherStructureDiagram />
      <aside>
        <h3>setup 전에 확인할 것</h3>
        <ul>
          <li>
            모든 page content는 하나의 <code>#smooth-content</code> 안에 넣고,
            그것을 <code>#smooth-wrapper</code>로 감쌉니다.
          </li>
          <li>
            <code>gsap.registerPlugin(ScrollTrigger, ScrollSmoother)</code> 뒤
            ScrollSmoother를 먼저 만들고, 그 다음 page ScrollTriggers를
            만듭니다.
          </li>
          <li>
            <code>position: fixed</code> UI는 transformed content 안이 아니라
            wrapper/content 밖에 둡니다.
          </li>
        </ul>
      </aside>
      <aside>
        <h3>이 페이지에서 실행하지 않는 이유</h3>
        <p>
          학습 site의 host document scroll을 takeover하면 현재 route와 다른
          lesson의 focus·scroll·ScrollTrigger 상태까지 바뀔 수 있습니다. 그래서
          runtimeSource는 none이며, 위 schematic과 descriptor는 production
          root에서만 실행할 setup을 정확히 설명합니다.
        </p>
        <p>
          reduced motion을 선택했거나 한 wrapper 안의 단일 content 구조를 보장할
          수 없으면 <code>create()</code>를 호출하지 않고, 같은 DOM
          순서·anchor·body의 native unsmoothed scroll을 fallback으로 남깁니다.
        </p>
      </aside>
    </section>
  )
}
