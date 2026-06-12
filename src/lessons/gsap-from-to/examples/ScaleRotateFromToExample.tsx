import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function ScaleRotateFromToExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 시작·끝 양쪽을 지정하므로, 어떤 상태에서 시작해 어디서 끝나는지가 코드에 그대로 드러난다
      gsap.fromTo(
        '.box',
        { scale: 0, rotation: -180 }, // 시작값: 크기 0(안 보임) + -180도 회전
        { scale: 1, rotation: 0, duration: 1 }, // 끝값: 원래 크기·각도로 펼쳐지며 돌아온다
      )
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      <div className="box" />
    </div>
  )
}
