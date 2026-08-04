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
          거꾸로 도는 입장에서 <strong>0은 출발선</strong>이고, 그 출발선이 animation의 끝이라고 생각하면 덜 헷갈립니다. 끝까지 재생된 적
          없는 Tween을 완성된 모습에서부터 되감고 싶을 때 이 한 줄이면 됩니다.
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
        <h3>공식 문장 하나가 실행과 반대입니다</h3>
        <p>
          <code>reverse()</code>의 Details에는 이런 문장이 있습니다 — "<strong>Calling reverse() also ensures that the instance is
          neither paused nor reversed.</strong>" 그대로 읽으면 "reverse()를 부르면 reversed가 아니게 된다"는 뜻이 되어 메서드 이름과
          정면으로 어긋납니다.
        </p>
        <p>
          <strong>측정 방법</strong> — <code>duration 1</code>인 Tween을 시작 지점, 절반 지점, 완료 지점 세 곳에 각각 두고{' '}
          <code>reverse()</code>를 한 번 불러 직후 값을 읽었습니다. GSAP 3.15.0에서 <strong>세 지점 모두</strong>{' '}
          <code>paused()=false</code>, <code>reversed()=true</code>, <code>timeScale()=-1</code>이었습니다. 즉 문장의{' '}
          <strong>paused 부분만 맞고 reversed 부분은 실행과 반대</strong>입니다. <code>play()</code>의 같은 문장을 옮겨 오면서 남은
          표현으로 보입니다.
        </p>
        <p className="playback-page__provenance">
          공식 문장은 위에 원문 그대로 옮겨 두었고, 실행 결과를 따로 적었습니다. 이 페이지는 <code>reverse()</code>가{' '}
          <strong>멈춤을 풀고 방향을 뒤로 만든다</strong>고 가르칩니다. 실행이 그렇게 동작하고, 메서드 이름과도 맞기 때문입니다.
        </p>
      </div>

      <div className="playback-page__note playback-page__note--probe">
        <h3>음수 from은 끝 기준이 아니었습니다</h3>
        <p>
          공식 문서는 "음수는 끝을 기준으로 하여 <code>-1</code>이면 끝에서 1초 전"이라고 적고, 예제에도{' '}
          <code>myAnimation.reverse(-1)</code>이 실려 있습니다.
        </p>
        <p>
          <strong>측정 방법</strong> — <code>duration 2</code>인 Tween을 절반 지점에 둔 뒤 <code>from</code>을 일곱 가지로 바꿔 부르고{' '}
          <code>time()</code>을 읽었습니다(소수 넷째 자리 반올림). <code>reverse(0)</code>은 <code>2</code>,{' '}
          <code>reverse(2)</code>와 <code>reverse(3)</code>도 <code>2</code>, <code>reverse(0.5)</code>는 <code>0.5</code>였습니다.
          그런데 <code>reverse(-1)</code>과 <code>reverse(-0.5)</code>는 <strong>둘 다 <code>0</code></strong>이었습니다. 끝에서 1초
          전인 <code>1</code>이 아닙니다. 음수는 끝 기준으로 환산되지 않고 <code>0</code>으로 잘렸습니다.
        </p>
        <p className="playback-page__provenance">
          공식 문장은 위에 그대로 옮겨 두었고, 재현 결과가 다르다는 사실을 함께 남깁니다. 끝에서 1초 전부터 되감고 싶다면 음수 대신{' '}
          <strong>양수 초를 직접 계산해</strong> 넘기세요. duration이 2라면 <code>reverse(1)</code>입니다.
        </p>
      </div>

      <div className="playback-page__note playback-page__note--probe">
        <h3>끝난 Tween에 reverse()를 부르면</h3>
        <p>
          <strong>측정 방법</strong> — 완료 지점(<code>progress 1</code>)에 둔 Tween에 <code>reverse()</code>를 부르고 직후 값을 읽은
          뒤, 되감기가 끝날 때까지 두고 다시 읽었습니다. 호출 직후 <code>time</code>은 끝에 그대로 남았고 <code>isActive()</code>가{' '}
          <code>false</code>에서 <code>true</code>로 바뀌었습니다. 되감기가 끝난 뒤에는 <code>time=0</code>,{' '}
          <code>reversed()=true</code>, <code>paused()=false</code>, <code>isActive()=false</code>였습니다.
        </p>
        <p className="playback-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. 되감기가 끝나도 <strong>방향 스위치는 뒤로 남아 있다</strong>는 점이 중요합니다.
          다시 앞으로 보내려면 <code>resume()</code>이 아니라 <code>play()</code>를 불러야 합니다.
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
