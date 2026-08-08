/** 공식 position 표의 모든 표기를 네 갈래로 묶어 설명하고 같은 fixture 위의 실측값과 대조한다. */
import { PositionSyntaxLab } from '../../examples/PositionSyntaxLab/PositionSyntaxLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 표기 목록을 "무엇을 기준으로 재는가"라는 갈래로 묶는다 — 표기 수가 많아 기준별로 봐야 외우지 않고 읽힌다
const positionForms = [
  {
    id: 'absolute',
    basis: 'timeline의 시작(0초)',
    rows: [
      { id: 'number', form: '3', official: 'timeline 시작에서 정확히 3초 지점에 삽입합니다. 공식 표현으로는 "timeline의 시작에서 잰 절대 시간(초)"입니다.' },
    ],
  },
  {
    id: 'label',
    basis: '이름 붙은 시각(label)',
    rows: [
      { id: 'plain-label', form: '"someLabel"', official: '그 label이 있는 시각에 삽입합니다. label이 없으면 timeline의 끝에 추가됩니다.' },
      { id: 'label-rel', form: '"myLabel+=2"', official: '"myLabel" label에서 2초 뒤입니다.' },
      { id: 'label-pct', form: '"myLabel+=30%"', official: '"myLabel"에서, 삽입되는 animation의 total duration의 30%만큼 뒤입니다.' },
    ],
  },
  {
    id: 'timeline-end',
    basis: 'timeline의 끝',
    rows: [
      { id: 'plus', form: '"+=1"', official: 'timeline의 끝에서 1초 뒤입니다. 사이에 빈 간격이 생깁니다.' },
      { id: 'minus', form: '"-=1"', official: 'timeline의 끝에서 1초 앞입니다. 기존 내용과 겹칩니다.' },
      { id: 'plus-pct', form: '"+=50%"', official: '삽입되는 animation의 total duration의 50%만큼 timeline 끝에서 떨어져 간격을 만듭니다.' },
      { id: 'minus-pct', form: '"-=25%"', official: '삽입되는 animation의 total duration의 25%만큼 timeline 끝과 겹칩니다.' },
    ],
  },
  {
    id: 'previous',
    basis: '이전 animation',
    rows: [
      { id: 'lt', form: '"<"', official: '이전 animation의 시작입니다. 공식은 "<를 이전 animation의 시작을 가리키는 포인터로 생각하라"고 설명합니다.' },
      { id: 'gt', form: '">"', official: '이전 animation의 끝입니다. 공식은 ">를 이전 animation의 끝을 가리키는 포인터로 생각하라"고 설명합니다.' },
      { id: 'lt-plus', form: '"<+=3"', official: '이전 animation의 시작에서 3초 뒤입니다.' },
      { id: 'lt-num', form: '"<3"', official: '"<+=3"과 같습니다. 공식 문장은 "<나 > 뒤에 숫자가 오면 상대값으로 해석되므로 <2는 <+=2와 같다"입니다.' },
      { id: 'gt-minus', form: '">-0.5"', official: '이전 animation의 끝에서 0.5초 앞입니다.' },
      { id: 'lt-pct', form: '"<25%"', official: '이전 animation의 시작에서 그 animation 안으로 25% 들어간 지점입니다.' },
      { id: 'lt-plus-pct', form: '"<+=25%"', official: '이전 animation의 시작에서, 삽입되는 animation의 total duration의 25%만큼 뒤입니다.' },
    ],
  },
]

