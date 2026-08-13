/** 단계별 Timeline child, 실제 블록 배치와 실행 코드를 한 화면에서 함께 갱신한다. */
import { sequenceStages, type SequenceCall, useSequenceBuilderAnimation } from './useSequenceBuilderAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './SequenceBuilderLab.css'

// 한 creator descriptor를 실제 Timeline chaining 문법 한 줄로 직렬화한다
function serializeCall(call: SequenceCall) {
  const target = call.target === 'title' ? 'titleRef.current' : call.target === 'bar' ? 'barRef.current' : 'badgeRef.current'
  if (call.method === 'from') return `.from(${target}, { y: ${call.y}, autoAlpha: ${call.autoAlpha}, duration: ${call.duration} })`
  if (call.method === 'to') return `.to(${target}, { scaleX: ${call.scaleX}, duration: ${call.duration}, ease: '${call.ease}' })`
  if (call.method === 'set') return `.set(${target}, { autoAlpha: ${call.autoAlpha} })`
  return `.fromTo(${target}, { scale: ${call.fromScale} }, { scale: ${call.toScale}, duration: ${call.duration}, ease: '${call.ease}' })`
}

export function SequenceBuilderLab() {
  // runtime이 소유한 refs·단계·실제 block·action을 화면 표시와 control에 연결한다
  const { scope, titleRef, barRef, badgeRef, stageCount, blocks, status, reducedMotion, addNextStage, play, reset } =
    useSequenceBuilderAnimation()
  // 현재까지 추가된 descriptor만 Timeline chaining 코드로 표시한다
  const codeLines = sequenceStages.slice(0, stageCount).flatMap((stage) => stage.calls.map(serializeCall))
  // 실제 child의 끝 중 가장 큰 값을 block 너비 계산의 분모로 쓴다
  const totalDuration = Math.max(0, ...blocks.map((block) => block.start + block.duration))
  // 초기 상태·Timeline child·현재 재생 분기를 runtime 순서 그대로 직렬화한다
  const code = `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

function SequenceBuilderExample() {
const scope = useRef(null)
const titleRef = useRef(null)
const barRef = useRef(null)
const badgeRef = useRef(null)
const timelineRef = useRef(null)
const [, setStatus] = useState('')

useGSAP(() => {
  const title = titleRef.current
  const bar = barRef.current
  const badge = badgeRef.current
  if (!title || !bar || !badge) return
  gsap.set(title, { y: 0, autoAlpha: 1 })
  gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
  gsap.set(badge, { autoAlpha: 0, scale: 1 })

  const timeline = gsap.timeline({ paused: true })${codeLines.length > 0 ? `\n    ${codeLines.join('\n    ')}` : '\n  // 아직 child가 없습니다.'}

  timeline.eventCallback('onComplete', () => setStatus('현재까지 추가한 sequence가 모두 끝났습니다.'))
  timelineRef.current = timeline
  return () => {
    timeline.kill()
    timelineRef.current = null
  }
}, { scope })

function play() {
  const timeline = timelineRef.current
  if (!timeline) return
  ${reducedMotion ? 'timeline.progress(1, true).pause()' : 'timeline.restart()'}
}

function reset() {
  const timeline = timelineRef.current
  if (!timeline || !titleRef.current || !barRef.current || !badgeRef.current) return
  timeline.pause(0).clear()
  gsap.set(titleRef.current, { y: 0, autoAlpha: 1 })
  gsap.set(barRef.current, { scaleX: 0 })
  gsap.set(badgeRef.current, { autoAlpha: 0, scale: 1 })
}

return <div ref={scope}>
  <h2 ref={titleRef}>프로필 준비 중</h2>
  <span ref={barRef} />
  <span ref={badgeRef}>완료</span>
  <button onClick={play}>재생</button><button onClick={reset}>초기화</button>
</div>
}`

  return (
    <section className="sequence-builder" aria-labelledby="sequence-builder-title">
      <h3 id="sequence-builder-title">한 단계씩 child를 넣어 sequence 만들기</h3>
      <p className="sequence-builder__goal">
        버튼을 누를 때마다 descriptor의 다음 stage가 같은 Timeline에 추가됩니다. 실제 <code>startTime()</code>과 <code>duration()</code>으로
        그린 block이 chaining 코드와 함께 늘어나는지 확인하세요.
      </p>

      <div className="sequence-builder__demo" ref={scope}>
        <div className="sequence-builder__card">
          <h4 className="sequence-builder__title" ref={titleRef}>프로필 준비 중</h4>
          <div className="sequence-builder__bar" aria-hidden="true"><span className="sequence-builder__bar-fill" ref={barRef} /></div>
          <span className="sequence-builder__badge" ref={badgeRef}>완료</span>
        </div>

        <div className="sequence-builder__controls">
          <button type="button" disabled={stageCount >= sequenceStages.length} onClick={addNextStage}>
            다음 단계 추가
          </button>
          <button type="button" disabled={stageCount === 0} onClick={play}>
            {reducedMotion ? '최종 상태 보기' : '현재 sequence 재생'}
          </button>
          <button type="button" onClick={reset}>초기화</button>
        </div>
      </div>

      <p className="sequence-builder__status" role="status">{status}</p>

      <ol className="sequence-builder__stages">
        {sequenceStages.map((stage, index) => (
          <li key={stage.id} data-added={index < stageCount}>
            <span>{index + 1}</span><strong>{stage.label}</strong><small>{stage.calls.map((call) => call.method).join(' + ')}</small>
          </li>
        ))}
      </ol>

      <div className="sequence-builder__ruler" aria-label={`현재 Timeline child ${blocks.length}개`} style={{ minHeight: `${Math.max(76, blocks.length * 52 + 24)}px` }}>
        {blocks.length === 0 ? <p>단계를 추가하면 실제 child block이 여기에 나타납니다.</p> : blocks.map((block, index) => (
          <div
            className="sequence-builder__block"
            key={block.id}
            style={{ left: `${totalDuration === 0 ? 0 : (block.start / totalDuration) * 100}%`, top: `${12 + index * 52}px`, width: `${block.duration === 0 || totalDuration === 0 ? 2 : (block.duration / totalDuration) * 100}%` }}
          >
            <strong>{block.method}</strong>
            <small>{block.start}s · {block.duration}s</small>
          </div>
        ))}
      </div>

      <pre className="sequence-builder__code"><code>{code}</code></pre>

      <div className="sequence-builder__panels">
        <article><h4>무엇이 달라졌나요?</h4><p>child를 넣을 때마다 Timeline 길이와 block 수가 늘지만 조작 대상은 같은 Timeline 하나입니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p><code>set()</code> block만 duration 0이고, 나머지 child는 앞 child의 끝부터 차례로 놓입니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>네 creator가 Timeline 자신을 돌려주므로 점을 이어 같은 container에 child를 계속 넣을 수 있습니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>카드 진입 → 진행 표시 → 완료 전환처럼 순서를 함께 재생·중단해야 하는 UI 흐름을 한 단위로 묶을 때 씁니다.</p></article>
      </div>

      <p className="sequence-builder__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-basics/examples/SequenceBuilderLab/useSequenceBuilderAnimation.ts" /></p>
    </section>
  )
}
