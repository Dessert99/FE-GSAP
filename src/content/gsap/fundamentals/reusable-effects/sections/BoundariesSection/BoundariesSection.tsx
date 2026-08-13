/** prototype 확장 없이 Timeline에 넣는 방법과 effect 이름 충돌을 줄이는 방법을 정리한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** direct add와 extension 선택 기준 및 관련 학습 페이지를 안내한다. */
export function BoundariesSection() {
  return (
    <section className="reusable-effects-page__section" aria-labelledby="boundaries">
      <SectionHeading number="06" id="boundaries" title="확장하지 않을 때와 이름 충돌 피하기" description="모든 effect를 Timeline prototype에 올릴 필요는 없습니다. sequence에서 얼마나 자주 쓰는지와 이름 충돌 가능성으로 선택합니다." />
      <div className="reusable-effects-page__boundary-grid">
        <article><h3>direct call + add</h3><pre><code>{`tl.add(
  gsap.effects.projectFadeIn('.card'),
  '+=0.25'
)`}</code></pre><p>한두 Timeline에서만 쓴다면 <code>gsap.effects</code>의 effect를 직접 호출해 넣어도 position을 유지할 수 있습니다.</p></article>
        <article><h3>Timeline extension</h3><pre><code>{`tl.projectFadeIn(
  '.card',
  { duration: 0.8 },
  '+=0.25'
)`}</code></pre><p>여러 sequence에서 반복하고 chaining 가독성이 좋아질 때만 prototype method 확장을 선택합니다.</p></article>
      </div>
      <p className="reusable-effects-page__note"><code>gsap.effects</code>는 등록된 effect를 함께 보관하는 object입니다. 짧은 <code>fade</code>보다 프로젝트 prefix를 포함한 name을 쓰면 다른 effect가 같은 key를 사용하는 일을 줄일 수 있습니다.</p>
      <nav className="reusable-effects-page__related" aria-label="관련 학습 페이지"><a href={toHref('/fundamentals/tween-playhead')}>Timeline 시간 위치 읽기</a><a href={toHref('/fundamentals/gsap-to')}>callback이 반환하는 Tween</a><a href={toHref('/fundamentals/easing')}>config로 바꿀 ease</a></nav>
    </section>
  )
}
