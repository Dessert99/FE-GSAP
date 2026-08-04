/** 모든 animation의 부모인 globalTimeline의 형태와 네 메서드, 전역 조작의 부작용을 설명한다. */
import { GlobalTimeScaleLab } from '../../examples/GlobalTimeScaleLab/GlobalTimeScaleLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 페이지가 Useful Methods로 묶어 둔 네 항목 — 타입·기본값·반환값을 함께 적는다
const methods = [
  {
    name: '.pause()',
    signature: 'gsap.globalTimeline.pause()',
    effect: 'global timeline을 일시정지한다. 공식 표현으로 모든(ALL) animation에 영향을 준다.',
    returns: '자기 자신(globalTimeline)',
    note: '공식 문서에 인자 명세 없음',
  },
  {
    name: '.play()',
    signature: 'gsap.globalTimeline.play()',
    effect: 'global timeline을 다시 재생한다. 마찬가지로 모든(ALL) animation에 영향을 준다.',
    returns: '자기 자신(globalTimeline)',
    note: '공식 문서에 인자 명세 없음',
  },
  {
    name: '.paused()',
    signature: 'gsap.globalTimeline.paused()',
    effect: '일시정지 상태면 true, 재생 중이면 false를 돌려준다.',
    returns: 'Boolean',
    note: '설치본 기본값은 false (실행 확인)',
  },
  {
    name: '.timeScale()',
    signature: 'gsap.globalTimeline.timeScale(multiplier?)',
    effect:
      '모든(ALL) animation에 영향을 주는 배수인 global time scale을 가져오거나 설정한다. 인자를 주면 setter, 안 주면 getter다.',
    returns: 'getter는 Number, setter는 자기 자신',
    note: '설치본 기본값은 1 (실행 확인)',
  },
]

// 공식 globalTimeline 페이지에 실린 코드 예제 원문
const officialExample = `gsap.globalTimeline.timeScale(0.5); //plays at half-speed
gsap.globalTimeline.timeScale(2); //plays twice the normal speed
var currentTimeScale = gsap.globalTimeline.timeScale(); //returns the current global timeScale`

// globalTimeline 아래에 무엇이 매달리는지 보여주는 트리
const rootChildren = [
  { label: "gsap.to('.box', {...})", detail: 'Tween — 만들자마자 root의 자식이 된다' },
  { label: 'gsap.timeline()', detail: 'Timeline — 자기 자식들을 데리고 root에 붙는다' },
  { label: 'gsap.delayedCall(2, fn)', detail: '공식 표현으로 "기술적으로는 tween"이라 함께 매달린다' },
]

