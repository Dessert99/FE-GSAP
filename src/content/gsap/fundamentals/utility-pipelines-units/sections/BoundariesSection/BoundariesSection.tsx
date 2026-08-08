/** 네 함수의 호출 선택 기준과 공식 오류·호환 실패를 마지막에 대조한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section className="pipeline-units-page__section" id="boundaries" aria-labelledby="boundaries-title">
      <SectionHeading
        number="04"
        id="boundaries"
        title="원문 오류와 실행 경계를 구분한다"
        description="공식에 적힌 문장, 공식 문서끼리 어긋난 표기, GSAP 3.15.0 실행으로만 확인한 결과를 한 사실처럼 합치지 않습니다."
      />

      <div className="pipeline-units-page__table-wrap">
        <table className="pipeline-units-page__table">
          <caption>네 utility의 입력·반환·선택 기준</caption>
          <thead><tr><th scope="col">utility</th><th scope="col">공식 인자</th><th scope="col">공식 반환</th><th scope="col">고르는 질문</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>pipe</code></th><td>원하는 만큼의 function</td><td>Function</td><td>같은 변환 순서를 여러 입력에 재사용하는가?</td></tr>
            <tr><th scope="row"><code>getUnit</code></th><td>value: String</td><td>String</td><td>숫자 뒤의 단위만 관찰해야 하는가?</td></tr>
            <tr><th scope="row"><code>unitize</code></th><td>function, unit?: String</td><td>Function</td><td>숫자 함수 앞뒤에서 단위를 자동으로 떼고 붙일 것인가?</td></tr>
            <tr><th scope="row"><code>checkPrefix</code></th><td>property: String</td><td>String 표기</td><td>현재 브라우저가 사용할 CSS property 이름이 필요한가?</td></tr>
          </tbody>
        </table>
      </div>

      <div className="pipeline-units-page__finding-grid">
        <article className="pipeline-units-page__warning">
          <h3><code>pipe</code> 전용 문서의 새 오타</h3>
          <p>공식 첫 예제는 <code>transfrom</code>을 선언하고 다음 줄에서 <code>transform</code>을 호출합니다. 그대로 실행하면 <code>ReferenceError</code>입니다. 이 페이지의 lab은 의도대로 한 이름을 쓰되 원문 오류를 감추지 않습니다.</p>
        </article>
        <article className="pipeline-units-page__warning">
          <h3>허브의 기존 오류는 그대로 보존</h3>
          <p>page 35의 Utility Methods 원문은 <code>checkPrefix</code> 설명에서 <code>provided</code>를 <code>proved</code>로 잘못 적고, <code>var wrap = gsap.utils.unitize(...)</code> 다음에 <code>wrap("150px")</code>을 시작하면서 사이 세미콜론을 빠뜨렸습니다. 전용 문서에는 두 표기가 올바르지만, 이전 원문을 정정된 사실로 덮어쓰지 않습니다.</p>
        </article>
        <article className="pipeline-units-page__note pipeline-units-page__note--probe">
          <h3>숫자로 시작하지 않으면 pipeline을 멈추세요</h3>
          <p><code>getUnit("calc(100% - 2px)")</code>와 <code>getUnit(".5em")</code>은 빈 문자열이고, <code>unitize(...)("auto")</code>의 안쪽 함수는 <code>NaN</code>을 받았습니다. 공식의 “숫자가 먼저”라는 전제 밖 입력입니다.</p>
        </article>
        <article className="pipeline-units-page__note pipeline-units-page__note--probe">
          <h3>빈 <code>pipe()</code>에 의미를 기대하지 마세요</h3>
          <p>공식 문서는 하나 이상의 함수 개수를 명시하지 않습니다. 설치본에서 함수 없이 만들면 입력을 그대로 돌려주지만, 변환이 없다면 pipeline을 만들 이유도 없습니다.</p>
        </article>
      </div>

      <p className="pipeline-units-page__boundary">관련 학습 경계 · 범위 계산 자체는 <a href={toHref('/fundamentals/range-interpolation')}>range-interpolation</a>, CSS property와 transform 값 표현은 <a href={toHref('/fundamentals/css-animation')}>css-animation</a>, 매 render modifier 적용은 <a href={toHref('/fundamentals/modifiers-snap-wrap')}>modifiers-snap-wrap</a>가 소유합니다.</p>
    </section>
  )
}
