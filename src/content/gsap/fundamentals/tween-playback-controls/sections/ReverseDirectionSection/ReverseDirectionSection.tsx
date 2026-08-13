/** 방향을 뒤집는 reverse()의 from 좌표계와 공식 문장이 실행과 어긋나는 지점을 함께 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { DirectionFlipLab } from '../../examples/DirectionFlipLab/DirectionFlipLab'

// 공식 signature 원문 — from의 타입이 Number가 아니라 *인 것이 이 절의 출발점이다
const signature = `reverse( from:*, suppressEvents:Boolean ) : self`

// reverse()의 두 인자를 타입·기본값·하는 일로 정리한 정적 표의 데이터
const parameters = [
  {
    id: 'from',
    label: 'from',
    type: '*',
    fallback: 'null',
    meaning:
      '되감기 시작 전에 점프할 지점입니다. 주지 않으면 playhead가 있는 자리부터 거꾸로 갑니다. Timeline이라면 label 문자열도 됩니다. 공식 문서는 맨 끝에서 시작하려면 0을 쓰고, 음수는 끝을 기준으로 하여 -1이면 끝에서 1초 전이라고 적습니다.',
  },
  {
    id: 'suppress-events',
    label: 'suppressEvents',
    type: 'Boolean',
    fallback: 'true',
    meaning:
      '점프해 가는 동안 지나친 event와 callback을 실행할지 정합니다. 기본값 true는 실행하지 않는다는 뜻이고, 02단계의 레코드플레이어 비유가 그대로 적용됩니다.',
  },
]

const officialCalls = `//reverses playback from wherever the playhead currently is:
myAnimation.reverse();
//reverses playback from exactly 2 seconds into the animation:
myAnimation.reverse(2);
//reverses playback from exactly 2 seconds into the animation but doesn't suppress events during the initial move:
myAnimation.reverse(2, false);
//reverses playback from the very END of the animation:
myAnimation.reverse(0);
//reverses playback starting from exactly 1 second before the end of the animation:
myAnimation.reverse(-1);`

const flipPattern = `//flips the orientation (if it's forward, it will go backward, if it is backward, it will go forward):
if (myAnimation.reversed()) {
  myAnimation.play();
} else {
  myAnimation.reverse();
}

//flips the orientation using the reversed() method instead (shorter version of the code above):
myAnimation.reversed(!myAnimation.reversed());`

export function ReverseDirectionSection() {
  return (
    <section id="reverse-direction" className="playback-page__section" aria-labelledby="reverse-direction-title">
      <SectionHeading
        number="04"
        id="reverse-direction"
        title="방향을 뒤집기"
        description="열린 서랍을 닫고, 펼친 메뉴를 접습니다. 같은 animation을 거꾸로 돌리면 되는 일에 새 Tween을 만들 필요가 없습니다."
      />

      <pre className="playback-page__signature">
        <code>{signature}</code>
      </pre>

      <div className="playback-page__prose">
        <p>
          공식 설명은 이렇습니다. <strong>tween의 ease를 포함해 animation의 모든 측면이 거꾸로 향하도록 재생을 뒤집는다.</strong> 단순히
          값이 역순으로 나오는 게 아니라 <strong>가속·감속 곡선까지 뒤집힌다</strong>는 뜻입니다. 그 결과 instance의 <code>time</code>과{' '}
          <code>totalTime</code>도 0을 향해 되돌아갑니다.
        </p>
        <p>
          되감기 전에 점프할 지점을 정할 수 있습니다. 주지 않으면 <strong>playhead가 있는 자리부터</strong> 거꾸로 갑니다. 그런데 이{' '}
          <code>from</code>의 좌표계가 <code>play()</code>나 <code>pause()</code>와 다릅니다. 다음 표를 먼저 보세요.
        </p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>reverse()의 인자 계약</caption>
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
                <td>
                  <code>{parameter.type}</code>
                </td>
                <td>
                  <code>{parameter.fallback}</code>
                </td>
                <td>{parameter.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__warning">
        <h3>reverse(0)은 처음이 아니라 끝입니다</h3>
        <p>
          <code>play(0)</code>은 맨 처음으로 가지만 <code>reverse(0)</code>은 <strong>맨 끝</strong>으로 갑니다. 공식 문서가 따로 한
          문장을 할애해 짚어 둔 내용입니다 — "animation의 맨 끝으로 점프해 거기서 거꾸로 재생하려면 <code>from</code>에 0을 쓴다."
        </p>
        <p>
          이것은 <code>reverse()</code>가 <code>0</code>을 특별하게 해석하는 규칙입니다. 끝까지 재생된 적 없는 Tween을 완성된
          모습에서부터 되감고 싶을 때 이 한 줄이면 됩니다.
        </p>
      </div>

      <div className="playback-page__prose">
        <p>공식 문서에 실린 다섯 줄입니다. 위에서부터 인자를 하나씩 바꿔 가며 시작 지점이 어떻게 달라지는지 보여 줍니다.</p>
      </div>

      <pre className="playback-page__code">
        <code>{officialCalls}</code>
      </pre>

      <div className="playback-page__subheading">
        <h3>토글은 두 가지로 쓸 수 있습니다</h3>
        <p>
          공식 문서는 방향을 뒤집는 코드를 두 형태로 보여 줍니다. 지금 방향을 <code>reversed()</code>로 물어본 뒤 분기하는 긴 형태와,
          같은 일을 한 줄로 줄인 형태입니다.
        </p>
      </div>

      <pre className="playback-page__code">
        <code>{flipPattern}</code>
      </pre>

      <div className="playback-page__prose">
        <p>
          공식 문서는 "instance가 reversed인지 확인하려면 <code>reversed()</code> 메서드를 쓰라"고 안내합니다. 여기서 같은 이름의
          메서드가 <strong>물어보는 데도, 바꾸는 데도</strong> 쓰이는 것이 보입니다. 그 두 얼굴은 05단계에서 자세히 봅니다.
        </p>
      </div>

      <div className="playback-page__note playback-page__note--probe">
        <h3>GSAP 3.15.0에서 확인할 호환성 차이</h3>
        <p>
          공식 설명에는 <code>reverse()</code>를 부르면 <code>reversed</code>가 <code>false</code>가 된다고 적혀 있지만, GSAP
          3.15.0에서는 <code>paused()=false</code>, <code>reversed()=true</code>가 됩니다. 실제 동작대로{' '}
          <strong>멈춤을 풀고 역방향으로 재생한다</strong>고 이해하세요.
        </p>
        <p>
          공식 설명은 음수 <code>from</code>을 끝 기준으로 계산한다고 안내하지만, GSAP 3.15.0에서 <code>reverse(-1)</code>은 0초로
          이동합니다. 끝에서 일정 시간 전부터 되감아야 한다면 양수 시각을 직접 계산해 넘기세요. duration이 2초라면 끝에서 1초 전은{' '}
          <code>reverse(1)</code>입니다.
        </p>
      </div>

      <DirectionFlipLab />

      <p className="playback-page__note">
        예제에서 playhead를 원하는 자리에 놓을 때 쓰는 <code>pause(atTime)</code>은 02단계에서 본 그대로입니다. 시간을 초와 진행률로
        읽는 정확한 계약은 <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead 페이지</a>가 다룹니다.
      </p>
    </section>
  )
}
