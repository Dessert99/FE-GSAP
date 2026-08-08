/** label 이름 지도까지만 닫고 child 배치·callback·playback 상세는 등록된 소유 페이지로 넘긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="labels-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="07" id="boundaries" title="여기서 다루지 않는 것" description="이 페이지는 label의 생성·position·탐색·seek·삭제만 소유합니다. Timeline의 다른 child와 재생 계약은 각각의 페이지에서 이어집니다." />
      <ul className="labels-page__list labels-page__links">
        <li>position의 부모 시간축과 recent 기준은 <a href={toHref('/fundamentals/timeline-child-placement')}>Timeline child 배치</a>가 소유합니다.</li>
        <li>callback·pause를 label 위치에 예약하는 방법은 <a href={toHref('/fundamentals/timeline-callbacks-pauses')}>Timeline 함수와 멈춤 예약</a>이 소유합니다.</li>
        <li>Timeline container 자체는 <a href={toHref('/fundamentals/timeline-basics')}>Timeline sequence 만들기</a>에서 시작합니다.</li>
        <li>아직 등록되지 않은 inspection·playhead·timing·repeat Timeline 페이지에는 링크를 만들지 않습니다.</li>
      </ul>
    </section>
  )
}
