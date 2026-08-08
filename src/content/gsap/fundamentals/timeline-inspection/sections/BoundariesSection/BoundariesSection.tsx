/** local Timeline 조회까지만 닫고 전역 registry·instance metadata·구조 변경은 등록된 관련 페이지로 넘긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="inspect-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="07" id="boundaries" title="여기서 다루지 않는 것" description="이 페이지의 세 메서드는 한 Timeline object graph를 읽기만 한다. 전역 검색과 child 제거는 별도 문제다." />
      <ul className="inspect-page__link-list">
        <li><a href={toHref('/fundamentals/find-stop-animations')}>전역에서 animation 찾아 멈추기</a> — <code>gsap.getById()</code>·<code>gsap.getTweensOf()</code>와 local 조회의 범위를 비교합니다.</li>
        <li><a href={toHref('/fundamentals/tween-instance')}>Tween instance의 id·data·vars</a> — 찾은 Tween에 남는 정보를 더 깊게 읽습니다.</li>
        <li><a href={toHref('/fundamentals/timeline-child-placement')}>Timeline child 배치</a> — parent와 startTime으로 트리가 놓이는 좌표를 읽습니다.</li>
        <li>Timeline의 remove·clear·kill·revert는 미등록 후속 페이지가 소유하므로 아직 링크하지 않습니다.</li>
      </ul>
    </section>
  )
}
