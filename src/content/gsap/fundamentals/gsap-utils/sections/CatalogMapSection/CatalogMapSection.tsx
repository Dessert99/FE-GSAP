/** 공식 17개 목록을 문제 갈래와 부수효과 기준으로 탐색하게 한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { utilityEntries, utilityFamilies } from '../../gsap-utils.utilities'

export function CatalogMapSection() {
  return (
    <section className="utils-page__section" id="catalog-map" aria-labelledby="catalog-map-title">
      <SectionHeading
        number="03"
        id="catalog-map"
        title="17개 전체 목록과 찾는 법"
        description="두 공식 허브가 나열한 이름은 정확히 같습니다. 이름을 외우기보다 지금 풀 문제에서 네 갈래 중 하나를 고르세요."
      />

      <div className="utils-page__family-grid">
        {utilityFamilies.map((family) => {
          const names = utilityEntries.filter((entry) => entry.family === family.id).map((entry) => entry.name)

          return (
            <article key={family.id}>
              <h3>{family.label}</h3>
              <p>{family.question}</p>
              <ul>
                {names.map((name) => <li key={name}><code>{name}</code></li>)}
              </ul>
            </article>
          )
        })}
      </div>

      <p className="utils-page__boundary">
        <code>gsap.utils</code>는 <strong>Utility·Description 두 열 표</strong>에 <code>clamp()</code>처럼 괄호까지 붙여 17개를 싣고,
        Utility Methods는 <strong>Available Utils heading</strong>에 <code>clamp</code>처럼 괄호 없이 17개를 싣습니다. 아래 표들은 실제 호출을
        찾기 쉽도록 괄호가 있는 표기로 통일하되, 이 원문 형식 차이는 coverage에서 보존합니다.
      </p>

      <div className="utils-page__badges" aria-label="utility 부수효과 구분">
        <article><strong>대부분: 입력 → 출력</strong><p>입력값을 계산해 새 값을 돌려주며 animation 상태를 만들지 않습니다.</p></article>
        <article><strong>환경을 읽음</strong><p><code>checkPrefix</code>는 브라우저 지원을, <code>selector</code>·<code>toArray</code>는 DOM 범위를 읽을 수 있습니다.</p></article>
        <article><strong>결과가 매번 달라짐</strong><p><code>random</code>과 <code>shuffle</code>은 무작위 결과를 만듭니다.</p></article>
        <article><strong>원본을 바꿈</strong><p><code>shuffle</code>은 공식 목록에서 유일하게 배열을 in-place로 바꾼다고 명시합니다.</p></article>
      </div>

      <aside className="utils-page__note utils-page__note--probe">
        <h3>설치본과 목록 대조</h3>
        <p>
          GSAP 3.15.0의 <code>Object.keys(gsap.utils)</code>도 같은 17개이며 모두 함수입니다. DOM이나 무작위 없이 결과를 고정할 수 있는
          11개 utility의 공식 예제 표현식 14개도 실행 결과와 일치했습니다. <code>checkPrefix</code>·<code>selector</code>·<code>toArray</code>는
          브라우저가 필요하고, <code>random</code>·<code>shuffle</code>은 결과가 무작위이며, <code>distribute</code>는 허브에 예제가 없어 이 실행
          묶음에서 제외했습니다.
        </p>
      </aside>
    </section>
  )
}
