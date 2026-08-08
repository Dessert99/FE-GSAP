/** pause·play·resume의 상태 차이와 Timeline label 인자를 하나의 명령 선택 문제로 설명한다. */
import { SequencePlaybackLab } from '../../examples/SequencePlaybackLab/SequencePlaybackLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 세 명령의 공식 signature를 원문 철자와 타입 표기로 보존한다
const signatures = `pause( atTime:*, suppressEvents:Boolean ) : self
play( from:*, suppressEvents:Boolean ) : self
resume( ) : self`

// 명령 뒤 paused·reversed 상태가 어떻게 달라지는지 비교한다
const commands = [
  { call: 'pause()', intent: '현재 자리에서 멈춘다', direction: '유지', position: 'atTime 또는 label을 주면 먼저 점프' },
  { call: 'play()', intent: '앞으로 재생한다', direction: '정방향으로 설정', position: 'from 또는 label을 주면 거기서 시작' },
  { call: 'resume()', intent: '하던 방향으로 재개한다', direction: '유지', position: '인자 없음 · 현재 자리' },
]

// 공식 코드 블록의 Timeline 호출을 로컬 변수 이름만 tl로 유지해 보여 준다
const officialCalls = `tl.pause();
tl.pause(2);
tl.pause(2, false);

tl.play();
tl.play(2);
tl.play(2, false);`

export function PlaybackCommandsSection() {
  return (
    <section id="playback-commands" className="timeline-playback-page__section" aria-labelledby="playback-commands-title">
      <SectionHeading number="02" id="playback-commands" title="멈추고, label에서 재생하고, 방향을 유지해 잇기" description="pause와 play는 위치를 함께 받을 수 있고 resume은 받을 수 없습니다. Timeline에서는 숫자 대신 이미 붙인 label도 같은 자리에 들어갑니다." />
      <pre className="timeline-playback-page__signature"><code>{signatures}</code></pre>

      <div className="timeline-playback-page__prose">
        <p>세 메서드 모두 Timeline 자신인 <code>self</code>를 돌려주므로 chaining할 수 있습니다. <code>resume()</code>만 Parameters 절이 아예 없고, 현재 방향과 현재 위치를 모두 보존합니다.</p>
      </div>

      <div className="timeline-playback-page__table-wrap">
        <table className="timeline-playback-page__table">
          <caption>멈추고 다시 움직이는 세 명령</caption>
          <thead><tr><th scope="col">명령</th><th scope="col">의도</th><th scope="col">방향</th><th scope="col">시작 위치</th></tr></thead>
          <tbody>{commands.map((command) => <tr key={command.call}><th scope="row"><code>{command.call}</code></th><td>{command.intent}</td><td>{command.direction}</td><td>{command.position}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="timeline-playback-page__note">
        <h3>atTime·from과 suppressEvents</h3>
        <p><code>atTime</code>과 <code>from</code>의 타입은 <code>*</code>, 기본값은 <code>null</code>입니다. Timeline에서는 초 숫자뿐 아니라 label 문자열도 받습니다. 값을 주지 않으면 현재 playhead 위치를 그대로 씁니다.</p>
        <p><code>suppressEvents</code>는 Boolean, 기본값 <code>true</code>입니다. 점프하는 동안 지나친 event와 callback을 실행하지 않습니다. 공식 문서는 레코드 바늘을 들어 옮기는 비유를 쓰며, 사이 callback까지 실행하려면 <code>false</code>를 주라고 안내합니다.</p>
      </div>

      <pre className="timeline-playback-page__code"><code>{officialCalls}</code></pre>

      <div className="timeline-playback-page__warning">
        <h3>공식 원문의 Timeline 표기 오류를 보존합니다</h3>
        <p><code>play()</code> Parameters의 from 설명은 label을 받을 수 있는 대상을 <strong>“Time instances”</strong>라고 적고, Details는 <strong>“Timeline instances”</strong>라고 적습니다. 실행에서는 <code>play('middle')</code>이 label time으로 이동합니다.</p>
        <p><code>play()</code> 공식 마지막 예제에는 <code>tl.play(2, false);&gt;</code>처럼 불필요한 <code>&gt;</code> 문자도 있습니다. 로컬 실행 코드는 문법 오류를 만들지 않되 catalog에 원문 차이를 남겼습니다.</p>
      </div>

      <div className="timeline-playback-page__note timeline-playback-page__probe">
        <h3>label과 timeScale note를 각각 실행 확인했습니다</h3>
        <p><strong>label probe</strong> — A·B·C가 각 1초인 Timeline에서 <code>middle</code> label을 time 1에 붙였습니다. <code>pause('middle')</code>, <code>play('middle')</code>, <code>reverse('middle')</code>는 모두 time 1로 이동했고 각각 멈춤·정방향·역방향 상태가 됐습니다.</p>
        <p><strong>timeScale probe</strong> — 공식 note는 정확히 0이면 play/resume이 1로 바꾼다고 적지만 GSAP 3.15.0에서는 두 호출 모두 <code>timeScale()=0</code>으로 남았습니다. 공식 문장과 실행 결과를 섞지 않습니다.</p>
        <p><strong>방향 유지 probe</strong> — 역방향 상태에서 <code>paused(false)</code>와 <code>resume()</code>은 <code>reversed=true</code>를 유지했지만 <code>play()</code>는 <code>reversed=false</code>인 정방향으로 바꿨습니다.</p>
      </div>

      <div className="timeline-playback-page__note">
        <h3>nested Timeline에서는 어느 부모를 멈출지 먼저 정합니다</h3>
        <p>공식 <code>pause()</code> note는 child animation을 멈춰도 부모 playhead는 계속 진행한다고 설명하며, 대부분은 부모 Timeline을 멈추는 편이 원하는 결과라고 안내합니다. sequence 전체를 얼리려면 지금 조작하는 instance가 그 sequence의 부모인지 확인하세요.</p>
      </div>

      <SequencePlaybackLab />
    </section>
  )
}
