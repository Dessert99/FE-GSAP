/** 계산 단계를 연결하고 CSS 단위를 보존하는 네 utility의 역할 경계를 보여준다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { UtilityFamilyTable } from '../../components/UtilityFamilyTable/UtilityFamilyTable'

export function ComposeFamilySection() {
  return (
    <section className="utils-page__section" id="compose-family" aria-labelledby="compose-family-title">
      <SectionHeading number="05" id="compose-family" title="함수를 잇고 단위를 지키는 4개" description="앞 계산의 출력을 뒤 계산의 입력으로 넘기거나, 브라우저 property와 문자열 단위를 다루는 갈래입니다." />
      <pre className="utils-page__pipeline" aria-label="utility pipeline 흐름"><code>입력 → clamp() → snap() → unitize() → 단위가 붙은 출력</code></pre>
      <UtilityFamilyTable family="compose" caption="조합과 단위 utility 4개 — 두 공식 허브의 설명 차이" />
      <aside className="utils-page__warning"><h3>공식 표의 문법 오류를 그대로 실행하지 마세요</h3><p>Utility Methods 허브의 <code>unitize</code> 예제는 함수 생성 뒤 세미콜론이 빠져 있습니다. 위 표는 의도를 읽을 수 있는 실행 형태로 정리했고, 원문의 오류 자체는 설명 칸에 남겼습니다.</p></aside>
    </section>
  )
}
