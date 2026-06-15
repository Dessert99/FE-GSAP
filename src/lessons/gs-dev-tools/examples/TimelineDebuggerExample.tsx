import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 디버깅할 timeline을 만든다
import { GSDevTools } from 'gsap/GSDevTools' // timeline scrub UI를 제공하는 개발용 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(GSDevTools) // GSDevTools.create()를 쓰기 전에 등록한다

export function TimelineDebuggerExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 selector 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // GSDevTools UI를 넣을 컨테이너다.
  const tools = useRef<HTMLDivElement>(null)

  useGSAP(
    (context) => {
      if (!tools.current) return
      const toolsElement = tools.current

      const timeline = gsap
        .timeline({ id: 'lesson-devtools', paused: true, defaults: { duration: 0.45, ease: 'power2.out' } })
        .to('.devtools-card--one', { x: 190 })
        .addLabel('color')
        .to('.devtools-card--two', { x: 190, backgroundColor: '#22c55e' }, '-=0.2')
        .addLabel('finish')
        .to('.devtools-card--three', { x: 190, rotation: 12 }, '-=0.15')

      let tool: GSDevTools | null = null

      context.ignore(() => {
        tool = GSDevTools.create({
          id: 'lesson-devtools-panel', // sessionStorage 키와 인스턴스 식별자를 예제 전용으로 고정한다
          animation: timeline, // 이 timeline만 GSDevTools 패널로 제어한다
          container: toolsElement, // 예제 패널 안에 디버그 UI를 렌더링한다
          css: {
            position: 'absolute',
            top: 18,
            left: 0,
            right: 0,
            bottom: 'auto',
          }, // 기본 fixed 배치를 예제 패널 안쪽 배치로 덮어쓴다
          globalSync: false, // globalTimeline이 아니라 넘긴 timeline 기준으로 제어한다
          minimal: true, // 학습 화면에 필요한 최소 컨트롤만 보여준다
          paused: true, // 디버깅 예제이므로 사용자가 GSDevTools에서 직접 재생하게 둔다
          persist: false, // 학습 예제는 이전 scrub 위치를 저장하지 않고 매번 초기 상태로 보여준다
        })
      })

      // GSDevTools.kill()은 중복 호출에 안전하지 않다. context 기록에서 제외하고 여기서 한 번만 제거한다.
      return () => {
        tool?.kill()
        tool = null
      }
    },
    { scope: container }, // selector와 GSDevTools cleanup 범위를 이 예제 안으로 제한한다
  )

  return (
    <div ref={container} className="devtools-demo">
      <div className="tween-lanes">
        {/* GSDevTools에서 scrub할 timeline의 첫 번째 대상 */}
        <div className="tween-lanes__track">
          <div className="box devtools-card--one" />
        </div>
        {/* GSDevTools에서 color 라벨 근처에 움직이는 대상 */}
        <div className="tween-lanes__track">
          <div className="box devtools-card--two" />
        </div>
        {/* GSDevTools에서 finish 라벨 근처에 움직이는 대상 */}
        <div className="tween-lanes__track">
          <div className="box devtools-card--three" />
        </div>
      </div>
      <div ref={tools} className="devtools-panel" />
    </div>
  )
}
