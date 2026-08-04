/** timeScale이 길이가 아니라 속도를 바꾼다는 경계를 세우고, 다섯 값을 함께 조절하는 종합 예제를 연다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { TimingMathLab } from '../../examples/TimingMathLab/TimingMathLab'

// 공식 timeScale 문서가 직접 열거한 값과 의미 — 원문 그대로다
const scaleValues = [
  { value: '1', meaning: '정상 속도. 기본값입니다.' },
  { value: '0.5', meaning: '절반 속도.' },
  { value: '2', meaning: '두 배 속도.' },
  { value: '-1', meaning: '정상 속도로 거꾸로 재생.' },
]

// 공식 timeScale 문서의 코드 예제 원문
const officialTimeScaleCode = `//gets current timeScale
var currentTimeScale = myAnimation.timeScale();
//sets timeScale to half-speed
myAnimation.timeScale(0.5);`

export function TimeScaleSection() {
  return (
    <section id="time-scale" className="timing-page__section" aria-labelledby="time-scale-title">
      <SectionHeading
        number="05"
        id="time-scale"
        title="timeScale은 길이가 아니라 속도를 바꾼다"
        description="배속을 올리면 애니메이션이 짧아진다고 생각하기 쉽습니다. 그런데 GSAP이 돌려주는 duration은 꿈쩍도 하지 않습니다. 무엇이 바뀌고 무엇이 안 바뀌는지가 이 섹션의 질문입니다."
      />

      <div className="timing-page__prose">
        <p>
          공식 정의는 이렇습니다. <code>timeScale</code>은 <strong>애니메이션의 시간을 배율로 조절하는 계수</strong>입니다. 값 자체는
          속도이지 시간이 아닙니다.
        </p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>공식 문서가 열거한 값과 의미</caption>
          <thead>
            <tr>
              <th scope="col">값</th>
              <th scope="col">뜻</th>
            </tr>
          </thead>
          <tbody>
            {scaleValues.map((entry) => (
              <tr key={entry.value}>
                <th scope="row">
                  <code>{entry.value}</code>
                </th>
                <td>{entry.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timing-page__split">
        <div className="timing-page__prose">
          <p>
            공식 문서의 예시가 <code>timeScale</code>이 쌓인다는 것까지 보여 줍니다. <strong>duration이 2인데 timeScale이 0.5면
            끝나는 데 4초가 걸립니다.</strong> 그리고{' '}
            <strong>그 애니메이션을 timeScale이 0.5인 timeline 안에 중첩하면 8초가 걸립니다.</strong>
          </p>
          <p>
            층마다 걸린 배속이 차례로 곱해지는 셈입니다. 이 성질이 <a href="#global-time">06 섹션</a>의 변환식에 그대로 등장합니다.
          </p>
          <p>
            공식 문서는 여기에 한 가지를 덧붙입니다 — <strong>timeScale 자체를 tween할 수도 있습니다.</strong> 그러면 서서히 느려지거나
            빨라지는 효과를 만들 수 있습니다.
          </p>
        </div>
        <pre className="timing-page__code">
          <code>{officialTimeScaleCode}</code>
        </pre>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>바뀌지 않는 것과 바뀌는 것</h3>
        <p>
          공식 문서는 "4초가 걸린다"고만 하고 <strong>그때 duration()이 무엇을 돌려주는지는 말하지 않습니다.</strong> 실행해 보면{' '}
          <code>timeScale</code>을 어떻게 바꿔도 <code>duration()</code>과 <code>totalDuration()</code>의 반환값은{' '}
          <strong>전혀 변하지 않습니다.</strong> 바뀌는 것은 <code>endTime()</code>뿐입니다.
        </p>
        <p>
          말이 되는 결과입니다. <code>duration</code>은 <strong>설계된 길이</strong>이고 <code>timeScale</code>은{' '}
          <strong>그 길이를 소비하는 속도</strong>이기 때문에, 둘은 서로를 덮어쓰지 않습니다. 실제로 걸리는 시간은 두 값을 나누어 얻는
          제3의 값입니다.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>parent = gsap.timeline(&#123;paused:true&#125;)</code>에{' '}
          <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:2, repeat:2&#125;)</code>를 <code>parent.add(tween, 1)</code>로 넣고{' '}
          <code>tween.timeScale(k)</code>를 건 뒤 읽었습니다. <code>k</code>가 <code>0.5 / 1 / 2 / 4</code> 어느 값이든{' '}
          <code>duration 2</code>, <code>totalDuration 6</code>으로 같았고, <code>endTime</code>만 각각{' '}
          <code>13 / 7 / 4 / 2.5</code>로 달라졌습니다.
        </p>
      </div>

      <div className="timing-page__warning">
        <h3>멈춰 있는 애니메이션의 endTime은 배속을 반영하지 않습니다</h3>
        <p>
          <code>paused: true</code> 상태의 애니메이션에 <code>timeScale()</code>을 걸면 <code>timeScale()</code>은 새 값을 돌려주지만{' '}
          <code>endTime()</code>은 <strong>배속이 1인 것처럼</strong> 계산합니다. 멈춘 애니메이션은 실효 배속이 0이라, GSAP이 계산에서
          이를 <code>1</code>로 대신하기 때문입니다.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 같은 구조에 tween만 <code>paused: true</code>로 만들어 확인했습니다. 살아 있는
          자식은 <code>timeScale(2)</code>에서 <code>endTime 4</code>였지만, <code>paused: true</code>인 자식은{' '}
          <code>timeScale(0.5)</code>에서도 <code>timeScale(2)</code>에서도 똑같이 <code>endTime 7</code>이었습니다. 아래 예제가 tween
          자신을 멈추지 않고 <strong>부모 timeline만 멈춰 두는</strong> 이유가 이것입니다. 그래야 화면이 움직이지 않으면서도{' '}
          <code>endTime</code>이 공식 문서대로 배속을 반영합니다.
        </p>
      </div>

      <TimingMathLab />

      <p className="timing-page__note">
        예제에 나오는 <code>repeat</code>과 <code>repeatDelay</code>는 이 페이지가 소유하지 않습니다. 값을 어디에 적는지는{' '}
        <a href={toHref('/fundamentals/tween-configuration')}>설정은 어디서 오나 페이지</a>가, 재생 헤드를 직접 옮기는 방법은{' '}
        <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead 페이지</a>가 다룹니다.
      </p>
    </section>
  )
}
