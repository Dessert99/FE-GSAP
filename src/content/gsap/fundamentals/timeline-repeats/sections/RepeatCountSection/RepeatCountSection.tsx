/** repeat가 child별 횟수가 아니라 완성된 sequence 전체의 추가 회차 수임을 설명한다. */
import { SequenceCycleLab } from '../../examples/SequenceCycleLab/SequenceCycleLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function RepeatCountSection() {
  return <section id="repeat-count" className="tl-repeats-page__section" aria-labelledby="repeat-count-title"><SectionHeading number="01" id="repeat-count" title="반복은 children 하나가 아니라 sequence 전체에 걸린다" description="repeat는 총 횟수가 아니라 최초 재생 뒤의 추가 횟수다. Timeline에서는 child A와 B를 모두 마친 뒤 sequence 처음으로 돌아간다."/><div className="tl-repeats-page__split"><div className="tl-repeats-page__prose"><h3>repeat 2의 뜻</h3><p><strong>A → B</strong>를 최초 한 번 재생하고 같은 <strong>A → B</strong>를 두 번 더 재생해 총 세 회차입니다. 공식은 repeat를 항상 정수로 쓰고 무한 반복은 <code>-1</code>로 적으라고 안내합니다.</p></div><div className="tl-repeats-page__note"><strong>실행 getter 기본값</strong><p>새 Timeline은 <code>repeat() 0</code>, <code>repeatDelay() 0</code>, <code>yoyo() false</code>, <code>iteration() 1</code>이었습니다.</p></div></div><pre className="tl-repeats-page__code"><code>{`const tl = gsap.timeline({ repeat: 2 })
tl.to('.a', { x: 160 }).to('.b', { x: 160 })

tl.repeat() // 2
tl.repeat(2).yoyo(true).play()`}</code></pre><div className="tl-repeats-page__warning"><p><code>repeat: -1</code>의 <code>totalDuration()</code>은 Infinity가 아니라 실행상 <code>10000000000</code>입니다. 전체 길이 계산의 상세는 Timeline 시간 계산 페이지가 소유합니다.</p></div><SequenceCycleLab/></section>
}
