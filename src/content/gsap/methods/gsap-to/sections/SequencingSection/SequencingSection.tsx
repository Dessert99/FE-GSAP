/** 단순 delay와 Timeline을 선택하는 기준을 코드로 비교한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { officialLinks } from '../../gsap-to.meta'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import './SequencingSection.css'

export function SequencingSection() {
  return (
    <section id="sequencing" className="gsap-method-page__section" aria-labelledby="sequencing-title">
      <SectionHeading number="09" id="sequencing-title" title="Sequencing" description="하나의 단순한 대기는 delay로, 관계가 있는 여러 Tween의 순서는 Timeline으로 관리합니다." />
      <div className="sequencing-section">
        <article><span>단순한 두 동작</span><h3>delay도 충분함</h3><pre><code>{`gsap.to('.a', { x: 100 })
gsap.to('.b', { x: 100, delay: 0.5 })`}</code></pre><p>두 번째 동작의 시작만 한 번 늦추면 될 때는 직접적입니다.</p></article>
        <article className="sequencing-section__recommended"><span>순서를 계속 조정함</span><h3>Timeline이 기준</h3><pre><code>{`gsap.timeline()
  .to('.a', { x: 100 })
  .to('.b', { y: 100, ease: 'elastic' })
  .to('.c', { rotation: 180 })`}</code></pre><p>앞 Tween의 시간이 바뀌어도 뒤 순서가 자동으로 따라가고, 전체를 한 번에 제어할 수 있습니다.</p></article>
      </div>
      <div className="gsap-method-page__note">
        <p>
          <strong>판단 기준</strong> 여러 delay 값을 서로 계산하기 시작했다면 Timeline으로 옮길 시점입니다. Timeline은
          <code> to()</code>·<code>from()</code>·<code>fromTo()</code>를 이어 쓰고, Tween을 겹치거나 Timeline 안에 다른
          Timeline을 중첩해도 전체를 하나처럼 제어할 수 있습니다. 정확한 배치 문법은 Timeline 학습 페이지에서 다룹니다.
        </p>
        <OfficialDocsLink label="공식 Timeline 문서" href={officialLinks.timeline} />
      </div>
    </section>
  )
}
