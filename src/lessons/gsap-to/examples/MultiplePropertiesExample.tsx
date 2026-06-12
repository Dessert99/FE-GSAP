import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function MultiplePropertiesExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 하나의 to() 호출 안에서 여러 속성을 동시에 트윈한다 — GSAP은 설정 객체의 키마다 트윈을 만든다
      gsap.to('.box', {
        x: 200, // 가로 이동(px)
        rotation: 360, // 회전 각도(deg) — 한 바퀴 돈다
        scale: 1.4, // 크기 배율 — 1.4배로 확대
        backgroundColor: '#e11d48', // CSS 색상도 트윈 가능 (현재 색에서 이 색으로 보간)
        duration: 1.2, // 위 모든 속성에 공통 적용되는 길이(초)
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      {/* 여러 속성이 동시에 적용되는 대상 */}
      <div className="box" />
    </div>
  )
}
