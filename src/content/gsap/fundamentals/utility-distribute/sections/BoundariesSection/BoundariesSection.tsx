/** 계산 함수와 tween·stagger의 소유권 경계를 공식 예제 수준에서만 연결한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="utility-distribute-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="05" id="boundaries" title="tween과 stagger에는 함수만 건넨다" description="이 페이지는 숫자 배분 함수까지 설명하고, 재생·stagger 문법은 소유하지 않습니다." />
      <div className="utility-distribute-page__split">
        <div className="utility-distribute-page__prose"><h3>function-based value 경계</h3><pre className="utility-distribute-page__code"><code>{`gsap.to('.class', {\n  scale: gsap.utils.distribute({\n    base: 0.5,\n    amount: 2.5,\n    from: 'center',\n  }),\n})`}</code></pre><p>공식 예제처럼 반환 함수를 tween property에 넣을 수 있습니다. 이 페이지의 heatmap은 같은 함수가 먼저 어떤 숫자를 내는지만 보여 줍니다.</p></div>
        <div className="utility-distribute-page__prose"><h3>advanced stagger 경계</h3><p>공식 문서는 advanced stagger가 내부적으로 <code>distribute()</code>를 쓴다고 밝힙니다. 하지만 <code>stagger</code>의 전체 설정·재생 효과는 이 페이지의 coverage가 아닙니다.</p><p><code>distribute()</code>는 stagger 전용이 아니며, 배열 위치로 값을 계산해야 하는 어디에나 사용할 수 있습니다.</p></div>
      </div>
      <p className="utility-distribute-page__note">공식 페이지 끝에는 SnorklTV 과정 영상과 companion Pen이 학습 자료로 소개되지만, 문서 본문에는 추가 동작 계약이 게시되어 있지 않습니다.</p>
      <aside className="utility-distribute-page__official-error"><h3>공식 원문 오류 보존</h3><p>영상 안내 문장의 <code>may help your understand</code>는 <code>you</code> 자리에 <code>your</code>가 적힌 원문 오타입니다.</p></aside>
    </section>
  )
}
