import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — ScrambleTextPlugin이 확장한 tween 속성을 실행한다
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin' // 텍스트를 임시 문자로 섞으며 교체하는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(ScrambleTextPlugin) // scrambleText 속성을 쓰기 전에 플러그인을 등록한다

export function ScrambleRevealExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // ScrambleTextPlugin이 textContent를 바꿀 대상이다.
  const code = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!code.current) return

      gsap.to(code.current, {
        scrambleText: {
          text: 'ACCESS GRANTED', // 최종적으로 드러날 문자열
          chars: '01', // 섞이는 임시 문자를 이진수 느낌으로 제한한다
          speed: 0.35,
          revealDelay: 0.25, // 초반에는 섞이는 상태를 먼저 보여준다
          tweenLength: false, // 기존 텍스트 길이를 유지하지 않고 목표 길이에 맞춘다
        },
        duration: 1.6,
        ease: 'none',
      })
    },
    { scope: container }, // 이 예제에서 만든 tween을 container context에 묶는다
  )

  return (
    <div ref={container} className="text-demo">
      {/* ScrambleTextPlugin이 임시 문자로 섞은 뒤 목표 문장을 드러낸다 */}
      <p ref={code} className="text-line text-line--code">
        VERIFYING TOKEN
      </p>
    </div>
  )
}
