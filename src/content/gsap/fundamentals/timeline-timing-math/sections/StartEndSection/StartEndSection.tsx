/** 부모 local time 기준 startTime과 timeScale·repeat를 반영한 endTime의 차이를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
export function StartEndSection(){return <section id="start-end" className="tl-timing-page__section" aria-labelledby="start-end-title"><SectionHeading number="05" id="start-end" title="부모 시간축 위의 시작점과 끝점" description="startTime은 delay가 반영된 부모 좌표이고 endTime은 repeat 포함 여부와 실제 재생 속도를 반영한 부모 좌표다."/><div className="tl-timing-page__table-wrap"><table className="tl-timing-page__rules-table"><caption>공식 signature</caption><tbody><tr><th><code>startTime(value:Number) : [Number | self]</code></th><td>부모 위 시작 시각을 읽고 쓴다.</td></tr><tr><th><code>endTime(includeRepeats:Boolean) : [Number | self]</code></th><td>공식 표기다. 기본 true이고 false면 repeat을 제외한다.</td></tr></tbody></table></div><div className="tl-timing-page__warning"><p>공식 반환 표기와 달리 <code>endTime()</code>은 setter가 아닙니다. GSAP 3.15 타입과 실행 모두 <code>number</code>만 반환하며 Boolean 인자는 반복 포함 여부만 고릅니다.</p></div><pre className="tl-timing-page__code"><code>{`// gets current start time
var start = tl.startTime();
// set
tl.startTime(2);

// duration 1 child를 부모 0.5초에 배치
child.endTime() // 1.5
child.timeScale(2)
child.endTime() // 1`}</code></pre><div className="tl-timing-page__note tl-timing-page__note--probe"><p><code>startTime = position + delay</code>. <code>endTime(true) = startTime + totalDuration ÷ |timeScale|</code>, false는 duration을 씁니다.</p></div><div className="tl-timing-page__warning"><p>부모 smoothChildTiming이 true면 실행 중 reverse/timeScale 변경 때 startTime이 자동 조정될 수 있습니다. 일반 <code>gsap.timeline()</code> 기본은 false이고 globalTimeline만 true입니다.</p></div></section>}
