/** autoAlpha·CSS variable·clearProps·autoRound의 lifecycle 시점을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { CssLifecycleExample } from '../../examples/CssLifecycleExample/CssLifecycleExample'

export function VisibilityCleanupSection() {
  return (
    <section id="lifecycle" className="css-animation-page__section" aria-labelledby="lifecycle-title">
      <SectionHeading number="06" id="lifecycle" title="보이기와 inline style 정리하기" description="Tween 중 CSSPlugin이 만든 inline 값을 언제 남기고 언제 제거할지 정하면 class·상속·상호작용이 완료 뒤에도 예상대로 이어집니다." />
      <div className="css-animation-page__grid">
        <article className="css-animation-page__card">
          <h3>autoAlpha는 상호작용까지 숨기기</h3>
          <p>0이면 <code>opacity:0</code>과 <code>visibility:hidden</code>을 함께 적용합니다. 0이 아니면 parent의 숨김을 존중하도록 <code>inherit</code>를 씁니다.</p>
          <p>처음부터 <code>visibility:hidden; opacity:1</code>인 대상도 fade-in을 위해 opacity 0 시작으로 취급합니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>clearProps로 stylesheet에 반환</h3>
          <p>완료 시 comma-separated property, <code>'all'</code>, 또는 <code>true</code>로 inline style을 제거합니다. transform alias는 하나의 transform으로 합쳐지므로 일부만 지정해도 전체 transform이 제거됩니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>CSS custom property</h3>
          <p><code>'--progress'</code>처럼 vars에 직접 적어 브라우저가 지원하는 custom property를 animation할 수 있습니다. 이름은 camelCase로 바꾸지 않습니다.</p>
        </article>
        <article className="css-animation-page__card">
          <h3>autoRound와 Snap 경계</h3>
          <p>CSSPlugin은 px와 zIndex의 중간값을 기본 정수화합니다. 소수값이 필요하면 <code>autoRound:false</code>, 특정 규칙으로 고정하려면 SnapPlugin을 선택합니다.</p>
        </article>
      </div>
      <div className="css-animation-page__example-stack"><CssLifecycleExample /></div>
      <div className="css-animation-page__note css-animation-page__note--warning"><strong>공식 문장 우선</strong> autoAlpha가 0이 아닐 때의 visibility는 <code>visible</code> 고정이 아니라 <code>inherit</code>입니다. 그래야 숨겨진 parent 아래 child가 뜻밖에 나타나지 않습니다.</div>
    </section>
  )
}
