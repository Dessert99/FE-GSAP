/** eventCallback()의 세 인자가 각각 무엇을 정하는지와 chaining 형태를 공식 명세로 정리한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 보여주는 chaining 예제 — setter가 self를 돌려주기 때문에 가능한 형태다
const chainingExample = `myAnimation
  .eventCallback('onComplete', completeHandler, ['param1', 'param2'])
  .eventCallback('onUpdate', updateHandler)
  .play(1);`

// 공식 Parameters 절이 밝힌 세 인자의 타입·기본값·설명
const args = [
  {
    name: 'type',
    type: 'String',
    defaultValue: '공식 페이지에 명시 없음',
    detail:
      '어떤 event의 콜백인지 정합니다. 공식 문서가 예로 든 값은 "onComplete", "onUpdate", "onStart", "onRepeat", "onReverseComplete", "onInterrupt"입니다.',
    caution: '대소문자를 구분합니다. "oncomplete"는 다른 값입니다.',
  },
  {
    name: 'callback',
    type: 'Function',
    defaultValue: 'null',
    detail: '그 event가 일어날 때 실행될 함수입니다.',
    caution: 'null을 넘기면 등록된 콜백이 지워집니다.',
  },
  {
    name: 'params',
    type: 'Array',
    defaultValue: 'null',
    detail: '콜백을 부를 때 함께 넘길 parameter 배열입니다.',
    caution: '배열이므로 값이 하나여도 대괄호로 감쌉니다.',
  },
]

export function EventCallbackArgsSection() {
  return (
    <section id="event-callback-args" className="callbacks-page__section" aria-labelledby="event-callback-args-title">
      <SectionHeading
        number="03"
        id="event-callback-args"
        title="인자 세 개가 정하는 것"
        description="어떤 event인지, 무엇을 부를지, 무엇을 넘길지. 세 인자가 각각 하나씩 맡습니다."
      />

      <div className="callbacks-page__table-wrap">
        <table className="callbacks-page__args-table">
          <caption>공식 Parameters 절이 밝힌 세 인자</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">무엇을 정하나</th>
              <th scope="col">주의</th>
            </tr>
          </thead>
          <tbody>
            {args.map((arg) => (
              <tr key={arg.name}>
                <th scope="row">
                  <code>{arg.name}</code>
                </th>
                <td>{arg.type}</td>
                <td>
                  <code>{arg.defaultValue}</code>
                </td>
                <td>{arg.detail}</td>
                <td>{arg.caution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="callbacks-page__subheading">
        <h3>이어서 부를 수 있습니다</h3>
        <p>setter가 instance 자신을 돌려주기 때문에, 여러 콜백을 점으로 이어 붙일 수 있습니다.</p>
      </div>

      <pre className="callbacks-page__code">
        <code>{chainingExample}</code>
      </pre>

      <div className="callbacks-page__prose">
        <p>
          공식 예제도 이 형태입니다. <code>eventCallback()</code>을 두 번 이어 부르고 마지막에 <code>play()</code>까지 연결합니다.
          중간에 끊어서 변수에 담을 필요가 없습니다.
        </p>
        <p>
          다만 <strong>getter는 이어 붙일 수 없습니다.</strong> 인자를 하나만 넘긴 순간 반환값이 instance가 아니라 함수가 되기
          때문입니다. 읽는 호출은 항상 체인의 마지막이어야 합니다.
        </p>
      </div>

      <div className="callbacks-page__note">
        <p>
          <code>params</code>로 넘긴 값이 콜백에서 어떻게 받아지는지, 그리고 <code>onCompleteParams</code>처럼{' '}
          <code>vars</code>에 적는 형태의 전체 명세는 <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>가 소유합니다.
        </p>
      </div>
    </section>
  )
}
