import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function SetThenAnimateExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 자주 쓰는 패턴: set으로 "초기 상태"를 즉시 잡아두고, 이어서 to로 애니메이션한다.
      gsap.set('.box', { x: -120, opacity: 0 }) // 1) 시작 상태를 즉시 설정 (왼쪽·투명)
      gsap.to('.box', { x: 0, opacity: 1, duration: 1 }) // 2) 그 상태에서 제자리·불투명으로 애니메이션
      // 참고: 이 두 줄을 한 번에 쓰면 gsap.fromTo()와 같다. set은 "초기화"를 분리하고 싶을 때 유용하다.
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      <div className="box" />
    </div>
  )
}
