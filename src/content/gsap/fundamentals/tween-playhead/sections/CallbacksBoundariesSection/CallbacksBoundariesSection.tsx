/** negative time·yoyo·clamp와 인접 owner 페이지의 경계를 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CallbacksBoundariesSection() {
  return (
    <section className="tween-playhead-page__section" aria-labelledby="playhead-boundaries">
      <SectionHeading number="06" id="playhead-boundaries" title="끝 기준 이동과 반복 경계를 확인합니다" description="getter를 읽는 것과 playback·repeat·callback API 전체를 배우는 것은 다른 단계입니다." />
      <pre><code>{`const currentTotalTime = tween.totalTime()
tween.totalTime(2) // 전체 반복 기준 2초로 이동`}</code></pre>
      <ul className="tween-playhead-page__boundary-list">
        <li>negative <code>time()</code>은 animation end, negative <code>totalTime()</code>은 total end 기준으로 해석되고 범위 밖 값은 clip됩니다.</li>
        <li>duration 2·repeat 3은 local time 0→2를 네 번, totalTime 0→8로 읽습니다. repeatDelay 1을 더하면 totalTime은 0→11입니다.</li>
        <li><code>yoyo:true</code>에서는 local time 방향이 cycle마다 앞·뒤로 교대합니다.</li>
        <li>play/pause/reverse, repeat/yoyo 설정, duration math, callback 교체는 각각의 owner 페이지에서 이어집니다.</li>
      </ul>
    </section>
  )
}
