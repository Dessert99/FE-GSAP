/** 중첩 Timeline이 평탄한 배열이 아니라 descendant를 가진 object graph라는 출발점을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function NestedTreeSection() {
  return (
    <section id="nested-tree" className="inspect-page__section" aria-labelledby="nested-tree-title">
      <SectionHeading number="01" id="nested-tree" title="Timeline 안의 Timeline은 나무가 된다" description="master에 Timeline 하나를 add하면 그 안의 Tween은 손자 노드가 된다. 조회 메서드는 이 구조를 바꾸지 않고 필요한 노드만 돌려준다." />
      <div className="inspect-page__tree-card" aria-label="중첩 Timeline 구조 예시">
        <strong>master Timeline</strong>
        <ul>
          <li>Tween · moveA</li>
          <li>Tween · moveB</li>
          <li>detail Timeline<ul><li>Tween · liftD</li><li>Tween · liftE</li></ul></li>
        </ul>
      </div>
      <div className="inspect-page__split">
        <div className="inspect-page__prose"><h3>공식 정의</h3><p><code>getChildren()</code>은 이 Timeline에 중첩된 Tween과 Timeline의 배열을 돌려줍니다. <code>delayedCall()</code> 같은 callback도 duration이 0인 Tween으로 셉니다.</p></div>
        <div className="inspect-page__prose"><h3>배열은 구조 자체가 아니다</h3><p>실행에서 <code>getChildren()</code>과 <code>getTweensOf()</code>는 호출할 때마다 새 배열을 만들었습니다. 결과에 <code>push()</code>해도 실제 child 목록은 변하지 않습니다.</p></div>
      </div>
      <pre className="inspect-page__code"><code>{`const master = gsap.timeline({ defaults: { duration: 1 } })
const detail = gsap.timeline()

detail.to('.d', { y: 36 }).to('.e', { y: 36 })
master.to('.a', { x: 150 }).to('.b', { x: 150 }).to('.c', { x: 150 })
master.add(detail)`}</code></pre>
    </section>
  )
}
