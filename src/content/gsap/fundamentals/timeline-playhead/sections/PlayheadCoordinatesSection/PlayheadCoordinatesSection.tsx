/** 비율·초와 local·total을 교차해 네 playhead 좌표를 먼저 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 단위와 repeat 포함 범위를 두 축으로 비교하는 공식 메서드 표다
const coordinates = [
  { method: 'progress()', unit: '0~1 비율', scope: '현재 cycle', repeats: '제외' },
  { method: 'time()', unit: '초', scope: '현재 cycle', repeats: '제외' },
  { method: 'totalProgress()', unit: '0~1 비율', scope: '전체 Timeline', repeats: 'repeatDelay 포함' },
  { method: 'totalTime()', unit: '초', scope: '전체 Timeline', repeats: 'repeatDelay 포함' },
]

export function PlayheadCoordinatesSection() {
  return (
    <section id="playhead-coordinates" className="timeline-playhead-page__section" aria-labelledby="playhead-coordinates-title">
      <SectionHeading number="01" id="playhead-coordinates" title="한 playhead를 네 좌표로 읽는다" description="먼저 단위를 비율과 초 중에서 고르고, 그다음 현재 cycle만 볼지 repeat 전체를 볼지 고릅니다." />
      <div className="timeline-playhead-page__prose"><p><strong>playhead</strong>는 Timeline 시간축에서 지금 읽는 위치입니다. Timeline이 repeat하면 같은 playhead를 “이번 cycle 안”과 “repeatDelay까지 합친 전체” 두 범위로 말할 수 있습니다.</p><p>repeat 1이고 repeatDelay가 없으면 첫 cycle 끝에서 <code>progress()</code>는 1, <code>totalProgress()</code>는 0.5입니다. progress는 전체 재생 동안 0→1을 두 번 돌지만 totalProgress는 한 번만 0→1을 갑니다.</p><p>duration 2초, repeat 3이면 <code>time()</code>은 0→2를 네 번 반복하지만 <code>totalTime()</code>은 0→8을 한 번 갑니다. repeatDelay 1초를 사이마다 넣으면 total 범위는 11초가 됩니다.</p></div>
      <div className="timeline-playhead-page__ruler" aria-label="repeat 1 Timeline의 local과 total 시간축"><span>cycle 1 · local 0→2초</span><span>repeatDelay · 0.5초</span><span>cycle 2 · local 0→2초</span></div>
      <div className="timeline-playhead-page__table-wrap"><table className="timeline-playhead-page__table"><caption>단위와 범위로 고르는 네 좌표</caption><thead><tr><th scope="col">메서드</th><th scope="col">단위</th><th scope="col">범위</th><th scope="col">repeat</th></tr></thead><tbody>{coordinates.map((item) => <tr key={item.method}><th scope="row"><code>{item.method}</code></th><td>{item.unit}</td><td>{item.scope}</td><td>{item.repeats}</td></tr>)}</tbody></table></div>
      <div className="timeline-playhead-page__note"><h3>끝을 넘는 값과 음수</h3><p><code>time()</code>은 duration을 넘지 않고 <code>totalTime()</code>은 0~totalDuration으로 잘립니다. 음수는 끝 기준입니다. 예를 들어 totalDuration 6에서 <code>totalTime(-2)</code>는 4초입니다.</p><p>yoyo repeat에서는 local time 방향이 cycle마다 앞·뒤로 교대하지만 totalTime은 전체 방향으로 계속 증가합니다.</p></div>
    </section>
  )
}
