import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — utils와 트윈을 함께 쓰는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const rawScores = [-20, 18, 56, 124] // 입력 범위를 벗어날 수 있는 외부 값 예시

export function RangeMappingExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // clamp는 잘못 들어온 값을 0~100 범위 안으로 제한한다.
      const clampScore = gsap.utils.clamp(0, 100)

      // normalize는 0~100 점수를 0~1 진행률로 바꾼다.
      const normalizeScore = gsap.utils.normalize(0, 100)

      // mapRange는 0~1 진행률을 실제 막대 너비 범위로 변환한다.
      const mapToWidth = gsap.utils.mapRange(0, 1, 24, 220)

      // 각 행을 배열로 만든 뒤 rawScores와 같은 인덱스로 계산한다.
      gsap.utils.toArray<HTMLElement>('.utils-meter').forEach((meter, index) => {
        const clamped = clampScore(rawScores[index]) // 애니메이션에 넣기 전 안전 범위로 제한한 값
        const progress = normalizeScore(clamped) // 색상·길이에 공통으로 쓸 진행률
        const width = mapToWidth(progress) // 진행률을 실제 px 너비로 변환한 값

        // 계산된 너비를 막대 채움 요소에 적용한다.
        gsap.to(meter.querySelector('.utils-meter__fill'), {
          width, // mapRange 결과를 실제 너비로 사용한다
          duration: 0.8, // 값 변화를 읽을 수 있는 시간
          ease: 'power2.out', // 막대가 자연스럽게 멈추도록 감속한다
        })
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="utils-stack">
      {rawScores.map((score) => (
        // .utils-meter는 rawScores와 같은 순서로 계산된다
        <div key={score} className="utils-meter">
          <span className="utils-meter__label">raw {score}</span>
          {/* .utils-meter__track은 변환된 너비가 채워지는 기준선이다 */}
          <span className="utils-meter__track">
            <span className="utils-meter__fill" />
          </span>
        </div>
      ))}
    </div>
  )
}
