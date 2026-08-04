/** attr 객체의 문법과 값 규칙(개수 제한 없음·suffix 유지·단위 변환 없음)을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const attrAnatomy = `gsap.to('#rect', {
  duration: 1,

  attr: {          // ← attribute는 이 안에만 적습니다
    width: 100,    //    <rect width="..."> 를 100으로
    height: 100,   //    <rect height="..."> 를 100으로
  },
})`

// 공식 문서가 명시한 값 규칙만 옮긴다 — 게시되지 않은 칸은 표에서 명시적으로 비운다
const valueRules = [
  {
    rule: '움직일 수 있는 값',
    detail: 'numeric attribute',
    note: '공식 문서는 "numeric attribute"라고만 밝힙니다. 숫자가 아닌 값의 처리 규칙은 게시돼 있지 않습니다.',
  },
  {
    rule: '동시에 적을 수 있는 개수',
    detail: '제한 없음',
    note: '공식 문장: "You can tween an unlimited number of attributes simultaneously."',
  },
  {
    rule: 'suffix가 붙은 값',
    detail: '유지됨',
    note: 'width="50%"처럼 % 가 붙은 값도 % 를 유지한 채 움직입니다.',
  },
  {
    rule: '단위 변환',
    detail: '없음',
    note: 'px에서 %로 바꾸는 식의 변환은 할 수 없습니다.',
  },
  {
    rule: '기본값·반환값',
    detail: '공식 페이지에 명시 없음',
    note: 'Attributes 문서에는 signature 블록, 인자 표, 기본값 표, 반환값 절이 없습니다.',
  },
]

export function AttrSyntaxSection() {
  return (
    <section id="attr-syntax" className="non-css-page__section" aria-labelledby="attr-syntax-title">
      <SectionHeading
        number="02"
        id="attr-syntax"
        title="attribute는 attr 객체 안에 적는다"
        description="element의 태그에 직접 붙어 있는 속성 — SVG의 width, height, r 같은 것 — 을 움직이는 방법입니다. 적는 자리가 CSS와 다릅니다."
      />

      <div className="non-css-page__split">
        <div className="non-css-page__prose">
          <p>
            HTML이나 SVG 태그를 보면 <code>&lt;rect width="500"&gt;</code>처럼 값이 태그 안에 적혀 있습니다. 이걸{' '}
            <strong>attribute</strong>라고 합니다. CSS 스타일이 아니라 element 자체가 들고 있는 값입니다.
          </p>
          <p>
            GSAP은 이 중 <strong>숫자로 된 attribute</strong>를 움직일 수 있습니다. 방법은 하나뿐입니다.{' '}
            <code>attr</code>이라는 이름의 객체를 만들고 <strong>그 안에</strong> attribute 이름과 목표값을 적습니다.
          </p>
          <p>
            바깥에 <code>width: 100</code>이라고 적으면 GSAP은 그걸 CSS의 <code>width</code>로 해석합니다. attribute를 바꾸고 싶다면
            반드시 <code>attr</code> 안이어야 합니다.
          </p>
        </div>
        <pre className="non-css-page__code">
          <code>{attrAnatomy}</code>
        </pre>
      </div>

      <div className="non-css-page__subheading">
        <h3>공식 문서가 밝힌 값 규칙</h3>
        <p>Attributes 문서가 실제로 적어 둔 내용만 옮깁니다. 게시되지 않은 항목은 그렇다고 표시했습니다.</p>
      </div>

      <div className="non-css-page__table-wrap">
        <table className="non-css-page__rules-table">
          <caption>attr에 적는 값의 규칙</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">내용</th>
              <th scope="col">근거</th>
            </tr>
          </thead>
          <tbody>
            {valueRules.map((row) => (
              <tr key={row.rule}>
                <th scope="row">{row.rule}</th>
                <td>{row.detail}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="non-css-page__warning">
        <h3>단위를 바꾸려고 하면 안 됩니다</h3>
        <p>
          CSS에서는 <code>width</code>를 <code>px</code>에서 <code>%</code>로 바꾸는 애니메이션이 됩니다. 하지만{' '}
          <strong>attribute에서는 단위 변환이 없습니다.</strong> <code>50%</code>에서 시작했다면 <code>%</code> 단위 안에서만
          움직입니다. 시작값과 목표값의 단위를 맞춰 두는 것이 안전합니다.
        </p>
      </div>
    </section>
  )
}
