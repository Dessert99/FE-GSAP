/** absolute positioning이 containing block과 sibling flow에 미치는 결과를 경계로 남긴다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
export function ContainingBlockSection() {
  return (
    <section id="containing-block" className="flip-fit-absolute-page__section">
      <SectionHeading
        number="04"
        id="containing-block"
        title="absolute positioning의 containing block을 확인한다"
        description="absolute box는 normal flow 자리를 남기지 않고, positioned ancestor와 nesting에 따라 coordinate owner가 달라집니다."
      />
      <p>
        lab의 follower가 source 자리를 채우는 것은 source가 flow에서 빠졌다는
        관찰입니다. document 전체 selector를 absolute로 바꾸는 것은 공식 문서도
        필요한 일이 아니라고 경고한 극단적 예입니다.
      </p>
    </section>
  )
}
