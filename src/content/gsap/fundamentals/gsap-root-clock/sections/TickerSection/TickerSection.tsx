/** 매 frame 신호를 보내는 ticker의 등록 방법, callback 인자, 옵션, 속성, fps와 deltaRatio를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { TickerListenerLab } from '../../examples/TickerListenerLab/TickerListenerLab'

// 공식 ticker 페이지의 기본 예제 원문
const basicExample = `//add listener
gsap.ticker.add(myFunction);

function myFunction() {
  //executes on every tick after the core engine updates
}

//to remove the listener later...
gsap.ticker.remove(myFunction);`

// 공식 ticker 페이지가 나열한 listener 인자 세 가지
const callbackParams = [
  {
    name: 'time',
    type: 'Number',
    detail: 'ticker가 시작된 뒤 흐른 총 시간(초). ticker의 시작 시각은 lagSmoothing 때문에 앞으로 밀릴 수 있다.',
    use: '"시작한 지 몇 초"를 기준으로 주기적인 값을 만들 때',
  },
  {
    name: 'deltaTime',
    type: 'Number',
    detail: '직전 tick 이후 흐른 밀리초.',
    use: '이동량에 곱해 frame rate와 무관하게 같은 속도를 유지할 때',
  },
  {
    name: 'frame',
    type: 'Number',
    detail: '매 tick마다 1씩 증가하는 frame(tick) 번호.',
    use: '"몇 frame마다 한 번"처럼 횟수로 건너뛸 때',
  },
]

// add()의 세 번째·네 번째 인자 — 3.10.0에서 추가된 고급 옵션
const addOptions = [
  {
    name: 'once',
    type: 'Boolean',
    detail: 'callback이 한 번만 실행되고 자동으로 제거된다.',
    since: 'GSAP 3.10.0',
  },
  {
    name: 'prioritize',
    type: 'Boolean',
    detail:
      'callback이 queue의 아래가 아니라 맨 위에 추가되어 현재 queue에 있는 어떤 listener보다 먼저 실행된다. GSAP의 global timeline보다 먼저 실행되게 하고 싶을 때 알맞다.',
    since: 'GSAP 3.10.0',
  },
]

// 공식 페이지가 Ticker properties로 묶어 둔 두 값
const tickerProps = [
  { name: 'gsap.ticker.time', type: 'Number', detail: 'ticker가 시작된 뒤 흐른 총 시간(초). lagSmoothing으로 시작 시각이 밀릴 수 있다.' },
  { name: 'gsap.ticker.frame', type: 'Number', detail: '매 tick마다 1씩 증가하는 tick 번호.' },
]

// 공식 prioritize 예제 원문
const prioritizeExample = `// call myCallback once on the next requestAnimationFrame BEFORE the global timeline updates.
gsap.ticker.add(myCallback, true, true);`

// 공식 deltaRatio 예제 원문
const deltaRatioExample = `gsap.ticker.add(function () {
  obj.x += 3 * gsap.ticker.deltaRatio(60); // rate of change will always be consistent even if the frame rate fluctuates
});`

export function TickerSection() {
  return (
    <section id="ticker" className="root-clock-page__section" aria-labelledby="ticker-title">
      <SectionHeading
        number="03"
        id="ticker"
        title="시간의 동력 — 매 frame 오는 신호"
        description="globalTimeline은 시간을 들고만 있습니다. 그 시간을 실제로 앞으로 밀어 주는 것이 ticker이고, 우리도 그 신호를 함께 받을 수 있습니다."
      />

      <div className="root-clock-page__prose">
        <p>
          공식 문서는 <code>gsap.ticker</code>의 <strong>Type을 Object</strong>로 적고, <strong>GSAP 엔진의 심장 박동</strong>에
          비유하며 매 <code>requestAnimationFrame</code> event마다 <strong>globalTimeline을 갱신한다</strong>고 설명합니다.
        </p>
        <p>
          중요한 것은 그다음입니다. 공식 문서는 <strong>매 갱신 뒤 직접 만든 logic을 실행하도록 자신의 listener를 추가할 수
          있다</strong>고 밝히고(게임 개발자에게 유용하다고 덧붙입니다), <strong>listener는 원하는 만큼 추가할 수 있다</strong>고
          합니다. 즉 GSAP의 심장 박동은 GSAP 전용이 아닙니다.
        </p>
      </div>

      <div className="root-clock-page__subheading">
        <h3>붙이고 떼는 방법</h3>
        <p>
          공식 기본 예제입니다. 주석이 정확히 언제 실행되는지를 말해 줍니다 — <strong>core engine 갱신 뒤</strong> 매 tick마다입니다.
        </p>
      </div>

      <pre className="root-clock-page__code">
        <code>{basicExample}</code>
      </pre>

      <div className="root-clock-page__note">
        <p>
          <code>remove()</code>에는 <strong>등록할 때와 같은 함수 참조</strong>를 넘겨야 합니다. 익명 함수를 바로 넣으면 나중에 뗄 수
          없습니다. 떼지 않은 listener는 화면이 바뀌어도 계속 돌기 때문에, 붙이는 코드와 떼는 코드를 항상 한 쌍으로 씁니다.
        </p>
      </div>

      <div className="root-clock-page__subheading">
        <h3>listener가 받는 인자 세 개</h3>
        <p>매 tick마다 이 세 값이 순서대로 넘어옵니다. 필요한 것까지만 받아 써도 됩니다.</p>
      </div>

      <div className="root-clock-page__table-wrap">
        <table className="root-clock-page__table">
          <caption>공식 ticker 페이지의 Callback parameters</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">공식 설명</th>
              <th scope="col">실제 쓰임</th>
            </tr>
          </thead>
          <tbody>
            {callbackParams.map((param) => (
              <tr key={param.name}>
                <th scope="row">
                  <code>{param.name}</code>
                </th>
                <td>{param.type}</td>
                <td>{param.detail}</td>
                <td>{param.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TickerListenerLab />

      <div className="root-clock-page__subheading">
        <h3>add()의 선택 인자 두 개</h3>
        <p>공식 문서는 이 둘을 "Advanced options"로 따로 묶고, GSAP 3.10.0에서 추가됐다고 밝힙니다.</p>
      </div>

      <pre className="root-clock-page__signature">
        <code>gsap.ticker.add(callback, once, prioritize)</code>
      </pre>

      <div className="root-clock-page__table-wrap">
        <table className="root-clock-page__table">
          <caption>공식 ticker 페이지의 Advanced options for .add()</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">공식 설명</th>
              <th scope="col">추가 버전</th>
            </tr>
          </thead>
          <tbody>
            {addOptions.map((option) => (
              <tr key={option.name}>
                <th scope="row">
                  <code>{option.name}</code>
                  <small>공식 페이지에 기본값 명시 없음</small>
                </th>
                <td>{option.type}</td>
                <td>{option.detail}</td>
                <td>{option.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="root-clock-page__code">
        <code>{prioritizeExample}</code>
      </pre>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <h3>실행으로 확인한 두 가지</h3>
        <p>
          첫째, <code>prioritize: true</code>로 붙인 listener는 같은 tick에서 진행 중인 Tween의 <code>time()</code>을{' '}
          <strong>0</strong>으로 읽었고, 같은 tick의 일반 listener는 <strong>0.009</strong>로 읽었습니다. 우선 listener가 root
          갱신보다 먼저 실행된다는 공식 주장이 그대로 확인됩니다.
        </p>
        <p>
          둘째, <code>gsap.ticker.add()</code>는 <strong>함수를 돌려줍니다.</strong> <code>once: true</code>로 등록하면 돌려주는
          wrapper가 <strong>내가 넘긴 callback과 다른 참조</strong>라, 한 번 실행되기 전에 직접 떼려면 반환값을 보관해야 합니다.
          공식 페이지에는 반환값 설명이 없습니다.
        </p>
        <p className="root-clock-page__provenance">
          측정 방법 · 같은 tick에서 두 listener가 읽은 <code>tween.time()</code>을 각각 출력, 그리고{' '}
          <code>gsap.ticker.add(fn, true) === fn</code>이 <code>false</code>인지 출력. 재현 조건 · gsap 3.15.0, Node 단독 실행.
        </p>
      </div>

      <div className="root-clock-page__subheading">
        <h3>listener 없이도 읽을 수 있는 두 값</h3>
        <p>공식 문서가 "Ticker properties"로 묶어 둔 항목입니다. 아무 때나 직접 읽을 수 있습니다.</p>
      </div>

      <div className="root-clock-page__table-wrap">
        <table className="root-clock-page__table">
          <caption>공식 ticker 페이지의 Ticker properties</caption>
          <thead>
            <tr>
              <th scope="col">속성</th>
              <th scope="col">타입</th>
              <th scope="col">공식 설명</th>
            </tr>
          </thead>
          <tbody>
            {tickerProps.map((prop) => (
              <tr key={prop.name}>
                <th scope="row">
                  <code>{prop.name}</code>
                  <small>공식 페이지에 기본값 명시 없음</small>
                </th>
                <td>{prop.type}</td>
                <td>{prop.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="root-clock-page__subheading">
        <h3>frame rate를 낮추는 fps()</h3>
        <p>올릴 수는 없고 내릴 수만 있습니다. 그 이유까지 공식 문서가 적어 둡니다.</p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            ticker를 특정 frame rate로 제한하려면 <code>fps()</code>를 씁니다. 공식 예제는{' '}
            <code>gsap.ticker.fps(30)</code>으로 초당 frame을 30으로 묶습니다.
          </p>
          <p>
            반대 방향은 막혀 있습니다. 공식 문서는 브라우저의 native <code>requestAnimationFrame</code>(보통 60fps)을{' '}
            <strong>더 빠르게 만드는 것은 불가능</strong>하므로 <code>gsap.ticker.fps(100)</code>을 부를 수는 있어도{' '}
            <strong>여전히 60fps 근처로 돈다</strong>고 적습니다. 반면 <code>fps(30)</code>은 <strong>필요할 때 박자를
            건너뛰게</strong> 만듭니다.
          </p>
        </div>
        <div className="root-clock-page__note root-clock-page__note--probe">
          <h3>실행으로 확인한 fps 제한</h3>
          <p>
            <code>requestAnimationFrame</code>이 없는 Node에서는 공식 설명대로 <code>setTimeout</code> fallback이 돌았고, 초당 약{' '}
            <strong>238회</strong> tick했습니다. <code>gsap.ticker.fps(30)</code>을 건 뒤에는 <strong>29.9회</strong>로 떨어졌습니다.
          </p>
          <p className="root-clock-page__provenance">
            측정 방법 · <code>gsap.ticker.frame</code> 증가량을 wall clock 0.5초로 나눔. 재현 조건 · Node 22, gsap 3.15.0,{' '}
            <code>requestAnimationFrame</code> 없음. <strong>이 수치는 환경에 종속적입니다</strong> — 브라우저에서는 rAF가 화면
            주사율로 상한을 정하므로 같은 숫자가 나오지 않습니다.
          </p>
        </div>
      </div>

      <div className="root-clock-page__subheading">
        <h3>frame rate가 흔들려도 속도를 지키는 deltaRatio()</h3>
        <p>공식 문서가 3.5.0에서 추가됐다고 밝힌 메서드입니다.</p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            <code>gsap.ticker.deltaRatio()</code>는 직전 tick 이후 흐른 시간을 <strong>목표 FPS 기준의 비율</strong>로 돌려줍니다.
            공식 설명의 예가 명확합니다 — <code>deltaRatio(60)</code>을 불렀는데 실제로는 30fps에 가깝게 흘렀다면{' '}
            <strong>2</strong>를 돌려줍니다. 두 배로 늦었으니 두 배로 움직이라는 뜻입니다.
          </p>
          <p>
            기본 <code>fps</code> parameter는 <strong>60</strong>이라 60fps 기준이면 인자를 넘기지 않아도 됩니다. 30fps 기준이면{' '}
            <code>deltaRatio(30)</code>입니다. 그래서 <strong>frame rate 변동에 맞춰 스스로 조정되는 loop</strong>를 쉽게 만들 수
            있습니다.
          </p>
        </div>
        <pre className="root-clock-page__code">
          <code>{deltaRatioExample}</code>
        </pre>
      </div>

      <div className="root-clock-page__warning">
        <h3>탭을 옮기면 신호가 줄어든다</h3>
        <p>
          공식 문서는 사용자가 브라우저의 <strong>다른 탭으로 전환하면</strong> 배터리를 아끼고 CPU 부담을 줄이기 위해 ticker의
          갱신이 <strong>크게 줄어든다</strong>고 밝힙니다. GSAP이 그렇게 정한 것이 아니라{' '}
          <strong>브라우저 자신이 requestAnimationFrame 전달을 줄이기</strong> 때문입니다.
        </p>
        <p>
          그래서 ticker listener를 <strong>시계나 타이머 대용으로 쓰면 안 됩니다.</strong> 탭이 뒤로 가 있는 동안 흐른 시간을 정확히
          세야 한다면 ticker가 아니라 실제 시각을 재는 값을 써야 합니다.
        </p>
      </div>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <h3>공식 목록에 없는 것들</h3>
        <p>
          설치본 <code>gsap.ticker</code>의 속성은 <code>time</code>, <code>frame</code>, <code>tick</code>,{' '}
          <code>deltaRatio</code>, <code>wake</code>, <code>sleep</code>, <code>lagSmoothing</code>, <code>fps</code>,{' '}
          <code>add</code>, <code>remove</code>, <code>_listeners</code>입니다. 이 가운데 <code>sleep()</code>,{' '}
          <code>wake()</code>, <code>tick()</code>은 <strong>공식 ticker 페이지에 설명이 없습니다.</strong> 설명이 없으므로 이
          페이지도 사용법을 지어내지 않고 존재만 적어 둡니다.
        </p>
        <p>
          또한 <code>gsap.ticker.fps()</code>와 <code>gsap.ticker.lagSmoothing()</code>을 인자 없이 부르면{' '}
          <strong>undefined</strong>가 나옵니다. 설치본에는 <strong>현재값을 읽는 getter가 없습니다.</strong> 공식 문서가
          lagSmoothing을 "getter이자 setter"라고 적는 것과 다릅니다.
        </p>
        <p className="root-clock-page__provenance">
          측정 방법 · <code>Object.keys(gsap.ticker)</code>와 <code>String(gsap.ticker.fps())</code> 출력. 재현 조건 · gsap 3.15.0,
          Node 단독 실행.
        </p>
      </div>
    </section>
  )
}
