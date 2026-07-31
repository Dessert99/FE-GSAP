import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const dots = Array.from({ length: 5 }, (_, index) => index)

export function MultipleTargetsExample() {
  // 여러 타깃을 문자열 선택자로 전달하더라도 검색 범위는 이 예제의 scope 안으로 제한된다.
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.gsap-to-targets__dot', {
        y: -32,
        // stagger는 하나의 to() 설정을 유지하면서 각 타깃의 시작 시점만 0.1초씩 늦춘다.
        stagger: 0.1,
        duration: 0.45,
        // back.out의 작은 반동이 각 점의 도착 순서를 눈으로 구분하게 해준다.
        ease: 'back.out(1.7)',
      })
    },
    // context가 모든 점의 tween을 소유하므로 중간에 레슨을 떠나도 남은 순차 실행이 계속되지 않는다.
    { scope },
  )

  return (
    <div ref={scope} className="gsap-to-targets">
      {dots.map((dot) => (
        <div key={dot} className="gsap-to-targets__column">
          <span className="gsap-to-targets__guide" />
          <div className="gsap-to-targets__dot" />
        </div>
      ))}
    </div>
  )
}
