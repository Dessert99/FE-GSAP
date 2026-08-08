/** DOM 대상을 배열로 만들고 원소를 고르는 네 utility의 상태·변이 차이를 구분한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { UtilityFamilyTable } from '../../components/UtilityFamilyTable/UtilityFamilyTable'

export function CollectionFamilySection() {
  return (
    <section className="utils-page__section" id="collection-family" aria-labelledby="collection-family-title">
      <SectionHeading number="06" id="collection-family" title="대상을 모으고 고르는 4개" description="selector 범위를 고정하고 배열로 바꾸거나, 후보 하나와 순서를 무작위로 고르는 갈래입니다." />
      <UtilityFamilyTable family="collection" caption="대상과 무작위 utility 4개 — 두 공식 허브의 설명 차이" />
      <aside className="utils-page__warning"><h3><code>shuffle</code>만 원본 배열을 바꿉니다</h3><p>공식 설명이 <em>in-place</em>라고 명시합니다. 원래 순서가 필요하면 복사한 배열을 넘겨야 합니다. 무작위 결과 자체와 복사 전략은 후속 <strong>utility-collections-random</strong> 레슨에서 다룹니다.</p></aside>
    </section>
  )
}
