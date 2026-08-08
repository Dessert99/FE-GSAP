/** 여러 대상에 값을 배분하거나 범위 안으로 순환시키는 네 utility를 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { UtilityFamilyTable } from '../../components/UtilityFamilyTable/UtilityFamilyTable'

export function SpreadFamilySection() {
  return (
    <section className="utils-page__section" id="spread-family" aria-labelledby="spread-family-title">
      <SectionHeading number="07" id="spread-family" title="나눠 주고 범위 안으로 되돌리는 4개" description="index나 grid 위치로 서로 다른 값을 만들고, 범위를 넘은 숫자와 배열 index를 순환·왕복시키는 갈래입니다." />
      <UtilityFamilyTable family="spread" caption="배분과 순환 utility 4개 — 두 공식 허브의 설명 차이" />
      <aside className="utils-page__warning"><h3>공식 <code>wrapYoyo</code> 배열 예제의 이름 오류</h3><p><code>gsap.utils</code> 허브는 배열 예제에 <code>wrap(...)</code>이라고 적었지만, 설명과 실행 결과가 가리키는 함수는 <code>wrapYoyo(...)</code>입니다. 위 표는 실행으로 확인한 의도된 함수 이름을 사용합니다.</p></aside>
      <aside className="utils-page__note utils-page__note--probe"><h3>서로 다른 두 설명은 같은 동작을 가리킵니다</h3><p>두 허브의 <code>wrap</code>·<code>wrapYoyo</code> 문장은 다르지만, GSAP 3.15.0 실행은 숫자와 배열 예제 모두 표의 결과와 일치합니다. 값 관점과 index 관점의 차이입니다.</p></aside>
    </section>
  )
}
