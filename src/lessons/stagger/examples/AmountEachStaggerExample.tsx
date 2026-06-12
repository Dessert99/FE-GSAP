import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — stagger 객체를 포함한 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const items = ['1', '2', '3', '4', '5', '6'] // amount와 each 차이를 비교할 반복 대상

export function AmountEachStaggerExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.stagger-pill--amount', {
        x: -24, // 왼쪽에서 들어오며 순서 차이를 보여준다
        opacity: 0, // 시작 상태를 숨겨 등장 순서를 분명하게 만든다
        duration: 0.35, // 각 요소 하나가 움직이는 시간
        stagger: {
          amount: 0.9, // 첫 요소부터 마지막 요소까지 전체 시작 분산 시간
        },
        ease: 'power2.out', // amount 차이를 보기 쉽게 같은 ease를 쓴다
      })

      gsap.from('.stagger-pill--each', {
        x: -24, // 같은 이동값으로 amount와 기준 차이만 비교한다
        opacity: 0, // 시작 상태를 숨겨 등장 순서를 분명하게 만든다
        duration: 0.35, // 각 요소 하나가 움직이는 시간
        stagger: {
          each: 0.18, // 대상 사이의 고정 시작 간격
        },
        ease: 'power2.out', // each 차이를 보기 쉽게 같은 ease를 쓴다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* amount: 전체 분산 시간을 고정한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">stagger: {'{ amount: 0.9 }'}</span>
        <div className="stagger-line">
          {items.map((item) => (
            <span key={item} className="stagger-pill stagger-pill--amount">
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* each: 각 대상 사이의 간격을 고정한다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">stagger: {'{ each: 0.18 }'}</span>
        <div className="stagger-line">
          {items.map((item) => (
            <span key={item} className="stagger-pill stagger-pill--each">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
