/** targets()의 공식 계약을 정리하고, 넘긴 형태에 따라 배열 내용이 어떻게 달라지는지 실행 예제로 확인시킨다. */
import { TargetsReadbackLab } from '../../examples/TargetsReadbackLab/TargetsReadbackLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 targets() 페이지가 게시한 전부 — signature 한 줄과 설명 두 문장이다
const signature = 'targets( ) : Array'

// 공식 문서가 밝힌 것과 밝히지 않은 것을 나란히 두어 추측을 막는 표 데이터
const contract = [
  { label: '인자', value: '없음', note: '괄호가 비어 있습니다.' },
  { label: '반환 타입', value: 'Array', note: '항상 배열입니다.' },
  { label: '배열의 내용', value: 'target object들', note: 'Tween이 property를 animate하는 대상들입니다.' },
  {
    label: 'selector text로 만들었을 때',
    value: '매치된 DOM element들',
    note: '그 query string에 매치된 element가 담깁니다.',
  },
  { label: '기본값', value: '공식 페이지에 명시 없음', note: '반환값만 있고 기본값 개념이 없습니다.' },
  { label: '공식 코드 예제', value: '공식 페이지에 명시 없음', note: '전용 페이지에 예제가 없습니다.' },
]

export function TargetsMethodSection() {
  return (
    <section id="targets-method" className="instance-page__section" aria-labelledby="targets-method-title">
      <SectionHeading
        number="04"
        id="targets-method"
        title="targets()가 돌려주는 배열"
        description="Tween이 animate하는 target 목록을 확인하는 메서드입니다. 반환값은 항상 배열입니다."
      />

      <pre className="instance-page__signature">
        <code>{signature}</code>
      </pre>

      <div className="instance-page__split">
        <div className="instance-page__prose">
          <p>
            공식 전용 페이지가 게시한 문장은 딱 둘입니다. 첫째,{' '}
            <strong>"Tween이 property를 animate하는 target object들의 배열"</strong>입니다. 둘째,{' '}
            <strong>"Tween을 만들 때 selector text를 썼다면 이 배열에는 그 query string에 매치된 DOM element들이 들어 있다"</strong>
            입니다.
          </p>
          <p>
            두 번째 문장이 실용적으로 중요합니다. 우리는 <code>&apos;.box&apos;</code>라는 <strong>문자열</strong>을 넘겼는데, 나중에
            물어보면 <strong>실제 element들</strong>이 돌아옵니다. GSAP이 만드는 순간 그 문자열을 풀어서 명단으로 굳혀 두기 때문입니다.
          </p>
          <p>
            그래서 <code>targets()</code>는 <strong>재생 여부와 상관없이</strong> 답할 수 있습니다. 아직 한 프레임도 그리지 않은{' '}
            <code>paused</code> Tween에게 물어도 명단은 이미 확정돼 있습니다.
          </p>
        </div>
        <div>
          <div className="instance-page__table-wrap">
            <table className="instance-page__basic-table">
              <caption>공식 targets() 페이지가 밝힌 것과 밝히지 않은 것</caption>
              <thead>
                <tr>
                  <th scope="col">항목</th>
                  <th scope="col">값</th>
                </tr>
              </thead>
              <tbody>
                {contract.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <code>{row.value}</code>
                      <small>{row.note}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="instance-page__note">
        <h3>function-based value도 같은 배열을 받습니다</h3>
        <p>
          Tween 본문의 <strong>Function-based values</strong> 절은 값 자리에 함수를 쓰면 그 함수가 세 인자를 받는다고 밝힙니다:{' '}
          <code>index</code>(대상의 순번), <code>target</code>(대상 자신), <code>targets</code>(대상 배열). 그리고 세 번째에 대해{' '}
          <strong>"tween.targets()와 같다"</strong>고 못 박습니다.
        </p>
        <p>
          같은 명단을 두 곳에서 볼 뿐입니다. 함수 안에서는 인자로, 바깥에서는 메서드로 받습니다. function-based value 자체의 사용법은
          07번 단계에서 자세히 설명하는 페이지를 안내합니다.
        </p>
      </div>

      <TargetsReadbackLab />

      <div className="instance-page__note instance-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p className="instance-page__provenance">
          아래는 공식 문서에 적혀 있지 않습니다. GSAP 3.15.0을 Node에서 직접 실행해 확인한 결과입니다.
        </p>
        <p>
          <code>targets()</code>는 부를 때마다 <strong>새 배열을 만들어 주지 않습니다.</strong> 두 번 불러 비교하면 같은 배열입니다.
          그래서 <strong>받은 배열에 값을 밀어 넣으면 다음에 물어봤을 때도 그 값이 들어 있습니다.</strong>
        </p>
        <p>
          실용적인 결론은 하나입니다. <code>targets()</code>가 돌려준 배열은 <strong>읽기만 하세요.</strong> 정렬이나 필터가 필요하면{' '}
          <code>[...tween.targets()]</code>처럼 복사한 뒤 다루면 됩니다.
        </p>
      </div>
    </section>
  )
}
