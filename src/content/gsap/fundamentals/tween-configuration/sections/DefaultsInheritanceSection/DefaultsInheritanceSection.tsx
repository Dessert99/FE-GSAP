/** defaults가 Tween에 실리는 순간과 merge 동작을 실행 예제로 확인하게 한다. */
import { DefaultsInheritanceExample } from '../../examples/DefaultsInheritanceExample/DefaultsInheritanceExample'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function DefaultsInheritanceSection() {
  return (
    <section id="defaults-inheritance" className="tween-config-page__section" aria-labelledby="defaults-inheritance-title">
      <SectionHeading
        number="03"
        id="defaults-inheritance"
        title="기본값이 Tween에 실리는 순간"
        description="defaults는 이미 만들어진 Tween을 나중에 바꾸는 장치가 아닙니다. 값이 언제 복사되는지 직접 확인해 봅니다."
      />

      <p className="tween-config-page__lead">
        GSAP은 처음부터 기본값을 가지고 있습니다. 아무 설정도 하지 않은 상태에서 <code>gsap.defaults()</code>를 읽으면{' '}
        <code>duration</code>, <code>overwrite</code>, <code>delay</code>, <code>ease</code> 네 개가 들어 있고 <code>duration</code>은{' '}
        <code>0.5</code>초입니다. 우리가 하는 일은 이 목록을 새로 만드는 게 아니라 <strong>일부를 덮어쓰는 것</strong>입니다.
        <br />
        <small>이 초기 목록은 공식 문서에 게시된 계약이 아니라 GSAP 3.15.0 구현과 실행에서 확인한 값입니다.</small>
      </p>

      <DefaultsInheritanceExample />

      <div className="tween-config-page__warning">
        <p>
          <strong>주의: 읽어 온 객체는 사본이 아닙니다.</strong> <code>gsap.defaults()</code>가 돌려주는 객체는 GSAP 내부가 쓰는 바로 그
          객체입니다. 나중에 되돌리려고 그대로 들고 있으면 값이 함께 바뀌어 복원에 실패합니다. 예제처럼{' '}
          <code>{'{ ...gsap.defaults() }'}</code>로 펼쳐 복사해야 합니다.
        </p>
      </div>

      <p className="tween-config-page__note">
        이 반환값과 merge 동작 역시 <strong>공식 문서에는 게시돼 있지 않습니다.</strong> 설치된 GSAP 3.15.0의 구현과 실제 실행으로 확인한
        내용이라, 버전을 올릴 때 다시 확인해야 합니다.
      </p>
    </section>
  )
}
