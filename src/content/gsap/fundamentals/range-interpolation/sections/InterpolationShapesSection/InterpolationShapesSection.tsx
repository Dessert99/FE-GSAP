/** interpolate의 네 공식 signature와 shape·mutation 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 페이지가 번호를 붙인 네 signature와 반환 형태다
const interpolationForms = [
  { form: 'interpolate(startValue, endValue, progress)', returns: '보간된 값', use: '두 끝값 사이를 지금 계산' },
  { form: 'interpolate(array, progress)', returns: '보간된 값', use: '여러 중간 지점을 지금 계산' },
  { form: 'interpolate(startValue, endValue)', returns: '(progress) => 값', use: '두 끝값을 기억' },
  { form: 'interpolate(array)', returns: '(progress) => 값', use: '여러 중간 지점을 기억' },
]

// 공식 네 signature가 보여 주는 모든 data shape와 progress 결과를 한 표로 보존한다
const officialInterpolationExamples = [
  { form: 'pair direct', progress: '0.5', result: '250 / 30px / rgba(128,0,128,1) / {a:50,b:15,c:rgba(128,0,128,1)}' },
  { form: 'waypoint direct', progress: 'number 0.5·0.75 / color 0.5·0.25', result: '50·275 / green·rgba(128,64,0,1)' },
  { form: 'pair reusable', progress: 'number 0.5·0.25·1 / object 0.5', result: '50·25·100 / {a:50,b:15,c:rgba(128,0,128,1)}' },
  { form: 'waypoint reusable', progress: 'number 0.5·0.75 / color 0.25', result: '50·275 / rgba(128,64,0,1)' },
]

export function InterpolationShapesSection() {
  return (
    <section id="interpolation-shapes" className="range-page__section" aria-labelledby="interpolation-shapes-title">
      <SectionHeading
        number="04"
        id="interpolation-shapes"
        title="숫자에서 배열·객체까지 보간하기"
        description="interpolate는 0~1 progress를 거리뿐 아니라 색·문자열·배열·객체의 중간 상태로 바꿉니다."
      />

      <div className="range-page__table-wrap">
        <table className="range-page__table">
          <caption>공식 interpolate 문서의 네 호출 형태</caption>
          <thead>
            <tr><th scope="col">signature</th><th scope="col">반환</th><th scope="col">선택 기준</th></tr>
          </thead>
          <tbody>
            {interpolationForms.map((row) => (
              <tr key={row.form}>
                <th scope="row"><code>{row.form}</code></th>
                <td><code>{row.returns}</code></td>
                <td>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="range-page__shape-grid">
        <article><h3>Number</h3><code>0 → 500 · 0.5 = 250</code><p>한 숫자의 선형 중간값입니다.</p></article>
        <article><h3>String와 color</h3><code>20px → 40px · 0.5 = 30px</code><p>숫자가 들어 있는 문자열과 색을 분해해 같은 위치끼리 섞습니다.</p></article>
        <article><h3>여러 지점 array</h3><code>[100, 50, 500] · 0.75 = 275</code><p>array 하나는 시작·중간·끝을 잇는 경로입니다. 두 배열 사이 보간과 구분하세요.</p></article>
        <article><h3>Object</h3><code>{'{ a: 0, c: red } → { a: 100, c: blue }'}</code><p>같은 key의 number와 color property를 한 progress로 계산합니다.</p></article>
      </div>

      <div className="range-page__table-wrap">
        <table className="range-page__table">
          <caption>공식 네 signature의 example 결과 전체</caption>
          <thead><tr><th scope="col">형태</th><th scope="col">progress</th><th scope="col">반환</th></tr></thead>
          <tbody>
            {officialInterpolationExamples.map((row) => (
              <tr key={row.form}><th scope="row"><code>{row.form}</code></th><td>{row.progress}</td><td><code>{row.result}</code></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="range-page__warning">
        <h3>object 원본을 바꾸는 true는 별도 선택입니다</h3>
        <p>
          기본 재사용 함수는 새 결과 object를 만들고 <code>startValue</code>를 보존합니다. 공식 문서는 세 번째 인자로 <code>true</code>를
          주면 원본을 변경할 수 있다고 덧붙입니다. GSAP 3.15.0 probe에서도 기본 결과는 다른 참조였고, <code>true</code> 결과는 원본과
          같은 참조였습니다. 원본 변경이 필요하다는 의도가 분명할 때만 선택하세요.
        </p>
      </div>
    </section>
  )
}
