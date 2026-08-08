/** tween 밖에서도 쓰는 utils.snap()의 여섯 호출 형태와 radius 동작을 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 페이지가 번호를 붙여 나열한 여섯 호출 형태
const callForms = [
  { form: 'snap(snapIncrement, valueToSnap)', args: 'Number, Number', returns: 'snap된 값', example: 'snap(10, 23.5) → 20' },
  { form: 'snap(snapIncrement)', args: 'Number', returns: '재사용할 함수', example: '함수를 받아 여러 번 호출' },
  { form: 'snap(array, valueToSnap)', args: 'Array, Number', returns: '배열에서 가장 가까운 값', example: 'snap([100, 50, 500], 65) → 50' },
  { form: 'snap(array)', args: 'Array', returns: '재사용할 함수', example: '함수를 받아 여러 번 호출' },
  {
    form: 'snap(objectWithRadius, valueToSnap)',
    args: 'Object, Number 또는 Object',
    returns: 'radius 안이면 snap된 값',
    example: '{ values: [...], radius: 20 }',
  },
  { form: 'snap(objectWithRadius)', args: 'Object', returns: '재사용할 함수', example: '함수를 받아 여러 번 호출' },
]

export function SnapUtilitySection() {
  return (
    <section id="snap-utility" className="msw-page__section" aria-labelledby="snap-utility-title">
      <SectionHeading
        number="04"
        id="snap-utility"
        title="utils.snap()의 여섯 가지 호출 형태"
        description="같은 눈금 맞추기를 tween 밖에서도 씁니다. 인자를 어떻게 주느냐에 따라 값이 나오기도 하고 함수가 나오기도 합니다."
      />

      <div className="msw-page__prose">
        <p>
          공식 설명은 이렇습니다. <code>utils.snap()</code>은 <strong>일정 increment로 snap하거나 Array에서 가장 가까운 값으로
          snap</strong>합니다. <strong>radius로 제한</strong>할 수 있고 <strong>2D point도 지원</strong>합니다.
        </p>
        <p>
          공식 페이지는 호출 형태에 번호를 붙여 여섯 가지로 나눠 놓았습니다. 규칙은 하나입니다 —{' '}
          <strong>snap할 값을 함께 주면 결과가 나오고, 주지 않으면 나중에 쓸 함수가 나옵니다.</strong>
        </p>
      </div>

      <div className="msw-page__table-wrap">
        <table className="msw-page__rules-table">
          <caption>공식이 나열한 여섯 호출 형태</caption>
          <thead>
            <tr>
              <th scope="col">형태</th>
              <th scope="col">인자 타입</th>
              <th scope="col">돌려주는 것</th>
              <th scope="col">예</th>
            </tr>
          </thead>
          <tbody>
            {callForms.map((row) => (
              <tr key={row.form}>
                <th scope="row">
                  <code>{row.form}</code>
                </th>
                <td>{row.args}</td>
                <td>{row.returns}</td>
                <td>
                  <code>{row.example}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="msw-page__note msw-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용 · radius 밖에서는 아무 일도 일어나지 않는다</h3>
        <p>
          공식은 radius를 <strong>"그 거리 안에 있을 때만 snap한다"</strong>고 설명하지만,{' '}
          <strong>밖에 있을 때 무엇이 나오는지는 적어 두지 않았습니다.</strong> 실행해 보면 <strong>원래 값이 그대로</strong>{' '}
          돌아옵니다. 가장 가까운 값으로 억지로 끌려가지 않습니다.
        </p>
        <p>
          <code>values: [0, 100, 300]</code>에 <code>radius: 20</code>일 때 <code>105</code>는 <code>100</code>이 되지만{' '}
          <code>150</code>은 <code>150</code> 그대로입니다. increment와 함께 써도 같습니다 —{' '}
          <code>{'{ increment: 10, radius: 2 }'}</code>에 <code>23</code>을 주면 <code>20</code>이 아니라 <code>23</code>입니다.
        </p>
        <p>
          2D point도 확인했습니다. <code>values</code>에 <code>{'{x, y}'}</code> 객체 배열과 <code>radius: 30</code>을 주고{' '}
          <code>{'{x: 10, y: 10}'}</code>을 넣으면 <code>{'{x: 0, y: 0}'}</code>이 나옵니다. 반환도 객체입니다.
        </p>
        <p className="msw-page__provenance">
          이 세 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 Node에서 직접 실행해 확인했습니다.
        </p>
      </div>

      <div className="msw-page__note">
        <p>
          공식 페이지는 마지막에 <strong>재사용 가능한 utility 함수들을 조합해 데이터를 변환하라</strong>는 팁을 답니다. 함수를
          돌려받는 형태(2·4·6번)가 그래서 있습니다. 함수를 이어 붙이는 방법은 별도 학습 페이지가 다룹니다.
        </p>
      </div>
    </section>
  )
}
