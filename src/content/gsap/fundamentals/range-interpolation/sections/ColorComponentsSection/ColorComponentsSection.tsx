/** splitColor의 입력 형식·RGB/HSL 반환·alpha 경계를 component 표로 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 예제가 실제로 보여 주는 네 입력과 반환값이다
const colorExamples = [
  { input: '"red"', hsl: 'false', result: '[255, 0, 0]' },
  { input: '"#6fb936"', hsl: 'false', result: '[111, 185, 54]' },
  { input: '"rgba(204, 153, 51, 0.5)"', hsl: 'false', result: '[204, 153, 51, 0.5]' },
  { input: '"#6fb936"', hsl: 'true', result: '[94, 55, 47]' },
]

export function ColorComponentsSection() {
  return (
    <section id="color-components" className="range-page__section" aria-labelledby="color-components-title">
      <SectionHeading
        number="05"
        id="color-components"
        title="색 문자열을 성분으로 다시 읽기"
        description="interpolate가 색 문자열 하나를 만들었다면 splitColor는 그 결과를 R·G·B 또는 H·S·L 숫자로 다시 꺼냅니다."
      />

      <div className="range-page__split">
        <div className="range-page__prose">
          <h3>입력</h3>
          <p>
            <code>rgb()</code>, <code>rgba()</code>, <code>hsl()</code>, <code>hsla()</code>, hexadecimal, <code>red</code> 같은 기본 named
            color를 문자열로 받습니다. 공식 parameter는 <code>color:String</code>입니다.
          </p>
        </div>
        <div className="range-page__prose">
          <h3>출력</h3>
          <p>
            기본은 <code>[red, green, blue]</code>이고 alpha가 필요하면 네 번째 값이 붙습니다. optional <code>returnHSL:Boolean</code>을
            <code>true</code>로 주면 HSL(A) 성분을 돌려줍니다.
          </p>
        </div>
      </div>

      <div className="range-page__table-wrap">
        <table className="range-page__table">
          <caption>공식 splitColor 예제의 component 결과</caption>
          <thead><tr><th scope="col">color</th><th scope="col">returnHSL</th><th scope="col">Array 반환</th></tr></thead>
          <tbody>
            {colorExamples.map((row) => (
              <tr key={`${row.input}-${row.hsl}`}>
                <th scope="row"><code>{row.input}</code></th>
                <td><code>{row.hsl}</code></td>
                <td><code>{row.result}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="range-page__note">
        <code>splitColor</code>는 색을 보간하지 않습니다. 색 형식을 숫자 성분으로 읽는 함수입니다. 중간 색을 만들려면 먼저{' '}
        <code>interpolate</code>, 채널 숫자가 필요할 때 그 결과에 <code>splitColor</code>를 적용하세요.
      </p>
    </section>
  )
}
