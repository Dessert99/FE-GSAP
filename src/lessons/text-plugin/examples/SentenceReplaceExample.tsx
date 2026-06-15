import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — TextPlugin이 확장한 tween 속성을 실행한다
import { TextPlugin } from 'gsap/TextPlugin' // 텍스트 콘텐츠를 tween으로 바꾸는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(TextPlugin) // text 속성을 쓰기 전에 플러그인을 등록한다

export function SentenceReplaceExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // TextPlugin이 textContent를 바꿀 대상이다.
  const sentence = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!sentence.current) return

      gsap.to(sentence.current, {
        text: {
          value: 'Assets loaded. Timeline ready.', // 최종적으로 표시할 새 문장
          delimiter: ' ', // 공백 기준으로 단어 단위 교체를 만든다
          preserveSpaces: true,
        },
        duration: 1.8,
        ease: 'none', // 텍스트 교체는 일정 속도가 읽기 쉽다
      })
    },
    { scope: container }, // 이 예제에서 만든 tween을 container context에 묶는다
  )

  return (
    <div ref={container} className="text-demo">
      {/* TextPlugin이 기존 문장을 새 문장으로 교체한다 */}
      <p ref={sentence} className="text-line">
        Loading assets and preparing timeline...
      </p>
    </div>
  )
}
