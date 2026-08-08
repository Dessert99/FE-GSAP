/** yoyo 역회차가 child 순서를 뒤집어 재생하지만 reversed state는 바꾸지 않음을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function YoyoDirectionSection() {
  return <section id="yoyo-direction" className="tl-repeats-page__section" aria-labelledby="yoyo-direction-title"><SectionHeading number="03" id="yoyo-direction" title="되돌아올 때는 children이 거꾸로 재생된다" description="yoyo true인 짝수 회차는 Timeline playhead가 뒤로 가므로 마지막 child B가 먼저 되감기고 그다음 A가 되감긴다."/><div className="tl-repeats-page__table-wrap"><table className="tl-repeats-page__table"><caption>두 child sequence, repeat 2의 방향</caption><tbody><tr><th>yoyo false</th><td>A → B · A → B · A → B</td></tr><tr><th>yoyo true</th><td>A → B · B → A · A → B</td></tr></tbody></table></div><div className="tl-repeats-page__note"><strong>reverse()와는 다른 상태입니다.</strong><p>공식대로 yoyo 역회차에서도 <code>timeline.reversed()</code>는 false로 유지됐습니다. yoyo는 cycle 안의 진행 방향이고 reversed는 Timeline 전체의 재생 방향입니다.</p></div><div className="tl-repeats-page__warning"><p><code>yoyo: true</code>만 두고 repeat가 0이면 되돌아올 회차가 없어 한 번 정방향으로 끝납니다.</p></div><pre className="tl-repeats-page__code"><code>{`const tl = gsap.timeline({ repeat: 1, yoyo: true })
tl.yoyo() // true
tl.yoyo(true).repeat(3).timeScale(2).play(0.5)`}</code></pre></section>
}
