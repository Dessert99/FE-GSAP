/** 값을 계산하는 Tween과 시간을 조율하는 Timeline의 역할 차이를 단계적으로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const sequencingCode = `const tween = gsap.to('.box', { x: 100 }) // standalone Tween

const timeline = gsap.timeline()
timeline
  .to('.box', { x: 100 })             // Timeline의 child Tween
  .to('.box', { rotation: 27 }, '-=0.2')
  .addLabel('settled')

tween.pause()
timeline.seek('settled')`

const controls = ['pause()', 'play()', 'progress()', 'restart()', 'resume()', 'reverse()', 'seek()', 'time()', 'duration()', 'timeScale()', 'kill()']

export function AnimationModelSection() {
  return (
    <section id="animation-model" className="core-map-page__section" aria-labelledby="animation-model-title">
      <SectionHeading number="02" id="animation-model" title="Tween과 Timeline 역할 나누기" description="Tween은 target 값을 쓰고, Timeline은 여러 Tween의 시간 위치와 공통 재생 상태를 조정합니다." />
      <div className="core-map-page__model-grid">
        <article>
          <p className="core-map-page__badge">값을 쓰는 작업자</p>
          <h3>Tween</h3>
          <p><strong>playhead</strong>는 animation이 지금 어느 시간에 있는지 가리키는 재생 위치입니다. Tween은 target, duration, 바꿀 properties를 받아 playhead가 움직일 때마다 그 시점의 값을 계산해 target에 적용합니다.</p>
          <p><code>gsap.to()</code>, <code>gsap.from()</code>, <code>gsap.fromTo()</code>가 단순 animation을 만드는 대표 입구입니다.</p>
        </article>
        <article>
          <p className="core-map-page__badge">시간을 조정하는 컨테이너</p>
          <h3>Timeline</h3>
          <p>Timeline은 Tween을 child로 담아 원하는 시간에 배치하고 전체 sequence를 한 번에 제어합니다. Timeline 자체는 target의 property를 쓰지 않습니다.</p>
          <p>Timeline은 중첩할 수 있고 모든 animation은 기본적으로 <code>globalTimeline</code> 아래에 놓입니다. 부모 playhead가 움직이면 child playhead도 함께 정렬되며 API로 playhead와 child <code>startTime</code>도 실행 중 바꿀 수 있습니다.</p>
        </article>
      </div>
      <pre className="core-map-page__code core-map-page__code--wide"><code>{sequencingCode}</code></pre>
      <dl className="core-map-page__concept-list">
        <div><dt>순서</dt><dd><code>gsap.to/from/fromTo()</code>는 standalone Tween을 만들고, <code>timeline.to/from/fromTo()</code>는 Tween을 만들어 즉시 그 Timeline에 넣습니다. position을 따로 적지 않으면 앞 animation이 끝난 뒤에 차례로 배치됩니다. <code>timeline.add(tween)</code>도 가능하지만 convenience method가 더 짧습니다.</dd></div>
        <div><dt>delay와 Timeline</dt><dd>한 번 기다리기만 하면 delay로 충분하지만 여러 동작의 choreography, 겹침, 전체 제어가 필요하면 Timeline이 더 읽기 쉽습니다.</dd></div>
        <div><dt>position</dt><dd>숫자는 Timeline 안의 absolute seconds입니다. <code>+=2</code>는 현재 끝에서 2초 뒤 gap, <code>-=2</code>는 끝보다 2초 앞선 overlap입니다.</dd></div>
        <div><dt>label</dt><dd>시간 위치에 이름을 붙여 child를 배치하거나 <code>seek('settled')</code>처럼 재생 위치를 이동합니다.</dd></div>
        <div><dt>instance reference</dt><dd>나중에 제어할 animation은 반환값을 변수에 보존합니다. Tween과 Timeline은 Animation을 확장해 주요 control method를 공유하며, <code>timeScale(2)</code>는 2배속, <code>seek(3)</code>은 3초 지점, <code>progress(0.5)</code>는 절반으로 이동합니다.</dd></div>
      </dl>
      <div className="core-map-page__token-list" aria-label="Tween과 Timeline의 공통 control methods">
        {controls.map((control) => <code key={control}>{control}</code>)}
      </div>
    </section>
  )
}
