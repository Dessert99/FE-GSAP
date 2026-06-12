import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — utils와 트윈을 함께 쓰는 진입점
import { useGSAP } from '@gsap/react' // React에서 GSAP을 실행하고 언마운트 시 자동 정리해주는 훅

const cards = ['scope', 'array', 'stagger'] // 같은 방식으로 선택할 카드 데이터

export function SelectorToArrayExample() {
  // 이 예제의 루트 DOM을 가리킨다. utils selector와 useGSAP scope가 같은 기준을 쓴다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // selector는 container ref 안에서만 셀렉터를 찾는 함수를 만든다.
      const q = gsap.utils.selector(container)

      // toArray는 셀렉터 결과를 실제 배열로 만들어 forEach, map 같은 배열 메서드를 안전하게 쓰게 한다.
      const selectedCards = gsap.utils.toArray<HTMLElement>('.utils-card', container.current)

      // 배열로 바꾼 대상은 일반 GSAP targets처럼 바로 넘길 수 있다.
      gsap.from(selectedCards, {
        y: 22, // 아래에서 올라오는 진입 움직임
        opacity: 0, // 선택된 대상만 순차적으로 등장하게 만든다
        duration: 0.45, // 각 카드 하나가 움직이는 시간
        stagger: 0.1, // 배열 순서대로 시작 간격을 둔다
        ease: 'power2.out', // UI 진입에 자주 쓰는 감속
      })

      // scoped selector 함수로 카드 안의 점만 찾아 별도 트윈을 적용한다.
      gsap.from(q('.utils-card__dot'), {
        scale: 0, // 점이 커지며 나타나도록 시작 크기를 줄인다
        duration: 0.3, // 작은 보조 요소라 짧게 움직인다
        stagger: 0.08, // 점도 카드 순서에 맞춰 따라오게 한다
        delay: 0.2, // 카드 움직임이 시작된 뒤 점을 보여준다
        ease: 'back.out(1.7)', // 작은 요소의 도착감을 분명하게 만든다
      })
    },
    { scope: container }, // 셀렉터를 container 안으로 한정
  )

  return (
    <div ref={container} className="utils-card-row">
      {cards.map((card) => (
        // .utils-card는 toArray의 선택 대상이다
        <div key={card} className="utils-card">
          {/* .utils-card__dot은 scoped selector 함수의 선택 대상이다 */}
          <span className="utils-card__dot" />
          <span>{card}</span>
        </div>
      ))}
    </div>
  )
}
