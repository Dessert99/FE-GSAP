/** constructor vars 22개를 공식 타입의 빈칸과 후속 페이지 소유 경계까지 한 표로 보존한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { timelineVars, untypedVarCount } from '../../timeline-basics.properties'

// 22개 vars를 구조·타이밍·반복·callback 순서로 묶어 긴 표를 찾기 쉽게 한다
const groupLabels = {
  structure: '구조와 상속',
  timing: '시작 상태와 시간',
  repeat: '반복',
  callback: '생애 callback',
} as const

export function TimelineVarsSection() {
  return (
    <section id="timeline-vars" className="timeline-page__section" aria-labelledby="timeline-vars-title">
      <SectionHeading number="03" id="timeline-vars" title="생성자에 넣을 수 있는 값 22개" description="vars는 child의 CSS 값을 적는 곳이 아니라 Timeline 자체의 시작 상태·반복·callback·상속 정책을 정하는 객체입니다." />

      <pre className="timeline-page__code"><code>{`gsap.timeline({
  onComplete: myFunction,
  repeat: 2,
  repeatDelay: 1,
  yoyo: true,
})`}</code></pre>

      <div className="timeline-page__table-wrap">
        <table className="timeline-page__table timeline-page__table--vars">
          <caption>공식 Timeline vars 22개 — 타입 빈칸 {untypedVarCount}개를 추측으로 채우지 않음</caption>
          <thead><tr><th scope="col">그룹</th><th scope="col">property</th><th scope="col">공식 타입</th><th scope="col">역할</th><th scope="col">기본·특수 규칙</th><th scope="col">이 페이지</th></tr></thead>
          <tbody>
            {timelineVars.map((item) => (
              <tr key={item.name}>
                <td>{groupLabels[item.group]}</td>
                <th scope="row"><code>{item.name}</code></th>
                <td>{item.officialType ?? '공식 타입 칸 비어 있음'}</td>
                <td>{item.role}</td>
                <td>{item.defaultOrSpecial}</td>
                <td>{item.ownedHere ? '직접 설명' : '목록 보존 · 후속 심화'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timeline-page__warning">
        <h3>공식 빈칸도 명세의 일부입니다</h3>
        <p><code>onInterrupt</code>·<code>onInterruptParams</code>·<code>repeatRefresh</code>는 공식 표의 타입 칸이 비어 있습니다. 본문이 Function·Array 동작을 설명해도 타입 칸을 임의로 채우지 않습니다.</p>
      </div>

      <div className="timeline-page__note">
        <h3>22개를 여기서 모두 깊게 배우지는 않습니다</h3>
        <p>이 페이지는 constructor에서 어떤 범주의 설정이 가능한지 전체 목록을 보존합니다. callback 예약은 앞의 Timeline 함수 페이지, repeat·smoothChildTiming·cleanup은 각각의 후속 페이지에서 실행 계약을 따로 다룹니다.</p>
      </div>
    </section>
  )
}
