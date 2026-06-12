import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — utils와 트윈을 함께 쓰는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const indices = Array.from({ length: 8 }, (_, index) => index) // 반복 패턴을 적용할 인덱스 목록
const colors = ['#38bdf8', '#22c55e', '#f59e0b'] // wrap으로 순환할 색상 목록
const offsets = [-18, 0, 18] // wrapYoyo로 왕복할 세로 위치 목록

export function WrapYoyoExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // wrap은 인덱스가 배열 끝을 넘으면 다시 처음으로 돌아간다.
      const colorAt = gsap.utils.wrap(colors)

      // wrapYoyo는 끝에 닿은 뒤 반대 방향으로 값을 되짚는다.
      const offsetAt = gsap.utils.wrapYoyo(offsets)

      gsap.to('.utils-wrap__item', {
        y: (index) => offsetAt(index), // 인덱스별 y 위치를 왕복 패턴으로 만든다
        backgroundColor: (index) => colorAt(index), // 인덱스별 색상을 순환 패턴으로 만든다
        duration: 0.55, // 패턴 차이를 읽을 수 있는 시간
        stagger: 0.06, // DOM 순서대로 적용 과정을 보여준다
        ease: 'power2.out', // 각 아이템이 부드럽게 도착하게 한다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="utils-wrap">
      {indices.map((index) => (
        // 인덱스는 wrap과 wrapYoyo 패턴 계산의 입력값이다
        <span key={index} className="utils-wrap__item">
          {index}
        </span>
      ))}
    </div>
  )
}
