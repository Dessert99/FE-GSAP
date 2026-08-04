/** 인자 개수 하나로 getter와 setter가 갈리는 eventCallback()의 형태와 삭제·덮어쓰기 규칙을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { EventCallbackLab } from '../../examples/EventCallbackLab/EventCallbackLab'

// 공식 signature 원문 — 반환 타입이 두 가지로 적혀 있다는 것 자체가 이 섹션의 핵심이다
const signature = `eventCallback( type:String, callback:Function, params:Array ) : [Function | self]`

// 인자 개수에 따라 무엇이 일어나는지를 세 줄로 대비시킨다
const threeForms = `// 읽기 — 첫 인자만 넘깁니다
myAnimation.eventCallback('onComplete')      // 등록된 함수를 돌려줍니다

// 쓰기 — 두 번째 인자부터 넘깁니다
myAnimation.eventCallback('onComplete', fn)  // myAnimation 자신을 돌려줍니다

// 지우기 — 두 번째 인자에 null을 넘깁니다
myAnimation.eventCallback('onUpdate', null)`

export function EventCallbackFormSection() {
  return (
    <section id="event-callback-form" className="callbacks-page__section" aria-labelledby="event-callback-form-title">
      <SectionHeading
        number="02"
        id="event-callback-form"
        title="읽기·바꾸기·지우기가 한 메서드에 있다"
        description="eventCallback()은 이름이 하나인데 하는 일이 셋입니다. 무엇을 하느냐는 인자를 몇 개 넘겼느냐로 갈립니다."
      />

      <div className="callbacks-page__prose">
        <p>
          공식 문서가 적어 둔 signature입니다. 반환 타입 자리에 <strong>두 가지가 함께</strong> 적혀 있는 것을 먼저 보세요.
        </p>
      </div>

      <pre className="callbacks-page__signature">
        <code>{signature}</code>
      </pre>

      <div className="callbacks-page__prose">
        <p>
          <code>[Function | self]</code>는 "함수를 돌려줄 수도 있고 자기 자신을 돌려줄 수도 있다"는 뜻입니다. 어느 쪽인지는{' '}
          <strong>내가 인자를 몇 개 넘겼느냐</strong>가 정합니다. 공식 문장은 이렇습니다 — 첫 인자만 남기고 나머지를 생략하면 현재
          값을 돌려주는 <strong>getter</strong>이고, 첫 인자보다 더 많이 넘기면 콜백을 설정하는 <strong>setter</strong>가 되어 chaining을
          쉽게 하려고 instance 자신을 돌려줍니다.
        </p>
      </div>

      <pre className="callbacks-page__code">
        <code>{threeForms}</code>
      </pre>

      <div className="callbacks-page__table-wrap">
        <table className="callbacks-page__form-table">
          <caption>인자 개수가 정하는 것</caption>
          <thead>
            <tr>
              <th scope="col">넘긴 인자</th>
              <th scope="col">하는 일</th>
              <th scope="col">돌려주는 것</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <code>type</code>만
              </th>
              <td>지금 등록된 콜백을 읽는다</td>
              <td>등록된 함수</td>
            </tr>
            <tr>
              <th scope="row">
                <code>type</code>, <code>callback</code>
              </th>
              <td>콜백을 설정한다</td>
              <td>
                instance 자신 (<code>self</code>)
              </td>
            </tr>
            <tr>
              <th scope="row">
                <code>type</code>, <code>null</code>
              </th>
              <td>콜백을 지운다</td>
              <td>
                instance 자신 (<code>self</code>)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callbacks-page__warning">
        <h3>한 event에 콜백은 하나뿐입니다</h3>
        <p>
          공식 문서의 문장입니다. <strong>각 event type에는 콜백을 하나만 걸 수 있어서, 새 값을 설정하면 이전 것을 덮어씁니다.</strong>{' '}
          DOM의 <code>addEventListener</code>처럼 여러 개가 쌓이지 않습니다. 두 가지 일을 하고 싶다면 하나의 함수 안에서 둘 다 부르거나,
          이전 콜백을 먼저 읽어 두었다가 새 함수 안에서 같이 불러야 합니다.
        </p>
      </div>

      <div className="callbacks-page__note callbacks-page__note--probe">
        <h3>공식 문서에 없는 동작 하나</h3>
        <p>
          공식 문서는 getter가 <strong>무엇을 돌려주는지</strong>는 밝히지만 <strong>등록된 게 없을 때</strong> 무엇을 돌려주는지는 적어
          두지 않았습니다. 실제로 실행해 보면 <code>undefined</code>입니다. <code>null</code>로 지운 뒤에도 <code>undefined</code>이고,{' '}
          <code>vars</code>에 적어 둔 콜백도 같은 getter로 읽힙니다.
        </p>
        <p className="callbacks-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 등록 여부를 확인할 때{' '}
          <code>null</code>과 비교하지 말고 값의 존재 자체로 판단하는 편이 안전합니다.
        </p>
      </div>

      <EventCallbackLab />
    </section>
  )
}
