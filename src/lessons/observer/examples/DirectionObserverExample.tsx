import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 입력 결과를 짧은 tween으로 보여준다
import { Observer } from 'gsap/Observer' // wheel/touch/pointer 입력을 통합해서 감지하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(Observer) // Observer.create()를 쓰기 전에 플러그인을 등록한다

type Direction = 'up' | 'down' | 'left' | 'right'

const directionMap: Record<Direction, { x?: number; y?: number; label: string }> = {
  up: { y: -34, label: 'up' },
  down: { y: 34, label: 'down' },
  left: { x: -44, label: 'left' },
  right: { x: 44, label: 'right' },
}

export function DirectionObserverExample() {
  // Observer가 이벤트를 받을 상호작용 영역이다.
  const target = useRef<HTMLDivElement>(null)
  // 입력 방향에 맞춰 움직이는 시각적 대상이다.
  const card = useRef<HTMLDivElement>(null)
  // 마지막으로 감지한 방향을 표시한다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!target.current || !card.current) return

      const move = (direction: Direction) => {
        const { label, x = 0, y = 0 } = directionMap[direction]

        if (readout.current) readout.current.textContent = label

        gsap.to(card.current, {
          x, // 방향 입력을 수평 이동으로 보여준다
          y, // 방향 입력을 수직 이동으로 보여준다
          duration: 0.2, // 반응이 즉시 느껴지도록 짧게 둔다
          ease: 'power2.out',
          yoyo: true, // 원래 자리로 돌아오는 입력 피드백을 만든다
          repeat: 1,
        })
      }

      const observer = Observer.create({
        target: target.current, // 이 예제 박스 안에서만 입력을 감지한다
        type: 'wheel,touch,pointer', // 마우스 휠, 터치, 포인터 드래그를 같은 콜백으로 묶는다
        tolerance: 12, // 작은 흔들림을 방향 입력으로 처리하지 않는다
        preventDefault: true, // 데모 안 제스처가 페이지 스크롤로 새지 않게 막는다
        onUp: () => move('up'),
        onDown: () => move('down'),
        onLeft: () => move('left'),
        onRight: () => move('right'),
      })

      // Observer는 전역 입력 리스너를 붙이므로 cleanup에서 제거한다.
      return () => {
        observer.kill()
      }
    },
    { scope: target }, // 이 예제 안에서 만든 tween과 selector 범위를 한정한다
  )

  return (
    <div>
      <div ref={target} className="observer-pad">
        {/* wheel, drag, swipe 입력 결과가 이 카드 움직임으로 나타난다 */}
        <div ref={card} className="observer-card">
          gesture
        </div>
      </div>
      <div className="callback-readout">
        <span>direction</span>
        <strong ref={readout}>try wheel or drag</strong>
      </div>
    </div>
  )
}
