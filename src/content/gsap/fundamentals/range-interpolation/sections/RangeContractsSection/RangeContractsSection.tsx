/** clamp·normalize·mapRange의 즉시 값과 재사용 함수 overload를 한 표로 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 마지막 값 인자 유무만 달라지는 여섯 공식 signature다
const signatures = [
  { utility: 'clamp', form: 'clamp(minimum, maximum, valueToClamp)', returns: 'Number', meaning: '값을 지금 잘라 숫자를 반환' },
  { utility: 'clamp', form: 'clamp(minimum, maximum)', returns: '(value) => Number', meaning: 'minimum·maximum을 기억' },
  { utility: 'normalize', form: 'normalize(minimum, maximum, valueToNormalize)', returns: 'Number', meaning: '값을 지금 0~1로 변환' },
  { utility: 'normalize', form: 'normalize(minimum, maximum)', returns: '(value) => Number', meaning: '입력 범위를 기억' },
  { utility: 'mapRange', form: 'mapRange(inMin, inMax, outMin, outMax, valueToMap)', returns: 'Number', meaning: '값을 지금 새 범위로 이동' },
  { utility: 'mapRange', form: 'mapRange(inMin, inMax, outMin, outMax)', returns: '(value) => Number', meaning: '입력·출력 범위를 기억' },
]

// 세 공식 페이지의 direct·reusable example 결과를 누락 없이 보존한 묶음이다
const officialRangeExamples = [
  { utility: 'clamp direct', input: '105 / -50 / 20', result: '100 / 0 / 20' },
  { utility: 'clamp reusable', input: 'clamper(105 / -50 / 20)', result: '100 / 0 / 20' },
  { utility: 'mapRange direct', input: '(-10,10→100,200)의 0 / (0,100→0,500)의 50', result: '150 / 250' },
  { utility: 'mapRange reusable', input: 'mapper(50 / 10), mapper는 0,100→0,250', result: '125 / 25' },
  { utility: 'normalize direct', input: '(-10,10)의 0 / (0,100)의 25', result: '0.5 / 0.25' },
  { utility: 'normalize reusable', input: '공식 변수 clamper(50 / 10 / 75)', result: '0.5 / 0.1 / 0.75' },
]

export function RangeContractsSection() {
  return (
    <section id="range-contracts" className="range-page__section" aria-labelledby="range-contracts-title">
      <SectionHeading
        number="02"
        id="range-contracts"
        title="clamp·normalize·mapRange의 두 호출 방식"
        description="마지막 값을 함께 주면 계산이 끝난 숫자를 받고, 빼면 앞의 범위를 기억하는 함수를 받습니다."
      />

      <div className="range-page__table-wrap">
        <table className="range-page__table">
          <caption>공식 세 문서가 제시한 여섯 signature</caption>
          <thead>
            <tr>
              <th scope="col">utility</th>
              <th scope="col">signature</th>
              <th scope="col">반환</th>
              <th scope="col">계산 시점</th>
            </tr>
          </thead>
          <tbody>
            {signatures.map((row) => (
              <tr key={row.form}>
                <th scope="row"><code>{row.utility}</code></th>
                <td><code>{row.form}</code></td>
                <td><code>{row.returns}</code></td>
                <td>{row.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="range-page__call-grid">
        <article>
          <h3>즉시 값이 필요한 경우</h3>
          <pre><code>{`gsap.utils.clamp(0, 100, 105)       // 100
gsap.utils.normalize(0, 100, 25)    // 0.25
gsap.utils.mapRange(0, 100, 0, 500, 50) // 250`}</code></pre>
          <p>입력 한 번을 계산하고 끝낼 때 읽기 가장 직접적입니다.</p>
        </article>
        <article>
          <h3>값이 여러 번 도착하는 경우</h3>
          <pre><code>{`const limit = gsap.utils.clamp(0, 100)
limit(105) // 100

const mapper = gsap.utils.mapRange(0, 100, 0, 250)
mapper(50) // 125`}</code></pre>
          <p>범위를 매번 다시 적지 않고, 만든 함수를 event나 다른 utility에 넘길 수 있습니다.</p>
        </article>
      </div>

      <div className="range-page__table-wrap">
        <table className="range-page__table">
          <caption>세 공식 문서의 direct·reusable example 결과 전체</caption>
          <thead><tr><th scope="col">호출</th><th scope="col">입력</th><th scope="col">결과</th></tr></thead>
          <tbody>
            {officialRangeExamples.map((row) => (
              <tr key={row.utility}><th scope="row"><code>{row.utility}</code></th><td>{row.input}</td><td><code>{row.result}</code></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="range-page__note">
        공식 normalize 재사용 예제는 반환 함수 이름을 <code>clamper</code>라고 적지만 실제 역할은 값을 자르는 것이 아니라 0~1로 옮기는
        것입니다. 로컬 예제에서는 역할이 드러나는 <code>toProgress</code>라는 이름을 씁니다.
      </p>
    </section>
  )
}
