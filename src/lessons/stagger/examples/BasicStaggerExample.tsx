import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — stagger가 포함된 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const items = ['A', 'B', 'C', 'D', 'E'] // 같은 트윈을 적용할 반복 대상

export function BasicStaggerExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.stagger-pill', {
        y: 28, // 아래에서 올라오는 진입 움직임
        opacity: 0, // 순차 등장 흐름을 읽기 쉽게 시작 투명도를 낮춘다
        duration: 0.45, // 각 요소 하나가 움직이는 시간
        stagger: 0.12, // 대상 사이의 시작 간격
        ease: 'power2.out', // UI 진입에 자주 쓰는 부드러운 감속
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="stagger-line">
      {items.map((item) => (
        // 같은 클래스의 요소들이 stagger 순서대로 애니메이션된다
        <span key={item} className="stagger-pill">
          {item}
        </span>
      ))}
    </div>
  )
}
