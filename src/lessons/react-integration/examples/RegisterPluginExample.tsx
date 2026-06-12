import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — 플러그인 등록과 트윈 생성을 담당한다
import { useGSAP } from '@gsap/react' // React 생명주기에 맞춰 GSAP context를 관리하는 공식 훅

// registerPlugin은 보통 앱 시작 파일에서 한 번 호출한다. 예제에서는 등록 위치가 보이도록 파일 상단에 둔다.
gsap.registerPlugin(useGSAP)

export function RegisterPluginExample() {
  // 이 예제의 루트 DOM을 가리킨다. 아래 useGSAP의 scope로 넘겨 셀렉터 검색 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 등록된 useGSAP 안에서 만든 트윈은 컴포넌트 언마운트 때 GSAP context가 정리한다.
      gsap.to('.box', { x: 200, duration: 1, ease: 'power2.out' })
    },
    { scope: container }, // 셀렉터('.box')를 container 안에서만 찾는다
  )

  return (
    // ref 연결: 위 scope가 이 div를 기준으로 셀렉터를 검색한다
    <div ref={container}>
      {/* 실제로 움직일 대상. registerPlugin 자체는 한 번 등록하고, 사용은 useGSAP에서 한다 */}
      <div className="box" />
    </div>
  )
}
