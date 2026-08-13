/** getById의 id 후보를 실제 중첩 트리에 조회해 중복·엄격 비교·undefined 결과를 보여준다. */
import { duplicatedId, idCandidates, nestedTimelineId, useIdLookupRuntime } from './useIdLookupRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './IdLookupLab.css'

export function IdLookupLab() {
  // hook이 실제 getById 호출로 만든 트리와 마지막 조회 결과를 그대로 받는다
  const { scope, nodes, result, status, lookup } = useIdLookupRuntime()
  // 마지막 버튼의 literal을 실행 코드와 결과 제목에 함께 쓴다
  const selected = result ? idCandidates.find((candidate) => candidate.key === result.candidateKey) : null
  // 반환 instance를 평탄화 목록의 같은 행으로 강조한다
  const foundNode = result?.foundIndex == null ? null : nodes[result.foundIndex]
  // 화면의 호출 문장은 실제 handler가 받은 candidate literal에서 만든다
  const lookupCall = selected
    ? `const found = master.getById(${selected.literal})\n// → ${foundNode ? `${foundNode.kind} id: ${String(foundNode.id)}` : 'undefined'}`
    : '// 위 id 버튼을 누르면 실제 getById 호출과 반환값이 여기에 표시됩니다.'
  // 조회 문장만 바뀌어도 독립 실행에 필요한 master tree와 cleanup은 항상 함께 표시한다
  const code = `import gsap from 'gsap'

const targets = {
  headline: { x: 0 }, badge: { x: 0 }, panel: { y: 0 }, icon: { y: 0 },
}
const master = gsap.timeline({ paused: true })
const group = gsap.timeline({ id: '${nestedTimelineId}' })
master.to(targets.headline, { x: 120, id: '${duplicatedId}' })
master.to(targets.badge, { x: 120, id: 7 })
group.to(targets.panel, { y: 40, id: '${duplicatedId}' })
group.to(targets.icon, { y: 40, id: 'inner' })
master.add(group)

${lookupCall}

function cleanup() {
  master.kill()
}`

  return (
    <section className="id-lookup-lab" aria-labelledby="id-lookup-lab-title" ref={scope}>
      <h3 id="id-lookup-lab-title">같은 id가 둘이면 어느 child가 돌아올까요?</h3>
      <p className="id-lookup-lab__goal">
        <code>{duplicatedId}</code>를 master 직계 tween과 <code>{nestedTimelineId}</code> 안쪽 tween에 한 번씩 붙였습니다. 실제
        <code> getById()</code> 결과가 밝아지는 행을 확인하세요.
      </p>

      <div className="id-lookup-lab__buttons" aria-label="조회할 id 선택">
        {idCandidates.map((candidate) => (
          <button
            key={candidate.key}
            type="button"
            aria-pressed={result?.candidateKey === candidate.key}
            onClick={() => lookup(candidate)}
          >
            <code>{candidate.literal}</code>
            <span>{candidate.hint}</span>
          </button>
        ))}
      </div>

      <p className="id-lookup-lab__status" role="status">{status}</p>

      <ol className="id-lookup-lab__tree" aria-label="getById 조회 대상 트리">
        {nodes.map((node) => {
          // 마지막 반환 instance와 같은 index인지로 강조 상태를 정한다
          const found = node.index === result?.foundIndex

          return (
            <li key={node.index} className={`id-lookup-lab__node id-lookup-lab__node--depth${node.depth}${found ? ' id-lookup-lab__node--found' : ''}`}>
              <span>{node.kind}</span>
              <code>{typeof node.id === 'number' ? `${node.id} (number)` : `'${node.id}' (string)`}</code>
              <span>{node.targetLabel}</span>
              <strong>{found ? '반환됨' : '—'}</strong>
            </li>
          )
        })}
      </ol>

      <pre className="id-lookup-lab__code"><code>{code}</code></pre>

      {result?.matchCount === 2 ? (
        <div className="id-lookup-lab__finding">
          <strong>공식 설명과 실행이 다릅니다.</strong>
          <p>공식은 “첫 번째 descendant”라고 쓰지만 GSAP 3.15.0 실행은 평탄화 목록의 뒤쪽에 있는 중첩 tween을 돌려줍니다.</p>
        </div>
      ) : null}

      <div className="id-lookup-lab__panels">
        <article><h4>무엇이 달라졌나요?</h4><p>트리는 그대로이고 반환된 instance 한 행만 밝아집니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p>숫자 <code>7</code>은 찾지만 문자열 <code>'7'</code>은 찾지 못합니다.</p></article>
        <article><h4>왜인가요?</h4><p>id는 변환 없이 <code>===</code>로 비교되고, 일치하지 않으면 <code>undefined</code>입니다.</p></article>
        <article><h4>언제 쓰나요?</h4><p>React에서 animation 변수를 멀리 전달하지 않고 local Timeline 안에서 다시 찾을 때 씁니다.</p></article>
      </div>

      <p className="id-lookup-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-inspection/examples/IdLookupLab/useIdLookupRuntime.ts" /></p>
    </section>
  )
}
