/** get이 target identity로 이미 만든 instance를 찾는 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** create 결과를 보관하지 못한 뒤 target으로 찾는 경우를 설명한다. */
export function LookupIdentitySection() {
  return <section id="lookup-identity" className="draggable-create-page__section" aria-labelledby="lookup-identity-title"><SectionHeading number="03" id="lookup-identity" title="같은 target으로 instance를 다시 찾는다" description="get()은 새 instance를 만드는 함수가 아니라, 이미 target에 연결된 instance를 lookup하는 함수입니다." /><pre className="draggable-create-page__code"><code>{`const [created] = Draggable.create('#card', { type: 'x,y' })
const found = Draggable.get('#card')

created === found // true`}</code></pre><div className="draggable-create-page__prose"><p><code>Draggable.get(target)</code>에는 target DOM element나 selector string을 넣습니다. 여러 <code>.draggable</code>을 한 번에 만든 뒤 한 element의 instance만 다시 찾아야 할 때 유용합니다.</p><p>공식 rendered 문서는 연결된 instance가 없으면 <code>undefined</code>라고 적습니다. 따라서 create 전에 get 결과가 있다는 전제로 명령을 호출하지 말고, 이 페이지의 lab처럼 생성 직후 같은 target을 조회하는 범위부터 확인하세요.</p></div><div className="draggable-create-page__note"><h3>공식 문서와 설치 type 선언의 차이</h3><p>현재 설치본 <code>draggable.d.ts</code>는 <code>get(target): Draggable</code>로 적지만, 공식 문서와 설치 source의 lookup은 연결된 instance가 없을 때 undefined가 될 수 있음을 보여 줍니다. 이 페이지는 공식 문서의 runtime 경계를 우선해 설명합니다.</p></div></section>
}
