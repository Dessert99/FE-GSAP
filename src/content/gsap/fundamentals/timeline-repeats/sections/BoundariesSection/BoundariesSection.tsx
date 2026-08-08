/** Timeline 반복까지만 닫고 Tween 비교·전체 길이·repeatRefresh 상세는 등록된 페이지로 넘긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return <section id="boundaries" className="tl-repeats-page__section" aria-labelledby="boundaries-title"><SectionHeading number="07" id="boundaries" title="여기서 다루지 않는 것" description="공식 invalidate 페이지의 마지막 single-Tween video 안내는 보존하되, 이 페이지의 실행 예제는 child 전파가 보이는 Timeline에 집중한다."/><ul className="tl-repeats-page__link-list"><li><a href={toHref('/fundamentals/tween-repeats')}>Tween 반복과 invalidate</a> — child 하나의 같은 이름 메서드를 비교합니다.</li><li><a href={toHref('/fundamentals/timeline-timing-math')}>Timeline 전체 시간 계산</a> — repeat를 포함한 totalDuration 식과 무한 반복 반환값을 다룹니다.</li><li><a href={toHref('/fundamentals/gsap-to')}>repeatRefresh vars</a> — 반복마다 Tween 값을 다시 읽는 설정을 다룹니다.</li><li>Timeline playhead 상세 페이지는 아직 미등록이므로 링크하지 않습니다.</li></ul></section>
}
