import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ticker 루프를 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 cleanup을 등록하는 훅

export function TickerExample() {
  // 이 예제의 루트 DOM을 가리킨다. ticker가 업데이트할 대상도 이 안에 있다.
  const container = useRef<HTMLDivElement>(null)
  // 프레임 수를 표시할 DOM이다. 매 프레임 React state를 바꾸지 않기 위해 ref를 쓴다.
  const readout = useRef<HTMLSpanElement>(null)

  useGSAP(
    (context) => {
      let frame = 0 // ticker 콜백이 호출된 횟수

      // ticker 콜백은 GSAP의 requestAnimationFrame 루프마다 실행된다.
      const update = () => {
        frame += 1

        // 빠른 프레임 단위 쓰기에는 quickSetter가 잘 맞지만, 여기서는 ticker 자체를 보여주기 위해 set을 직접 호출한다.
        gsap.set('.helper-ticker__needle', { rotation: frame * 4 })

        if (readout.current) {
          readout.current.textContent = `frame ${frame}`
        }
      }

      gsap.ticker.add(update) // GSAP 전역 ticker에 콜백을 등록한다

      // 전역 ticker는 context가 자동으로 제거하지 않으므로 cleanup에서 직접 remove한다.
      context.add(() => {
        gsap.ticker.remove(update)
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="helper-ticker">
      {/* ticker가 매 프레임 회전시킬 바늘 */}
      <div className="helper-ticker__dial">
        <span className="helper-ticker__needle" />
      </div>
      <div className="callback-readout">
        <span>ticker</span>
        <strong ref={readout}>frame 0</strong>
      </div>
    </div>
  )
}
