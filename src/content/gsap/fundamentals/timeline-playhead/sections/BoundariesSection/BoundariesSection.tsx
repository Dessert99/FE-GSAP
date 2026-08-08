/** control Tween 중단·resume과 인접 owner 페이지의 설명 경계를 정리한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="timeline-playhead-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="06" id="boundaries" title="control Tween의 생명주기와 다음 학습 경계를 긋는다" description="Timeline 하나의 time을 두 control Tween이 동시에 쓰지 않게 현재 control을 보존하고 새 navigation 전에 중단합니다." />
      <div className="timeline-playhead-page__prose"><p><code>tweenTo()</code>와 <code>tweenFromTo()</code>의 반환값은 Timeline이 아니라 별도 Tween입니다. 새 목적지 요청이 오면 저장한 control Tween을 <code>kill()</code>한 뒤 새 것을 만들고, 원래 Timeline을 이어 재생하려면 완료 callback에서 명시적으로 <code>resume()</code>합니다.</p><p>이 페이지는 playhead 좌표와 위치 전환만 소유합니다. pause/play/reverse 상태 명령은 <a href={toHref('/fundamentals/timeline-playback-controls')}>Timeline 재생 제어</a>, label 생성·탐색은 <a href={toHref('/fundamentals/timeline-labels')}>Timeline label</a>, duration·totalDuration 계산은 <a href={toHref('/fundamentals/timeline-timing-math')}>Timeline 시간 계산</a>, repeat 설정은 <a href={toHref('/fundamentals/timeline-repeats')}>Timeline 반복</a>에서 이어집니다.</p></div>
      <pre className="timeline-playhead-page__code"><code>{`let control;

function navigate(position) {
  control?.kill();
  control = tl.tweenTo(position, {
    onComplete: () => tl.resume(),
  });
}`}</code></pre>
      <div className="timeline-playhead-page__note"><h3>motion과 접근성</h3><p>직접 setter lab은 자동 재생하지 않습니다. 부드러운 두 lab은 <code>prefers-reduced-motion: reduce</code>에서 같은 목적지의 <code>time()</code> setter로 바뀌며 transform을 숨기고 숫자로 결과를 제공합니다. 매 frame 바뀌는 time은 live region 밖에 두고 버튼 실행처럼 이산 상태만 알립니다.</p></div>
    </section>
  )
}
