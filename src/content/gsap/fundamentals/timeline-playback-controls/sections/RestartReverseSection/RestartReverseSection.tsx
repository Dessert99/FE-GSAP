/** restart와 reverse를 출발점·방향·delay·callback 이동 규칙으로 대비한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 앞으로 처음부터와 현재 또는 지정 위치에서 뒤로라는 두 명령의 signature다
const signatures = `restart( includeDelay:Boolean, suppressEvents:Boolean ) : self
reverse( from:*, suppressEvents:Boolean ) : self`

// 공식 reverse 예제가 공개한 호출 형태를 빠짐없이 보존한다
const reverseCalls = `tl.reverse();
tl.reverse(2);
tl.reverse(2, false);
tl.reverse(0);
tl.reverse(-1);

if (tl.reversed()) tl.play();
else tl.reverse();

tl.reversed(!tl.reversed());`

export function RestartReverseSection() {
  return (
    <section id="restart-and-reverse" className="timeline-playback-page__section" aria-labelledby="restart-and-reverse-title">
      <SectionHeading number="03" id="restart-and-reverse" title="처음부터 다시 가거나 순서 전체를 되감기" description="restart는 처음부터 정방향, reverse는 현재 또는 지정한 위치부터 역방향입니다. 두 호출 모두 children의 상대 순서를 보존한 채 부모 시간을 움직입니다." />
      <pre className="timeline-playback-page__signature"><code>{signatures}</code></pre>

      <div className="timeline-playback-page__split">
        <div className="timeline-playback-page__prose">
          <p><strong><code>restart()</code></strong>는 처음으로 돌아가 앞으로 재생합니다. <code>includeDelay</code>는 Boolean, 기본값 <code>false</code>라 보통 기존 delay를 다시 기다리지 않습니다. <code>true</code>면 delay를 포함합니다.</p>
          <p>두 번째 <code>suppressEvents</code>는 Boolean, 기본값 <code>true</code>이고 처음으로 이동하는 동안 callback을 억제합니다. 반환값은 self입니다.</p>
        </div>
        <div className="timeline-playback-page__prose">
          <p><strong><code>reverse()</code></strong>는 ease를 포함한 animation의 방향을 뒤집어 <code>time</code>과 <code>totalTime</code>이 0을 향하게 합니다. from은 초 또는 Timeline label이며 생략하면 현재 위치입니다.</p>
          <p><code>suppressEvents</code> 기본값은 <code>true</code>이고 점프 중 callback을 억제합니다. 반환값은 self입니다.</p>
        </div>
      </div>

      <pre className="timeline-playback-page__code"><code>{`tl.restart();
tl.restart(true, false);

${reverseCalls}`}</code></pre>

      <div className="timeline-playback-page__warning">
        <h3>공식 문장 두 곳을 정정하지 않고 분리합니다</h3>
        <p><code>restart()</code>의 suppressEvents 설명은 playhead가 <strong>“time parameter”</strong>가 정한 위치로 간다고 적지만 signature에는 time 인자가 없습니다.</p>
        <p><code>reverse()</code> Details는 호출 뒤 instance가 <strong>“neither paused nor reversed”</strong>라고 적습니다. 이 공식 문장을 글자 그대로 읽으면 <code>reversed=false</code>라는 뜻이라 메서드 역할과 반대입니다.</p>
      </div>

      <div className="timeline-playback-page__note timeline-playback-page__probe">
        <h3>reverse의 상태와 음수 from을 전수 확인했습니다</h3>
        <p><strong>상태 probe</strong> — duration 3 Timeline을 시작·중간·완료 세 위치에 두고 <code>reverse()</code>를 호출했습니다. 모두 즉시 <code>paused=false</code>, <code>reversed=true</code>, <code>timeScale=-1</code>이 되어 공식 문장의 reversed 부분과 반대였습니다.</p>
        <p><strong>from probe</strong> — 같은 Timeline에서 <code>reverse(0)</code>은 time 3, <code>reverse(-1)</code>과 <code>reverse(-0.5)</code>는 모두 time 0이었습니다. 공식은 음수를 끝 기준으로 계산해 -1을 끝에서 1초 전이라고 적지만 실행에서는 재현되지 않았습니다.</p>
      </div>

      <div className="timeline-playback-page__note timeline-playback-page__probe">
        <h3>restart는 시작 상태와 무관하게 정방향으로 돌아왔습니다</h3>
        <p><strong>측정 방법</strong> — 정방향 진행 중·reverse 뒤·pause 뒤 세 상태에서 각각 <code>restart()</code>를 호출했습니다. 모두 <code>time=0</code>, <code>paused=false</code>, <code>reversed=false</code>, <code>timeScale=1</code>이었습니다. 공식 페이지가 명시하지 않은 스위치 결과라 probe로만 표시합니다.</p>
      </div>
    </section>
  )
}
