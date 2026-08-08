/** animation node에 임의 metadata를 저장하는 data와 초기 vars.data의 관계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function DataSection() {
  return (
    <section id="data" className="inspect-page__section" aria-labelledby="data-title">
      <SectionHeading number="05" id="data" title="각 노드에 붙여 두는 내 메모" description="data는 GSAP이 해석하지 않는 임의 값이다. 조회한 child가 앱에서 어떤 역할인지 함께 기록할 때 쓴다." />
      <pre className="inspect-page__signature"><code>data : *</code></pre>
      <div className="inspect-page__split">
        <pre className="inspect-page__code"><code>{`const chapter = gsap.timeline({
  id: 'intro',
  data: { owner: 'hero', kind: 'entrance' },
})

chapter.data // { owner: 'hero', kind: 'entrance' }`}</code></pre>
        <div className="inspect-page__prose"><h3>초기값과 현재값은 갈라질 수 있다</h3><p>공식대로 처음에는 <code>vars.data</code>가 <code>data</code>를 채웁니다. 실행에서는 이후 <code>timeline.data</code>를 직접 바꿔도 <code>timeline.vars.data</code>는 최초 값으로 남았습니다.</p><p>data를 주지 않아도 <code>'data' in timeline</code>은 true이고 값만 <code>undefined</code>입니다.</p></div>
      </div>
    </section>
  )
}
