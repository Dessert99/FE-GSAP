/** label이 무엇인지, 왜 숫자 대신 필요한지, labels 객체가 무엇을 담는지를 첫 단계로 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 이 페이지를 읽기 전에 뜻이 고정돼 있어야 하는 낱말들
const vocabulary = [
  {
    term: 'Timeline',
    plain: '여러 animation을 시간 축 위에 늘어놓고 하나처럼 재생·정지하는 GSAP 객체입니다.',
    why: 'label은 Timeline에만 붙습니다. Tween 하나에는 붙일 수 없습니다.',
  },
  {
    term: 'playhead',
    plain: '지금 Timeline의 몇 초 지점을 보고 있는지를 가리키는 바늘입니다.',
    why: '이 페이지의 메서드는 대부분 "playhead가 지금 어디인가"를 기준으로 답합니다.',
  },
  {
    term: 'label',
    plain: 'Timeline 안의 어떤 시각에 붙인 이름표입니다. 값이 아니라 위치에 붙습니다.',
    why: '2.4초라는 숫자 대신 "outro"라고 부를 수 있게 됩니다.',
  },
  {
    term: 'position parameter',
    plain: 'GSAP에서 "무엇을 Timeline의 어디에 놓을지"를 적는 자리입니다. 숫자와 문자열을 모두 받습니다.',
    why: 'label을 붙일 때도 이 자리를 씁니다. 03단계에서 전부 봅니다.',
  },
  {
    term: 'seek',
    plain: '재생하지 않고 playhead만 특정 지점으로 옮기는 것입니다.',
    why: '이름으로 이동한다는 이 페이지의 핵심 동작이 seek입니다.',
  },
]

const labelsDeclaration = `labels : Object`

const officialLabelsExample = `var tl = gsap.timeline();

tl.addLabel("myLabel", 3);
tl.addLabel("anotherLabel", 5);

//now the label object has those labels and times, like:
console.log(tl.labels.myLabel); // 3
console.log(tl.labels.anotherLabel); // 5`

const brittleVsNamed = `// 숫자로 적으면 — 앞에 장면 하나만 끼워 넣어도 2.4가 전부 틀어집니다
tl.seek(2.4)
tl.call(showCaption, undefined, 2.4)

// 이름으로 적으면 — 장면이 밀려도 "outro"는 계속 outro입니다
tl.seek('outro')
tl.call(showCaption, undefined, 'outro')`

export function LabelMapSection() {
  return (
    <section id="label-map" className="labels-page__section" aria-labelledby="label-map-title">
      <SectionHeading
        number="01"
        id="label-map"
        title="label은 이름과 시각을 짝지은 지도다"
        description="먼저 이 페이지에서 쓸 낱말부터 뜻을 정해 둡니다. 그다음 label이 실제로 어디에 어떤 모양으로 저장되는지 봅니다."
      />

      <div className="labels-page__table-wrap">
        <table className="labels-page__table">
          <caption>이 페이지를 읽기 전에 뜻을 정해 두는 낱말</caption>
          <thead>
            <tr>
              <th scope="col">낱말</th>
              <th scope="col">쉬운 뜻</th>
              <th scope="col">이 페이지에서 왜 필요한가</th>
            </tr>
          </thead>
          <tbody>
            {vocabulary.map((entry) => (
              <tr key={entry.term}>
                <th scope="row">
                  <code>{entry.term}</code>
                </th>
                <td>{entry.plain}</td>
                <td>{entry.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="labels-page__subheading">
        <h3>왜 숫자 대신 이름인가</h3>
        <p>label이 해결하는 문제부터 봅니다.</p>
      </div>

      <div className="labels-page__prose">
        <p>
          Timeline을 만들 때 우리는 "2.4초에 자막을 띄운다" 같은 식으로 <strong>숫자</strong>를 적습니다. 문제는 그 숫자가{' '}
          <strong>앞쪽 내용에 완전히 종속</strong>돼 있다는 점입니다. 앞에 0.5초짜리 장면을 하나 끼워 넣는 순간 2.4초는 2.9초가
          되고, 2.4를 적어 둔 자리를 전부 찾아 고쳐야 합니다.
        </p>
        <p>
          label은 이 연결을 끊습니다. 시각에 <strong>이름</strong>을 붙여 두면, 앞이 밀리든 당겨지든 그 이름은 계속 같은 장면을
          가리킵니다. 숫자는 배치가 바뀔 때마다 틀어지지만 이름은 <strong>의미</strong>를 가리키기 때문입니다.
        </p>
      </div>

      <pre className="labels-page__code">
        <code>{brittleVsNamed}</code>
      </pre>

      <div className="labels-page__subheading">
        <h3>붙인 이름은 어디에 남는가 — labels 속성</h3>
        <p>공식 문서가 이 속성에 대해 적은 것은 짧습니다. 선언 한 줄과 예제 하나입니다.</p>
      </div>

      <pre className="labels-page__signature">
        <code>{labelsDeclaration}</code>
      </pre>

      <div className="labels-page__prose">
        <p>
          공식 설명은 <strong>"timeline에 추가된 label을 저장한다"</strong>는 한 문장입니다. 그리고{' '}
          <code>timeline.labels</code>로 <strong>모든 label이 담긴 객체 전체</strong>를 얻을 수 있다고 알려 줍니다. 타입은{' '}
          <code>Object</code>입니다.
        </p>
        <p>
          공식 예제를 그대로 보면 구조가 바로 보입니다. <code>addLabel("myLabel", 3)</code>과{' '}
          <code>addLabel("anotherLabel", 5)</code>을 부른 뒤 <code>tl.labels.myLabel</code>은 <code>3</code>을,{' '}
          <code>tl.labels.anotherLabel</code>은 <code>5</code>를 출력합니다. 즉 <strong>key가 label 이름이고 value가 초 단위 시각</strong>
          인 평범한 지도입니다.
        </p>
      </div>

      <pre className="labels-page__code">
        <code>{officialLabelsExample}</code>
      </pre>

      <div className="labels-page__note labels-page__note--probe">
        <h3>labels 객체의 실제 모양과 key 순서</h3>
        <p>
          공식 페이지는 <code>labels</code>의 타입을 <code>Object</code>라고만 적고, key가 어떤 순서로 들어 있는지는{' '}
          <strong>말하지 않습니다.</strong> 목록을 그려야 할 때 바로 걸리는 지점이라 직접 확인했습니다.
        </p>
        <p>
          <strong>측정 방법</strong> — GSAP 3.15.0에서 paused Timeline을 만들고 <code>addLabel</code>을 부른 뒤{' '}
          <code>Object.getPrototypeOf</code>, <code>Object.keys</code>, <code>typeof</code>를 읽었습니다. <code>labels</code>는{' '}
          프로토타입이 <code>Object.prototype</code>인 <strong>평범한 객체</strong>였고, key는 label 이름(String), value는 초 단위
          Number였습니다. label이 하나도 없으면 <code>{'{}'}</code>이고, 없는 key를 읽으면 <code>undefined</code>입니다.
        </p>
        <p>
          <strong>key 순서는 시간 순이 아니라 붙인 순서입니다.</strong> 5초·1초·3초 차례로 붙이자 <code>Object.keys</code>도{' '}
          <code>['late', 'early', 'mid']</code> 그대로였습니다. 그래서 <strong>label 목록을 시간 순으로 보여주려면 직접 정렬해야
          합니다.</strong> 다만 04단계에서 볼 <code>nextLabel()</code>·<code>previousLabel()</code>은 이 순서와 무관하게 시간 순으로
          찾습니다.
        </p>
        <p className="labels-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. 실행으로 확인한 내용입니다.
        </p>
      </div>

      <div className="labels-page__note labels-page__note--probe">
        <h3>label의 시각은 그 Timeline 안에서의 시각입니다</h3>
        <p>
          Timeline 안에 Timeline을 넣을 수 있기 때문에, "3초"가 <strong>누구 기준 3초인지</strong>가 문제가 됩니다. 공식 label
          문서들은 이 점을 다루지 않아 직접 확인했습니다.
        </p>
        <p>
          <strong>측정 방법</strong> — 부모 Timeline의 3초 지점에 child Timeline을 넣고, child에 <code>childMark</code> label을 1초에
          붙인 뒤 <code>child.seek('childMark')</code>를 불렀습니다. <code>child.time()</code>은 <strong>1</strong>이 됐고{' '}
          <code>child.startTime()</code>은 3, 부모의 <code>time()</code>은 0 그대로였습니다.
        </p>
        <p>
          즉 label은 <strong>자신을 소유한 Timeline의 local time</strong>에 붙습니다. 부모의 시간 축으로 환산되지 않습니다. 공식
          문서가 <code>nextLabel()</code> 설명에서 "timeline의 local time zone"이라고 쓴 것과 같은 이야기입니다.
        </p>
        <p className="labels-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. 실행으로 확인한 내용입니다.
        </p>
      </div>
    </section>
  )
}
