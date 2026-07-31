import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function BasicMovementExample() {
  // scope는 이 예제 안의 선택자만 찾게 해 다른 패널의 같은 클래스가 함께 움직이지 않도록 제한한다.
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // to()는 CSS에 정의된 현재 위치를 출발점으로 읽고 x: 220을 최종 transform 값으로 만든다.
      gsap.to('.gsap-to-basic__box', {
        x: 220,
        duration: 1,
        // power2.out은 도착 전에 감속하므로 이동의 시작과 끝을 쉽게 구분할 수 있다.
        ease: 'power2.out',
      })
    },
    // 패널을 다시 재생하거나 레슨을 떠나면 useGSAP context가 tween과 인라인 transform을 정리한다.
    { scope },
  )

  return (
    <div ref={scope} className="gsap-to-basic">
      <div className="gsap-to-track">
        <span className="gsap-to-track__start">START</span>
        <span className="gsap-to-track__end">END</span>
        <div className="gsap-to-basic__box" />
      </div>
    </div>
  )
}
