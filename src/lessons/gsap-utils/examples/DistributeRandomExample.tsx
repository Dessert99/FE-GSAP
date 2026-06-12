import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — utils와 트윈을 함께 쓰는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const items = Array.from({ length: 9 }, (_, index) => index + 1) // distribute가 전체 개수를 기준으로 계산할 대상

export function DistributeRandomExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // distribute는 인덱스와 전체 개수를 받아 가운데 기준으로 값을 나눠주는 함수를 만든다.
      const spreadY = gsap.utils.distribute({
        base: -22, // 가장 작은 y 오프셋
        amount: 44, // 전체 대상에 분배할 y 오프셋 범위
        from: 'center', // 가운데 대상부터 기준값을 계산한다
        ease: 'power2.inOut', // 분배 값 자체의 변화에도 easing을 적용한다
      })

      // random은 지정 범위에서 값을 뽑는 함수를 만들 수 있다.
      const randomScale = gsap.utils.random(0.85, 1.2, 0.05, true)

      gsap.to('.utils-distribute__item', {
        y: (index, target, targets) => spreadY(index, target, targets), // 대상 위치에 따라 y를 분배한다
        scale: () => randomScale(), // 각 대상마다 0.05 단위로 보정된 랜덤 크기를 뽑는다
        duration: 0.65, // 분배 결과를 확인할 수 있는 시간
        stagger: { each: 0.04, from: 'center' }, // 가운데부터 적용되어 distribute 기준과 맞물린다
        ease: 'power2.out', // 각 대상이 부드럽게 도착하게 한다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="utils-distribute">
      {items.map((item) => (
        // 전체 대상 개수와 인덱스가 distribute 계산의 입력이 된다
        <span key={item} className="utils-distribute__item">
          {item}
        </span>
      ))}
    </div>
  )
}
