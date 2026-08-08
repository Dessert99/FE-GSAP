/** child 배치의 입구만 닫고 label·검사·재생 좌표는 등록 상태에 맞춰 후속 소유권으로 넘긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="placement-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="이 페이지는 child가 어느 부모의 어느 startTime에 놓이는지만 소유합니다. 배치한 뒤 재생하거나 label을 관리하고 child를 찾는 상세 계약은 다른 페이지의 몫입니다."
      />

      <div className="placement-page__split">
        <div className="placement-page__prose"><p><strong>이 페이지가 답한 것</strong></p><p>parent 하나, add()의 입력, position 기준점, recent pointer, shiftChildren 이동, smoothChildTiming 재배치입니다.</p></div>
        <div className="placement-page__prose"><p><strong>다음 페이지가 답할 것</strong></p><p>label CRUD, child 검색·삭제, Timeline 재생 control, playhead 좌표, repeat·timing 계산입니다.</p></div>
      </div>

      <ul className="placement-page__list placement-page__links">
        <li>Timeline container와 네 creator를 처음부터 보려면 <a href={toHref('/fundamentals/timeline-basics')}>Timeline sequence 만들기</a>로 돌아갑니다.</li>
        <li>callback과 pause가 position에 놓이는 방식은 <a href={toHref('/fundamentals/timeline-callbacks-pauses')}>Timeline 함수와 멈춤 예약</a>이 소유합니다.</li>
        <li>공통 Animation의 재생 명령은 <a href={toHref('/fundamentals/tween-playback-controls')}>Tween 재생 제어</a>에서 먼저 익힐 수 있습니다.</li>
        <li>아직 등록되지 않은 Timeline label·inspection·timing·repeat 페이지에는 링크를 만들지 않습니다.</li>
      </ul>
    </section>
  )
}
