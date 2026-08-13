/** 네 getter/setter의 단위와 반복 포함 여부를 2×2 선택표로 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { playheadMethodRows } from '../../tween-playhead.catalog'

export function LocalTotalSection() {
  return (
    <section className="tween-playhead-page__section" aria-labelledby="playhead-local-total">
      <SectionHeading number="03" id="playhead-local-total" title="비율·초와 local·total을 따로 고릅니다" description="단위와 반복 포함 여부 두 질문에 답하면 method가 정해집니다." />
      <div className="tween-playhead-page__table-wrap"><table><caption>playhead 위치를 읽거나 옮기는 method 선택표</caption><thead><tr><th scope="col">method</th><th scope="col">단위</th><th scope="col">범위</th><th scope="col">suppressEvents 기본</th></tr></thead><tbody>{playheadMethodRows.map((row) => <tr key={row.method}><th scope="row"><code>{row.method}</code></th><td>{row.unit}</td><td>{row.scope}</td><td>{row.suppressEvents}</td></tr>)}</tbody></table></div>
      <p>각 method는 인자를 생략하면 number getter, 값을 주면 self를 반환하는 setter라 <code>.progress(0.5).play()</code>처럼 chaining할 수 있습니다. Tween의 <code>seek()</code>에는 초를 주고, 공통 Timeline API에서는 label도 위치로 받을 수 있습니다.</p>
    </section>
  )
}
