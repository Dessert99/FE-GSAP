/** enable·disable·enabled getter/setter의 같은 instance state를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** temporary interaction pause가 disposal과 다름을 공식 return 계약과 함께 보여 준다. */
export function EnableDisableSection() {
  return <section id="enable-disable" className="draggable-lifecycle-page__section" aria-labelledby="enable-disable-title"><SectionHeading number="02" id="enable-disable" title="enable()과 disable()은 같은 instance를 켜고 끈다" description="둘 다 같은 Draggable을 반환해 chaining할 수 있고, enabled()는 현재 Boolean state를 읽거나 설정합니다." /><div className="draggable-lifecycle-page__prose"><p><code>disable()</code> 뒤에는 <code>enable()</code> 전까지 target을 drag할 수 없습니다. disable은 제거가 아니므로 instance는 남아 있고, 나중에 같은 instance를 enable할 수 있습니다.</p><p><code>enabled()</code>는 인수 없이 Boolean을 읽고, Boolean을 주면 state를 설정합니다. lab은 control 뒤 getter를 다시 호출해 UI state를 추측하지 않습니다.</p></div><pre className="draggable-lifecycle-page__code"><code>{`draggable.disable().enable()

const isEnabled = draggable.enabled()
draggable.enabled(false)`}</code></pre><div className="draggable-lifecycle-page__warning"><h3>rendered 문서와 type의 표기 차이</h3><p>공식 rendered signature는 <code>enabled(value:Boolean) : Boolean</code>로 보이지만, 문서 본문은 setter가 instance를 반환해 chaining된다고 설명합니다. 설치본 <code>draggable.d.ts</code>도 getter Boolean과 setter <code>this</code> overload를 분리합니다.</p></div></section>
}
