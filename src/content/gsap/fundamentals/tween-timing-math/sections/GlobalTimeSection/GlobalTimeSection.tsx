/** startTime이 부모 하나만 안다는 한계에서 출발해 globalTime이 중첩을 반영하는 방식을 마지막에 다룬다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { NestedGlobalTimeLab } from '../../examples/NestedGlobalTimeLab/NestedGlobalTimeLab'

export function GlobalTimeSection() {
  return (
    <section id="global-time" className="timing-page__section" aria-labelledby="global-time-title">
      <SectionHeading
        number="06"
        id="global-time"
        title="중첩을 반영한 전역 시각"
        description="여기까지의 모든 숫자는 부모 하나를 기준으로 잰 값이었습니다. 부모의 부모가 또 있으면 그 숫자만으로는 실제 시각을 알 수 없습니다. 마지막 메서드가 그 문제를 풉니다."
      />

      <div className="timing-page__prose">
        <p>
          <a href="#start-end">04 섹션</a>에서 <code>startTime()</code>은 <strong>부모 timeline 기준</strong>이라고 했습니다. 여기에
          숨은 한계가 있습니다. <strong>부모가 어디에 놓여 있는지는 알려 주지 않는다</strong>는 것입니다.
        </p>
        <p>
          timeline 안에 timeline이 있고 그 안에 tween이 있으면, tween의 <code>startTime()</code> 1초는 "안쪽 timeline 기준 1초"일
          뿐입니다. 그 안쪽 timeline이 바깥 timeline의 3초 지점에 있다면 실제 시각은 다릅니다. 층마다 배속까지 다르면 단순히 더할 수도
          없습니다.
        </p>
        <p>
          <code>globalTime()</code>이 이 계산을 대신해 줍니다. 공식 정의는{' '}
          <strong>"local time을 gsap.globalTimeline의 대응 시각으로 변환하며, 모든 중첩과 timeScale 등을 반영한다"</strong>입니다.
        </p>
      </div>

      <div className="timing-page__note">
        <h3>gsap.globalTimeline이 무엇인가요</h3>
        <p>
          GSAP이 자동으로 만들어 두는 <strong>가장 바깥 시계</strong>입니다. 직접 timeline을 만들지 않아도 모든 애니메이션은 결국 이
          시계 위에 얹힙니다. <code>globalTime()</code>의 반환값은 언제나 <strong>이 맨 바깥 시계 기준의 초</strong>입니다.
        </p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>globalTime()의 공식 명세</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">공식 문서 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">signature</th>
              <td>
                <code>globalTime( localTime:Number ) : Number</code>
              </td>
            </tr>
            <tr>
              <th scope="row">인자</th>
              <td>
                <code>localTime: Number</code> — global time으로 변환할 local time입니다. 공식 페이지에{' '}
                <strong>기본값 표기가 없습니다.</strong>
              </td>
            </tr>
            <tr>
              <th scope="row">반환값</th>
              <td>
                <code>Number</code> — <code>gsap.globalTimeline</code> 위의 대응하는 시각입니다.
              </td>
            </tr>
            <tr>
              <th scope="row">setter</th>
              <td>없습니다. 값을 바꾸는 메서드가 아니라 좌표를 변환하는 메서드입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="timing-page__subheading">
        <h3>공식 문서가 든 상황 그대로</h3>
        <p>
          공식 설명문은 이 메서드를 쓸 상황을 직접 그려 줍니다 —{' '}
          <strong>
            "어떤 timeline 안의 timeline에 중첩된 tween이 있고, 그 tween의 시작 시각(0)이 전역 timeline에서 어디에 놓이는지 알고
            싶다면 tween.globalTime(0)을 부르면 된다."
          </strong>
        </p>
      </div>

      <div className="timing-page__prose">
        <p>
          여기서 인자 <code>0</code>이 헷갈리기 쉽습니다. 이 <code>0</code>은 <strong>tween 자신의 시계로 0초</strong>, 즉 tween이
          시작하는 그 순간을 뜻합니다. 전역 시계의 0초가 아닙니다. 그러니까 <code>globalTime()</code>은{' '}
          <strong>"내 시계로 이 시각일 때, 맨 바깥 시계로는 몇 초인가?"</strong>를 묻는 메서드입니다.
        </p>
        <p>
          공식 문서는 인자를 생략할 수도 있다고 덧붙입니다.{' '}
          <strong>"기본적으로 tween의 totalTime을 사용하므로, tween.globalTime()은 tween.globalTime(tween.totalTime())과 같다."</strong>
        </p>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>인자를 생략한 호출은 설치본과 공식 설명이 다릅니다</h3>
        <p>
          GSAP 3.15.0의 실행 결과는 위 공식 문장과 항상 일치하지 않습니다. 인자 없는 <code>globalTime()</code>은 이 버전에서{' '}
          <code>totalTime()</code> 대신 <strong>부모 재생 헤드로부터 환산한 현재 local time</strong>을 사용합니다. 두 local time이 같은
          순간에는 결과도 같지만 일반적으로 등식이 보장되지는 않습니다.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 아래 예제와 같은 삼중 구조(outer를 <code>startTime(0)</code>으로 고정, inner를
          3초 지점, tween을 1초 지점, duration 2)를 만들고 두 호출을 비교했습니다. 바깥 재생 헤드가 0초일 때{' '}
          <code>tween.totalTime()</code>은 <code>0</code>이고 <code>tween.globalTime(tween.totalTime())</code>은 <code>4</code>인데,{' '}
          인자 없는 <code>tween.globalTime()</code>은 <code>0</code>을 돌려줬습니다. 바깥 헤드를{' '}
          <code>outer.time(4)</code>로 옮기자 두 값이 모두 <code>4</code>로 같아졌습니다. 헷갈릴 여지를 없애려면{' '}
          <strong>인자를 항상 명시해서 부르는 편</strong>이 안전합니다.
        </p>
      </div>

      <NestedGlobalTimeLab />

      <div className="timing-page__note timing-page__note--probe">
        <h3>변환은 위로 한 층씩 올라가며 일어납니다</h3>
        <p>
          공식 문서는 "모든 중첩과 timeScale을 반영한다"고만 하고 방식은 적지 않습니다. 아래처럼 양수이면서 0이 아닌{' '}
          <code>timeScale</code>로 실행한 결과에서 확인한 규칙은 반복되는 한 줄입니다. 자기 자신부터 시작해 부모가 없을 때까지 아래를
          되풀이합니다.
        </p>
        <p>
          <code>시각 = 그 층의 startTime + 시각 ÷ |그 층의 timeScale|</code>
        </p>
        <p>
          <a href="#time-scale">05 섹션</a>에서 본 중첩 배속이 여기서 나눗셈의 연쇄로 나타납니다. 위치는 더하고 배속은 나눕니다.
        </p>
        <p className="timing-page__provenance">
          이 식은 자식 animation이 재생 가능한 상태이고 <code>timeScale</code>이 양수이면서 0이 아닌 이 예제 범위에만 적용했습니다.
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 위 삼중 구조의 7가지 설정에 대해 <code>tween.globalTime(local)</code>의
          반환값과 이 식을 손으로 적용한 값이 모두 일치했습니다. 예: <code>inner 3초·tween 1초·배속 1·local 0</code> →{' '}
          <code>4</code>, <code>local 2</code> → <code>6</code>, 같은 배치에서 <code>배속 2·local 0</code> → <code>3.5</code>,{' '}
          <code>local 2</code> → <code>4.5</code>, <code>inner 2초·tween 0.5초·배속 0.5·local 1</code> → <code>5</code>.
        </p>
      </div>

      <div className="timing-page__warning">
        <h3>실제 앱에서는 전역 기준점도 확인합니다</h3>
        <p>
          위 예제는 맨 바깥 timeline의 시작점을 <code>outer.startTime(0)</code>으로 고정했습니다. 그래서 결과가
          <code>4</code>나 <code>5.5</code>처럼 읽기 좋은 숫자로 나옵니다.
        </p>
        <p>
          전역 timeline은 계속 진행되므로 나중에 만든 animation의 시작점은 0이 아닐 수 있습니다. 전역 기준의 절대 좌표가 필요한지,
          두 animation의 전후 관계만 비교할 것인지에 맞춰 반환값을 해석해야 합니다.
        </p>
      </div>
    </section>
  )
}
