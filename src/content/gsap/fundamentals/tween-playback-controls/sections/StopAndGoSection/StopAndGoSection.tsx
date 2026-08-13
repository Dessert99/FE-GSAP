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
              <th scope="col">paused 상태</th>
              <th scope="col">reversed 상태</th>
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
        <h3>timeScale이 0이면 명시적으로 값을 바꾸세요</h3>
        <p>
          <code>play()</code>와 <code>resume()</code> 두 페이지 모두 같은 안내를 답니다. <strong>timeScale이 정확히 0일 때 이 메서드를
          부르면 1로 바뀐다</strong>(그러지 않으면 재생되지 않으므로)는 것입니다. 그래서 0에서부터 서서히 올리고 싶다면 미리{' '}
          <code>myAnimation.timeScale(myAnimation.timeScale() || 0.001)</code>처럼 아주 작은 값을 주라고 권합니다.
        </p>
        <p>
          하지만 GSAP 3.15.0에서는 두 메서드를 불러도 <code>timeScale()</code>이 0으로 남았습니다. 자동 변경에 기대지 말고 재생 전에{' '}
          <code>timeScale(1)</code> 또는 필요한 작은 값을 직접 지정하세요.
        </p>
      </div>

      <StopAndGoLab />
    </section>
  )
}
