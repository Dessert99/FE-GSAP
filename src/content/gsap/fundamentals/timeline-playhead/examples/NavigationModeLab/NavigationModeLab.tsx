/** 같은 label 목적지의 즉시 점프와 부드러운 playhead 이동을 비교한다. */
import { navigationDestinations, type NavigationMethod, useNavigationModeAnimation } from './useNavigationModeAnimation'
import './NavigationModeLab.css'

// method 선택 전에 learner가 예상할 사용자 경험을 짧게 표시한다
const methods: { value: NavigationMethod; label: string }[] = [
  { value: 'time', label: 'time() · 즉시' },
  { value: 'progress', label: 'progress() · 즉시' },
  { value: 'tweenTo', label: 'tweenTo() · 부드럽게' },
]

export function NavigationModeLab() {
  // 실행 runtime의 descriptor와 관찰 상태를 그대로 화면에 사용한다
  const { scope, targetClassName, descriptor, method, setMethod, destination, setDestination, lastAction, snapshot, reducedMotion, navigate } = useNavigationModeAnimation()
  // 실제로 실행된 action만 코드 문법으로 포맷한다
  const lastCall = !lastAction ? '// 아직 이동하지 않았습니다.' : lastAction.effectiveMethod === 'time' ? `tl.time(${lastAction.destination.time})` : lastAction.effectiveMethod === 'progress' ? `tl.progress(${lastAction.destination.progress.toFixed(3)})` : `const control = tl.tweenTo('${lastAction.destination.label}')
control.eventCallback('onUpdate', report)
control.eventCallback('onComplete', report)`
  // Timeline 구성과 마지막 실제 호출을 같은 descriptor에서 직렬화한다
  const code = `const tl = gsap.timeline({ paused: true, defaults: { duration: ${descriptor.duration}, ease: 'none' } })
  .addLabel('intro', 0).to('.${targetClassName}', { x: ${descriptor.distance} })
  .addLabel('focus').to('.${targetClassName}', { rotation: ${descriptor.rotation} })
  .addLabel('outro').to('.${targetClassName}', { scale: ${descriptor.scale} })
  .addLabel('finish')

${lastCall}`

  return (
    <section className={`navigation-mode-lab${reducedMotion ? ' navigation-mode-lab--reduced' : ''}`} aria-labelledby="navigation-mode-title">
      <h3 id="navigation-mode-title">같은 목적지, 점프할까 이동할까?</h3>
      <p className="timeline-playhead-lab__goal"><code>outro</code> 같은 label을 고르고 세 방식을 번갈아 실행하세요. setter는 즉시 결과를 만들고, <code>tweenTo()</code>는 목적지까지 움직이는 별도 Tween을 돌려줍니다.</p>
      <div className="timeline-playhead-lab__body" ref={scope}>
        <div className="timeline-playhead-lab__stage"><div className="timeline-playhead-lab__track"><span className={targetClassName}>chapter</span></div><p>time {snapshot.time.toFixed(2)}초 · progress {snapshot.progress.toFixed(2)}</p>{reducedMotion && <p>모션 감소 설정에서는 tweenTo 요청도 같은 목적지의 time setter로 실행합니다.</p>}</div>
        <div className="timeline-playhead-lab__controls"><label><span>이동 방식</span><select value={method} onChange={(event) => setMethod(event.target.value as NavigationMethod)}>{methods.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label><span>목적지 label</span><select value={destination.label} onChange={(event) => setDestination(navigationDestinations.find((item) => item.label === event.target.value) ?? navigationDestinations[0])}>{navigationDestinations.map((item) => <option key={item.label} value={item.label}>{item.label} · {item.time}초</option>)}</select></label><button type="button" onClick={navigate}>선택한 위치로 이동</button></div>
      </div>
      <p className="timeline-playhead-lab__status" role="status">{lastAction ? `${lastAction.requestedMethod} 요청 · 실제 ${lastAction.effectiveMethod} · ${lastAction.destination.label}` : '이동 방식을 고른 뒤 실행하세요.'}</p>
      <pre className="timeline-playhead-lab__code"><code>{code}</code></pre>
      <div className="timeline-playhead-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>도착 위치는 같아도 setter는 즉시 바뀌고 control Tween은 중간 playhead를 차례로 보여 줍니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>앞선 label로 tweenTo해 겉으로 뒤로 움직여도 Timeline의 reversed 상태는 바뀌지 않습니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p>tweenTo는 Timeline 자체를 재생하는 대신 pause한 Timeline의 time()을 선형으로 tween합니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>chapter 버튼, 제품 tour, 미디어 scrubber처럼 위치 전환을 시각적으로 이어 보여 줄 때 사용합니다.</p></article></div>
      <p className="timeline-playhead-lab__source">실행 코드 위치 · <code>examples/NavigationModeLab/useNavigationModeAnimation.ts</code></p>
    </section>
  )
}
