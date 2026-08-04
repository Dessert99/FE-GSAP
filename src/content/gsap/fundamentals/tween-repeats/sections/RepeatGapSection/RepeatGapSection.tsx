/** repeatDelay가 회차 사이에만 들어가는 빈 시간이라는 것과 그 동안 무엇이 멈추는지 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 vars 설정 예로 실은 원문
const officialVars = `gsap.to(obj, {duration: 1, x: 100, repeat: 2, repeatDelay: 1});`

// 공식 문서에 실린 getter·setter 코드 예제 원문
const officialCall = `//gets current repeatDelay value
var repeatDelay = myTween.repeatDelay();

//sets repeatDelay to 2
myTween.repeatDelay(2);`

// 공식 예시(repeat 2, repeatDelay 1)를 시간 순서로 펼친 표
const timelineRows = [
  { span: '0초 ~ 1초', what: '1회차 재생', gap: false },
  { span: '1초 ~ 2초', what: '기다림', gap: true },
  { span: '2초 ~ 3초', what: '2회차 재생', gap: false },
  { span: '3초 ~ 4초', what: '기다림', gap: true },
  { span: '4초 ~ 5초', what: '3회차 재생 (마지막)', gap: false },
]

export function RepeatGapSection() {
  return (
    <section id="repeat-gap" className="repeats-page__section" aria-labelledby="repeat-gap-title">
      <SectionHeading
        number="02"
        id="repeat-gap"
        title="회차 사이에 쉬는 시간을 넣는다"
        description="반복이 쉼 없이 붙어 있으면 하나의 긴 움직임처럼 보입니다. 회차를 구분해 보이게 하려면 사이에 빈 시간이 필요합니다."
      />

      <div className="repeats-page__prose">
        <p>
          <code>repeatDelay</code>는 공식 문서의 표현으로 <strong>"반복 사이의 시간을 초 단위로"</strong> 정합니다. 첫 재생 앞에 붙는{' '}
          <code>delay</code>와는 다른 값입니다. <code>delay</code>는 시작 전 한 번, <code>repeatDelay</code>는 회차와 회차 사이마다
          들어갑니다.
        </p>
        <p>
          공식 문서가 든 예를 그대로 따라가 보겠습니다. <strong>repeat가 2이고 repeatDelay가 1이면</strong> tween은 먼저 재생되고, 1초
          기다렸다 반복하고, 다시 재생한 뒤, 또 1초 기다렸다 마지막 반복을 합니다.
        </p>
      </div>

      <div className="repeats-page__table-wrap">
        <table className="repeats-page__rules-table">
          <caption>
            공식 예시를 시간 순서로 펼친 것 · <code>duration: 1, repeat: 2, repeatDelay: 1</code>
          </caption>
          <thead>
            <tr>
              <th scope="col">구간</th>
              <th scope="col">무슨 일이 일어나나</th>
            </tr>
          </thead>
          <tbody>
            {timelineRows.map((row) => (
              <tr key={row.span}>
                <th scope="row">{row.span}</th>
                <td>{row.gap ? `${row.what} (틈)` : row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="repeats-page__note">
        <h3>틈은 회차 "사이"에만 들어갑니다</h3>
        <p>
          위 표에서 회차는 3개인데 틈은 2개입니다. <strong>마지막 회차 뒤에는 틈이 붙지 않습니다.</strong> 그래서 전체 시간은{' '}
          <code>1 × 3 + 1 × 2 = 5초</code>가 됩니다. 반복 횟수와 틈 개수가 다르다는 점이 시간 계산에서 자주 어긋나는 지점입니다.
        </p>
      </div>

      <div className="repeats-page__split">
        <div>
          <div className="repeats-page__subheading">
            <h3>만들 때 정하기</h3>
            <p>공식 문서가 든 vars 설정 예입니다.</p>
          </div>
          <pre className="repeats-page__code">
            <code>{officialVars}</code>
          </pre>
        </div>
        <div>
          <div className="repeats-page__subheading">
            <h3>만든 뒤에 읽고 바꾸기</h3>
            <p>공식 문서에 실린 getter·setter 예제입니다.</p>
          </div>
          <pre className="repeats-page__code">
            <code>{officialCall}</code>
          </pre>
        </div>
      </div>

      <div className="repeats-page__note repeats-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          틈 동안 무엇이 멈추는지는 공식 문서에 없습니다. 실행해 보면 <strong>대상 값과 회차 번호가 둘 다 멈춰 있습니다.</strong> 값은
          직전 회차가 끝난 자리에 그대로 있고, <code>iteration()</code>도 <strong>방금 끝난 회차 번호</strong>를 유지하다가 다음 회차가
          실제로 시작할 때 올라갑니다.
        </p>
        <p className="repeats-page__provenance">
          측정 방법 · GSAP 3.15.0에서{' '}
          <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:1, repeat:2, repeatDelay:0.5, ease:'none', paused:true&#125;)</code>를 만들고{' '}
          <code>totalTime()</code>을 0.5·1·1.2·1.49·1.5·1.75초로 옮기며 <code>iteration()</code>과 값을 읽었습니다. 틈 구간인 1.0~1.5초
          내내 iteration은 1, 값은 1로 고정이었고 1.75초에서 iteration 2·값 0.25가 됐습니다.
        </p>
      </div>
    </section>
  )
}
