/** duration setter가 raw 길이 대신 timeScale과 부모 배정 폭을 바꾸는 결과를 표와 코드로 보여 준다. */
import { useDurationFitRuntime } from './useDurationFitRuntime'

export function DurationFitLab() {
  // runtime descriptor와 getter snapshot을 select·표·코드에 연결한다
  const { scope, repeat, setRepeat, requestedDuration, setRequestedDuration, descriptor, readout, childDuration, repeatDelay, parentPosition } = useDurationFitRuntime()
  // runtime과 같은 descriptor를 실제 setter 호출 코드로 직렬화한다
  const code = `import gsap from 'gsap'

const a = { value: 0 }
const b = { value: 0 }
const parent = gsap.timeline({ paused: true })
const timeline = gsap.timeline({ repeat: ${descriptor.repeat}, repeatDelay: ${repeatDelay} })
  .to(a, { duration: ${childDuration} })
  .to(b, { duration: ${childDuration} })

parent.add(timeline, ${parentPosition})
timeline.duration(${descriptor.requestedDuration})

function cleanup() {
  parent.kill()
}`

  return <section className="tl-fit-lab" aria-labelledby="tl-fit-title" ref={scope}>
    <h3 id="tl-fit-title">children 20초를 부모가 원하는 길이에 맞추기</h3><p>setter 뒤에도 raw getter와 child 길이는 그대로인지 확인하세요.</p>
    <div className="tl-fit-lab__controls"><label>repeat<select value={repeat} onChange={(event) => setRepeat(Number(event.target.value))}><option value="0">0</option><option value="1">1</option><option value="2">2</option></select></label><label>duration(v)<select value={requestedDuration} onChange={(event) => setRequestedDuration(Number(event.target.value))}><option value="5">5초</option><option value="10">10초</option><option value="20">20초</option></select></label></div>
    <p role="status">요청 {requestedDuration}초 · timeScale {readout?.timeScale ?? '계산 중'}</p>
    {readout ? <div className="tl-fit-lab__grid"><div><span>duration()</span><strong>{readout.duration}</strong></div><div><span>totalDuration()</span><strong>{readout.totalDuration}</strong></div><div><span>timeScale()</span><strong>{readout.timeScale}</strong></div><div><span>startTime()</span><strong>{readout.startTime}</strong></div><div><span>endTime()</span><strong>{readout.endTime}</strong></div><div><span>child duration</span><strong>{readout.childDurations.join(' + ')}</strong></div></div> : null}
    <pre className="tl-timing-page__code"><code>{code}</code></pre>
    <div className="tl-fit-lab__explain"><article><h4>무엇이 달라졌나요?</h4><p>timeScale과 부모 endTime만 바뀝니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>duration 20과 child 10+10은 그대로입니다.</p></article><article><h4>왜인가요?</h4><p>Timeline 길이는 children이 소유하기 때문입니다.</p></article><article><h4>언제 쓰나요?</h4><p>완성된 sequence를 정해진 슬롯에 맞출 때 씁니다.</p></article></div>
    <p className="tl-timing-page__provenance">실행 코드 위치 · <code>examples/DurationFitLab/useDurationFitRuntime.ts</code></p>
  </section>
}
