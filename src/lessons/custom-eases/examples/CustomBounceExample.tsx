import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 플러그인 등록과 트윈 생성을 담당한다
import { CustomEase } from 'gsap/CustomEase' // CustomBounce가 내부적으로 기반으로 삼는 플러그인
import { CustomBounce } from 'gsap/CustomBounce' // bounce와 squash/stretch ease를 생성하는 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

// CustomBounce는 CustomEase를 확장하므로 둘 다 등록한다.
gsap.registerPlugin(CustomEase, CustomBounce)

// squashID를 지정하면 위치용 bounce ease와 scale용 squash ease를 동시에 만들 수 있다.
CustomBounce.create('lessonBounce', {
  strength: 0.65, // bounce가 몇 번, 얼마나 강하게 튀는지 정한다
  squash: 2, // 바닥에 닿는 순간 찌그러지는 구간의 길이
  squashID: 'lessonBounceSquash', // scale 트윈에서 사용할 보조 ease 이름
})

export function CustomBounceExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 기본 bounce.out은 위치만 튕긴다. squash/stretch 보조 ease는 제공하지 않는다.
      gsap.from('.box--basic-bounce', { y: -90, duration: 1.4, ease: 'bounce.out' })

      // lessonBounce는 위에서 만든 위치용 bounce ease다.
      gsap.from('.box--custom-bounce', { y: -90, duration: 1.4, ease: 'lessonBounce' })

      // lessonBounceSquash는 bounce와 타이밍이 맞는 scale용 ease다. 같은 duration으로 동시에 실행한다.
      gsap.to('.box--custom-bounce', {
        scaleX: 1.35,
        scaleY: 0.65,
        duration: 1.4,
        ease: 'lessonBounceSquash',
        transformOrigin: 'center bottom', // 바닥에 닿으며 눌리는 느낌을 만들기 위한 기준점
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* 기본 bounce: 위치만 튕긴다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">bounce.out</span>
        <div className="tween-lanes__track">
          <div className="box box--basic-bounce" />
        </div>
      </div>
      {/* CustomBounce: 위치와 squash/stretch를 같은 곡선 세트로 맞춘다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">CustomBounce + squash</span>
        <div className="tween-lanes__track">
          <div className="box box--custom-bounce" />
        </div>
      </div>
    </div>
  )
}
