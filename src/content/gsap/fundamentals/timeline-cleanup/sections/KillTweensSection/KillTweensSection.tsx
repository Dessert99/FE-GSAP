/** killTweensOf의 target·property·active 세 범위를 단계적으로 좁혀 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Parameters 절의 세 인자를 이름·타입·기본 동작까지 보존한다
const parameterRows = [
  ['targets', 'Selector text | Array | Object', '이 Timeline 안에서 어느 target의 Tween을 찾을지 정합니다.'],
  ['props', 'String', '쉼표로 나눈 property 이름이며 선택 사항입니다. null이면 모든 property입니다.'],
  ['onlyActive', 'Boolean', 'true면 지금 진행 중인 Tween만 영향을 받습니다.'],
] as const

export function KillTweensSection() {
  return (
    <section id="kill-tweens" className="tl-cleanup-page__section" aria-labelledby="kill-tweens-title">
      <SectionHeading number="03" id="kill-tweens" title="target과 property 범위로 멈춘다" description="container 전체를 버리지 않고 특정 target의 Tween, 그중 특정 property, 그중 현재 active인 것만 차례로 좁힐 수 있습니다." />
      <pre className="tl-cleanup-page__code"><code>{"tl.killTweensOf('.box')\ntl.killTweensOf('.box', 'x,y')\ntl.killTweensOf('.box', 'x,y', true)"}</code></pre>
      <div className="tl-cleanup-page__table-wrap tl-cleanup-page__table-wrap--spaced">
        <table className="tl-cleanup-page__table"><caption><code>killTweensOf()</code> 공식 Parameters</caption><thead><tr><th scope="col">인자</th><th scope="col">타입</th><th scope="col">역할</th></tr></thead><tbody>{parameterRows.map(([name, type, detail]) => <tr key={name}><th scope="row"><code>{name}</code></th><td>{type}</td><td>{detail}</td></tr>)}</tbody></table>
      </div>
      <div className="tl-cleanup-page__split tl-cleanup-page__split--spaced">
        <article className="tl-cleanup-page__prose"><h3>property 일부만 죽이면</h3><p>한 Tween이 <code>x</code>와 <code>opacity</code>를 함께 움직여도 <code>props: 'x'</code>만 kill할 수 있습니다. probe에서 시간을 더 옮기자 x는 중단값에 고정되고 opacity는 계속 변했으며, Tween child도 Timeline 안에 남았습니다.</p></article>
        <article className="tl-cleanup-page__prose"><h3><code>onlyActive</code>를 켜면</h3><p>공식 설명의 active는 “진행 중”입니다. paused Timeline에서 아직 시작 전인 Tween은 <code>true</code>일 때 건드리지 않고, 같은 fixture에서 <code>false</code>로 호출하면 제거됐습니다.</p></article>
      </div>
      <p className="tl-cleanup-page__note">반환은 공식 문서와 실행 모두 <code>Timeline self</code>라서 chaining할 수 있습니다. 전역 <code>gsap.killTweensOf()</code>와 달리 여기서는 <strong>이 Timeline 내부</strong>가 조회·중단 경계입니다.</p>
    </section>
  )
}
