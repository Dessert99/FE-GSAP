import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function MultiplePropertiesExample() {
  // 이 ref가 여러 데모 패널 사이에서 선택자 범위를 분리하는 GSAP context의 기준점이다.
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 한 vars 객체에 값을 함께 두면 이동·회전·크기·모양 변화가 같은 duration과 ease를 공유한다.
      gsap.to('.gsap-to-multiple__shape', {
        x: 180,
        rotation: 180,
        scale: 1.2,
        borderRadius: '50%',
        duration: 1.2,
        // back.out은 끝에서 살짝 넘겼다가 돌아와 여러 속성의 도착 순간을 선명하게 보여준다.
        ease: 'back.out(1.5)',
      })
    },
    // 컴포넌트가 remount될 때 context가 네 속성의 인라인 스타일을 모두 원래 상태로 되돌린다.
    { scope },
  )

  return (
    <div ref={scope} className="gsap-to-multiple">
      <div className="gsap-to-track">
        <span className="gsap-to-track__start">SQUARE</span>
        <span className="gsap-to-track__end">CIRCLE</span>
        <div className="gsap-to-multiple__shape" />
      </div>
    </div>
  )
}
