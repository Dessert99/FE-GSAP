/** per-tween·global·Timeline default와 Core 밖의 ease를 구분한다. */
import { toHref } from '../../../../../../app/routes'
import { externalEaseFamilies } from '../../easing.catalog'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function DefaultsBoundarySection() {
  return (
    <section className="easing-page__section" aria-labelledby="easing-defaults">
      <SectionHeading number="04" id="easing-defaults" title="default의 범위와 외부 package를 분리합니다" description="어디에 ease를 선언하느냐와 해당 ease가 Core에 포함되는지는 서로 다른 질문입니다." />
      <pre><code>{`gsap.defaults({ ease: 'power2.out' })
const timeline = gsap.timeline({ defaults: { ease: 'sine.inOut' } })
gsap.to('.box', { x: 160, ease: 'none' }) // 이 Tween만 override`}</code></pre>
      <p>GSAP의 기본 ease는 <code>power1.out</code>입니다. global default는 앞으로 만들어질 Tween에, Timeline default는 그 children에 적용되고 한 Tween의 명시적 ease가 다시 override합니다.</p>
      <ul className="easing-page__boundary-list">{externalEaseFamilies.map((ease) => <li key={ease}>{ease}</li>)}</ul>
      <p className="easing-page__boundary">rough·slow·expoScale은 EasePack, Custom 계열은 별도 package입니다. 불러오고 등록하는 방법은 <a href={toHref('/fundamentals/installation')}>설치 페이지</a>에서, CustomBounce·CustomWiggle의 조절값은 <a href={toHref('/fundamentals/custom-bounce-wiggle')}>튕김과 흔들림</a>에서 이어서 확인하세요.</p>
    </section>
  )
}
