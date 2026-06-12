import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — modifiers tween 속성을 제공한다
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const items = ['A', 'B', 'C'] // 같은 간격으로 반복 이동할 아이템

export function WrapModifierExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // unitize와 wrap을 조합하면 숫자를 0~240 범위로 되돌린 뒤 px 단위를 붙인다.
      const wrapX = gsap.utils.unitize(gsap.utils.wrap(0, 240), 'px')

      gsap.to('.modifier-item', {
        x: 240, // tween은 계속 오른쪽으로 이동하는 값을 만든다
        duration: 2.4, // 한 바퀴 이동하는 시간
        ease: 'none', // 일정한 속도로 반복 흐름을 보여준다
        repeat: -1, // cleanup 전까지 계속 반복한다
        modifiers: {
          x: wrapX, // 화면에 쓰기 직전에 x 값을 0~240 범위 안으로 되돌린다
        },
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정하고 반복 tween을 정리한다
  )

  return (
    <div ref={container} className="modifier-window">
      <div className="modifier-strip">
        {items.map((item, index) => (
          // 각 아이템의 시작 위치를 다르게 둬 wrap 결과가 이어져 보이게 한다
          <span key={item} className="modifier-item" style={{ left: index * 80 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
