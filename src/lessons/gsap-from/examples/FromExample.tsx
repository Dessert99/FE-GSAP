import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function FromExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // gsap.from(타깃, 설정): to()와 반대로, "설정한 값에서 현재 값으로" 애니메이션한다.
      // 그래서 등장(enter) 연출에 자주 쓴다 — 보이지 않던 요소가 제자리로 들어온다.
      gsap.from('.box', {
        y: -80, // 시작 위치: 제자리보다 위로 80px (여기서 0으로 내려온다)
        opacity: 0, // 시작 투명도: 0 (여기서 1로 나타난다)
        duration: 1, // 애니메이션 길이(초)
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      {/* from()의 시작 값에서 현재 상태(제자리·불투명)로 들어오는 대상 */}
      <div className="box" />
    </div>
  )
}
