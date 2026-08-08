/** recent()가 시간상 마지막이 아니라 코드상 가장 최근에 넣은 child를 돌려준다는 계약을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 recent() 예제의 삽입 순서와 주석 의미를 실행 없이 그대로 읽게 한다
const officialExample = `tl.to(e1, { duration: 999, x: 100, repeat: 5 }) // 아주 긴 tween
tl.to(e2, { duration: 1, y: 200 }, 0.5) // timeline 앞쪽 0.5초에 삽입
tl.to(e3, { duration: 1, scaleX: 2 }, tl.recent().endTime() + 3)
// 가장 최근에 추가된 e2가 끝난 뒤 3초에 삽입`

export function RecentSection() {
  return (
    <section id="recent-pointer" className="placement-page__section" aria-labelledby="recent-pointer-title">
      <SectionHeading
        number="04"
        id="recent-pointer"
        title="방금 넣은 child를 가리키기"
        description="recent()는 timeline 끝에 가장 가까운 child가 아니라, 가장 최근 add 호출로 들어온 Tween·Timeline·Callback을 돌려줍니다. position의 < 또는 >가 따르는 기준과 같은 규칙입니다."
      />

      <pre className="placement-page__code"><code>{'recent( ) : [Tween | Timeline | Callback]'}</code></pre>

      <div className="placement-page__split">
        <div className="placement-page__prose">
          <p>공식 페이지에는 <code>Parameters</code> 절이 없습니다. 인자 없이 호출하고 <code>Tween | Timeline | Callback</code> 가운데 방금 넣은 child를 받습니다.</p>
          <p>반환 목록에 <strong>Label이 없는 것</strong>이 중요합니다. label은 시간축에 이름만 기록할 뿐 child가 아닙니다.</p>
        </div>
        <div className="placement-page__prose">
          <p>공식 정의는 위치와 무관하게 <strong>가장 최근에 추가된 child</strong>를 돌려준다는 것입니다.</p>
          <p>따라서 999초짜리 e1보다 훨씬 앞쪽 0.5초에 e2를 나중에 넣어도 <code>recent()</code>는 e2입니다.</p>
        </div>
      </div>

      <div className="placement-page__subheading">
        <h3>공식 예제는 recent() 반환값의 endTime()을 바로 읽습니다</h3>
        <p>긴 child의 끝이 아니라 방금 삽입한 짧은 child의 끝을 기준으로 다음 자리를 계산하려는 예입니다.</p>
      </div>
      <pre className="placement-page__code"><code>{officialExample}</code></pre>

      <div className="placement-page__note placement-page__note--probe">
        <h3>비어 있거나 label만 바뀌면 recent()는 어떻게 될까요</h3>
        <ul className="placement-page__list">
          <li>아직 child가 없는 Timeline에서 <code>recent()</code>는 <code>undefined</code>였습니다.</li>
          <li><code>addLabel()</code>이나 <code>add('label')</code>은 labels 맵만 바꾸고 기존 recent child를 바꾸지 않았습니다.</li>
          <li><code>shiftChildren()</code>은 그 child의 위치를 옮길 뿐, 최근에 넣은 순서를 바꾸지 않았습니다.</li>
        </ul>
        <p className="placement-page__provenance">공식 페이지에 없는 내용입니다. GSAP 3.15.0의 paused Timeline에서 빈 상태·Tween 추가·label 추가·shift 순서로 호출하고 <code>recent()</code> 객체 identity를 읽었습니다.</p>
      </div>
    </section>
  )
}
