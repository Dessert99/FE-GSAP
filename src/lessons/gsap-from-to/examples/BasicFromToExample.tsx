import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 트윈을 만드는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

export function BasicFromToExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // gsap.fromTo(타깃, 시작값, 끝값): 시작 상태와 끝 상태를 둘 다 명시한다.
      // from()/to()와 달리 요소의 현재 값에 의존하지 않아, 시작점을 정확히 통제할 때 쓴다.
      gsap.fromTo(
        '.box',
        { x: -150, opacity: 0 }, // 시작값(from): 왼쪽 -150px, 투명
        { x: 0, opacity: 1, duration: 1 }, // 끝값(to): 제자리·불투명 — duration 같은 옵션은 끝값 객체에 넣는다
      )
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container}>
      {/* 시작값에서 끝값으로 이동하는 대상 */}
      <div className="box" />
    </div>
  )
}
