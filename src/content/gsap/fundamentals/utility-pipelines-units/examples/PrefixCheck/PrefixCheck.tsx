/** checkPrefix의 현재 브라우저 결과와 미지원 fallback을 이산 선택으로 보여준다. */
import type { PrefixProperty } from './usePrefixCheckRuntime'
import { usePrefixCheckRuntime } from './usePrefixCheckRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'

// native·prefix 후보·미지원 경계를 확인할 선택지다
const propertyOptions: { value: PrefixProperty; label: string }[] = [
  { value: 'transform', label: 'transform — 널리 지원' },
  { value: 'filter', label: 'filter — 브라우저별 확인' },
  { value: 'maskImage', label: 'maskImage — prefix 후보' },
  { value: 'definitelyNotAProperty', label: '존재하지 않는 이름' },
]

export function PrefixCheck() {
  // runtime이 소유한 선택과 현재 브라우저 snapshot을 화면에서 읽는다
  const { property, setProperty, snapshot } = usePrefixCheckRuntime()
  // null과 undefined를 문자열 결과와 혼동하지 않도록 화면 표기로만 바꾼다
  const visibleResult = snapshot.result === null ? 'null' : snapshot.result === undefined ? 'undefined' : snapshot.result

  return (
    <section className="prefix-check" aria-labelledby="prefix-check-title">
      <div>
        <p className="utility-lab__eyebrow">BROWSER RESULT</p>
        <h3 id="prefix-check-title">이 브라우저가 사용할 property 이름</h3>
        <p>선택한 이름을 현재 브라우저에서 실제로 확인합니다. 문자열이 돌아오면 그 이름을 사용하고, <code>null</code>이나 <code>undefined</code>면 지원된다고 가정하지 마세요.</p>
      </div>
      <label htmlFor="prefix-property">확인할 CSS property
        <select id="prefix-property" value={property} onChange={(event) => setProperty(event.target.value as PrefixProperty)}>
          {propertyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <output className="prefix-check__result" htmlFor="prefix-property">
        <span>실제 반환</span><strong>{visibleResult}</strong>
      </output>
      <p className="utility-lab__status" role="status">{snapshot.property} 확인 결과는 {visibleResult}입니다.</p>
      <pre className="utility-lab__code"><code>{snapshot.code}</code></pre>
      <p className="utility-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/utility-pipelines-units/examples/PrefixCheck/usePrefixCheckRuntime.ts" /></p>
    </section>
  )
}
