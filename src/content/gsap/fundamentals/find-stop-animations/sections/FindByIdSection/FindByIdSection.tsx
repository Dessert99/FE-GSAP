/** getById의 반환 계약과 garbage collection 경계를 공식 예제와 실행 확인 사실로 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 getById 페이지의 예제 원문 — 주석 위치까지 그대로 옮겼다
const officialCall = `gsap.to(obj, { id: "myTween", duration: 1, x: 100 });
//later
let tween = gsap.getById("myTween"); //returns the tween
tween.pause();`

// 이 페이지가 담당하는 조회 API 중 유일하게 반환 형태가 공식에 적힌 것이다
const returnRows = [
  { when: '그 id를 가진 tween이나 timeline이 있을 때', result: 'Tween 또는 Timeline instance' },
  { when: '그 id를 가진 것이 하나도 없을 때', result: 'undefined' },
]

export function FindByIdSection() {
  return (
    <section id="find-by-id" className="find-stop-page__section" aria-labelledby="find-by-id-title">
      <SectionHeading
        number="02"
        id="find-by-id"
        title="id라는 이름표로 다시 잡는다"
        description="gsap.getById()는 이름표 하나를 받아 그 animation instance를 돌려줍니다. 대신 언제 찾을 수 있는지에 분명한 시간 제한이 있습니다."
      />

      <div className="find-stop-page__split">
        <div className="find-stop-page__prose">
          <p>
            <code>gsap.getById()</code>는 <strong>이름표로 instance를 되찾는</strong> 조회입니다. 돌려받는 것은 복사본이 아니라{' '}
            <strong>바로 그 Tween</strong>이라서, 받자마자 <code>pause()</code>처럼 이어 부를 수 있습니다.
          </p>
          <p>
            오른쪽은 공식 페이지의 예제 원문입니다. <code>vars</code> 안에 <code>id</code>를 적어 만들고, 한참 뒤에 그 문자열만으로 다시
            찾아 멈춥니다.
          </p>
          <p>
            돌려주는 대상은 Tween만이 아닙니다. 공식 문서는 <strong>"tween 또는 timeline"</strong>이라고 적습니다. 같은 이름표 체계를 두
            종류가 함께 씁니다.
          </p>
        </div>
        <pre className="find-stop-page__code">
          <code>{officialCall}</code>
        </pre>
      </div>

      <div className="find-stop-page__table-wrap">
        <table className="find-stop-page__params-table">
          <caption>공식 문서가 밝힌 반환값</caption>
          <thead>
            <tr>
              <th scope="col">상황</th>
              <th scope="col">돌려주는 값</th>
            </tr>
          </thead>
          <tbody>
            {returnRows.map((row) => (
              <tr key={row.when}>
                <th scope="row">{row.when}</th>
                <td>
                  <code>{row.result}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="find-stop-page__note">
        <h3>인자 명세는 공식 페이지에 없습니다</h3>
        <p>
          <code>gsap.getById()</code> 공식 페이지에는 <strong>signature 줄도, Parameters 절도 없습니다.</strong> 인자의 타입과 개수는{' '}
          <strong>공식 페이지에 명시 없음</strong>으로 둡니다. 확인할 수 있는 것은 예제가 보여주는 사용법 — 만들 때 쓴 것과 같은 값을 하나
          넘긴다 — 까지입니다.
        </p>
      </div>

      <div className="find-stop-page__warning">
        <h3>완료된 animation은 찾을 수 없습니다</h3>
        <p>
          공식 문서의 문장입니다. <strong>"GSAP은 animation이 완료된 직후 garbage collection으로 넘기므로, getById()는 active이거나 아직
          시작하지 않은 animation만 찾는다."</strong> 끝난 Tween을 나중에 찾으면 <code>undefined</code>가 돌아옵니다.
        </p>
        <p>
          이유도 함께 적혀 있습니다. <strong>"getById()로 찾을지 모른다는 이유로 모든 animation을 붙잡고 있으면 시스템이 금세 막히고
          memory leak으로 이어질 수 있다."</strong> 그래서 GSAP은 끝난 것을 놓아 줍니다. 완료 뒤에도 손잡이가 필요하면 앞 단계에서 본{' '}
          <strong>변수</strong>를 쓰는 것이 공식 권고입니다.
        </p>
      </div>

      <div className="find-stop-page__note find-stop-page__note--probe">
        <h3>공식 문서에 없는 동작 하나 — id에 숫자를 넣으면</h3>
        <p>
          공식 페이지는 <code>id</code>의 허용 타입을 밝히지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 결과,{' '}
          <code>{'{ id: 7 }'}</code>로 만든 Tween은 <code>gsap.getById(7)</code>로는 찾히지만{' '}
          <code>gsap.getById(&apos;7&apos;)</code>로는 <strong>찾히지 않습니다.</strong>
        </p>
        <p className="find-stop-page__provenance">
          측정 방법 · <code>{"gsap.to(o, { v: 1, duration: 1, id: 7, paused: true })"}</code>로 만든 뒤 두 호출의 결과를 만들어 둔
          instance와 <code>===</code>로 비교했습니다. 숫자 조회는 <code>true</code>, 문자열 조회는 <code>false</code>였습니다. 이름표는{' '}
          <strong>넣은 값 그대로</strong> 쓰는 편이 안전합니다.
        </p>
      </div>
    </section>
  )
}
