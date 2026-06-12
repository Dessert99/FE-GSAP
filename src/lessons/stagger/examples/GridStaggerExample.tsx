import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — grid stagger를 포함한 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const cells = Array.from({ length: 12 }, (_, index) => index + 1) // 3행 x 4열 그리드 셀

export function GridStaggerExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.stagger-cell', {
        scale: 0.35, // 중심에서 커지는 동작으로 순서를 보기 쉽게 만든다
        opacity: 0.2, // 아직 시작하지 않은 셀과 완료된 셀의 차이를 만든다
        duration: 0.45, // 각 셀 하나가 커지는 시간
        stagger: {
          amount: 1, // 전체 셀이 퍼지는 데 쓰는 시작 분산 시간
          grid: [3, 4], // 대상 배열을 3행 4열 그리드로 해석한다
          from: 'center', // 가운데 셀에 가까운 대상부터 시작한다
          axis: 'x', // 같은 행 안의 가로 거리 차이를 우선 반영한다
          ease: 'power2.inOut', // 시작 간격 자체에도 easing을 적용해 가운데 흐름을 강조한다
        },
        ease: 'back.out(1.7)', // 각 셀의 scale 움직임에 살짝 튀는 도착감을 준다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="stagger-grid">
      {cells.map((cell) => (
        // 셀 순서는 DOM 순서이고, grid stagger가 이 순서를 행/열로 해석한다
        <span key={cell} className="stagger-cell">
          {cell}
        </span>
      ))}
    </div>
  )
}
