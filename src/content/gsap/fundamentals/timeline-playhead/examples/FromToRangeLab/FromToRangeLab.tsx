/** 두 label range와 immediateRender 호출 형태를 직접 비교한다. */
import { rangePoints, type ImmediateRenderMode, useFromToRangeAnimation } from './useFromToRangeAnimation'
import './FromToRangeLab.css'

// select가 보여 줄 세 immediateRender 호출 형태다
const immediateModes: { value: ImmediateRenderMode; label: string }[] = [
  { value: 'omitted', label: '생략 · 공식 default 확인' },
  { value: 'true', label: 'immediateRender: true' },
  { value: 'false', label: 'immediateRender: false' },
]

export function FromToRangeLab() {
  // runtime의 control descriptor와 실제 snapshot을 화면에서 그대로 소비한다
  const { scope, targetClassName, descriptor, from, setFrom, to, setTo, immediateRenderMode, setImmediateRenderMode, snapshot, lastAction, reducedMotion, run } = useFromToRangeAnimation()
  // 마지막 실행의 실제 vars 형태를 의미 재조립 없이 문법 문자열로만 만든다
  const immediateVar = !lastAction || lastAction.immediateRenderMode === 'omitted' ? '' : `, { immediateRender: ${lastAction.immediateRenderMode} }`
  // 모션 감소 fallback까지 마지막 실제 실행 호출을 그대로 표시한다
  const call = !lastAction ? '// 아직 range Tween을 만들지 않았습니다.' : lastAction.reducedMotion ? `tl.time(${lastAction.to.time}) // reduced-motion 대체` : `const control = tl.tweenFromTo('${lastAction.from.label}', '${lastAction.to.label}'${immediateVar})
control.eventCallback('onUpdate', reportCurrent)
control.eventCallback('onComplete', reportCurrent)`
  // 실행 descriptor와 같은 label·duration을 코드에 직렬화한다
  const code = `const tl = gsap.timeline({ paused: true, defaults: { duration: ${descriptor.duration}, ease: 'none' } })
  .addLabel('intro', 0).to('.${targetClassName}', { x: ${descriptor.distance} })
  .addLabel('focus').to('.${targetClassName}', { rotation: 120 })
  .addLabel('outro').to('.${targetClassName}', { scale: 0.72 })
  .addLabel('finish')

${call}`

  return (
    <section className={`from-to-range-lab${reducedMotion ? ' from-to-range-lab--reduced' : ''}`} aria-labelledby="from-to-range-title">
      <h3 id="from-to-range-title">출발과 도착을 먼저 정하면 duration도 바로 정해진다</h3>
      <p className="timeline-playhead-lab__goal">from과 to label을 고르고 실행하세요. 비교를 위해 매번 0.5초에서 control Tween을 만들며, “생성 직후 time”이 immediateRender 차이를 보여 줍니다.</p>
      <div className="timeline-playhead-lab__body" ref={scope}>
        <div className="timeline-playhead-lab__stage"><div className="timeline-playhead-lab__track"><span className={targetClassName}>range</span></div><p>생성 직후 {snapshot.creationTime.toFixed(2)}초 · 현재 {snapshot.currentTime.toFixed(2)}초</p>{reducedMotion && <p>모션 감소 설정에서는 도착 label의 time으로 즉시 이동합니다.</p>}</div>
        <div className="timeline-playhead-lab__controls"><label><span>from label</span><select value={from.label} onChange={(event) => setFrom(rangePoints.find((item) => item.label === event.target.value) ?? rangePoints[0])}>{rangePoints.map((item) => <option key={item.label} value={item.label}>{item.label} · {item.time}초</option>)}</select></label><label><span>to label</span><select value={to.label} onChange={(event) => setTo(rangePoints.find((item) => item.label === event.target.value) ?? rangePoints[3])}>{rangePoints.map((item) => <option key={item.label} value={item.label}>{item.label} · {item.time}초</option>)}</select></label><label><span>생성 시점 render</span><select value={immediateRenderMode} onChange={(event) => setImmediateRenderMode(event.target.value as ImmediateRenderMode)}>{immediateModes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><button type="button" onClick={run}>range Tween 만들기</button></div>
      </div>
      <p className="timeline-playhead-lab__status" role="status">{lastAction ? lastAction.reducedMotion ? `${lastAction.to.label} · 실제 time(${lastAction.to.time}) 호출` : `${lastAction.from.label} → ${lastAction.to.label} · ${lastAction.immediateRenderMode} 호출` : '두 label을 고른 뒤 실행하세요.'}</p>
      <pre className="timeline-playhead-lab__code"><code>{code}</code></pre>
      <div className="timeline-playhead-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>from과 to가 고정되므로 현재 playhead가 어디에 있든 control Tween의 range 길이를 즉시 알 수 있습니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>explicit true는 생성 직후 from으로 이동합니다. 생략과 false의 설치본 결과는 공식 설명과 분리해 아래에서 읽습니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p>control Tween이 Timeline time()을 from부터 to까지 선형으로 바꾸고, Timeline은 완료 뒤에도 paused로 남습니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>chapter A→B, B→처음처럼 여러 구간 이동을 master Timeline에 순서대로 넣을 때 사용합니다.</p></article></div>
      <p className="timeline-playhead-lab__source">실행 코드 위치 · <code>examples/FromToRangeLab/useFromToRangeAnimation.ts</code></p>
    </section>
  )
}
