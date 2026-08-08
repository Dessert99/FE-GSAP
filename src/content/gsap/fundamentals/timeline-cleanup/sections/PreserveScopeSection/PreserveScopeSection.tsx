/** cleanup 호출보다 먼저 “무엇을 남길 것인가”를 선택하는 결정표와 단일 snapshot lab을 제시한다. */
import { CleanupScopeLab } from '../../examples/CleanupScopeLab/CleanupScopeLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 여섯 공식 source의 보존 범위를 같은 질문으로 비교하는 입구 표다
const decisionRows = [
  ['remove(value)', '고른 child·callback·label', 'Timeline과 나머지 내용'],
  ['clear(labels?)', '모든 child·callback, 선택적으로 label', 'Timeline과 event callback'],
  ['killTweensOf(targets, props?, onlyActive?)', 'target에 걸린 Tween의 전부 또는 일부 property', 'Timeline과 범위 밖 Tween/property'],
  ['kill()', '부모에 연결된 Timeline', '화면의 현재 값'],
  ['revert()', 'Timeline과 animation이 추가한 inline style', 'animation 이전 상태'],
  ['autoRemoveChildren', '완료된 child Tween·Timeline', '부모 Timeline과 label'],
] as const

export function PreserveScopeSection() {
  return (
    <section id="preserve-scope" className="tl-cleanup-page__section" aria-labelledby="preserve-scope-title">
      <SectionHeading number="01" id="preserve-scope" title="먼저 남길 것을 고른다" description="cleanup API 이름보다 중요한 질문은 세 가지입니다. container를 남길까요, child를 남길까요, target의 화면 상태를 남길까요?" />
      <div className="tl-cleanup-page__table-wrap">
        <table className="tl-cleanup-page__table">
          <caption>여섯 선택의 가장 작은 결정표</caption>
          <thead><tr><th scope="col">선택</th><th scope="col">사라지는 것</th><th scope="col">남는 것</th></tr></thead>
          <tbody>{decisionRows.map(([choice, removed, preserved]) => <tr key={choice}><th scope="row"><code>{choice}</code></th><td>{removed}</td><td>{preserved}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="tl-cleanup-page__note"><strong>container</strong>는 child의 시간 관계를 소유하는 Timeline instance입니다. <strong>child graph</strong>는 그 안의 Tween·Timeline·callback 목록이고, <strong>target state</strong>는 GSAP이 element에 실제로 쓴 값과 inline style입니다. 세 층을 분리해서 봐야 “멈췄는데 왜 스타일이 남지?” 같은 혼란을 피할 수 있습니다.</p>
      <CleanupScopeLab />
    </section>
  )
}
