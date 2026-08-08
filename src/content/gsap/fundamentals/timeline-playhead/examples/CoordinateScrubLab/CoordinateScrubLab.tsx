/** 네 setter에 같은 0~1 입력을 넣어 단위와 repeat 포함 범위를 비교한다. */
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'
import type { CoordinateMethod } from './useCoordinateScrubAnimation'
import { useCoordinateScrubAnimation } from './useCoordinateScrubAnimation'
import './CoordinateScrubLab.css'

// controls에 표시할 네 setter의 단위와 범위다
const methods: { method: CoordinateMethod; label: string }[] = [
  { method: 'progress', label: 'progress · local 비율' },
  { method: 'time', label: 'time · local 초' },
  { method: 'totalProgress', label: 'totalProgress · 전체 비율' },
  { method: 'totalTime', label: 'totalTime · 전체 초' },
]

export function CoordinateScrubLab() {
  // runtime의 동일 descriptor·control·snapshot을 preview와 code가 소비한다
  const { scope, targetClassName, descriptor, method, setMethod, value, setValue, snapshot } = useCoordinateScrubAnimation()
  // 모션 감소 환경에서는 transform 대신 동일 snapshot 수치만 보여 준다
  const reducedMotion = useReducedMotion()
  // 실제 method에 맞는 인자만 단위를 다시 계산하지 않고 serializer용 문자열로 만든다
  const argument = method === 'time' ? `${value.toFixed(2)} * tl.duration()` : method === 'totalTime' ? `${value.toFixed(2)} * tl.totalDuration()` : value.toFixed(2)
  // 실행 descriptor와 마지막 setter 호출을 그대로 직렬화한다
  const code = `const tl = gsap.timeline({ paused: true, repeat: ${descriptor.repeat}, repeatDelay: ${descriptor.repeatDelay} })
tl.to('.${targetClassName}', { x: ${descriptor.distance}, duration: ${descriptor.duration}, ease: 'none' })

tl.${method}(${argument})`

  return (
    <section className={`coordinate-scrub-lab${reducedMotion ? ' coordinate-scrub-lab--reduced' : ''}`} aria-labelledby="coordinate-scrub-title">
      <h3 id="coordinate-scrub-title">같은 0.35를 네 좌표에 넣으면 같은 위치일까?</h3>
      <p className="timeline-playhead-lab__goal">setter를 고른 뒤 slider를 움직이세요. local 좌표는 repeat 회차를 고르지 않고, total 좌표는 repeatDelay까지 포함한 전체 길이에서 위치를 고릅니다.</p>
      <div className="timeline-playhead-lab__body" ref={scope}>
        <div className="timeline-playhead-lab__stage"><div className="timeline-playhead-lab__track"><span className={targetClassName}>chapter</span></div><p>x · {Math.round(snapshot.x)}px</p>{reducedMotion && <p>모션 감소 설정에서는 transform을 숨기고 수치만 갱신합니다.</p>}</div>
        <div className="timeline-playhead-lab__controls"><fieldset><legend>좌표 setter</legend>{methods.map((item) => <label key={item.method}><input type="radio" name="coordinate-method" value={item.method} checked={method === item.method} onChange={() => setMethod(item.method)} />{item.label}</label>)}</fieldset><label><span>공통 입력 <output>{value.toFixed(2)}</output></span><input type="range" min="0" max="1" step="0.05" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label></div>
      </div>
      <dl className="timeline-playhead-lab__snapshot"><div><dt>progress()</dt><dd>{snapshot.progress.toFixed(2)}</dd></div><div><dt>time()</dt><dd>{snapshot.time.toFixed(2)}초</dd></div><div><dt>totalProgress()</dt><dd>{snapshot.totalProgress.toFixed(2)}</dd></div><div><dt>totalTime()</dt><dd>{snapshot.totalTime.toFixed(2)}초</dd></div></dl>
      <pre className="timeline-playhead-lab__code"><code>{code}</code></pre>
      <div className="timeline-playhead-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>local setter는 한 cycle 안의 위치를, total setter는 두 cycle과 사이 repeatDelay를 합친 위치를 바꿉니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>totalProgress가 repeatDelay 안을 가리킬 때 target이 멈춰 있어도 totalTime은 계속 다른 좌표를 가집니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p>비율/초는 단위 선택이고 local/total은 repeat 포함 범위 선택입니다. 서로 다른 두 질문입니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>단일 chapter scrub에는 local, 반복 전체를 저장·복원하는 scrubber에는 total 좌표가 맞습니다.</p></article></div>
      <p className="timeline-playhead-lab__source">실행 코드 위치 · <code>examples/CoordinateScrubLab/useCoordinateScrubAnimation.ts</code></p>
    </section>
  )
}
