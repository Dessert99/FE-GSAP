/** 값을 계산하는 Tween과 시간을 조율하는 Timeline의 역할 차이를 단계적으로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const sequencingCode = `const tween = gsap.to('.box', { x: 100 }) // 독립 Tween

const timeline = gsap.timeline()
timeline
  .to('.box', { x: 100 })             // Timeline에 포함된 Tween
  .to('.box', { rotation: 27 }, '-=0.2')
  .addLabel('settled')

tween.pause()
timeline.seek('settled')`

const controls = ['pause()', 'play()', 'progress()', 'restart()', 'resume()', 'reverse()', 'seek()', 'time()', 'duration()', 'timeScale()', 'kill()']

export function AnimationModelSection() {
  return (
    <section id="animation-model" className="core-map-page__section" aria-labelledby="animation-model-title">
      <SectionHeading number="02" id="animation-model" title="Tween과 Timeline 역할 나누기" description="Tween은 target의 property 값을 계산·적용하고, Timeline은 여러 animation의 시간 위치와 공통 재생 상태를 조정합니다." />
      <div className="core-map-page__model-grid">
        <article>
          <p className="core-map-page__badge">값 계산·적용</p>
          <h3>Tween</h3>
          <p><strong>playhead</strong>는 animation이 지금 어느 시간에 있는지 가리키는 재생 위치입니다. Tween은 target, duration, 바꿀 properties를 받아 playhead가 움직일 때마다 그 시점의 값을 계산해 target에 적용합니다.</p>
          <p><code>gsap.to()</code>, <code>gsap.from()</code>, <code>gsap.fromTo()</code>가 단순 animation을 만드는 대표 입구입니다.</p>
        </article>
        <article>
          <p className="core-map-page__badge">시간 배치·제어</p>
          <h3>Timeline</h3>
          <p>Timeline 안에 든 Tween이나 Timeline을 <strong>child</strong>라고 합니다. Timeline은 child를 원하는 시간에 배치하고 전체 순서를 한 번에 제어하며, target의 property 값은 직접 바꾸지 않습니다.</p>
          <p>Timeline은 중첩할 수 있고 모든 animation은 기본적으로 <code>globalTimeline</code> 아래에 놓입니다. 부모 playhead가 움직이면 child playhead도 함께 정렬되며 API로 playhead와 child의 <code>startTime</code>도 실행 중 바꿀 수 있습니다.</p>
        </article>
      </div>
      <pre className="core-map-page__code core-map-page__code--wide"><code>{sequencingCode}</code></pre>
      <dl className="core-map-page__concept-list">
        <div><dt>순서</dt><dd><code>gsap.to/from/fromTo()</code>는 독립 Tween을 만들고, <code>timeline.to/from/fromTo()</code>는 Tween을 만들어 즉시 그 Timeline에 넣습니다. 선택 인자인 position을 따로 적지 않으면 앞 animation이 끝난 뒤에 차례로 배치됩니다. 독립 Tween을 <code>timeline.add(tween)</code>로 넣을 수도 있지만 Timeline에서 바로 Tween을 만드는 편이 더 짧습니다.</dd></div>
        <div><dt>delay와 Timeline</dt><dd>시작을 한 번 늦추기만 하면 delay로 충분합니다. 여러 동작의 순서를 바꾸거나 겹치고 전체를 함께 제어하려면 Timeline이 더 읽기 쉽습니다.</dd></div>
        <div><dt>position</dt><dd>숫자는 Timeline 시작점을 기준으로 한 시간(초)입니다. <code>+=2</code>는 현재 끝에서 2초 뒤에 두어 간격을 만들고, <code>-=2</code>는 끝보다 2초 앞에 두어 겹칩니다.</dd></div>
        <div><dt>label</dt><dd>시간 위치에 이름을 붙여 child를 배치하거나 <code>seek('settled')</code>처럼 재생 위치를 이동합니다.</dd></div>
        <div><dt>제어할 animation 보존</dt><dd>나중에 제어할 animation은 반환값을 변수에 보존합니다. Tween과 Timeline은 Animation을 확장해 주요 control method를 공유하며, <code>timeScale(2)</code>는 2배속, <code>seek(3)</code>은 3초 지점, <code>progress(0.5)</code>는 절반으로 이동합니다.</dd></div>
      </dl>
      <div className="core-map-page__token-list" aria-label="Tween과 Timeline의 공통 control methods">
        {controls.map((control) => <code key={control}>{control}</code>)}
      </div>
    </section>
  )
}
