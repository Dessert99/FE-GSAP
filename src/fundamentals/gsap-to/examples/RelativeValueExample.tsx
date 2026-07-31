import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function RelativeValueExample() {
  // scope 내부의 marker만 선택하므로 다른 예제의 시작 위치나 transform에 영향을 주지 않는다.
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // '+=160'은 x를 160으로 교체하지 않고 CSS와 이전 transform에서 읽은 현재 x에 160을 더한다.
      gsap.to('.gsap-to-relative__marker', {
        x: '+=160',
        duration: 1,
        // 일정한 이동량 자체를 비교하기 쉽도록 과한 반동이 없는 ease를 사용한다.
        ease: 'power1.inOut',
      })
    },
    // cleanup 시 GSAP이 더했던 상대 transform도 제거되어 다음 재생이 같은 출발점에서 시작한다.
    { scope },
  )

  return (
    <div ref={scope} className="gsap-to-relative">
      <div className="gsap-to-track gsap-to-relative__track">
        <span className="gsap-to-track__start">CURRENT</span>
        <span className="gsap-to-track__end">+160</span>
        <div className="gsap-to-relative__marker" />
      </div>
    </div>
  )
}
