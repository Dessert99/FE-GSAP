/** Timeline 폐기와 target 복원 여부를 kill·revert의 lifecycle 차이로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function KillRevertSection() {
  return (
    <section id="kill-revert" className="tl-cleanup-page__section" aria-labelledby="kill-revert-title">
      <SectionHeading number="04" id="kill-revert" title="폐기할지 화면까지 되돌릴지 고른다" description="둘 다 Timeline을 kill하지만, kill은 현재 화면을 남기고 revert는 animation 이전 상태와 CSS의 주도권을 되찾습니다." />
      <div className="tl-cleanup-page__split">
        <article className="tl-cleanup-page__prose"><h3><code>kill()</code> — 지금 값은 남긴다</h3><p>Timeline을 즉시 멈추고 부모에서 떼어 garbage collection 대상으로 풉니다. 나중에 다시 쓸 생각이면 kill하지 말고 <code>pause()</code>하라는 것이 공식 경고입니다.</p><pre className="tl-cleanup-page__code"><code>{"tl.kill()\ntl = null"}</code></pre></article>
        <article className="tl-cleanup-page__prose"><h3><code>revert()</code> — 이전 상태를 복원한다</h3><p>GSAP 3.11에 추가됐습니다. Timeline을 되돌린 뒤 kill하고, target을 animation 이전 상태로 돌리며 Timeline이 추가한 inline style도 제거합니다.</p><pre className="tl-cleanup-page__code"><code>{"tl.revert()\n// animation이 추가한 inline style 제거"}</code></pre></article>
      </div>
      <div className="tl-cleanup-page__warning">
        <p><strong>공식 반환 설명과 GSAP 3.15.0 실행이 다릅니다.</strong> 공식 <code>Timeline.kill()</code> 페이지는 signature와 Returns 모두 <code>Timeline / Self</code>라고 적지만 Node 실행에서 실제 반환은 <code>undefined</code>였습니다. <code>revert()</code>·<code>clear()</code>·<code>remove()</code>·<code>killTweensOf()</code>는 실제로 self를 반환했습니다.</p>
        <p>따라서 <code>tl.kill().pause()</code> 같은 chaining을 가르치지 않습니다. 공식 문구는 catalog에 보존하고, 실행 차이는 probe로 분리했습니다.</p>
      </div>
      <article className="tl-cleanup-page__prose tl-cleanup-page__prose--spaced">
        <h3>왜 <code>progress(0).pause()</code>로는 부족할까요?</h3>
        <p>공식 문제 예시는 inline style이 전혀 없는 opacity 1 box에서 시작합니다. <code>progress(0).pause()</code>는 computed style에서 읽었던 시작값 1로 돌리지만 element에는 <code>style="opacity: 1"</code>을 남깁니다. 나중에 media query가 class opacity를 0.5로 바꿔도 inline style이 덮어씁니다.</p>
        <p><code>progress(0)</code>은 animation의 0초 모습을 보장하려고 inline style을 쓰는 것이 맞습니다. 반면 <code>revert()</code>는 animation 전 상태를 되찾는 별도 목적이라 GSAP이 추가한 inline style 자체를 제거합니다.</p>
      </article>
      <p className="tl-cleanup-page__note"><strong>이전 상태는 숫자 0이 아닙니다.</strong> GSAP은 Tween이 처음 기록한 값을 복원합니다. probe에서 object가 x 30에서 시작했다면 revert 뒤에도 x는 30이었습니다.</p>
    </section>
  )
}
