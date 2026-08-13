/** repeat가 총 횟수가 아니라 추가 횟수라는 계산 규칙과 -1의 의미를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 vars 설정 예로 실은 원문
const officialVars = `gsap.to(obj, {duration: 1, x: 100, repeat: 2});`

// 공식 문서에 실린 getter·setter 코드 예제 원문
const officialCall = `// Gets current repeat
var progress = myTween.repeat();

// Sets repeat to 2
myTween.repeat(2);`

// 공식 문서가 보여준 chaining 형태 원문
const officialChain = `myTween.repeat(2).yoyo(true).play();`

// repeat 값이 실제 재생 횟수로 어떻게 번역되는지 보여주는 대조표
const countRows = [
  { repeat: '0', total: '1번', note: '기본값입니다. 반복하지 않습니다.' },
  { repeat: '1', total: '2번', note: '공식 문서가 직접 든 예입니다 — 최초 재생 + 1회 반복.' },
  { repeat: '3', total: '4번', note: '"네 번 깜빡이게 하고 싶다"면 repeat는 3입니다.' },
  { repeat: '-1', total: '무한', note: '멈추라고 할 때까지 계속합니다.' },
]

export function RepeatCountSection() {
  return (
    <section id="repeat-count" className="repeats-page__section" aria-labelledby="repeat-count-title">
      <SectionHeading
        number="01"
        id="repeat-count"
        title='반복은 "추가로 몇 번"으로 센다'
        description="여기서 가장 많이 하는 실수는 repeat를 총 재생 횟수로 읽는 것입니다. repeat는 첫 재생을 뺀 나머지 횟수입니다."
      />

      <div className="repeats-page__prose">
        <p>
          먼저 용어 하나를 정하겠습니다. <strong>iteration(회차)</strong>은 Tween이 시작부터 끝까지 한 번 지나가는 것을 말합니다. 이
          페이지에서는 "회차"라고 부르겠습니다.
        </p>
        <p>
          <code>repeat</code>는 <strong>첫 회차가 끝난 뒤 몇 번 더 반복할지</strong>를 정합니다. 공식 문서의 문장은{' '}
          <strong>"repeat가 1이면 tween은 총 두 번 재생된다(최초 재생 + 1회 반복)"</strong>입니다. 그래서 실제 회차 수는 항상{' '}
          <code>repeat + 1</code>입니다.
        </p>
      </div>

      <div className="repeats-page__table-wrap">
        <table className="repeats-page__rules-table">
          <caption>repeat 값과 실제 재생 횟수</caption>
          <thead>
            <tr>
              <th scope="col">repeat</th>
              <th scope="col">총 재생</th>
              <th scope="col">읽는 법</th>
            </tr>
          </thead>
          <tbody>
            {countRows.map((row) => (
              <tr key={row.repeat}>
                <th scope="row">
                  <code>{row.repeat}</code>
                </th>
                <td>{row.total}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="repeats-page__warning">
        <h3>정수만 넣습니다</h3>
        <p>
          공식 문서는 <strong>"repeat는 항상 정수여야 한다"</strong>고 못박습니다. <code>repeat: 2.5</code> 같은 값으로 "두 번 반 반복"을
          만들 수는 없습니다. 무한 반복은 <code>-1</code>이라는 <strong>약속된 값</strong>이지 "음수만큼 반복"이라는 뜻이 아닙니다.
        </p>
      </div>

      <div className="repeats-page__subheading">
        <h3>repeat 하나로는 부족할 때</h3>
        <p>공식 문서는 repeat 설명 안에서 곧바로 다음 두 옵션을 안내합니다.</p>
      </div>

      <div className="repeats-page__prose">
        <p>
          반복이 <strong>정방향과 역방향을 번갈아</strong> 가게 하려면 <code>yoyo</code>를 <code>true</code>로 두고, 반복 사이에{' '}
          <strong>시간 간격</strong>을 넣으려면 <code>repeatDelay</code>를 씁니다. 다음 두 섹션이 각각 이 둘을 다룹니다.
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
            <p>같은 이름의 메서드가 getter이자 setter입니다.</p>
          </div>
          <pre className="repeats-page__code">
            <code>{officialCall}</code>
          </pre>
        </div>
      </div>

      <div className="repeats-page__prose">
        <p>
          setter는 instance 자신을 돌려주므로 공식 문서처럼 이어 붙일 수 있습니다.
        </p>
      </div>
      <pre className="repeats-page__code">
        <code>{officialChain}</code>
      </pre>

    </section>
  )
}
