import { useRef } from 'react' // DOM 요소와 quick 함수 인스턴스를 보관하는 React 훅
import gsap from 'gsap' // GSAP 코어 — quickTo와 quickSetter를 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP context와 contextSafe를 제공하는 훅

export function QuickMethodsExample() {
  // 이 예제의 루트 DOM을 가리킨다. quick 함수가 다루는 대상도 이 안에 있다.
  const container = useRef<HTMLDivElement>(null)
  // quickTo는 같은 tween을 재사용하므로 이벤트 핸들러에서 꺼내 쓸 수 있게 ref에 둔다.
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  // quickSetter는 값을 즉시 쓰는 함수라 고빈도 이벤트에서 scale을 바꿀 때 쓴다.
  const setScale = useRef<((value: number) => void) | null>(null)

  // contextSafe는 이벤트 핸들러에서 실행되는 GSAP 관련 작업을 같은 context에 연결한다.
  const { contextSafe } = useGSAP(
    () => {
      // quickTo는 새 tween을 계속 만들지 않고 x 값만 갱신해서 부드럽게 따라가게 한다.
      xTo.current = gsap.quickTo('.helper-dot', 'x', {
        duration: 0.35, // 포인터를 따라가는 데 걸리는 시간
        ease: 'power3.out', // 빠르게 움직이다 부드럽게 멈추는 감속
      })

      // quickSetter는 tween 없이 transform scale 값을 즉시 쓴다.
      setScale.current = gsap.quickSetter('.helper-dot', 'scale') as (value: number) => void
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  // 포인터 위치를 track 안의 x 값으로 바꿔 quickTo와 quickSetter에 전달한다.
  const moveDot = contextSafe((event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect() // track의 화면상 위치
    const x = event.clientX - bounds.left - 18 // dot 중심이 포인터에 오도록 보정한 x 값

    xTo.current?.(x) // x는 tween으로 부드럽게 이동한다
    setScale.current?.(1.18) // scale은 즉시 커진다
  })

  // 포인터가 벗어나면 위치와 크기를 기본 상태로 돌린다.
  const resetDot = contextSafe(() => {
    xTo.current?.(0) // quickTo가 기존 tween을 재사용해 원점으로 보낸다
    setScale.current?.(1) // quickSetter로 scale만 즉시 원복한다
  })

  return (
    <div ref={container} className="helper-pointer">
      {/* pointer move마다 quickTo와 quickSetter가 호출된다 */}
      <div className="helper-pointer__track" onPointerMove={moveDot} onPointerLeave={resetDot}>
        <span className="helper-dot" />
      </div>
    </div>
  )
}
