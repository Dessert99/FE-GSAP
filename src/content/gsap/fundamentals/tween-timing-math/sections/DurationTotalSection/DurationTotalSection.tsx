/** duration과 totalDuration이 어디서 갈리는지를 공식 예시 두 개와 실행으로 확인한 식으로 함께 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 duration 문서와 totalDuration 문서가 각각 제시한 숫자 예시 — 둘 다 원문 그대로다
const officialCases = [
  {
    id: 'duration-doc',
    origin: 'duration() 문서',
    config: 'duration 2, repeat 3',
    duration: '2',
    totalDuration: '8',
    why: '기본 재생 한 번에 반복 3회를 더해 총 4 cycle이기 때문입니다.',
  },
  {
    id: 'total-duration-doc',
    origin: 'totalDuration() 문서',
    config: 'duration 10, repeat 1, repeatDelay 2',
    duration: '10',
    totalDuration: '22',
    why: '10초짜리 회차가 두 번, 그 사이에 2초 대기가 한 번 들어갑니다.',
  },
]

// 공식 두 문서의 코드 예제 원문
const officialDurationCode = `var currentDuration = myAnimation.duration(); //gets current duration
myAnimation.duration(2); //sets duration`

const officialTotalDurationCode = `//gets total duration
var total = myTween.totalDuration();
//sets the total duration
myTween.totalDuration(10);`

export function DurationTotalSection() {
  return (
    <section id="duration-total" className="timing-page__section" aria-labelledby="duration-total-title">
      <SectionHeading
        number="03"
        id="duration-total"
        title="duration과 totalDuration이 갈리는 곳"
        description="이름이 비슷해서 헷갈리지만 두 값은 서로 다른 질문에 답합니다. 하나는 한 회차의 길이를, 다른 하나는 실제로 흘러야 하는 총량을 말합니다. 반복이 없으면 둘은 같은 숫자입니다."
      />

      <div className="timing-page__prose">
        <p>
          반복이 없는 tween에서는 이 둘을 구분할 필요가 없습니다. <strong>둘 다 같은 숫자</strong>이기 때문입니다. 구분이 필요해지는 건{' '}
          <code>repeat</code>이나 <code>repeatDelay</code>가 등장하는 순간입니다.
        </p>
        <p>
          공식 문서의 정의는 이렇습니다. <code>duration</code>은 <strong>"repeat과 repeatDelay를 포함하지 않는"</strong> 길이이고,{' '}
          <code>totalDuration</code>은 <strong>"repeat과 repeatDelay를 포함한"</strong> 총 길이입니다. totalDuration 문서는 이 대비를
          아예 강조해서 적어 두었습니다 — <strong>duration은 반대로 반복과 반복 대기를 포함하지 않는다.</strong>
        </p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>공식 문서가 직접 제시한 두 숫자 예시</caption>
          <thead>
            <tr>
              <th scope="col">출처</th>
              <th scope="col">설정</th>
              <th scope="col">duration</th>
              <th scope="col">totalDuration</th>
              <th scope="col">왜 그런가</th>
            </tr>
          </thead>
          <tbody>
            {officialCases.map((entry) => (
              <tr key={entry.id}>
                <th scope="row">{entry.origin}</th>
                <td>
                  <code>{entry.config}</code>
                </td>
                <td>{entry.duration}</td>
                <td>{entry.totalDuration}</td>
                <td>{entry.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>공식이 적지 않은 식 하나</h3>
        <p>
          공식 문서는 위의 두 숫자 예시만 보여 주고 <strong>식은 적어 두지 않았습니다.</strong> <code>repeat</code>이 0 이상의 유한한
          값일 때 실행으로 확인한 식은 이것입니다.
        </p>
        <p>
          <code>totalDuration = duration × (repeat + 1) + repeatDelay × repeat</code>
        </p>
        <p>
          괄호 안이 <code>repeat + 1</code>인 이유는 <strong>처음 재생 한 번</strong>이 반복 횟수에 들어 있지 않기 때문입니다. 그리고
          대기 시간에 <code>repeat</code>만 곱하는 이유는 <strong>마지막 회차 뒤에는 대기가 붙지 않기</strong> 때문입니다.
        </p>
        <p className="timing-page__provenance">
          이 식은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0에서 <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:d, repeat:r,
          repeatDelay:rd&#125;)</code>를 만들어 <code>tween.totalDuration()</code>을 읽는 방식으로 여섯 조합{' '}
          <code>(2,0,0)→2</code>, <code>(2,2,0)→6</code>, <code>(2,2,0.5)→7</code>, <code>(10,1,2)→22</code>,{' '}
          <code>(1.5,4,0.25)→8.5</code>, <code>(3,1,0)→6</code>에서 모두 일치함을 확인했습니다.
        </p>
      </div>

      <div className="timing-page__subheading">
        <h3>두 메서드의 공식 예제</h3>
        <p>
          둘 다 <a href="#getter-setter">02 섹션</a>의 규칙을 그대로 따릅니다. 괄호를 비우면 읽고, 숫자를 넣으면 씁니다.
        </p>
      </div>

      <div className="timing-page__split">
        <div>
          <p className="timing-page__code-label">
            <code>duration()</code> 공식 예제
          </p>
          <pre className="timing-page__code">
            <code>{officialDurationCode}</code>
          </pre>
        </div>
        <div>
          <p className="timing-page__code-label">
            <code>totalDuration()</code> 공식 예제
          </p>
          <pre className="timing-page__code">
            <code>{officialTotalDurationCode}</code>
          </pre>
        </div>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>setter로 쓰면 서로를 다시 계산합니다</h3>
        <p>
          공식 문서는 두 값을 설정할 수 있다고만 하고 <strong>설정했을 때 다른 쪽이 어떻게 되는지는 말하지 않습니다.</strong> 실행해 보면
          둘은 같은 값을 양쪽에서 붙잡고 있습니다.
        </p>
        <p>
          <code>duration: 2, repeat: 2</code>인 tween(처음 상태 <code>duration 2 / totalDuration 6</code>)에{' '}
          <code>tween.duration(4)</code>를 부르면 <code>duration 4 / totalDuration 12</code>가 됩니다. 반대로 같은 tween에{' '}
          <code>tween.totalDuration(12)</code>를 부르면 <strong>똑같이</strong> <code>duration 4 / totalDuration 12</code>가 됩니다.
          어느 쪽으로 설정해도 <code>timeScale()</code>은 <code>1</code> 그대로입니다.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>parent = gsap.timeline(&#123;paused:true&#125;)</code>에{' '}
          <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:2, repeat:2&#125;)</code>를 <code>parent.add(tween, 1)</code>로 넣은 뒤 각
          setter를 부르고 세 getter를 다시 읽어 확인했습니다.
        </p>
      </div>

      <div className="timing-page__warning">
        <h3>무한 반복이면 totalDuration이 거대한 숫자가 됩니다</h3>
        <p>
          <code>repeat: -1</code>로 무한 반복을 걸면 <code>totalDuration()</code>이 <code>10000000000</code>(백억)을 돌려줍니다.
          무한대(<code>Infinity</code>)가 아니라 아주 큰 유한한 숫자입니다. <code>duration()</code>은 그대로{' '}
          <code>2</code>이고, <code>endTime(false)</code>도 정상적으로 첫 회차 끝을 알려 줍니다.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:2, repeat:-1&#125;)</code>를
          paused timeline의 1초 지점에 넣고 읽었습니다. 결과는 <code>duration 2 / totalDuration 10000000000 / endTime 10000000001 /
          endTime(false) 3</code>입니다. 진행률이나 남은 시간을 totalDuration으로 계산하는 코드라면 무한 반복 여부를 먼저 확인해야
          합니다.
        </p>
      </div>

      <p className="timing-page__note">
        <code>repeat</code>, <code>repeatDelay</code>, <code>yoyo</code>가 회차를 어떻게 세고 값을 언제 다시 계산하는지는 이 페이지가
        자세히 설명하지 않습니다. 그 설정들을 <code>vars</code>에 적는 방법은{' '}
        <a href={toHref('/fundamentals/tween-configuration')}>설정은 어디서 오나 페이지</a>가 다룹니다. 여기서는 그 설정이{' '}
        <strong>totalDuration이라는 숫자에 어떻게 반영되는지</strong>만 봅니다.
      </p>
    </section>
  )
}
