/** repeatDelay가 최초 시작 전이 아니라 완성된 sequence 회차 사이에만 들어감을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function RepeatGapSection() {
  return <section id="repeat-gap" className="tl-repeats-page__section" aria-labelledby="repeat-gap-title"><SectionHeading number="02" id="repeat-gap" title="sequence와 sequence 사이에 쉬는 시간을 넣는다" description="repeatDelay는 A와 B 사이가 아니라 B를 마친 뒤 다음 A가 시작하기 전의 틈이다. 마지막 회차 뒤에는 붙지 않는다."/><div className="tl-repeats-page__cycle-strip"><span>A</span><span>B</span><i>1초 대기</i><span>A</span><span>B</span><i>1초 대기</i><span>A</span><span>B</span></div><p className="tl-repeats-page__boundary-note">공식 예시인 <code>repeat: 2</code>, <code>repeatDelay: 1</code>의 순서입니다. 최초 시작 전의 기다림은 <code>delay</code>이고, 회차 사이 두 곳만 repeatDelay입니다.</p><pre className="tl-repeats-page__code"><code>{`const tl = gsap.timeline({ repeat: 2, repeatDelay: 1 })
tl.repeatDelay()  // 1
tl.repeatDelay(0.5)
tl.repeat(2).yoyo(true).play()`}</code></pre></section>
}
