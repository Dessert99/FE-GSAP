/** 현재 세 utility가 소유하지 않는 lifecycle·distribution·pipeline 주제를 분리한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 다음 학습으로 넘길 개념의 소유 경계를 명시한다. */
export function BoundariesSection() {
  return (
    <section className="utility-collections-page__section" id="boundaries">
      <SectionHeading number="05" title="여기서 다루지 않는 것">후보를 고르고 섞는 일까지만 이 페이지의 책임입니다. selector의 lifecycle ownership과 값 분배 계산은 다른 페이지가 더 정확한 문맥을 가집니다.</SectionHeading>
      <ul className="utility-collections-page__boundary-list"><li><a href={toHref('/fundamentals/gsap-context')}>gsap.context()와 selector()</a> — selector scope의 생성·정리 lifecycle</li><li><code>distribute()</code> — index와 grid에서 target마다 다른 value를 계산하는 규칙</li><li><a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a> — targets와 function values를 Tween vars로 해석하는 계약</li></ul>
    </section>
  )
}