export function GlobalTimelineSection() {
  return (
    <section id="global-timeline" className="root-clock-page__section" aria-labelledby="global-timeline-title">
      <SectionHeading
        number="02"
        id="global-timeline"
        title="시간의 구조 — 모든 animation의 부모"
        description="globalTimeline은 우리가 만든 적 없는데 이미 존재하고, 우리가 붙인 적 없는데 모든 Tween이 이미 매달려 있는 timeline입니다."
      />

      <div className="root-clock-page__prose">
        <p>
          <strong>Timeline</strong>은 여러 animation을 시간 위에 늘어놓고 하나처럼 다루는 GSAP 객체입니다. 공식 문서는{' '}
          <code>gsap.globalTimeline</code>의 <strong>Type을 Timeline</strong>이라고 명시합니다. 즉 특별한 종류가 아니라{' '}
          <strong>우리가 만들 수 있는 것과 같은 Timeline인데, 맨 위에 하나만 있고 이미 돌고 있는 것</strong>입니다.
        </p>
        <p>
          그래서 <code>gsap.to()</code>로 만든 Tween은 어디에 넣으라고 말하지 않아도 이 timeline의 <strong>자식</strong>이 됩니다.
          부모가 시간을 옮기면 자식이 따라 움직이는 것이 GSAP이 "저절로 움직이는" 것처럼 보이는 이유입니다.
        </p>
      </div>

      <div className="root-clock-page__tree" aria-label="globalTimeline과 자식들의 관계">
        <div className="root-clock-page__tree-root">
          <strong>gsap.globalTimeline</strong>
          <span>Type : Timeline · 앱에 하나뿐이고 이미 재생 중이다</span>
        </div>
        <ul>
          {rootChildren.map((child) => (
            <li key={child.label}>
              <code>{child.label}</code>
              <span>{child.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <h3>실행으로 확인한 부모 관계</h3>
        <p>
          공식 페이지는 "root Timeline instance"라고만 적고 부모 관계를 코드로 보여 주지는 않습니다. 설치본 GSAP 3.15.0을 직접
          실행해 확인한 결과, <code>gsap.to()</code>가 돌려준 Tween의 <code>parent</code>와 <code>gsap.delayedCall()</code>이 돌려준
          Tween의 <code>parent</code>가 모두 <code>gsap.globalTimeline</code>과 같은 객체였습니다. globalTimeline 자신의{' '}
          <code>parent</code>는 <code>null</code>이고, <code>smoothChildTiming</code>과 <code>autoRemoveChildren</code>가 모두{' '}
          <code>true</code>였습니다.
        </p>
        <p className="root-clock-page__provenance">
          측정 방법 · Node에서 <code>import gsap from 'gsap'</code> 뒤 <code>tween.parent === gsap.globalTimeline</code>을 그대로
          출력. 재현 조건 · gsap 3.15.0, 다른 라이브러리 없이 단독 실행.
        </p>
      </div>

      <div className="root-clock-page__subheading">
        <h3>공식이 "Useful Methods"로 묶어 둔 네 가지</h3>
        <p>전부 globalTimeline 하나에 거는 조작이라, 효과의 범위가 언제나 앱 전체입니다.</p>
      </div>

      <div className="root-clock-page__table-wrap">
        <table className="root-clock-page__table">
          <caption>공식 globalTimeline 페이지의 Useful Methods와 반환값</caption>
          <thead>
            <tr>
              <th scope="col">메서드</th>
              <th scope="col">호출 형태</th>
              <th scope="col">하는 일</th>
              <th scope="col">반환값</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.name}>
                <th scope="row">
                  <code>{method.name}</code>
                  <small>{method.note}</small>
                </th>
                <td>
                  <code>{method.signature}</code>
                </td>
                <td>{method.effect}</td>
                <td>{method.returns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <p>
          공식 문서는 <code>.pause()</code>와 <code>.play()</code>에만 "자기 자신을 반환한다"고 적습니다. 실행해 보니{' '}
          <code>timeScale(값)</code> 설정도 globalTimeline 자신을 돌려주어 이어 붙일 수 있었습니다.
        </p>
        <p className="root-clock-page__provenance">
          측정 방법 · <code>gsap.globalTimeline.timeScale(1) === gsap.globalTimeline</code>이 <code>true</code>인지 출력. 재현 조건 ·
          gsap 3.15.0, Node 단독 실행.
        </p>
      </div>

      <div className="root-clock-page__subheading">
        <h3>timeScale이 하지 않는 일</h3>
        <p>여기서 오해가 가장 많이 생깁니다. 공식 문장을 그대로 봅니다.</p>
      </div>

      <div className="root-clock-page__split">
        <div className="root-clock-page__prose">
          <p>
            공식 문서는 <code>timeScale()</code>이 <strong>개별 tween/timeline의 timeScale()을 실제로 설정하는 것이 아니라</strong>,
            다른 모든 animation을 담고 있는 <strong>root timeline이 재생되는 속도</strong>에 영향을 준다고 못 박습니다. 그리고 이것이
            모든 animation을 한 번에 빠르게 하거나 느리게 하는 <strong>훌륭한 방법</strong>이라고 덧붙입니다.
          </p>
          <p>
            차이가 중요한 이유는, 내 Tween을 나중에 읽어 보면 <code>duration</code>도 <code>timeScale</code>도 내가 적은 그대로라는
            것입니다. 느려진 것은 <strong>Tween이 아니라 Tween이 올라타 있는 시간</strong>입니다.
          </p>
        </div>
        <pre className="root-clock-page__code">
          <code>{officialExample}</code>
        </pre>
      </div>

      <GlobalTimeScaleLab />

      <div className="root-clock-page__warning">
        <h3>isActive()는 여기서 쓸모가 없다</h3>
        <p>
          공식 문서의 경고입니다 — global timeline은 다른 모든 tween과 timeline을 구동하는 데 쓰이므로,{' '}
          <strong>현재 활성 상태인 animation이 하나도 없어도</strong> <code>gsap.globalTimeline.isActive()</code>는{' '}
          <strong>항상 true</strong>를 돌려줍니다.
        </p>
        <p>
          그래서 "지금 화면에 도는 animation이 있나?"를 이 값으로 판단하면 안 됩니다. 실행으로도 자식이 0개인 상태에서{' '}
          <code>true</code>가 나오는 것을 확인했습니다.
        </p>
      </div>

      <div className="root-clock-page__warning">
        <h3>delayedCall도 함께 멈춘다</h3>
        <p>
          공식 문서는 <code>gsap.delayedCalls()</code>도 <strong>기술적으로는 tween</strong>이라서, globalTimeline을{' '}
          <code>pause()</code>하거나 <code>timeScale()</code>하면 <strong>delayedCall에도 영향이 간다</strong>고 밝힙니다.
        </p>
        <p>
          "화면 애니메이션만 잠깐 멈추자"고 <code>pause()</code>를 걸었는데 2초 뒤 실행하기로 예약해 둔 로직까지 함께 멈추는 사고가
          여기서 납니다. 공식 문서는 그것들을 빼고 싶다면 <code>gsap.exportRoot()</code>를 보라고 안내하는데, 05단계에서 다룹니다.
        </p>
      </div>
    </section>
  )
}
