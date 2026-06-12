import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — utils와 트윈을 함께 쓰는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const inputValue = 76 // 파이프라인에 넣을 외부 입력값 예시

export function PipeUnitizeExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // unitize는 숫자 결과에 px 단위를 붙이는 함수를 만든다.
      const addPx = gsap.utils.unitize((value: number) => value, 'px')

      // pipe는 제한, 범위 변환, 단계 보정, 단위 추가를 하나의 재사용 함수로 묶는다.
      const toX = gsap.utils.pipe(
        gsap.utils.clamp(0, 100), // 입력값을 허용 범위로 제한한다
        gsap.utils.mapRange(0, 100, 0, 220), // 0~100 입력을 0~220 이동 거리로 바꾼다
        gsap.utils.snap(20), // 20px 단위에 맞춘다
        addPx, // 최종 숫자에 px 단위를 붙인다
      )

      gsap.to('.utils-pipe__box', {
        x: toX(inputValue), // 파이프라인 결과 문자열을 transform x 값으로 사용한다
        duration: 0.8, // 이동 결과를 확인할 수 있는 시간
        ease: 'power2.out', // 박스가 부드럽게 도착하게 한다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="tween-lanes">
      {/* inputValue가 변환 파이프라인을 거쳐 x 위치가 된다 */}
      <div className="tween-lanes__row">
        <span className="tween-lanes__label">input: {inputValue} → clamp → mapRange → snap → unitize</span>
        <div className="tween-lanes__track">
          <div className="box utils-pipe__box" />
        </div>
      </div>
    </div>
  )
}
