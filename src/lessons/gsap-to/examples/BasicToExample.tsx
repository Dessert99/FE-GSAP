import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function BasicToExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // gsap.to(타깃, 설정): 타깃을 "현재 값에서" 설정한 값까지 애니메이션한다.
      gsap.to('.box', {
        x: 200, // transform translateX — 현재 위치에서 가로로 200px 이동
        duration: 1, // 애니메이션에 걸리는 시간(초)
      })
    },
    { scope: container }, // 셀렉터('.box')를 container 안에서만 찾는다 → 다른 예제의 .box와 충돌 방지
  )

  return (
    // ref 연결: 위 scope가 이 div를 기준으로 셀렉터를 검색한다
    <div ref={container}>
      {/* 실제로 움직일 대상. class 'box'를 gsap.to의 셀렉터가 찾는다 */}
      <div className="box" />
    </div>
  )
}
