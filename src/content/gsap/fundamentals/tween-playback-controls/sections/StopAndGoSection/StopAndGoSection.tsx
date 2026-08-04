/** 멈추고 다시 움직이는 세 명령의 차이를 방향과 인자 계약으로 갈라 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { StopAndGoLab } from '../../examples/StopAndGoLab/StopAndGoLab'

// 세 메서드의 공식 signature 원문 — 인자를 받는 둘과 받지 않는 하나가 한눈에 갈린다
const signatures = `pause( atTime:Number, suppressEvents:Boolean ) : self
play( from:Number, suppressEvents:Boolean ) : self
resume( ) : self`

// 세 명령을 "무엇을 하나 / 방향을 건드리나 / 어디서부터"로 나란히 비교하는 정적 표의 데이터
const commands = [
  {
    id: 'pause',
    label: 'pause()',
    intent: '지금 멈추고 싶다',
    pausedAfter: 'true로 만든다',
    direction: '건드리지 않는다',
    where: '인자를 주면 그 시각으로 점프한 뒤 멈춘다',
  },
  {
    id: 'play',
    label: 'play()',
    intent: '앞으로 재생하고 싶다',
    pausedAfter: 'false로 만든다',
    direction: '앞으로 되돌린다',
    where: '인자를 주면 그 시각으로 점프한 뒤 재생한다',
  },
  {
    id: 'resume',
    label: 'resume()',
    intent: '하던 대로 이어서 하고 싶다',
    pausedAfter: 'false로 만든다',
    direction: '건드리지 않는다',
    where: '인자를 받지 않는다. 멈춘 자리에서 이어 간다',
  },
]

// 두 메서드가 공유하는 인자 계약 — 이름만 다르고 의미와 기본값이 같다
const parameters = [
  {
    id: 'position',
    label: 'atTime · from',
    type: 'Number',
    fallback: 'null',
    meaning:
      'pause()에서는 멈추기 전에, play()에서는 재생하기 전에 점프할 시각(초)입니다. 주지 않으면 playhead가 있는 자리를 그대로 씁니다. Timeline이라면 label 문자열도 됩니다.',
  },
  {
    id: 'suppress-events',
    label: 'suppressEvents',
    type: 'Boolean',
    fallback: 'true',
    meaning:
      '점프해 가는 동안 지나친 event와 callback을 실행할지 정합니다. 기본값 true는 실행하지 않는다는 뜻입니다. 지나친 콜백을 모두 실행하고 싶으면 false를 줍니다.',
  },
]

const officialCalls = `//pauses wherever the playhead currently is:
myAnimation.pause();
//jumps to exactly 2-seconds into the animation and then pauses:
myAnimation.pause(2);
//jumps to exactly 2-seconds into the animation and pauses but doesn't suppress events during the initial move:
myAnimation.pause(2, false);

//begins playing from wherever the playhead currently is:
myAnimation.play();
//begins playing from exactly 2-seconds into the animation:
myAnimation.play(2);
// jumps to exactly 2-seconds into the animation and starts playing but doesn't suppress events:
myAnimation.play(2, false);`

export function StopAndGoSection() {
  return (
    <section id="stop-and-go" className="playback-page__section" aria-labelledby="stop-and-go-title">
      <SectionHeading
        number="02"
        id="stop-and-go"
        title="멈추고 다시 움직이기"
        description="가장 자주 쓰는 세 명령입니다. pause()는 멈추고, play()와 resume()은 다시 움직입니다. 그런데 다시 움직이는 방법이 왜 둘일까요?"
      />

      <pre className="playback-page__signature">
        <code>{signatures}</code>
      </pre>

      <div className="playback-page__prose">
        <p>
          세 signature 모두 <code>: self</code>로 끝납니다. 01단계에서 정한 대로 <strong>Tween 자신을 돌려준다</strong>는 뜻이고,
          공식 문서는 그 이유를 "chaining을 쉽게 하려고"라고 적어 둡니다. 그래서 <code>tween.pause().timeScale(0.5)</code>처럼 점을 찍어
          이어 쓸 수 있습니다.
        </p>
        <p>
          <code>resume()</code>만 괄호가 비어 있는 것도 눈여겨보세요. 공식 페이지에 <strong>Parameters 절 자체가 없습니다.</strong>{' '}
          받을 인자가 없다는 뜻이고, 이것이 <code>play()</code>와의 첫 번째 차이입니다.
        </p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>같은 "다시 재생"인데 무엇이 다른가</caption>
          <thead>
            <tr>
              <th scope="col">명령</th>
              <th scope="col">이럴 때 쓴다</th>
              <th scope="col">paused 스위치</th>
              <th scope="col">reversed 스위치</th>
              <th scope="col">어디서부터</th>
            </tr>
          </thead>
          <tbody>
            {commands.map((command) => (
              <tr key={command.id}>
                <th scope="row">
                  <code>{command.label}</code>
                </th>
                <td>{command.intent}</td>
                <td>{command.pausedAfter}</td>
                <td>{command.direction}</td>
                <td>{command.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__warning">
        <h3>둘의 차이는 방향 하나입니다</h3>
        <p>
          공식 문장을 나란히 놓으면 분명해집니다. <code>play()</code>는 "instance가 <strong>paused도 reversed도 아니게</strong>{' '}
          만든다"고 적혀 있고, <code>resume()</code>은 "<strong>방향(앞으로 또는 거꾸로)을 바꾸지 않고</strong> 재생을 재개한다"고
          적혀 있습니다.
        </p>
        <p>
          그래서 거꾸로 돌던 Tween을 멈췄다가 <code>resume()</code>하면 <strong>계속 거꾸로</strong> 갑니다. 같은 상황에서{' '}
          <code>play()</code>를 부르면 <strong>방향이 앞으로 뒤집힙니다.</strong> 되감기 중간에 잠깐 멈췄다가 이어 가고 싶었는데{' '}
          <code>play()</code>를 부르면 갑자기 앞으로 가는 이유가 이것입니다.
        </p>
      </div>

      <div className="playback-page__subheading">
        <h3>인자 두 개는 pause()와 play()가 똑같이 씁니다</h3>
        <p>이름만 atTime과 from으로 다르고 의미와 기본값은 같습니다.</p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>pause()와 play()의 인자 계약</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">하는 일</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter.id}>
                <th scope="row">
                  <code>{parameter.label}</code>
                </th>
                <td>{parameter.type}</td>
                <td>
                  <code>{parameter.fallback}</code>
                </td>
                <td>{parameter.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__note">
        <h3>왜 기본값이 "실행하지 않음"일까요</h3>
        <p>
          공식 문서가 비유를 하나 답니다. <strong>레코드플레이어의 바늘을 들어 다른 자리에 놓는 것</strong>과 같다는 것입니다. 바늘을
          들고 옮기는 동안에는 소리가 나지 않아야 자연스럽습니다. 마찬가지로 playhead가 2초 지점으로 건너뛰는 동안 그 사이에 있던{' '}
          <code>onUpdate</code>나 <code>onComplete</code>가 우르르 실행되면 곤란합니다. 그래서 기본값이 "실행하지 않음"입니다.
        </p>
        <p>
          지나친 콜백을 모두 실행해야 한다면 두 번째 인자에 <code>false</code>를 줍니다. 각 콜백이 언제 불리는지는{' '}
          <a href={toHref('/fundamentals/tween-callbacks-promise')}>콜백과 완료 대기 페이지</a>가 다룹니다.
        </p>
      </div>

      <div className="playback-page__prose">
        <p>공식 문서에 실린 여섯 줄입니다. 인자를 하나씩 늘려 가며 같은 메서드가 하는 일이 어떻게 달라지는지 보여 줍니다.</p>
      </div>

      <pre className="playback-page__code">
        <code>{officialCalls}</code>
      </pre>

      <div className="playback-page__note playback-page__note--probe">
        <h3>resume()과 paused(false)는 결과가 같았습니다</h3>
        <p>
          <code>resume()</code>은 방향을 건드리지 않는다고만 적혀 있을 뿐, 05단계에서 볼 <code>paused(false)</code>와 무엇이 다른지는
          공식 페이지에 없습니다. GSAP 3.15.0을 실행해 확인했습니다.
        </p>
        <p>
          <strong>측정 방법</strong> — <code>duration 1</code>인 Tween을 절반 지점에 두고 거꾸로 향하게 한 뒤 멈춘 상태(
          <code>paused=true, reversed=true, timeScale=-1</code>)에서 세 명령을 각각 한 번씩 불러 직후 값을 읽었습니다.{' '}
          <code>resume()</code>과 <code>paused(false)</code>는 둘 다 <code>reversed=true, timeScale=-1</code>을 유지했고,{' '}
          <code>play()</code>만 <code>reversed=false, timeScale=1</code>로 되돌렸습니다. 즉 관측 범위에서 앞의 둘은 구분되지 않고,{' '}
          <code>play()</code>만 방향을 바꿉니다.
        </p>
        <p className="playback-page__provenance">
          이 비교는 공식 페이지에 게시돼 있지 않습니다. 문서에 적힌 사실만 믿어야 하는 코드라면 방향을 유지하려는 의도를{' '}
          <code>resume()</code>으로 쓰는 편이 안전합니다. 그 의도가 공식 문장으로 보장된 쪽입니다.
        </p>
      </div>

      <div className="playback-page__note playback-page__note--probe">
        <h3>timeScale이 0일 때의 공식 tip은 재현되지 않았습니다</h3>
        <p>
          <code>play()</code>와 <code>resume()</code> 두 페이지 모두 같은 안내를 답니다. <strong>timeScale이 정확히 0일 때 이 메서드를
          부르면 1로 바뀐다</strong>(그러지 않으면 재생되지 않으므로)는 것입니다. 그래서 0에서부터 서서히 올리고 싶다면 미리{' '}
          <code>myAnimation.timeScale(myAnimation.timeScale() || 0.001)</code>처럼 아주 작은 값을 주라고 권합니다.
        </p>
        <p>
          <strong>측정 방법</strong> — 설치본 GSAP 3.15.0에서 여섯 경로를 각각 시도하고 호출 직후 <code>timeScale()</code>을
          읽었습니다. <code>timeScale(0)</code> 뒤 <code>pause()</code>를 거쳐 <code>play()</code>/<code>resume()</code>/
          <code>paused(false)</code>를 부른 세 경우, <code>pause()</code> 없이 <code>play()</code>를 부른 경우,{' '}
          <code>reverse()</code>를 부른 경우까지 <strong>모두 0이 유지</strong>됐고 ticker를 300ms 돌려도 <code>progress</code>가
          0이었습니다. <strong>예외가 하나</strong> 있었습니다. <code>timeScale(0)</code> 뒤 방향을 뒤로 바꿨다가{' '}
          <code>play()</code>를 부르면 <code>timeScale</code>이 1이 아니라 <code>1e-8</code>이 됐습니다.
        </p>
        <p className="playback-page__provenance">
          공식 tip은 위에 그대로 옮겨 두었고, 재현 결과가 다르다는 사실을 함께 남깁니다. <code>timeScale</code> 자체의 계약은 이
          페이지가 소유하지 않으므로, 0에서 출발해야 한다면 문서의 권고대로 아주 작은 값을 먼저 주는 쪽이 두 경우 모두에서 안전합니다.
        </p>
      </div>

      <StopAndGoLab />
    </section>
  )
}
