/** component cleanup에서 temporary Flip mutation을 원래 inline style과 flow로 되돌린다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
export function RestorationSection() {
  return (
    <section id="restoration" className="flip-fit-absolute-page__section">
      <SectionHeading
        number="05"
        id="restoration"
        title="inline style과 flow를 복원한다"
        description="lab은 run 전 original style을 저장하고 tween을 kill한 뒤 restore control과 unmount cleanup에서 같은 값을 되돌립니다."
      />
      <p>
        읽기 순서와 focus order는 DOM을 옮기거나 tabindex를 바꾸지 않아
        유지합니다. 이 도구를 쓰기 전에는{' '}
        <a href={toHref('/fundamentals/flip-first-last')}>Flip의 state capture와 from/to 순서</a>를
        먼저 확인하세요.
      </p>
    </section>
  )
}
