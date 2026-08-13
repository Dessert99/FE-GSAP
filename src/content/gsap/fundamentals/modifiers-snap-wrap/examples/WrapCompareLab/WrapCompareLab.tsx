/** wrap과 wrapYoyo의 결과를 같은 표에 나란히 놓아 두 함수가 갈리는 지점을 관찰하게 한다. */
import { sampleRange, sampleValues } from './WrapCompare.example'
import type { WrapMode } from './useWrapCompareRuntime'
import { useWrapCompareRuntime } from './useWrapCompareRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './WrapCompareLab.css'

// radio에 노출할 두 모드와 읽기 쉬운 이름이다
const modeOptions: { value: WrapMode; label: string }[] = [
  { value: 'array', label: `배열 순환 [${sampleValues.join(', ')}]` },
  { value: 'range', label: `숫자 범위 순환 ${sampleRange.min} ~ ${sampleRange.max}` },
]

export function WrapCompareLab() {
  // runtime이 소유한 controls와 계산 결과를 그대로 받아 화면에만 쓴다
  const { mode, setMode, count, setCount, rows } = useWrapCompareRuntime()

  // 계산에 쓰인 인자를 코드 문법으로만 포맷한다
  const code =
    mode === 'array'
      ? `const values = [${sampleValues.map((v) => `'${v}'`).join(', ')}]

gsap.utils.wrap(values, index)      // ${rows.map((r) => r.wrapped).join(', ')}
gsap.utils.wrapYoyo(values, index)  // ${rows.map((r) => r.yoyoed).join(', ')}`
      : `gsap.utils.wrap(${sampleRange.min}, ${sampleRange.max}, index)      // ${rows.map((r) => r.wrapped).join(', ')}
gsap.utils.wrapYoyo(${sampleRange.min}, ${sampleRange.max}, index)  // ${rows.map((r) => r.yoyoed).join(', ')}`

  return (
    <section className="wrap-compare-lab" aria-labelledby="wrap-compare-lab-title">
      <h3 id="wrap-compare-lab-title">wrap과 wrapYoyo를 나란히 보기</h3>
      <p className="wrap-compare-lab__goal">
        같은 index를 두 함수에 넣으면 어디서부터 결과가 갈릴까요. index를 늘려 가며 주기가 어떻게 도는지 확인하세요.
      </p>

      <div className="wrap-compare-lab__body">
        <div className="wrap-compare-lab__table-wrap">
          <table className="wrap-compare-lab__table">
            <caption>같은 index에 대한 두 함수의 결과</caption>
            <thead>
              <tr>
                <th scope="col">index</th>
                <th scope="col">
                  <code>wrap</code>
                </th>
                <th scope="col">
                  <code>wrapYoyo</code>
                </th>
                <th scope="col">같은가</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.index}>
                  <th scope="row">{row.index}</th>
                  <td>{row.wrapped}</td>
                  <td>{row.yoyoed}</td>
                  <td>{row.wrapped === row.yoyoed ? '같음' : '다름'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <fieldset className="wrap-compare-lab__controls">
          <legend>조절할 값</legend>

          <div className="wrap-compare-lab__radio-group" role="radiogroup" aria-labelledby="wrap-mode-label">
            <p id="wrap-mode-label">무엇을 감쌀까</p>
            {modeOptions.map((option) => (
              <label key={option.value} htmlFor={`wrap-mode-${option.value}`}>
                <input
                  id={`wrap-mode-${option.value}`}
                  type="radio"
                  name="wrap-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <label htmlFor="wrap-count">몇 번째 index까지</label>
          <output htmlFor="wrap-count">{count - 1}</output>
          <input
            id="wrap-count"
            type="range"
            min="3"
            max="13"
            step="1"
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </fieldset>
      </div>

      <pre className="wrap-compare-lab__code">
        <code>{code}</code>
      </pre>

      <div className="wrap-compare-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            index 0, 1, 2까지는 두 함수가 같습니다. 끝에 닿는 순간부터 갈립니다. <code>wrap</code>은 <strong>처음으로 점프</strong>하고{' '}
            <code>wrapYoyo</code>는 <strong>왔던 길을 되돌아갑니다.</strong>
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>숫자 범위 모드</strong>로 바꿔 보세요. <code>wrap</code>의 결과에는 최댓값 {sampleRange.max}가{' '}
            <strong>한 번도 나오지 않지만</strong> <code>wrapYoyo</code>에는 나옵니다. 같은 인자를 받는 두 함수인데 최댓값을 다루는
            방식이 다릅니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            <code>wrap</code>은 <strong>주기가 도는</strong> 것이라 마지막 다음이 곧 처음입니다. 그래서 최댓값 자리는 다음 주기의
            시작으로 쓰여 나타나지 않습니다. <code>wrapYoyo</code>는 <strong>방향을 뒤집는</strong> 것이라 최댓값에서 한 번 멈췄다가
            돌아옵니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            <code>wrap</code>은 끝없이 도는 캐러셀이나 색 팔레트 순환에 씁니다. <code>wrapYoyo</code>는 좌우로 흔들리거나 밝아졌다
            어두워지기를 반복하는 값에 씁니다. 둘 다 <code>modifiers</code> 안에서 자주 쓰입니다.
          </p>
        </article>
      </div>

      <p className="wrap-compare-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/modifiers-snap-wrap/examples/WrapCompareLab/WrapCompare.example.ts" />
      </p>
    </section>
  )
}
