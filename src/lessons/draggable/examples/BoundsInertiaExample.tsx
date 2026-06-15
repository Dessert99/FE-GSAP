import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 플러그인 등록과 보조 tween에 사용한다
import { Draggable } from 'gsap/Draggable' // pointer/touch 드래그를 처리하는 공식 플러그인
import { InertiaPlugin } from 'gsap/InertiaPlugin' // 드래그가 끝난 뒤 속도 기반 관성 이동을 계산하는 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(Draggable, InertiaPlugin) // Draggable의 inertia 옵션을 쓰려면 두 플러그인을 함께 등록한다

export function BoundsInertiaExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope와 Draggable bounds 기준으로 사용한다.
  const container = useRef<HTMLDivElement>(null)
  // 사용자가 직접 끌어볼 대상 요소다.
  const card = useRef<HTMLDivElement>(null)
  // 현재 Draggable 상태를 짧게 표시하는 요소다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!container.current || !card.current) return

      const [draggable] = Draggable.create(card.current, {
        type: 'x,y', // 가로와 세로 이동을 모두 허용한다
        bounds: container.current, // 카드가 예제 영역 밖으로 나가지 않도록 제한한다
        edgeResistance: 0.8, // 경계에 가까워질수록 손맛이 뻣뻣해지게 만든다
        inertia: true, // 손을 뗀 순간의 속도를 이어받아 자연스럽게 감속한다
        onPress() {
          if (readout.current) readout.current.textContent = 'press'
        },
        onDrag() {
          if (readout.current) readout.current.textContent = `x:${Math.round(this.x)} y:${Math.round(this.y)}`
        },
        onThrowComplete() {
          if (readout.current) readout.current.textContent = 'settled'
        },
      })

      // Draggable은 DOM 이벤트를 직접 붙이므로 컴포넌트가 사라질 때 인스턴스를 죽인다.
      return () => {
        draggable.kill()
      }
    },
    { scope: container }, // Draggable이 만드는 보조 tween도 이 예제 context에 묶는다
  )

  return (
    <div>
      <div ref={container} className="drag-area">
        {/* 사용자가 직접 pointer/touch로 끌 수 있는 대상 */}
        <div ref={card} className="drag-card">
          drag
        </div>
      </div>
      <div className="callback-readout">
        <span>state</span>
        <strong ref={readout}>ready</strong>
      </div>
    </div>
  )
}
