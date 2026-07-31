import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const rows = ['A', 'B', 'C', 'D']

export function FunctionValueExample() {
  // 같은 bar 클래스를 다른 패널이 추가해도 이 scope 안의 네 개만 함수 기반 값을 받는다.
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.gsap-to-function__bar', {
        // GSAP이 타깃마다 index를 전달하므로 하나의 vars 객체에서 서로 다른 목적지를 계산할 수 있다.
        x: (index) => 50 + index * 45,
        duration: 0.8,
        // 목적지 거리의 차이를 동시에 읽을 수 있도록 단순한 감속 곡선을 사용한다.
        ease: 'power1.out',
      })
    },
    // route 전환과 다시 재생 시 네 타깃의 계산된 transform을 context가 한 번에 정리한다.
    { scope },
  )

  return (
    <div ref={scope} className="gsap-to-function">
      {rows.map((label) => (
        <div key={label} className="gsap-to-function__row">
          <span>{label}</span>
          <div className="gsap-to-function__lane">
            <div className="gsap-to-function__bar" />
          </div>
        </div>
      ))}
    </div>
  )
}
