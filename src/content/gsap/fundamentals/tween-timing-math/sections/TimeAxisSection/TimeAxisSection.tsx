/** 일곱 메서드를 나열하기 전에 하나의 시간축 그림과 용어를 먼저 세워 이후 설명의 기준을 만든다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 이 페이지 전체에서 반복해 쓸 용어 — 쓰기 전에 한 번씩 정의해 둔다
const glossary = [
  {
    term: '부모 timeline',
    body: 'Tween을 담고 있는 상위 컨테이너입니다. 직접 timeline을 만들지 않아도 GSAP이 만든 gsap.globalTimeline이 부모가 됩니다.',
  },
  {
    term: 'local time',
    body: '어떤 시계를 기준으로 잰 시각인지를 뜻합니다. tween의 local time 0초는 tween 자신이 시작하는 순간이고, 부모의 local time 0초는 부모가 시작하는 순간입니다. 둘은 다른 숫자입니다.',
  },
  {
    term: '재생 헤드(playhead)',
    body: '시간축 위에서 지금 어디를 재생 중인지 가리키는 지점입니다. 이 페이지는 헤드를 옮기지 않고, 헤드가 지나갈 좌표만 계산합니다.',
  },
  {
    term: '회차(cycle)',
    body: '처음부터 끝까지 한 번 재생되는 구간입니다. repeat이 2면 회차는 3번입니다. 처음 재생 한 번에 반복 두 번이 더해지기 때문입니다.',
  },
]

// 공식 delay 문서의 코드 예제 원문
const officialDelayCode = `var currentDelay = myAnimation.delay(); //gets current delay
myAnimation.delay(2); //sets delay`

export function TimeAxisSection() {
  return (
    <section id="time-axis" className="timing-page__section" aria-labelledby="time-axis-title">
      <SectionHeading
        number="01"
        id="time-axis"
        title="시간축 하나로 전부 보기"
        description="일곱 개의 메서드는 서로 다른 기능이 아닙니다. 전부 하나의 시간축 위에서 서로 다른 지점을 가리키는 눈금입니다. 그 시간축을 먼저 그려 두면 나머지는 읽기만 하면 됩니다."
      />

      <div className="timing-page__prose">
        <p>
          Tween 하나를 만들면 GSAP은 그것을 <strong>어딘가에 놓아야</strong> 합니다. 놓는 자리가 있어야 "언제 시작하고 언제 끝나는지"를
          말할 수 있기 때문입니다. 그 자리가 <strong>부모 timeline의 시간축</strong>입니다.
        </p>
        <p>
          이 페이지에서 나오는 일곱 개의 숫자는 전부 이 시간축 위의 좌표이거나 길이입니다. <code>delay</code>는 시작 전 여백,{' '}
          <code>duration</code>은 한 회차의 길이, <code>totalDuration</code>은 반복까지 다 더한 길이, <code>startTime</code>과{' '}
          <code>endTime</code>은 그 구간의 양 끝, <code>timeScale</code>은 그 구간을 얼마나 빨리 지나가는지,{' '}
          <code>globalTime</code>은 이 좌표를 맨 위 시계 기준으로 옮긴 값입니다.
        </p>
      </div>

      <div className="timing-page__subheading">
        <h3>먼저 정하고 갈 말 네 가지</h3>
        <p>아래 네 단어는 이 페이지 내내 나옵니다. 여기서 뜻을 고정합니다.</p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>이 페이지가 쓰는 용어</caption>
          <thead>
            <tr>
              <th scope="col">용어</th>
              <th scope="col">뜻</th>
            </tr>
          </thead>
          <tbody>
            {glossary.map((entry) => (
              <tr key={entry.term}>
                <th scope="row">{entry.term}</th>
                <td>{entry.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timing-page__subheading">
        <h3>시간축의 맨 앞: delay</h3>
        <p>
          시간축 위에서 가장 먼저 만나는 것이 <code>delay</code>입니다. 공식 문서는 이렇게 정의합니다 —{' '}
          <strong>애니메이션이 시작되기 전까지의 초 단위 길이</strong>.
        </p>
      </div>

      <div className="timing-page__split">
        <div className="timing-page__prose">
          <p>
            <code>delay( value:Number ) : [Number | self]</code>는 읽기도 하고 쓰기도 합니다. 인자 없이 부르면 지금 값을 돌려주고, 숫자를
            주면 그 값으로 바꿉니다.
          </p>
          <p>
            중요한 것은 <strong>delay 동안에는 아무 일도 일어나지 않는다</strong>는 점입니다. 공식 문서에 따르면 tween의 시작값은{' '}
            <strong>delay가 끝나기 전에는 기록조차 되지 않습니다.</strong> 그래서 delay 구간에 화면을 바꿔도 tween이 나중에 그 값을
            시작점으로 잡습니다.
          </p>
        </div>
        <pre className="timing-page__code">
          <code>{officialDelayCode}</code>
        </pre>
      </div>

      <div className="timing-page__warning">
        <h3>from() tween은 예외입니다</h3>
        <p>
          공식 문서가 괄호로 달아 둔 예외입니다. <code>from()</code> tween은 <strong>기본적으로 즉시 렌더됩니다.</strong> delay가
          끝나기를 기다리지 않습니다. 이 동작을 막으려면 <code>vars</code>에 <code>immediateRender: false</code>를 주어야 합니다.
        </p>
      </div>

      <div className="timing-page__note">
        <h3>delay는 배속의 영향을 받지 않습니다</h3>
        <p>
          공식 문서의 문장입니다. <strong>애니메이션의 delay는 timeScale의 영향을 받지 않습니다.</strong> 예를 들어 timeScale을{' '}
          <code>1</code>에서 <code>10</code>으로 바꿔도 delay가 열 배로 늘어나지 않습니다. 뒤에서 다룰{' '}
          <a href="#time-scale">timeScale 섹션</a>에서 이 경계를 다시 확인합니다.
        </p>
      </div>

      <p className="timing-page__note">
        Tween을 처음 만드는 방법과 <code>vars</code>에 무엇을 적을 수 있는지는 다른 페이지에서 설명합니다.{' '}
        <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>와{' '}
        <a href={toHref('/fundamentals/tween-configuration')}>설정은 어디서 오나 페이지</a>가 다룹니다.
      </p>
    </section>
  )
}
