import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — utils와 트윈을 함께 쓰는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const rawValues = [7, 28, 63, 92] // snap 전의 연속적인 입력값

export function SnapInterpolateExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // snap은 입력값을 가장 가까운 25 단위로 붙이는 함수를 만든다.
      const snapToStep = gsap.utils.snap(25)

      // interpolate는 진행률에 맞춰 색상 배열 사이를 보간한다.
      const colorAt = gsap.utils.interpolate(['#38bdf8', '#22c55e', '#f59e0b'])

      // 각 마커는 rawValues의 같은 인덱스 값을 사용한다.
      gsap.utils.toArray<HTMLElement>('.utils-snap__marker').forEach((marker, index) => {
        const snapped = snapToStep(rawValues[index]) // 단계형 UI에 맞게 보정한 값
        const progress = snapped / 100 // 색상 보간에 넘길 0~1 진행률

        // 보정된 위치와 보간된 색상을 같은 트윈에서 적용한다.
        gsap.to(marker, {
          x: snapped * 2.2, // 0~100 값을 0~220px 위치로 단순 변환한다
          backgroundColor: colorAt(progress), // 진행률에 맞는 중간 색상
          duration: 0.75, // 위치 변화를 확인할 수 있는 시간
          ease: 'power2.out', // 마커 이동을 부드럽게 멈춘다
        })
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="utils-stack">
      {rawValues.map((value) => (
        // .utils-snap__row는 raw 값과 마커를 한 줄에 보여준다
        <div key={value} className="utils-snap__row">
          <span className="utils-meter__label">raw {value}</span>
          {/* .utils-snap__track은 0~100 위치 범위를 보여주는 기준선이다 */}
          <span className="utils-snap__track">
            <span className="utils-snap__marker" />
          </span>
        </div>
      ))}
    </div>
  )
}
