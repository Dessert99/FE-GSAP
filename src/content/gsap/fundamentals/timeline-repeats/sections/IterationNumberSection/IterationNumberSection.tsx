/** iteration의 1-based 회차 번호와 경계·repeatDelay 구간의 소속을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function IterationNumberSection() {
  return <section id="iteration-number" className="tl-repeats-page__section" aria-labelledby="iteration-number-title"><SectionHeading number="04" id="iteration-number" title="지금 몇 회차인지 읽고 옮긴다" description="repeat는 추가 횟수를 0부터 세지만 iteration은 최초 재생을 1회차로 센다. setter는 같은 Timeline을 지정한 회차로 옮긴다."/><pre className="tl-repeats-page__code"><code>{`// gets current iteration
var progress = tl.iteration();
// sets iteration to the second iteration
tl.iteration(2);`}</code></pre><div className="tl-repeats-page__split"><div className="tl-repeats-page__prose"><h3>공식 예</h3><p>repeat가 4이고 playhead가 세 번째 repeat에 있을 때 <code>iteration(2)</code>를 부르면 두 번째 iteration으로 점프합니다. setter 반환값은 Timeline 자신입니다.</p></div><div className="tl-repeats-page__note"><strong>경계는 끝난 회차에 남습니다.</strong><p>duration 2, repeatDelay 1에서 totalTime 2와 대기 구간은 iteration 1이었고 다음 cycle이 실제 시작하는 3초를 지난 뒤 iteration 2가 됐습니다.</p></div></div></section>
}
