import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — SplitText가 만든 문자 배열을 tween한다
import { SplitText } from 'gsap/SplitText' // 텍스트를 line/word/char 단위 DOM으로 나누는 공식 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(SplitText) // SplitText.create()를 쓰기 전에 플러그인을 등록한다

export function CharsStaggerExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)
  // SplitText가 내부 DOM을 나눌 실제 텍스트 요소다.
  const title = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!title.current) return

      const split = SplitText.create(title.current, {
        type: 'words,chars', // 단어와 문자 단위 배열을 만든다
        wordsClass: 'split-word',
        charsClass: 'split-char',
        aria: 'auto', // 시각용 분할 DOM과 스크린리더용 텍스트를 자동으로 조정한다
      })

      gsap.from(split.chars, {
        yPercent: 120, // 각 문자가 아래에서 올라오는 느낌을 만든다
        opacity: 0,
        duration: 0.45,
        ease: 'back.out(1.7)',
        stagger: 0.03, // 문자 배열에 순차 지연을 적용한다
      })

      // SplitText는 DOM을 바꾸므로 cleanup에서 원래 텍스트 구조로 되돌린다.
      return () => {
        split.revert()
      }
    },
    { scope: container }, // 이 예제에서 만든 tween을 container context에 묶는다
  )

  return (
    <div ref={container} className="text-demo">
      {/* SplitText가 이 텍스트를 words/chars span으로 분해한다 */}
      <h3 ref={title} className="split-title">
        Launch Motion
      </h3>
    </div>
  )
}
