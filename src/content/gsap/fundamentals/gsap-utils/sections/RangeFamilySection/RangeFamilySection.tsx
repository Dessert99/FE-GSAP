/** 범위를 제한·변환·보간하는 다섯 utility를 두 공식 허브의 문장으로 비교한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { UtilityFamilyTable } from '../../components/UtilityFamilyTable/UtilityFamilyTable'

export function RangeFamilySection() {
  return (
    <section className="utils-page__section" id="range-family" aria-labelledby="range-family-title">
      <SectionHeading number="04" id="range-family" title="범위를 자르고 옮기고 섞는 5개" description="숫자의 경계를 지키거나 진행도로 바꾸고, 숫자·색·객체 사이 값을 만드는 갈래입니다." />
      <UtilityFamilyTable family="range" caption="범위와 보간 utility 5개 — 두 공식 허브의 설명 차이" />
      <p className="utils-page__boundary">이 페이지에서는 무엇을 고를지만 정합니다. 호출 overload·범위 밖 값·객체 보간·색 형식은 후속 <strong>range-interpolation</strong> 레슨이 소유합니다.</p>
    </section>
  )
}
