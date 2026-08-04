/** 처음으로 되감고 다시 재생하는 restart()의 인자 계약과 delay 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 signature 원문 — 인자 둘 다 Boolean이라 순서를 헷갈리기 쉬운 자리다
const signature = `restart( includeDelay:Boolean, suppressEvents:Boolean ) : self`

// restart()의 두 인자를 타입·기본값·하는 일로 정리한 정적 표의 데이터
const parameters = [
  {
    id: 'include-delay',
    label: 'includeDelay',
    type: 'Boolean',
    fallback: 'false',
    meaning: '되감은 뒤 delay를 다시 기다릴지 정합니다. 기본값 false는 기다리지 않고 곧바로 시작한다는 뜻입니다.',
  },
  {
    id: 'suppress-events',
    label: 'suppressEvents',
    type: 'Boolean',
    fallback: 'true',
    meaning:
      'playhead가 처음으로 돌아가는 동안 지나친 event와 callback을 실행할지 정합니다. 기본값 true는 실행하지 않는다는 뜻입니다.',
  },
]

// 공식 문서가 든 delay 1초 예시를 두 호출로 갈라 보여주는 정적 표의 데이터
const delayCases = [
  { id: 'plain', call: 'restart()', behaviour: '즉시 시작한다', note: 'delay를 무시한다 — 기본값이 false이기 때문' },
  { id: 'with-delay', call: 'restart(true)', behaviour: '1초를 더 기다린 뒤 시작한다', note: 'delay를 존중한다' },
]

const officialCalls = `//restarts, not including any delay that was defined
myAnimation.restart();

//restarts, including any delay, and doesn't suppress events during the initial move back to time:0
myAnimation.restart(true, false);`

const delayExample = `gsap.to(obj, {duration: 2, x: 100, delay: 1});`

export function RestartSection() {
  return (
    <section id="restart-from-start" className="playback-page__section" aria-labelledby="restart-from-start-title">
      <SectionHeading
        number="03"
        id="restart-from-start"
        title="처음으로 되감고 다시 재생하기"
        description="02단계의 세 명령은 모두 '지금 자리'를 기준으로 움직였습니다. 처음부터 다시 보고 싶을 때 쓰는 명령이 따로 있습니다."
      />

      <pre className="playback-page__signature">
        <code>{signature}</code>
      </pre>

      <div className="playback-page__prose">
        <p>
          공식 설명은 한 문장입니다. <strong>처음으로 되돌린 뒤 앞으로 재생을 시작한다.</strong> <code>play(0)</code>과 비슷해 보이지만
          이름이 따로 있는 이유는 <code>delay</code>를 다룰 수 있기 때문입니다.
        </p>
        <p>
          <code>delay</code>는 Tween을 만들 때 "몇 초 뒤에 시작할지"를 적어 두는 값입니다. 문제는 <strong>다시 재생할 때 그 기다림을
          또 지킬 것인가</strong>입니다. 공식 문서는 기본값을 "지키지 않음"으로 두고, 지키고 싶으면 첫 인자에 <code>true</code>를 주게
          했습니다.
        </p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>restart()의 인자 계약</caption>
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
        <p>
          공식 <code>suppressEvents</code> 설명은 이 자리를 "<strong>time 파라미터</strong>로 옮겨 갈 때"라고 적고 있습니다. 그런데{' '}
          <code>restart()</code>의 인자 이름에는 <code>time</code>이 없습니다. 다른 메서드의 설명을 옮겨 오면서 남은 표현으로 보이며,
          여기서 말하는 새 위치는 <strong>맨 처음 지점</strong>입니다. 원문 표현을 고치지 않고 그대로 옮기되 어긋난다는 사실을 함께
          적어 둡니다.
        </p>
      </div>

      <div className="playback-page__subheading">
        <h3>공식 문서가 든 예시 그대로</h3>
        <p>delay가 1초인 tween을 만들어 두고 나중에 restart()를 부르는 상황입니다.</p>
      </div>

      <pre className="playback-page__code">
        <code>{delayExample}</code>
      </pre>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>위 tween에 restart()를 부르면</caption>
          <thead>
            <tr>
              <th scope="col">호출</th>
              <th scope="col">언제 시작하나</th>
              <th scope="col">이유</th>
            </tr>
          </thead>
          <tbody>
            {delayCases.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <code>{item.call}</code>
                </th>
                <td>{item.behaviour}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__prose">
        <p>공식 문서에 실린 두 줄입니다. 두 번째 줄은 delay를 지키면서 지나친 콜백도 모두 실행하는 조합입니다.</p>
      </div>

      <pre className="playback-page__code">
        <code>{officialCalls}</code>
      </pre>

      <div className="playback-page__note playback-page__note--probe">
        <h3>restart()는 두 스위치를 함께 초기화합니다</h3>
        <p>
          공식 페이지는 <code>restart()</code>가 <code>paused</code>와 <code>reversed</code>를 어떻게 하는지 <strong>말하지
          않습니다.</strong> "앞으로 재생을 시작한다"는 문장에서 짐작만 할 수 있는데, 짐작으로 가르치지 않기 위해 직접 확인했습니다.
        </p>
        <p>
          <strong>측정 방법</strong> — <code>duration 1</code>인 Tween을 절반 지점에 둔 뒤 세 가지 출발 상태를 만들고(정방향 진행 중 /
          방향을 뒤로 바꾼 뒤 / 멈춘 뒤) 각각 <code>restart()</code>를 한 번 불러 직후 값을 읽었습니다. GSAP 3.15.0에서{' '}
          <strong>세 경우 모두</strong> <code>paused()=false</code>, <code>reversed()=false</code>, <code>time=0</code>,{' '}
          <code>timeScale()=1</code>이었습니다. 예외는 없었습니다.
        </p>
        <p className="playback-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. 정리하면 <code>restart()</code>는 "처음으로 되감기"만 하는 것이 아니라{' '}
          <strong>멈춤도 풀고 방향도 앞으로 되돌리는</strong> 가장 강한 초기화입니다.
        </p>
      </div>

      <div className="playback-page__note playback-page__note--probe">
        <h3>delay가 반영된 것을 어디서 확인하나</h3>
        <p>
          <strong>측정 방법</strong> — <code>delay: 1</code>, <code>duration: 2</code>인 Tween에서 세 호출을 비교했습니다.{' '}
          <code>restart()</code>와 <code>restart(false)</code>는 <code>startTime()</code>이 <code>0</code>, <code>restart(true)</code>
          는 <code>1</code>이었습니다. 세 경우 모두 <code>totalTime()</code>은 <code>0</code>이라 이 값만 보면 차이를 알 수 없습니다.
        </p>
        <p>
          실제 시간으로도 확인했습니다. <code>delay: 0.4</code>, <code>duration: 0.4</code>에서 <code>restart(false)</code>는 200ms 뒤{' '}
          <code>progress</code>가 <code>0.505</code>, <code>restart(true)</code>는 같은 시점에 <code>0</code>이었고 600ms 뒤에야{' '}
          <code>0.5</code>가 됐습니다. 실제 시간을 재는 측정이라 앞뒤로 한 프레임(약 16ms) 정도의 오차가 있습니다.
        </p>
        <p className="playback-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. delay가 걸렸는지 코드에서 확인할 때 <code>totalTime()</code>을 보면 안 되고{' '}
          <code>startTime()</code>을 봐야 한다는 뜻입니다.
        </p>
      </div>
    </section>
  )
}
