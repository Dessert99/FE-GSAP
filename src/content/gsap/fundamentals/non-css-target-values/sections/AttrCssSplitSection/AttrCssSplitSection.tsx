/** 같은 이름이 attr 안팎에서 다른 채널로 해석된다는 공식 경계를 예제와 함께 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { SvgAttributeLab } from '../../examples/SvgAttributeLab/SvgAttributeLab'

const officialMarkup = `<rect id="rect" fill="none" x="0" y="0" width="500" height="400"></rect>`

const officialCall = `gsap.to("#rect", {
  duration: 1,
  attr: { x: 100, y: 50, width: 100, height: 100 },
  ease: "none",
  x: 200 // animate translateX() transform
});`

export function AttrCssSplitSection() {
  return (
    <section id="attr-css-split" className="non-css-page__section" aria-labelledby="attr-css-split-title">
      <SectionHeading
        number="03"
        id="attr-css-split"
        title="같은 이름 x가 두 곳에서 다르게 동작한다"
        description="공식 문서가 직접 경고하는 지점입니다. attr 안에 쓴 이름과 밖에 쓴 이름은 같아도 서로 다른 것을 움직입니다."
      />

      <div className="non-css-page__prose">
        <p>
          공식 Attributes 문서의 예제는 <strong>일부러</strong> <code>x</code>를 두 번 씁니다. 한 번은 <code>attr</code> 안에, 한 번은
          바깥에. 오타가 아니라 이 페이지의 핵심을 보여주려는 예제입니다.
        </p>
      </div>

      <div className="non-css-page__subheading">
        <h3>공식 예제 원문</h3>
        <p>Attributes 문서에 실린 markup과 호출을 그대로 옮깁니다.</p>
      </div>

      <pre className="non-css-page__code">
        <code>{officialMarkup}</code>
      </pre>
      <pre className="non-css-page__code">
        <code>{officialCall}</code>
      </pre>

      <div className="non-css-page__table-wrap">
        <table className="non-css-page__rules-table">
          <caption>같은 예제 안의 두 x</caption>
          <thead>
            <tr>
              <th scope="col">적은 자리</th>
              <th scope="col">움직이는 것</th>
              <th scope="col">결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <code>attr</code> 안의 <code>x: 100</code>
              </th>
              <td>
                rect element의 <strong>기하 좌표</strong>
              </td>
              <td>
                태그의 <code>x</code> 속성값 자체가 0에서 100으로 바뀝니다.
              </td>
            </tr>
            <tr>
              <th scope="row">
                <code>attr</code> 밖의 <code>x: 200</code>
              </th>
              <td>
                CSS <strong>transform</strong>
              </td>
              <td>
                <code>translateX()</code>가 적용되어 도형이 화면에서 밀립니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="non-css-page__warning">
        <h3>CSS property를 attr 안에 넣지 마세요</h3>
        <p>
          공식 문서의 문장입니다. <strong>CSS 관련 property를 attr 객체 안에서 animate하려 하면 안 됩니다.</strong> GSAP이 CSS를
          내부적으로 다르게 처리하기 때문입니다. attribute 값을 바꾸려면 <code>attr</code> 안에 적고, CSS 값은 바깥에 적어 두 자리를
          구분하세요.
        </p>
        <p>
          CSS 값과 transform이 실제로 어떻게 처리되는지는{' '}
          <a href={toHref('/fundamentals/css-animation')}>CSS animation 페이지</a>가 다룹니다.
        </p>
      </div>

      <SvgAttributeLab />
    </section>
  )
}
