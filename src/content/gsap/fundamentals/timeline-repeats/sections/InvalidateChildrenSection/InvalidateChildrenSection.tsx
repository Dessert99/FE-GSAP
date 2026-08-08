/** 부모 invalidate가 모든 child의 기록값을 지우고 다음 render에서 다시 해석하게 함을 설명한다. */
import { InvalidateChildrenLab } from '../../examples/InvalidateChildrenLab/InvalidateChildrenLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function InvalidateChildrenSection() {
  return <section id="invalidate-children" className="tl-repeats-page__section" aria-labelledby="invalidate-children-title"><SectionHeading number="05" id="invalidate-children" title="기억해 둔 시작값을 children까지 지운다" description="Timeline.invalidate()는 부모의 시간표를 다시 만드는 메서드가 아니라 모든 child Tween이 기록한 시작·끝 값을 비우는 메서드다."/><ol className="tl-repeats-page__steps"><li><strong>첫 render</strong><span>child가 function·상대값을 구체적인 시작과 끝 숫자로 기록한다.</span></li><li><strong>restart만</strong><span>이미 기록한 숫자를 다시 써 함수가 재실행되지 않는다.</span></li><li><strong>invalidate 후 render</strong><span>모든 child vars를 다시 해석해 새 숫자를 기록한다.</span></li></ol><pre className="tl-repeats-page__code"><code>{`element.x = 0
tl.to(element, { duration: 2, x: '+=100' })
tl.restart()              // 기록한 0 → 100
tl.invalidate().restart() // 다음 render에서 100 → 200`}</code></pre><div className="tl-repeats-page__split"><div className="tl-repeats-page__note"><strong>건드리지 않는 값</strong><p>공식은 duration, startTime, delay 같은 timing은 바뀌지 않는다고 명시합니다. 실행에서도 세 getter가 전후 동일했습니다.</p></div><div className="tl-repeats-page__note"><strong>repeatRefresh 경계</strong><p>공식 Note는 Tween 하나를 매 repeat마다 invalidate하려면 <code>repeatRefresh: true</code>를 쓰라고 안내합니다. 그 vars의 상세는 gsap.to 페이지가 소유합니다.</p></div></div><InvalidateChildrenLab/></section>
}
