/** frame이 크게 밀렸을 때 GSAP이 시간을 어떻게 보정하는지와 두 인자의 기본값·경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 같은 lag에 대해 두 진영이 무엇을 포기하는지 나란히 놓는다
const strategies = [
  {
    name: '시작 시각을 민다',
    who: '대부분의 다른 animation engine (일부 브라우저의 CSS animation 포함)',
    what: '1초 밀렸으면 시작 시각도 1초 뒤로 옮긴다. tween 하나만 보면 손해가 없어 보인다.',
    cost: '동기화를 희생한다. delay가 망가져서 깔끔하게 stagger하려던 animation이 뭉텅이로 쏟아진다.',
  },
  {
    name: '엄격한 timing을 지킨다',
    who: 'GSAP의 기본 model',
    what: '1초 밀렸으면 2초짜리 tween은 이미 절반이 진행된 것처럼 render한다.',
    cost: '건너뛴 구간이 화면에 보이지 않는다. 대신 여러 animation의 상대적 관계는 그대로 남는다.',
  },
]

// lagSmoothing의 두 인자 — 기본값이 이미 켜져 있다는 것이 핵심이다
const params = [
  {
    name: 'threshold',
    unit: '밀리초',
    fallback: '500 (공식 명시)',
    detail: '두 tick 사이에 이 값보다 큰 lag이 생길 때만 보정이 발동한다.',
  },
  {
    name: 'adjustedLag',
    unit: '밀리초',
    fallback: '33 (공식 명시)',
    detail: '보정이 발동하면 실제로 흐른 시간 대신 이만큼만 흐른 것으로 내부 clock을 조정한다.',
  },
]

// 공식 lagSmoothing 예제 원문
const officialExample = `//compensate only when 1000ms or more elapses between 2 ticks,
//and then make it act like only 16ms elapsed:
gsap.ticker.lagSmoothing(1000, 16);`

// 공식이 밝힌 비활성화 방법
const disableExample = `gsap.ticker.lagSmoothing(0);`

export function LagSmoothingSection() {
  return (
    <section id="lag-smoothing" className="root-clock-page__section" aria-labelledby="lag-smoothing-title">
      <SectionHeading
        number="04"
        id="lag-smoothing"
        title="frame이 밀렸을 때 시간을 어떻게 다루나"
        description="ticker는 규칙적으로 오지 않습니다. CPU가 바쁘면 한참 뒤에 옵니다. 그때 '흐른 시간'을 그대로 믿을지 말지가 이 절의 주제입니다."
      />

      <div className="root-clock-page__prose">
        <p>
          <strong>lag</strong>은 두 tick 사이가 예상보다 길게 벌어진 상태를 말합니다. 공식 문서가 든 상황은 이렇습니다 —{' '}
          <strong>바로 시작해야 할 2초짜리 tween</strong>이 있는데 <strong>CPU가 1초 내내 바빠서</strong> render를 못 한 경우입니다.
        </p>
        <p>
          이때 선택지는 둘뿐이고, 공식 문서의 표현대로 <strong>모든 animation engine은 어떤 식으로든 lag 세금을 냅니다.</strong>{' '}
          엄격한 timing과 동기화를 지키거나, 시작 시각을 밀고 동기화를 잃거나입니다.
        </p>
      </div>

      <div className="root-clock-page__table-wrap">
        <table className="root-clock-page__table">
          <caption>같은 1초 lag을 두 진영이 어떻게 처리하는가 (공식 ticker 페이지 기준)</caption>
          <thead>
            <tr>
              <th scope="col">전략</th>
              <th scope="col">누가 쓰나</th>
              <th scope="col">무엇을 하나</th>
              <th scope="col">무엇을 잃나</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr key={strategy.name}>
                <th scope="row">{strategy.name}</th>
                <td>{strategy.who}</td>
                <td>{strategy.what}</td>
                <td>{strategy.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="root-clock-page__prose">
        <p>
          공식 문서는 시작 시각을 미는 방식에 <strong>큰(major) 단점</strong>이 있다고 못 박습니다. 동기화를 희생하고, delay를
          망가뜨려 stagger가 <strong>뭉텅이로 쏟아지게</strong> 만든다는 것입니다. 그래서 GSAP은 언제나{' '}
          <strong>완벽한 동기화를 우선하는 엄격한 timing model</strong>을 써 왔습니다.
        </p>
        <p>
          <code>gsap.ticker.lagSmoothing()</code>은 공식 표현으로 <strong>양쪽의 장점을 모두 주는</strong> 장치입니다. CPU가 밀리면{' '}
          <strong>다음 tick에서 core timing mechanism 자체를 조정</strong>하기 때문에, 그 조정이 <strong>모든 animation에 똑같이</strong>{' '}
          적용되어 전체가 <strong>완벽하게 동기화된 상태로</strong> 남습니다. 개별 tween의 시작 시각을 따로 만지지 않는다는 점이
          핵심입니다.
        </p>
      </div>

      <pre className="root-clock-page__signature">
        <code>gsap.ticker.lagSmoothing(threshold, adjustedLag)</code>
      </pre>

      <div className="root-clock-page__table-wrap">
        <table className="root-clock-page__table">
          <caption>공식 ticker 페이지가 밝힌 두 인자와 기본값</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">단위</th>
              <th scope="col">기본값</th>
              <th scope="col">하는 일</th>
            </tr>
          </thead>
          <tbody>
            {params.map((param) => (
              <tr key={param.name}>
                <th scope="row">
                  <code>{param.name}</code>
                  <small>공식 페이지에 타입 표기 없음</small>
                </th>
                <td>{param.unit}</td>
                <td>{param.fallback}</td>
                <td>{param.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="root-clock-page__note">
        <h3>기본값 500과 33이 무슨 뜻인가</h3>
        <p>
          공식 설명을 숫자로 따라가 봅니다. <strong>두 tick 사이에 500ms를 넘게 흐를 때만</strong> 보정이 일어나고, 그때{' '}
          <strong>33ms만 흐른 것처럼</strong> 취급합니다. 그래서 CPU가 <strong>2초를 통째로 밀려도</strong> animation은 2초를
          건너뛰는 대신 다음 render에서 <strong>33ms 분량만</strong> 움직입니다.
        </p>
        <p>
          공식 문서는 이 기능이 <strong>threshold 500ms, adjustedLag 33ms로 이미 기본 활성화</strong>돼 있다고 밝힙니다. 우리가
          켜야 하는 것이 아니라 <strong>이미 켜져 있는 것</strong>입니다.
        </p>
      </div>

      <div className="root-clock-page__prose">
        <p>
          공식 문서는 이 조정이 <code>gsap</code>의 static 메서드로 부르는 것인데도 <strong>GSAP의 모든 것에 영향을 준다</strong>고
          강조합니다. tween, timeline, delayedCall이 모두 <strong>하나의 timing mechanism</strong>으로 구동되기 때문입니다. 02단계의
          globalTimeline과 03단계의 ticker가 하나라는 사실이 여기서 다시 확인됩니다.
        </p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>기본값을 바꾸고 싶다면 두 인자를 직접 넘깁니다. 공식 예제의 주석이 뜻을 그대로 설명합니다.</p>
        </div>
        <pre className="root-clock-page__code">
          <code>{officialExample}</code>
        </pre>
      </div>

      <div className="root-clock-page__warning">
        <h3>값을 아주 낮게 잡으면 안 되는 이유</h3>
        <p>
          공식 문서는 <strong>두 값을 10처럼 아주 낮게 잡지 않는 이유</strong>를 직접 답합니다. 그러면{' '}
          <strong>여유가 거의 없어져서</strong> tween이 더 느리게 도는 것처럼 보입니다. 그리고 덧붙입니다 — 거의 매 render마다
          시간이 앞으로 밀린다면 <strong>실제로도 느려진 것이 맞다</strong>고요.
        </p>
        <p>
          같은 위험이 반대편에도 있습니다. 브라우저가 심한 부하를 받아 <strong>초당 몇 frame만</strong> render한다면 시간이 말 그대로
          느려지는 것처럼 보여서, <strong>2초짜리 tween(또는 delayedCall)이 실제로는 8초</strong>가 걸릴 수도 있습니다.
        </p>
      </div>

      <div className="root-clock-page__note">
        <h3>delayedCall도 함께 보정된다</h3>
        <p>
          공식 문서는 <code>delayedCall</code>이 있다면 <strong>그것들도 함께 영향을 받는다</strong>고 밝히면서, 이것을{' '}
          <strong>좋은 일</strong>이라고 평가합니다. delayedCall이 engine의 나머지와 <strong>완벽히 동기화된다</strong>고 믿을 수 있게
          해 주기 때문입니다.
        </p>
        <p>
          공식 결론은 명확합니다 — <strong>대부분의 실제 상황에서는 500과 33이라는 기본값이 이상적</strong>입니다. 브라우저·CPU의 큰
          딸꾹질로부터 보호하면서도 frame rate의 <strong>작은 변동은 불필요하게 느려지지 않고</strong> 통과시키기 때문입니다.
        </p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            끄고 싶다면 <strong>0으로 설정</strong>합니다. 공식 문서는 이것이 <strong>threshold를 아주 큰 값으로 두어 절대 발동하지
            않게 하는 것과 같다</strong>고 설명합니다.
          </p>
          <p>
            다만 끄기 전에 공식이 붙인 <strong>주의</strong>를 기억해야 합니다 — lagSmoothing은 <strong>기기의 성능이나 실제 frame
            rate에는 아무 영향이 없습니다.</strong> 브라우저가 frame을 흘렸을 때 <strong>GSAP이 어떻게 반응하는지</strong>에만
            영향을 줍니다. 끈다고 화면이 빨라지지 않습니다.
          </p>
        </div>
        <pre className="root-clock-page__code">
          <code>{disableExample}</code>
        </pre>
      </div>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <p>
          이 절에는 실행 예제를 두지 않았습니다. lag smoothing은 <strong>CPU가 500ms 넘게 밀렸을 때만</strong> 발동하는데, 그 상황을
          예제로 만들려면 브라우저를 일부러 멈춰 세워야 하고 그 결과는 기기마다 달라 <strong>재현되지 않는 숫자</strong>가 됩니다.
          공식 문장과 기본값만 정확히 옮기는 편이 정직합니다.
        </p>
        <p className="root-clock-page__provenance">
          설치본에서 확인한 관련 사실 하나 · <code>gsap.ticker.lagSmoothing()</code>은 인자 없이 부르면 <code>undefined</code>를
          돌려주어 <strong>현재 threshold와 adjustedLag를 읽을 방법이 없습니다.</strong> 측정 방법 ·{' '}
          <code>String(gsap.ticker.lagSmoothing())</code> 출력. 재현 조건 · gsap 3.15.0, Node 단독 실행.
        </p>
      </div>
    </section>
  )
}
