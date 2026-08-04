/** 생성 method가 공유하는 vars 상세를 기존 단일 owner로 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 이 페이지는 값 소유권에 집중하고 34개 special property를 복제하지 않는다. */
export function SharedVarsSection() {
  return (
    <section id="shared-vars" className="tween-values-page__section" aria-labelledby="shared-vars-title">
      <SectionHeading
        number="06"
        id="shared-vars"
        title="공통 vars는 한곳에서 이어 읽기"
        description="from과 fromTo도 plugin, 함수값, random, 상대값, stagger와 animation option을 gsap.to와 같은 방식으로 사용합니다."
      />
      <ul className="tween-values-page__bullet-list">
        <li><strong>animation 값:</strong> x, opacity처럼 대상에서 보간할 property입니다.</li>
        <li><strong>special property:</strong> duration, ease, callback처럼 Tween 동작을 정하며 fromTo에서는 <code>toVars</code>에 둡니다.</li>
        <li><strong>공통 value mode:</strong> function, random 문자열, +=·-= 상대값, stagger, plugin vars는 기존 catalog에서 한 번만 설명합니다.</li>
        <li><strong>다음 경계:</strong> 여러 animation의 복잡한 순서는 Timeline, callback 상세는 Tween lifecycle owner에서 이어집니다.</li>
      </ul>
      <a className="tween-values-page__related-link" href={toHref('/fundamentals/gsap-to')}>gsap.to()의 34개 special property 전체 보기</a>
    </section>
  )
}
