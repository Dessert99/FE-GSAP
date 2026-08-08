/** 현재 페이지가 소유하지 않는 재생 제어·playhead·Tween callback 계약을 등록된 페이지로 넘긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="schedule-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="08" id="boundaries" title="여기서 다루지 않는 것" description="함수를 시간에 연결하는 계약만 소유하고, Timeline 구성과 일반 재생·좌표 계약은 해당 페이지에 남깁니다." />
      <ul className="schedule-page__list">
        <li>pause 이후 <code>play()</code>·<code>resume()</code>의 상태 차이는 <a href={toHref('/fundamentals/tween-playback-controls')}>Tween 재생 제어</a>의 공통 Animation 멘탈 모델을 먼저 봅니다.</li>
        <li><code>time()</code>·<code>progress()</code> 좌표의 의미는 <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead</a>가 소유하며 이 페이지에서는 관찰값으로만 씁니다.</li>
        <li>Tween의 <code>eventCallback()</code>·<code>then()</code>은 <a href={toHref('/fundamentals/tween-callbacks-promise')}>콜백 교체와 완료 대기</a>에서 같은 이름의 Tween canonical로 다시 확인합니다.</li>
        <li>Timeline 생성·child creator·label map 전체는 후속 페이지 소유라 여기서 링크를 미리 만들지 않습니다.</li>
      </ul>
    </section>
  )
}