export function PositionSyntaxSection() {
  return (
    <section id="position-syntax" className="placement-page__section" aria-labelledby="position-syntax-title">
      <SectionHeading
        number="03"
        id="position-syntax"
        title="position 표기 하나가 자리를 정한다"
        description="공식 문서는 표기법을 길게 나열합니다. 하지만 외울 목록이 아닙니다. 모든 표기는 '어디를 0으로 삼고 재는가'라는 질문에 답할 뿐이고, 기준은 네 개뿐입니다."
      />

      <div className="placement-page__prose">
        <p>
          앞 섹션에서 <code>position</code>의 기본값이 <code>"+=0"</code> — 즉 <strong>timeline의 끝</strong>이라는 것을 봤습니다. 다른
          표기법은 전부 <strong>기준점을 바꾸거나, 그 기준에서 얼마나 떨어질지를 더하는</strong> 것입니다.
        </p>
        <p>
          그래서 표기를 읽을 때 두 조각으로 끊어 읽으면 됩니다. <strong>앞은 기준점</strong>(숫자·label·<code>&lt;</code>·
          <code>&gt;</code>·생략), <strong>뒤는 그 기준에서의 이동량</strong>(<code>+=</code>·<code>-=</code>·퍼센트)입니다.
        </p>
      </div>

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>공식 position 표기 전체 — 기준점 네 갈래로 묶음</caption>
          <thead>
            <tr>
              <th scope="col">기준점</th>
              <th scope="col">표기</th>
              <th scope="col">공식 설명</th>
            </tr>
          </thead>
          <tbody>
            {positionForms.flatMap((group) =>
              group.rows.map((row, index) => (
                <tr key={row.id}>
                  {index === 0 ? <th scope="row" rowSpan={group.rows.length}>{group.basis}</th> : null}
                  <td>
                    <code>{row.form}</code>
                  </td>
                  <td>{row.official}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      <div className="placement-page__note">
        <h3>"이전 animation"은 끝에 가장 가까운 것이 아닙니다</h3>
        <p>
          <code>&lt;</code>와 <code>&gt;</code>를 쓸 때 가장 많이 오해하는 지점이고, 공식 문서도 각주로 못을 박아 뒀습니다 —{' '}
          <strong>"'이전 animation'은 가장 최근에 삽입된 animation을 뜻하며, 반드시 timeline의 끝에 가장 가까운 animation은
          아니다."</strong>
        </p>
        <p>
          즉 <code>&lt;</code>는 <strong>시간축 위의 위치가 아니라 코드를 쓴 순서</strong>를 따릅니다. 5초짜리 tween을 넣은 뒤 0.5초
          지점에 짧은 tween을 끼워 넣었다면, 그다음 <code>&lt;</code>는 <strong>0.5초짜리</strong>를 가리킵니다. 같은 대상을 객체로 직접
          받아 오는 방법이 <a href="#recent-pointer">04 섹션</a>의 <code>recent()</code>입니다.
        </p>
      </div>

      <div className="placement-page__subheading">
        <h3>퍼센트는 "누구의 길이"의 퍼센트인가</h3>
        <p>
          퍼센트 표기가 어려운 이유는 값이 아니라 <strong>기준</strong> 때문입니다. 공식 문서는 기준을 두 문장으로 나눠 적어 뒀습니다.
        </p>
      </div>

      <div className="placement-page__split">
        <div className="placement-page__prose">
          <p>
            <strong>"+=" 또는 "-=" 바로 뒤에 오면</strong> — 퍼센트는 <strong>삽입되는 animation</strong>의 total duration 기준입니다.
          </p>
          <p>
            <code>"+=50%"</code>, <code>"-=25%"</code>, <code>"myLabel+=30%"</code>, 그리고 <code>"&lt;+=25%"</code>가 여기
            해당합니다. <code>+=</code>가 앞에 붙어 있기 때문입니다.
          </p>
        </div>
        <div className="placement-page__prose">
          <p>
            <strong>"&lt;" 또는 "&gt;" 바로 뒤에 오면</strong> — 퍼센트는 <strong>이전 animation</strong>의 total duration
            기준입니다.
          </p>
          <p>
            <code>"&lt;25%"</code>가 여기 해당합니다. <code>&lt;</code> 다음에 곧바로 퍼센트가 왔기 때문입니다.
          </p>
        </div>
      </div>

      <div className="placement-page__warning">
        <h3>"&lt;3"과 "&lt;25%"는 규칙이 다릅니다</h3>
        <p>
          공식 문서는 두 규칙을 각각 적어 두지만 <strong>둘을 나란히 놓고 비교해 주지는 않습니다.</strong> 그래서 숫자에서 배운 직관을
          퍼센트에 그대로 적용하면 틀립니다.
        </p>
        <p>
          <code>"&lt;3"</code>은 <code>"&lt;+=3"</code>과 <strong>같습니다.</strong> 공식이 그렇게 적었습니다.
          <br />
          <code>"&lt;25%"</code>는 <code>"&lt;+=25%"</code>와 <strong>같지 않습니다.</strong> 앞은 <strong>이전</strong> animation의
          길이를 재고, 뒤는 <strong>삽입되는</strong> animation의 길이를 재기 때문입니다.
        </p>
        <p>
          두 animation의 길이가 같으면 이 차이가 드러나지 않습니다. 아래 예제에서 <strong>삽입 child의 repeat를 켜면</strong> total
          duration만 2초에서 4초로 늘어나 두 값이 갈라집니다.
        </p>
      </div>

      <div className="placement-page__note">
        <h3>퍼센트의 기준이 되는 "total duration"의 뜻</h3>
        <p>
          공식이 짧게 덧붙인 주의 문장이 있습니다 — <strong>"total duration에는 repeat과 yoyo가 포함된다."</strong> 그러니 duration이
          2인 tween이라도 <code>repeat: 1</code>이면 퍼센트의 기준 길이는 <strong>4</strong>입니다. 아래 예제에서 반복 스위치를
          켜고 끄면 같은 <code>"+=50%"</code>가 다른 자리로 가는 것을 확인할 수 있습니다.
        </p>
        <p>
          그리고 버전 조건이 하나 있습니다 — <strong>퍼센트 기반 position 값은 GSAP 3.7.0에서 추가됐습니다.</strong> 그 이전 버전에서는
          동작하지 않습니다.
        </p>
      </div>

      <PositionSyntaxLab />

      <div className="placement-page__note placement-page__note--probe">
        <h3>배치 위치와 child 자신의 delay는 더해집니다</h3>
        <p>
          <code>position</code>은 child를 놓을 자리를 정하지만, child 자신이 <code>delay</code>를 갖고 있으면{' '}
          <strong>둘이 더해집니다.</strong> 공식 <code>add()</code> 문서는 <code>delay</code>와의 관계를 언급하지 않습니다.
        </p>
        <p>
          <code>startTime = 부모에 넣은 position + child의 delay</code>
        </p>
        <p className="placement-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:1, delay:D&#125;)</code>를{' '}
          <code>parent.add(tween, POS)</code>로 넣고 <code>startTime()</code>을 읽었습니다. <code>(D=0, POS=2)→2</code>,{' '}
          <code>(D=0.75, POS=2)→2.75</code>, <code>(D=1, POS=0)→1</code>, <code>(D=0.75, POS=0)→0.75</code>. 위 예제의 child에는{' '}
          <code>delay</code>를 주지 않았으므로 <code>startTime</code>이 곧 position 계산 결과입니다.
        </p>
      </div>

      <div className="placement-page__note placement-page__note--probe">
        <h3>없는 label을 position으로 주면 label이 생깁니다</h3>
        <p>
          공식은 <strong>"label이 존재하지 않으면 timeline의 끝에 추가된다"</strong>고 적습니다. 그런데 여기서 "추가된다"의 주어가{' '}
          <strong>child인지 label인지</strong>가 문장만으로는 갈립니다. 실행해 보면 <strong>둘 다</strong>입니다.
        </p>
        <p>
          끝이 2초인 timeline에 <code>tl.add(child, "ghost")</code>를 하면 child의 <code>startTime()</code>은 <strong>2</strong>가
          되고, 동시에 <code>tl.labels</code>가 <code>{'{ myLabel: 1, ghost: 2 }'}</code>가 됩니다. <strong>없던 label이 그
          자리에 실제로 만들어집니다.</strong> 오타 낸 label 이름이 조용히 새 label이 되어 버리는 것이라, 잘못 쓰면 오류 없이 배치만
          어긋납니다.
        </p>
        <p className="placement-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 아래 예제와 같은 fixture(끝 2초, <code>myLabel</code>은 1초)에{' '}
          <code>add(child, "ghost")</code>를 실행한 뒤 <code>startTime()</code>과 <code>labels</code>를 읽었습니다.
        </p>
      </div>

      <div className="placement-page__note">
        <h3>공식 문서가 여기서 더 보라고 안내하는 곳</h3>
        <p>
          <code>add()</code> 페이지에는 <strong>실행 가능한 코드 예제 블록이 없습니다.</strong> 대신 표기법의 상세를 별도 문서인{' '}
          <a href="https://gsap.com/resources/position-parameter" target="_blank" rel="noopener noreferrer">
            Position Parameter 문서
          </a>
          와 그 안의 <strong>Position Parameter Interactive Demo</strong>로 넘깁니다. 이 페이지의 위 예제는 그 표기 목록을 같은 fixture
          위에서 숫자로 확인하는 용도입니다.
        </p>
      </div>
    </section>
  )
}
