/** resource마다 ref와 animation responsibility를 나누는 기준을 설명한다. */
import { toHref } from '../../../../../../app/routes'

/** reusable logic과 component-local target의 소유권을 먼저 정한다. */
export function OrganizationSection() {
  return (
    <section aria-labelledby="react-pattern-organization-title">
      <h2 id="react-pattern-organization-title">
        resource마다 ref와 runtime을 하나씩 둡니다
      </h2>
      <p>
        list reveal과 click 뒤 생성되는 pulse는 같은 GSAP API를 쓰더라도 수명과
        target이 다릅니다. 그래서 각 component resource는 own scope ref와
        runtime source를 가지며, 공통 component는 animation target ref를
        명시적으로 받습니다.
      </p>
      <p>
        이 페이지는{' '}
        <a href={toHref('/fundamentals/react-use-gsap')}>
          core React useGSAP lesson
        </a>
        의 설치·registration·hook signature를 반복하지 않습니다. 여기서는
        props/callback/context로 resource를 조합하는 선택과 imperative GSAP의
        경계만 다룹니다.
      </p>
    </section>
  )
}
