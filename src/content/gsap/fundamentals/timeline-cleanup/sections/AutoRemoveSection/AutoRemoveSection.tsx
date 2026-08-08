/** autoRemoveChildren의 기본값 예외와 부모 playhead가 잃는 역방향 접근을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function AutoRemoveSection() {
  return (
    <section id="auto-remove" className="tl-cleanup-page__section" aria-labelledby="auto-remove-title">
      <SectionHeading number="05" id="auto-remove" title="완료된 child를 자동으로 배출한다" description="일회성 작업이 끝나는 즉시 child를 목록에서 빼 메모리를 풀기 쉬운 구조로 만들지만, 부모 재생 헤드로 과거를 다시 그릴 수 없게 됩니다." />
      <div className="tl-cleanup-page__split">
        <article className="tl-cleanup-page__prose"><h3>공식 계약</h3><p><code>autoRemoveChildren</code>은 Boolean입니다. <code>true</code>면 child Tween과 Timeline이 완료되는 즉시 제거됩니다. 일반 Timeline 기본값은 <code>false</code>이고 <code>gsap.globalTimeline</code>만 <code>true</code>입니다.</p></article>
        <article className="tl-cleanup-page__prose"><h3>실행에서 확인한 대가</h3><p>child가 완료되어 제거된 뒤 부모 Timeline을 <code>totalTime(0)</code>으로 되감아도 target은 완료값에 머물렀습니다. 부모의 child graph에 더는 없어서 과거 시각을 다시 render할 대상이 없기 때문입니다.</p></article>
      </div>
      <pre className="tl-cleanup-page__code tl-cleanup-page__code--spaced"><code>{"const tl = gsap.timeline({ autoRemoveChildren: true })\n// 완료된 child는 tl.getChildren()에서 빠집니다.\n// 이후 부모 tl을 seek/reverse해도 그 child는 다시 render되지 않습니다."}</code></pre>
      <p className="tl-cleanup-page__warning">반복 재생·scrub·reverse가 필요한 sequence에는 기본값 <code>false</code>가 안전합니다. globalTimeline은 완료된 독립 animation을 계속 쌓아 둘 이유가 없어서 공식 문서가 밝힌 예외로 <code>true</code>를 씁니다.</p>
    </section>
  )
}
