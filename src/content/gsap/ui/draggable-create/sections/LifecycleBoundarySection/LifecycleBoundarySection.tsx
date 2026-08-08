/** user-driven drag와 instance cleanup을 다음 Draggable 페이지의 상세와 분리한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** React unmount에 남지 않아야 하는 instance와 이후 소유권을 설명한다. */
export function LifecycleBoundarySection() {
  return <section id="lifecycle-boundary" className="draggable-create-page__section" aria-labelledby="lifecycle-boundary-title"><SectionHeading number="05" id="lifecycle-boundary" title="사용자 drag와 React cleanup의 경계를 나눈다" description="이 lab은 자동 재생하지 않고 사용자가 직접 drag합니다. component가 사라지거나 type이 바뀌면 만든 instance는 kill로 정리합니다." /><div className="draggable-create-page__prose"><p>Draggable은 pointer·touch·mouse 입력에서 동작합니다. 이 페이지의 reset은 tween이 아니라 즉시 <code>gsap.set()</code>으로 처리하므로 reduced motion에서도 같은 상태로 돌아갑니다. 매 frame 좌표나 drag status를 live region으로 읽지 않아 연속 gesture를 과도하게 발표하지 않습니다.</p><p>React에서는 create한 instance의 event listener와 연결을 component 밖에 남기지 않아야 합니다. lab runtime은 <code>useGSAP</code> cleanup에서 <code>instance.kill()</code>을 호출한 뒤 target의 inline transform과 positional style을 즉시 지웁니다.</p></div><pre className="draggable-create-page__code"><code>{`const [draggable] = Draggable.create(target, vars)

return () => {
  draggable.kill()
}`}</code></pre><div className="draggable-create-page__warning"><h3>다음에 다룰 것</h3><p>좌표 읽기(P04), bounds·axis(P05), enable/disable·kill method의 상세(P06), gesture event(P07), collision·momentum(P08)는 아직 등록되지 않아 링크하지 않습니다. plugin import와 registration 자체는 <a href={toHref('/fundamentals/plugins')}>Plugins: loading, registration, and ownership</a>에서 이어집니다.</p></div></section>
}
