/** modifier를 쓸 수 없거나 이름을 바꿔 써야 하는 자리를 공식 caveat 그대로 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Caveats 절이 밝힌 제약 — 이름을 잘못 쓰면 조용히 동작하지 않는 자리들이다
const caveats = [
  {
    wrong: 'scale',
    right: 'scaleX, scaleY',
    detail: 'CSS transform의 scale에는 modifier를 쓰지 말고 scaleX와 scaleY를 각각 써야 합니다.',
  },
  {
    wrong: 'rotationZ',
    right: 'rotation',
    detail: 'rotationZ가 아니라 rotation을 써야 합니다.',
  },
  {
    wrong: 'roundProps + modifiers (같은 property)',
    right: '둘 중 하나만',
    detail: '같은 property에 roundProps와 modifier를 함께 쓸 수 없습니다.',
  },
]

export function ModifierCaveatsSection() {
  return (
    <section id="modifier-caveats" className="msw-page__section" aria-labelledby="modifier-caveats-title">
      <SectionHeading
        number="02"
        id="modifier-caveats"
        title="modifier가 통하지 않는 자리"
        description="공식 문서가 Caveats로 따로 묶어 둔 제약입니다. 이름을 잘못 쓰면 오류 없이 그냥 동작하지 않아 찾기 어렵습니다."
      />

      <div className="msw-page__table-wrap">
        <table className="msw-page__rules-table">
          <caption>공식 Caveats 절이 밝힌 제약</caption>
          <thead>
            <tr>
              <th scope="col">쓰면 안 되는 것</th>
              <th scope="col">대신 쓸 것</th>
              <th scope="col">내용</th>
            </tr>
          </thead>
          <tbody>
            {caveats.map((caveat) => (
              <tr key={caveat.wrong}>
                <th scope="row">
                  <code>{caveat.wrong}</code>
                </th>
                <td>
                  <code>{caveat.right}</code>
                </td>
                <td>{caveat.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="msw-page__warning">
        <h3>반환값 규정은 공식에 없습니다</h3>
        <p>
          공식 페이지는 modifier 함수가 <strong>무엇을 돌려줘야 하는지</strong>는 "돌려준 값이 적용된다"고만 말하고,{' '}
          <strong>타입을 규정하거나 잘못된 반환을 어떻게 처리하는지는 적어 두지 않았습니다.</strong> 그래서 이 페이지도 그 부분을 채우지
          않습니다.
        </p>
        <p>
          실무에서는 <strong>들어온 값과 같은 종류를 돌려주는 것</strong>이 안전합니다. 숫자가 들어오면 숫자를, 단위가 붙은 문자열이
          들어오면 같은 단위의 문자열을 돌려주면 됩니다.
        </p>
      </div>
    </section>
  )
}
